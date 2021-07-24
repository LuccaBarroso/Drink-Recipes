import { generateRandom, submitResearch } from "./index";
import { getdrink } from "./model";

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

export const initBtns = function () {
  randomBtn?.addEventListener("click", function () {
    drinkContent.forEach((e) => {
      // @ts-ignore
      e.style.display = "none";
      e.classList.remove("showTriangle");
    });
    //@ts-ignore
    recipePlace.scrollIntoView();
    generateRandom();
  });
  searchSubmission?.addEventListener("click", function (e) {
    e.preventDefault();
    //@ts-ignore
    submitResearch(searchName?.value);
  });
  btnRight?.addEventListener("click", function () {
    curPg++;
    displayPage(curPg);
  });
  btnLeft?.addEventListener("click", function () {
    curPg--;
    displayPage(curPg);
  });
};

export const toggleSpinner = function (what: boolean) {
  if (what) {
    // @ts-ignore
    spiner.style.display = "block";
  } else {
    // @ts-ignore
    spiner.style.display = "none";
  }
};

export const displayRecipe = function (
  name: string,
  imgLink: string,
  ing: string,
  steps: string
) {
  if (recipeName) recipeName.textContent = name;
  //@ts-ignore
  if (drinkImg) drinkImg.src = imgLink;

  drinkContent.forEach((e) => {
    // @ts-ignore
    e.style.display = "flex";
    e.classList.add("showTriangle");
  });

  toggleSpinner(false);
  //@ts-ignore
  stepsP?.textContent = steps;
  //@ts-ignore
  ingredientsTable?.innerHTML = "";
  ingredientsTable?.insertAdjacentHTML("afterbegin", ing);
};
let curCount = 0;
let curPg = 0;
export const showSearchResult = function (drinks: string, count: number) {
  if (drinks !== "NOT FOUND") {
    searchWarning?.classList.add("dontDisplay");
    //@ts-ignore
    searchResult?.classList.remove("dontDisplay");
    searchResult?.insertAdjacentHTML("afterbegin", drinks);
    searchResult?.classList.add("showSearch");
    curCount = count;
    curPg = 0;
    if (curCount > 6) {
      displayPage(0);
    }
  } else {
    searchWarning?.classList.remove("dontDisplay");
  }
  loadingSearchResult?.classList.add("dontDisplay");
};

export const displayLoadingSearch = function () {
  //@ts-ignore
  searchResult?.innerHTML = "";
  searchResult?.classList.remove("showSearch");
  searchResult?.classList.add("dontDisplay");
  btnLeft?.classList.add("dontDisplay");
  btnRight?.classList.add("dontDisplay");
  //@ts-ignore
  loadingSearchResult?.classList.remove("dontDisplay");
};

const displayPage = function (page: number) {
  btnLeft?.classList.add("dontDisplay");
  btnRight?.classList.add("dontDisplay");
  const allItens = document.querySelectorAll(".recItem");
  allItens.forEach((a) => a.classList.add("dontDisplay"));
  const firstItem = page * 6;
  let lastItem = firstItem + 5;
  if (lastItem > curCount - 1) {
    lastItem = curCount - 1;
  }
  for (let i = firstItem; i <= lastItem; i++) {
    allItens[i].classList.remove("dontDisplay");
    //@ts-ignore
    allItens[i].addEventListener("click", function () {
      getRecipeById(
        //@ts-ignore
        allItens[i].dataset.id
      );
    });
  }
  if (curCount > lastItem) {
    btnRight?.classList.remove("dontDisplay");
  }
  if (firstItem > 0) {
    btnLeft?.classList.remove("dontDisplay");
  }
};

const getRecipeById = function (id: string) {
  console.log("clicked");
  //@ts-ignore
  recipePlace.scrollIntoView();
  drinkContent.forEach((e) => {
    // @ts-ignore
    e.style.display = "none";
    e.classList.remove("showTriangle");
  });
  getdrink(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
};
