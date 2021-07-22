import { loadHandsAnimation } from "./handsAnimation";
import { getdrink } from "./model";
import "./styles/index.scss";
import { displayRecipe } from "./view";

loadHandsAnimation();
document
  .querySelector(".search")
  ?.addEventListener("click", loadHandsAnimation);

getdrink("https://www.thecocktaildb.com/api/json/v1/1/random.php");

export const showData = function (data: any, img: any, ingredients: string) {
  console.log(data);
  displayRecipe(data.strDrink, img, ingredients);
};
