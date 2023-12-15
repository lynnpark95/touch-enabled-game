const circle = document.getElementById("circle");
const diamond = document.getElementById("diamond");
const rectangle = document.getElementById("rectangle");
const text = document.getElementById("text");
const plane = document.getElementById("plane");

let dragging = false;
let crossedDiamond = false;
let enteredRectangle = false;

circle.addEventListener("touchstart", dragStart);
circle.addEventListener("touchend", dragEnd);
circle.addEventListener("touchmove", drag);

function dragStart(e) {
  dragging = true;
  circle.style.zIndex = "3";
}
function showConfetti() {
  const container = document.getElementById("confetti-container");
  container.classList.add("show");
}
function dragEnd() {
  dragging = false;
  circle.style.zIndex = "2";

  if (crossedDiamond && enteredRectangle) {
    circle.style.backgroundColor = "yellow";
    setTimeout(() => {
      showConfetti();
      hideShapes();
      plane.classList.add("show");
      text.classList.add("show");
      text.style.display = "block";

      const planeRect = plane.getBoundingClientRect();
      text.style.left = `${planeRect.right}px`;
      text.style.top = `${planeRect.top}px`;

      moveTextWithPlane();
    }, 500);
  } else {
    if (!crossedDiamond && enteredRectangle) {
      circle.style.left = "40vw";
      circle.style.top = "55%";
    }
  }
}

function moveTextWithPlane() {
  const interval = setInterval(() => {
    const planeRect = plane.getBoundingClientRect();
    if (planeRect.right > 0 && plane.classList.contains("show")) {
      const textHeight = text.offsetHeight;
      const centerY = planeRect.top + planeRect.height / 2 - textHeight / 2;

      text.style.left = `${planeRect.right}px`;
      text.style.top = `${centerY}px`;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

function drag(e) {
  if (dragging) {
    e.preventDefault();
    const touchX = e.touches[0].clientX - 25;
    const touchY = e.touches[0].clientY - 25;
    circle.style.left = `${touchX}px`;
    circle.style.top = `${touchY}px`;

    if (!crossedDiamond && isOverlapping(circle, diamond)) {
      crossedDiamond = true;
    }
    enteredRectangle = isOverlapping(circle, rectangle);
  }
}

function isOverlapping(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function hideShapes() {
  document.querySelectorAll(".shape").forEach((shape) => {
    shape.style.display = "none";
  });
}
