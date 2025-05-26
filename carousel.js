document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const cards = Array.from(track.children);
  const leftButton = document.querySelector(".carousel-arrow-left");
  const rightButton = document.querySelector(".carousel-arrow-right");
  const carouselContainer = document.querySelector(".carousel-container");

  let currentIndex = 0;
  let isAutoPlaying = true;
  let autoPlayInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Create indicators container
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.className = "carousel-indicators";
  carouselContainer.appendChild(indicatorsContainer);

  // Create indicators
  cards.forEach((_, index) => {
    const indicator = document.createElement("button");
    indicator.className = "carousel-indicator";
    indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = Array.from(indicatorsContainer.children);
  
  cards.forEach(card => {
    const logoWrapper = document.createElement("div");
    logoWrapper.className = "logo-wrapper";
    
    const logo = card.querySelector(".company-logo");
    const logoClone = logo.cloneNode(true);
    logoWrapper.appendChild(logoClone);
    
    const detailsWrapper = document.createElement("div");
    detailsWrapper.className = "card-details";
    
    Array.from(card.children).forEach(child => {
      if (!child.classList.contains("company-logo")) {
        detailsWrapper.appendChild(child.cloneNode(true));
      }
    });
    
    card.innerHTML = "";
    card.appendChild(logoWrapper);
    card.appendChild(detailsWrapper);
    
    card.addEventListener("mouseenter", () => {
      card.classList.add("expanded");
      pauseAutoPlay();
    });
    
    card.addEventListener("mouseleave", () => {
      card.classList.remove("expanded");
      resumeAutoPlay();
    });
  });

  function updateCarousel() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Update button states
    leftButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
    rightButton.style.opacity = currentIndex >= cards.length - 1 ? "0.5" : "1";

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = cards.length - 1;
    }
    updateCarousel();
  }

  function startAutoPlay() {
    if (isAutoPlaying) {
      autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
  }

  function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resumeAutoPlay() {
    if (isAutoPlaying) {
      startAutoPlay();
    }
  }

  // Event Listeners
  leftButton.addEventListener("click", () => {
    prevSlide();
    pauseAutoPlay();
    resumeAutoPlay();
  });

  rightButton.addEventListener("click", () => {
    nextSlide();
    pauseAutoPlay();
    resumeAutoPlay();
  });

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      pauseAutoPlay();
      resumeAutoPlay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      pauseAutoPlay();
      resumeAutoPlay();
    }
  });

  // Touch Events
  carouselContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    pauseAutoPlay();
  });

  carouselContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    resumeAutoPlay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCarousel();
    }, 250);
  });

  // Initialize
  updateCarousel();
  startAutoPlay();
});