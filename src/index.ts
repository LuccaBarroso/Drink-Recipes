import { loadHandsAnimation } from "./handsAnimation";
import "./styles/index.scss";

loadHandsAnimation();
document
  .querySelector(".search")
  ?.addEventListener("click", loadHandsAnimation);
