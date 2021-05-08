// Set number of stars to display
const numStars = 300;

// Loop over each star and randomly place it on the screen
document.addEventListener("DOMContentLoaded", setStars);
//window.addEventListener("resize", resetStars);

function setStars() {
  localStorage.clear();
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
      star.style.top = xy[0] + "px";
      star.style.left = xy[1] + "px";
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
function isDouble (x, y) {
  return (x / 2) > y;
}
function isTriple (x, y) {
  return (x / 3) > y;
}

function getRandomPosition() {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  console.log("height", main.clientHeight);
  const y = globalThis.outerWidth;
  const windowHeight = globalThis.outerHeight;
  const clientHeight = document.body.clientHeight;
  let x = windowHeight

  if ( isTriple(clientHeight, windowHeight) ) {
    x += 1000;
  } else if ( isDouble(clientHeight, windowHeight) ) {
    x += 500;
  } else if (clientHeight > windowHeight) {
    x += 200;
  }
  const randomX = Math.floor(Math.random() * x);
  const randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}
/*
function memoizeRenderStars() {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    console.log(typeof localStorage.getItem(i));
    if (!localStorage.getItem(i)) {
      const xy = getRandomPosition();
      localStorage.setItem(i, xy);
    }
    const xy = localStorage.getItem(i).split(",");
    star.style.top = xy[0] + "px";
    star.style.left = xy[1] + "px";
    document.body.append(star);
  }
}
*/