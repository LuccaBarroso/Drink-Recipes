const recipeName = document.querySelector(".drinkName");
const drinkImg = document.querySelector(".drinkImg");
const spiner = document.querySelector(".drinkLoading");
const drinkContent = document.querySelectorAll(".drinkContent");
const ingredientsTable = document.querySelector("#ingTable");
const rightDrinkContent = document.querySelector("#rightDrinkContent");

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
  ing: string
) {
  if (recipeName) recipeName.textContent = name;
  //@ts-ignore
  if (drinkImg) drinkImg.src = imgLink;

  toggleSpinner(false);

  drinkContent.forEach((e) => {
    // @ts-ignore
    e.style.display = "flex";
    e.classList.add("showTriangle");
  });
  //@ts-ignore
  ingredientsTable.insertAdjacentHTML("afterbegin", ing);
};
