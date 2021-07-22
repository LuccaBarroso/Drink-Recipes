let _width: number, _height: number, _scrollHeight: number;
const _containerHeight = 800;
const endOfAnimation = 600;
const leftImg = document.querySelector(".left-img");
const rightImg = document.querySelector(".right-img");

const leftData = {
  top: { min: -300, max: -350 },
};

function resize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  _scrollHeight = _containerHeight - _height;
}

const calcScroll = function (scroll: number): number {
  if (scroll > endOfAnimation) {
    return 100;
  }
  return (scroll * 100) / endOfAnimation;
};

const updateAnimation = function (): void {
  let percent = calcScroll(window.pageYOffset);
  let topValue = -300 + percent;
  let sideValue = -150 + percent;
  //@ts-ignore
  leftImg.style.top = topValue + "px";
  //@ts-ignore
  leftImg.style.left = sideValue + "px";
  topValue = 200 - percent;
  sideValue = -200 + percent;

  //@ts-ignore
  rightImg.style.top = topValue + "px";
  //@ts-ignore
  rightImg.style.right = sideValue + "px";
};

export const loadHandsAnimation = function (): void {
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateAnimation);
};
