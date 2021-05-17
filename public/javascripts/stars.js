// Set number of stars to display
const numStars = 300;

// Loop over each star and randomly place it on the screen
document.addEventListener("DOMContentLoaded", setStars);

function setStars() {
  window.localStorage.clear();
  localStorage.setItem("pgHeight", window.innerHeight);
  localStorage.setItem("pgWidth", window.innerWidth);
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    if (localStorage.getItem(i)) {
      const style = localStorage.getItem(i).split(",");
      star.style.top = style[0] + "px";
      star.style.left = style[1] + "px";
      document.body.append(star);
    } else {
      const xy = getRandomPosition();
      localStorage.setItem(i, xy);
      star.style.left = xy[0] + "px";
      star.style.top = xy[1] + "px";
      document.body.append(star);
    }
  }
}
let resizing = true;
let resizeFinished;
function resetStars() {
  clearTimeout(resizeFinished);
  resizeFinished = setTimeout(function() {
    const oldPgHeight = Number(localStorage.getItem("pgHeight"));
    const pgHeight = Number(window.innerHeight);
    const oldPgWidth = Number(localStorage.getItem("pgWidth"));
    const pgWidth = Number(window.innerWidth);
    if (pgHeight > oldPgHeight || pgWidth > oldPgWidth) {
      console.log("in the block");
      localStorage.clear();
      window.location.reload();
    }
  }, 250);

}

// Helper function for getting a random position
function isDouble (a, b) {
  return (a / 2) > b;
}
function isTriple (a, b) {
  return (a / 3) > b;
}

function hasExtraHeight(a, b) {
  return a > b;
}

function getPctDiff(a, b) {
  let pctDiff = 0;
  if (hasExtraHeight(a, b)) {
    pctDiff = 1.00 - (b / a);
  }
  console.log(pctDiff)
  return pctDiff;
}

function addExtraHeight(win, diff) {
 let extra = 0;
  if (diff > 0.75) {
    extra = win;
 } else if (diff > 0.5) {
  extra = win * 0.5;
 } else if (diff > 0.3) {
  extra = win * 0.07;
 } else if (diff > 0.1) {
  extra = win * 0.05
 }
 return extra;
}

const h1 = document.getElementsByClassName("main-title")[0].textContent;
const isMainPage = h1 === "Recently Added";
const isBooksPage = h1 === "Search Books";
const isLongPage = isMainPage || isBooksPage;
console.log(isLongPage);

function getRandomPosition() {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const windowHeight = window.innerHeight;
  const clientHeight = document.body.clientHeight;
  const x = window.innerWidth;
  let y = windowHeight;

  if (isMainPage) {
    y *= 3;
  }

  else if (isBooksPage) {
    if (hasExtraHeight(clientHeight, windowHeight)) {
      const diff = getPctDiff(clientHeight, windowHeight);
      y += addExtraHeight(windowHeight, diff);
    }
  }

  const randomX = Math.floor(Math.random() * x);
  const randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}