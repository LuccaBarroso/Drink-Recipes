import { showData } from ".";
import { toggleSpinner } from "./view";

//@ts-ignore
export const getdrink = async function (url: string) {
  try {
    toggleSpinner(true);
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    const data = await response.json();

    //getting img
    const img = await fetch(`${data.drinks[0].strDrinkThumb}/preview`);

    //load ingredients
    const ingredients = loadIngredients(data.drinks[0]);

    showData(data.drinks[0], img.url, ingredients);
  } catch (err) {
    console.log(`${err}`);
  }
};

const loadIngredients = function (everything: object): string {
  let ing = "";
  for (let i = 1; i <= 15; i++) {
    //@ts-ignore
    const curIng = everything["strIngredient" + i];
    if (curIng === null) return ing;
    //@ts-ignore
    const curMeas = everything["strMeasure" + i];
    ing += `<tr>
            <td>${curMeas === null ? "" : curMeas}</td>
              <td>${curIng}</td>
            </tr>`;
  }
  return ing;
};
