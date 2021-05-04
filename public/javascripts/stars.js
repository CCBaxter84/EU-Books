// Set number of stars to display
const numStars = 300;

// Loop over each star and randomly place it on the screen
document.addEventListener("DOMContentLoaded", callback);

function callback() {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const xy = getRandomPosition();
    star.style.top = xy[0] + "px";
    star.style.left = xy[1] + "px";
    document.body.append(star);
  }
}

// Helper function for getting a random position

function getRandomPosition() {
  const y = globalThis.outerWidth;
  const x = document.body.scrollHeight;
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