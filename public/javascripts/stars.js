// Set number of stars to display
const numStars = 100;

// Loop over each star and randomly place it on the screen
document.addEventListener("DOMContentLoaded", function() {
  console.log('your mom');
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const xy = getRandomPosition();
    star.style.top = xy[0] + "px";
    star.style.left = xy[1] + "px";
    document.body.append(star);
  }
});

// Helper function for getting a random position
function getRandomPosition() {
  const y = window.innerWidth;
  const x = window.innerHeight;
  const randomX = Math.floor(Math.random() * x);
  const randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}
