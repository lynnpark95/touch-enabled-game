const diamond = document.getElementById("diamond");
const circle = document.getElementById("circle");
let dragging = false;

circle.addEventListener("touchstart", (e) => {
  dragging = true;
  circle.style.zIndex = "3";
});

document.addEventListener("touchmove", (e) => {
  if (!dragging) return;

  const rect = diamond.getBoundingClientRect();
  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;

  if (
    touchX >= rect.left &&
    touchX <= rect.right &&
    touchY >= rect.top &&
    touchY <= rect.bottom
  ) {
    circle.classList.add("circleOnDia");
  } else {
    circle.classList.remove("circleOnDia");
  }
});

document.addEventListener("touchend", () => {
  dragging = false;
  circle.style.zIndex = "2";
});
