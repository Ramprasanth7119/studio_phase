document.addEventListener('DOMContentLoaded', () => {
      const loadingScreen = document.getElementById('loading-screen');
      const mainContent = document.getElementById('main-content');

      // Hide the loading screen and show the main content after 2 seconds
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.add('visible');
      }, 2000);

      // Animation and interaction logic for hero-section
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const closeBtn = document.querySelector('.close-btn');

      // Toggle Menu
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
      });

      // Close Menu with Close Button
      closeBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
      });

      const images = document.querySelectorAll('.image');
      const textContent = document.querySelector('.text-content h1');

      images.forEach((img) => {
        let isFollowingMouse = false;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        // Function to make the image float and follow the mouse
        const moveImage = () => {
          if (!isFollowingMouse) return;

          const dx = targetX - currentX;
          const dy = targetY - currentY;
          const damping = 0.1; // Makes the movement smooth and floating

          currentX += dx * damping;
          currentY += dy * damping;

          img.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.2) rotate(${Math.sin(currentX / 100) * 5}deg)`; // Add a slight rotation for the floating effect

          requestAnimationFrame(moveImage);
        };

        // On mouse over the image, start following the mouse
        img.addEventListener('mouseover', () => {
          isFollowingMouse = true;
          img.classList.add('floatable'); // Add a floatable class for the effect

          img.style.zIndex = '3'; // Bring the image above others
          img.style.transition = 'none'; // Disable transition during mouse follow
          img.style.opacity = '1';
          img.style.transform = 'scale(1.2)'; // Increase size on hover

          images.forEach((otherImg) => {
            if (otherImg !== img) {
              otherImg.style.opacity = '0.3'; // Dim other images
              otherImg.style.zIndex = '1'; // Keep other images below
            }
          });

          textContent.style.color = 'transparent';
          textContent.style.webkitTextStroke = '2px white'; // Text outline effect

          moveImage(); // Start moving the image
        });

        // On mouse leave, reset the image back to its normal position and size
        img.addEventListener('mouseleave', () => {
          isFollowingMouse = false;
          img.classList.remove('floatable'); // Remove the floatable class

          img.style.transition = 'transform 1s ease, opacity 0.5s ease'; // Reset transitions
          img.style.transform = 'translate(0, 0) scale(1)'; // Reset to original position and size
          img.style.zIndex = '1';
          img.style.opacity = '0.8';

          textContent.style.color = 'white';
          textContent.style.webkitTextStroke = '0px'; // Remove text outline

          images.forEach((otherImg) => {
            otherImg.style.opacity = '0.8';
            otherImg.style.zIndex = '1'; // Reset zIndex for other images
          });
        });

        // Mousemove event to track the mouse position and calculate movement
        img.addEventListener('mousemove', (e) => {
          if (!isFollowingMouse) return;

          const rect = img.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - rect.width / 2; // Calculate mouse position relative to the image
          const mouseY = e.clientY - rect.top - rect.height / 2;

          const maxDistance = 1200; // Max distance the image can float

          targetX = Math.min(maxDistance, Math.max(-maxDistance, mouseX)); // Limit X movement
          targetY = Math.min(maxDistance, Math.max(-maxDistance, mouseY)); // Limit Y movement
        });
      });
    });