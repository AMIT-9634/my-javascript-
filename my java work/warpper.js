
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragging = false;
let prevPageX, PrevScrollLeft, positionDiff;

const showHideIcon = () => {
  const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcon(), 60);
  });
});

const autoSlide = () => {
  if (carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth) return;
  const firstImgWidth = firstImg.clientWidth + 14;
  positionDiff = Math.abs(positionDiff);
  const valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > PrevScrollLeft) {
    return (carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragging = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  PrevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = PrevScrollLeft - positionDiff;
  showHideIcon();
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
