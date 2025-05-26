document.addEventListener("DOMContentLoaded", function() {
  console.log("College Life script loaded");
  
  const squares = document.querySelectorAll('.college-square');
  console.log("Found squares:", squares.length);
  
  let isHovering = false;

  // Function to randomly flip squares
  function randomFlip() {
    if (isHovering) return; // Don't flip if user is hovering

    squares.forEach(square => {
      // Only flip squares that aren't being hovered
      if (!square.matches(':hover')) {
        // Randomly decide whether to flip this square
        if (Math.random() < 0.3) { // 30% chance to flip
          square.classList.toggle('flipped');
          console.log("Flipping square");
        }
      }
    });
  }

  // Add hover event listeners to all squares
  squares.forEach(square => {
    square.addEventListener('mouseenter', () => {
      console.log("Mouse entered square");
      isHovering = true;
      // Remove flipped class when hovering
      square.classList.remove('flipped');
      square.classList.add('hovered');
    });

    square.addEventListener('mouseleave', () => {
      console.log("Mouse left square");
      isHovering = false;
      square.classList.remove('hovered');
    });
  });

  // Start the random flipping animation
  console.log("Starting random flip interval");
  setInterval(randomFlip, 1000); // Flip every second
}); 