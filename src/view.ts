import { generateRandom, generateRecipeFromId, submitResearch } from "./index";

//get the necessary elements from the page
const recipeName = document.querySelector(".drinkName");
const drinkImg = document.querySelector(".drinkImg");
const spiner = document.querySelector(".drinkLoading");
const drinkContent = document.querySelectorAll(".drinkContent");
const ingredientsTable = document.querySelector("#ingTable");
const stepsP = document.querySelector(".steps");
const randomBtn = document.querySelector(".random");
const recipePlace = document.querySelector("#rec");
const searchSubmission = document.querySelector("#submitSearch");
const searchName = document.querySelector("#searchName");
const searchResult = document.querySelector(".displayResults");
const loadingSearchResult = document.querySelector(".displayResultsLoading");
const searchWarning = document.querySelector(".searchWarning");
const btnLeft = document.querySelector("#btnLeft");
const btnRight = document.querySelector("#btnRight");

//add event listenners to the btns
export const initBtns = function () {
  randomBtn?.addEventListener("click", function () {
    //remove the cur content to display a new recipe
    drinkContent.forEach((e) => {
      // @ts-ignore
      e.style.display = "none";
      e.classList.remove("showTriangle");
    });

    //scroll the recipe into view
    //@ts-ignore
    recipePlace.scrollIntoView();

    //call the controller to get a new recipe
    generateRandom();
  });

  //event listener for submiting a search
  searchSubmission?.addEventListener("click", function (e) {
    //prevent the site from reloading
    e.preventDefault();

    //Show Loading
    displayLoadingSearch();

    //call the controller to get the searchs
    //@ts-ignore
    submitResearch(searchName?.value);
  });

  //event listener for next page
  btnRight?.addEventListener("click", function () {
    //goes to next page and change recipes
    curPg++;
    displayPage(curPg);
  });

  //event listener for previous page
  btnLeft?.addEventListener("click", function () {
    //goes to previous page and change recipes
    curPg--;
    displayPage(curPg);
  });
};

//turn on or of the spinner
export const toggleSpinner = function (value: boolean) {
  if (value) {
    // @ts-ignore
    spiner.style.display = "block";
  } else {
    // @ts-ignore
    spiner.style.display = "none";
  }
};

//display a new recipe, given its values
export const displayRecipe = function (
  name: string,
  imgLink: string,
  ing: string,
  steps: string
) {
  //@ts-ignore
  recipeName.textContent = name;
  //@ts-ignore
  if (drinkImg) drinkImg.src = imgLink;
  //@ts-ignore
  stepsP?.textContent = steps;
  //@ts-ignore
  ingredientsTable?.innerHTML = "";
  ingredientsTable?.insertAdjacentHTML("afterbegin", ing);

  //trigger the animation for each element
  drinkContent.forEach((e) => {
    // @ts-ignore
    e.style.display = "flex";
    e.classList.add("showTriangle");
  });

  //turn off spinner
  toggleSpinner(false);
};

//variables necessary for keeping track of pages in recipes search
let curCount = 0; //amount of recipes in the total for the current search
let curPg = 0; //the number of the page that is currently being displayed

//receive the cur page number and set everything right
const displayPage = function (page: number) {
  //hide both btns for next and previous pages
  btnLeft?.classList.add("dontDisplay");
  btnRight?.classList.add("dontDisplay");

  //get all the itens and hide one by one
  const allItens = document.querySelectorAll(".recItem");
  allItens.forEach((a) => a.classList.add("dontDisplay"));

  //find out the index of the first item and last item for the cur page
  const firstItem = page * 6;
  let lastItem = firstItem + 5;

  //checks if the cur page has more slots than recipes and fix the last index if needed
  if (lastItem > curCount - 1) {
    lastItem = curCount - 1;
  }

  //display the new page and add event listeners for each recipe
  for (let i = firstItem; i <= lastItem; i++) {
    //show recipe
    allItens[i].classList.remove("dontDisplay");

    //cur recipe id
    //@ts-ignore
    const curId = allItens[i].dataset.id;

    //add event listener for when that recipe gets clicked
    allItens[i].addEventListener("click", function () {
      console.log(curId);
      //scroll recipe into view
      //@ts-ignore
      recipePlace.scrollIntoView();

      //hide the cur drink content
      drinkContent.forEach((e) => {
        // @ts-ignore
        e.style.display = "none";
        e.classList.remove("showTriangle");
      });
      //@ts-ignore
      generateRecipeFromId(curId);
    });
  }

  if (curCount - 1 > lastItem) {
    btnRight?.classList.remove("dontDisplay");
  }
  if (firstItem > 0) {
    btnLeft?.classList.remove("dontDisplay");
  }
};

//shows the search results =)
export const showSearchResult = function (drinks: string, count: number) {
  //display all the found drinks and trigger the animation
  searchWarning?.classList.add("dontDisplay");
  //@ts-ignore
  searchResult?.classList.remove("dontDisplay");
  searchResult?.insertAdjacentHTML("afterbegin", drinks);
  searchResult?.classList.add("showSearch");

  //set the new cur caunt of recipes
  curCount = count;
  //set the cur pg as the first one (zero based)
  curPg = 0;

  //call the display page function to display only the current pages recipes
  displayPage(0);

  //remove the loading animation
  removeSearchLoading();
};

//set back to the begining with nothing beeing displayed in the search and show the loading animation
export const displayLoadingSearch = function () {
  //remove every recipe that was there before
  //@ts-ignore
  searchResult?.innerHTML = "";

  //set the results, the left and right btns as display none
  searchResult?.classList.remove("showSearch");
  searchResult?.classList.add("dontDisplay");
  btnLeft?.classList.add("dontDisplay");
  btnRight?.classList.add("dontDisplay");

  //display the loading
  loadingSearchResult?.classList.remove("dontDisplay");
};

//warn the user that there were no results for the term
export const noResultsFound = function () {
  //show warning
  searchWarning?.classList.remove("dontDisplay");
  removeSearchLoading();
};

//turn the display of search loading to none
export const removeSearchLoading = function () {
  loadingSearchResult?.classList.add("dontDisplay");
};
