const slides = [
  { type: "image", src: "../media/routine1.png" },
  { type: "image", src: "../media/routine2.png" },
  { type: "image", src: "../media/routine3.png" },
  { type: "tv-static" },
  { type: "channel-choice" },
  { type: "end", src: "../media/leaving.png" }
];

let currentSlide = 0;
let autoplayInterval;
const container = document.getElementById("slide-container");
const nextBtn = document.getElementById("next-btn");
nextBtn.style.display = "none"; // Hide initially

function renderSlide(index) {
  container.innerHTML = ""; // Clear slide

  const slide = slides[index];

  if (slide.type === "image") {
    const img = document.createElement("img");
    img.src = slide.src;
    container.appendChild(img);
  }

  if (slide.type === "tv-static") {
    const img = document.createElement("img");
    img.src = "../media/background.gif";
    container.appendChild(img);

    // Optional audio logic here if needed
  }

  if (slide.type === "channel-choice") {
    clearInterval(autoplayInterval); // Stop autoplay here
    const tvImg = document.createElement("img");
    tvImg.src = "../media/choice.png";
    container.appendChild(tvImg);

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("channel-buttons");

    const btnCN = document.createElement("button");
    btnCN.textContent = "Cartoon Network";
    btnCN.onclick = () => showChannel("CN");

    const btnNick = document.createElement("button");
    btnNick.textContent = "Nickelodeon";
    btnNick.onclick = () => showChannel("Nick");

    btnContainer.appendChild(btnCN);
    btnContainer.appendChild(btnNick);
    container.appendChild(btnContainer);
  }

  if (slide.type === "end") {
    const img = document.createElement("img");
    img.src = slide.src;
    container.appendChild(img);
    nextBtn.style.display = "none"; // No next after end
  }
}

function showChannel(choice) {
  const channelImg = document.createElement("img");
  channelImg.src = choice === "CN" ? "../media/CN.gif" : "../media/nickelodeon..gif";
  container.innerHTML = "";
  container.appendChild(channelImg);

  // Now show the next button after a short delay
  setTimeout(() => {
    nextBtn.style.display = "block";
  }, 1000);
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide(currentSlide);
    nextBtn.style.display = "none"; // Hide after advancing
  }
}

// Autoplay logic
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (slides[currentSlide].type === "channel-choice") {
      clearInterval(autoplayInterval);
      return;
    }
    nextSlide();
  }, 2500); // Change slide every 2.5 seconds
}

nextBtn.addEventListener("click", nextSlide);

// Initial render and autoplay
renderSlide(currentSlide);
startAutoplay();
