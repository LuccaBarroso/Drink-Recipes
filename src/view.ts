import { generateRandom } from "./index";

const recipeName = document.querySelector(".drinkName");
const drinkImg = document.querySelector(".drinkImg");
const spiner = document.querySelector(".drinkLoading");
const drinkContent = document.querySelectorAll(".drinkContent");
const ingredientsTable = document.querySelector("#ingTable");
const stepsP = document.querySelector(".steps");
const randomBtn = document.querySelector(".random");
const recipePlace = document.querySelector("#rec");

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
