import { loadHandsAnimation } from "./handsAnimation";
import { getdrink } from "./model";
import "./styles/index.scss";
import { displayRecipe, initBtns } from "./view";

loadHandsAnimation();
document
  .querySelector(".search")
  ?.addEventListener("click", loadHandsAnimation);

export const showData = function (data: any, img: any, ingredients: string) {
  console.log(data);
  displayRecipe(data.strDrink, img, ingredients, data.strInstructions);
};

export const generateRandom = function () {
  getdrink("https://www.thecocktaildb.com/api/json/v1/1/random.php");
};
generateRandom();
initBtns();
