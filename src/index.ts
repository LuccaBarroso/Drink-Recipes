import { loadHandsAnimation } from "./handsAnimation";
import { getdrink, searchForTerm } from "./model";
import "./styles/index.scss";
import { displayRecipe, initBtns, showSearchResult } from "./view";

//call the view to display data
export const showData = function (data: any, img: any, ingredients: string) {
  displayRecipe(data.strDrink, img, ingredients, data.strInstructions);
};

//generate a random recipe
export const generateRandom = function () {
  getdrink("https://www.thecocktaildb.com/api/json/v1/1/random.php");
};

//generate recipe from given url
export const generateRecipeFromId = function (id: string) {
  getdrink(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
};

export const submitResearch = async function (term: string) {
  //getting data from api
  const drinks = await searchForTerm(term);

  //check if the search was succesfull
  //@ts-ignore
  if (drinks[1] === 0) {
  } else {
    //displaying data
    //@ts-ignore
    showSearchResult(drinks[0], drinks[1]);
  }
};

//init main page animation
loadHandsAnimation();
document
  .querySelector(".search")
  ?.addEventListener("click", loadHandsAnimation);

//generate a random recipe
generateRandom();
//init the necessary event listenners
initBtns();
