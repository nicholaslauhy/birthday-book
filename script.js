const pages = document.querySelectorAll(".page");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const prevBtnMobile = document.getElementById("prevBtnMobile");
const nextBtnMobile = document.getElementById("nextBtnMobile");

const pageIndicator = document.getElementById("pageIndicator");
const book = document.getElementById("book");

let currentPage = 0;

function updateBook() {
  pages.forEach((page, index) => {
    page.classList.remove("active", "flipped");

    if (index < currentPage) {
      page.classList.add("flipped");
    } else if (index === currentPage) {
      page.classList.add("active");
    }
  });

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;

  prevBtnMobile.disabled = currentPage === 0;
  nextBtnMobile.disabled = currentPage === pages.length - 1;

  pageIndicator.textContent = `Page ${currentPage + 1} / ${pages.length}`;
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    updateBook();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updateBook();
  }
}

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);

nextBtnMobile.addEventListener("click", nextPage);
prevBtnMobile.addEventListener("click", prevPage);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    prevPage();
  }
});

let touchStartX = 0;
let touchEndX = 0;

book.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

book.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance < -50) {
    nextPage();
  }

  if (swipeDistance > 50) {
    prevPage();
  }
}

updateBook();