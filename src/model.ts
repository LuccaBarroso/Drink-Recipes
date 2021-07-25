import { showData } from ".";
import { toggleSpinner } from "./view";

//fetch the needed data from the api given its url
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

    //call the controller to display the data
    showData(data.drinks[0], img.url, ingredients);
  } catch (err) {
    console.log(
      "This following error happend while trying to load a recipe: ",
      err
    );
  }
};

//receive an object of ingredients and format it as a string
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
    //fetch from api  for a term
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
    );
    //convert from json
    const data = await response.json();

    //log data
    //console.log(data);

    const drinks = data.drinks;

    //if the api return null the function return a not found and a zero
    if (drinks === null) return ["NOT FOUND", 0];

    //start an empty  string to store the recipes
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

    //return the recipes and the qnt of recipes
    return [result, drinks.length];
  } catch (err) {
    //log possible error to the console
    console.log("this error was given while trying to load for a term: ", err);
  }
};
