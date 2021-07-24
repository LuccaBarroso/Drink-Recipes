import { loadHandsAnimation } from "./handsAnimation";
import { getdrink, searchForTerm } from "./model";
import "./styles/index.scss";
import {
  displayLoadingSearch,
  displayRecipe,
  initBtns,
  showSearchResult,
} from "./view";

loadHandsAnimation();
document
  .querySelector(".search")
  ?.addEventListener("click", loadHandsAnimation);

export const showData = function (data: any, img: any, ingredients: string) {
  displayRecipe(data.strDrink, img, ingredients, data.strInstructions);
};

export const generateRandom = function () {
  getdrink("https://www.thecocktaildb.com/api/json/v1/1/random.php");
};
generateRandom();
initBtns();

export const submitResearch = async function (term: string) {
  //Show Loading
  displayLoadingSearch();
  //getting data from api
  const drinks = await searchForTerm(term);
  //displaying data
  //@ts-ignore
<<<<<<< HEAD
  showSearchResult(drinks[0], drinks[1]);
=======
  showSearchResult(drinks);
>>>>>>> de8b0d42d6d34f3c840070a69eb357a984867fa5
};
