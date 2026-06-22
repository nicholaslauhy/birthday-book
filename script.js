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

  if (prevBtn) prevBtn.disabled = currentPage === 0;
  if (nextBtn) nextBtn.disabled = currentPage === pages.length - 1;

  if (prevBtnMobile) prevBtnMobile.disabled = currentPage === 0;
  if (nextBtnMobile) nextBtnMobile.disabled = currentPage === pages.length - 1;

  if (pageIndicator) {
    pageIndicator.textContent = `Page ${currentPage + 1} / ${pages.length}`;
  }

  // Reset the scroll position of the text box on each page change.
  const activeMessageBox = pages[currentPage].querySelector(".message-box");
  if (activeMessageBox) {
    activeMessageBox.scrollTop = 0;
  }
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

if (nextBtn) nextBtn.addEventListener("click", nextPage);
if (prevBtn) prevBtn.addEventListener("click", prevPage);

if (nextBtnMobile) nextBtnMobile.addEventListener("click", nextPage);
if (prevBtnMobile) prevBtnMobile.addEventListener("click", prevPage);

// Keyboard support
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    prevPage();
  }
});

// Swipe support for phones
let touchStartX = 0;
let touchEndX = 0;

if (book) {
  book.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  book.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

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
