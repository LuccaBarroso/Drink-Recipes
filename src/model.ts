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

export const searchForTerm = async function (term: string) {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await response.json();
    const drinks = data.drinks;
    let result: string = "";
    await drinks.forEach(async function (drink: object) {
      let drinkStr = `<div class="recItem" data-id="${
        //@ts-ignore
        drink.idDrink
      }"><img class="searchF" src="${
        //@ts-ignore
        drink.strDrinkThumb
      }/preview" alt="${
        //@ts-ignore
        drink.strDrink + " img"
      }">
      <h3>${
        //@ts-ignore
        drink.strDrink
      }</h3></div>`;

      result += drinkStr;
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
