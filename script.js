// FAQ Toggle Functionality
        document.querySelectorAll('.faq-button').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('.faq-icon');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-content').forEach(item => {
                    if (item !== content) {
                        item.classList.add('hidden');
                        item.classList.remove('animate-fadeIn');
                    }
                });
                document.querySelectorAll('.faq-icon').forEach(item => {
                    if (item !== icon) {
                        item.classList.remove('rotate-180');
                    }
                });
                
                // Toggle current FAQ
                content.classList.toggle('hidden');
                content.classList.toggle('animate-fadeIn');
                icon.classList.toggle('rotate-180');
            });
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = e.target.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submitText');
            const formMessage = document.getElementById('formMessage');
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitText.textContent = 'Submitting...';
            formMessage.classList.add('hidden');
            
            // Get form data
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.message.value,
                timestamp: new Date().toISOString()
            };
            
            try {
                // Replace with your Cloudflare Worker URL
                const response = await fetch('YOUR_CLOUDFLARE_WORKER_URL', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    // Success
                    formMessage.textContent = '✓ Form submitted successfully! We will contact you soon.';
                    formMessage.className = 'text-center text-sm font-medium text-green-600';
                    formMessage.classList.remove('hidden');
                    e.target.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Error
                formMessage.textContent = '✗ Submission failed. Please try again or contact us directly.';
                formMessage.className = 'text-center text-sm font-medium text-red-600';
                formMessage.classList.remove('hidden');
                console.error('Form submission error:', error);
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitText.textContent = 'Submit';
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });


const header = document.getElementById("site-header");
const navLinks = document.getElementById("nav-links");
const searchIcon = document.getElementById("search-icon");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // Header position
    header.classList.remove("top-[25px]", "bg-transparent");
    header.classList.add("top-0",
      "bg-white/30",
      "backdrop-blur-lg",
      "border-b",
      "border-white/20",
      "shadow-[0_1px_10px_rgba(0,0,0,0.05)]");

    // Text color
    navLinks.classList.remove("text-white");
    navLinks.classList.add("text-gray-900");

    searchIcon.classList.remove("text-white");
    searchIcon.classList.add("text-gray-900");

  } else {
    // Reset to initial state
     header.classList.remove(
      "top-0",
      "bg-white/30",
      "backdrop-blur-lg",
      "border-b",
      "border-white/20",
      "shadow-[0_1px_10px_rgba(0,0,0,0.05)]"
    );
    header.classList.add("top-[25px]", "bg-transparent");

    navLinks.classList.remove("text-gray-900");
    navLinks.classList.add("text-white");

    searchIcon.classList.remove("text-gray-900");
    searchIcon.classList.add("text-white");
  }
});

  // --- Carousel controls (desktop) ---
  const scroller = document.querySelector("#servicesCarousel .overflow-x-auto");
  const prevBtn = document.getElementById("svcPrev");
  const nextBtn = document.getElementById("svcNext");

  function scrollByCard(direction = 1) {
    if (!scroller) return;
    const firstCard = scroller.querySelector(".service-card");
    const gap = 16; // gap-4 => 16px
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
    scroller.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));

  // --- Modal logic ---
  const modal = document.getElementById("serviceModal");
  const backdrop = document.getElementById("modalBackdrop");
  const panel = document.getElementById("modalPanel");
  const closeBtn = document.getElementById("modalClose");
  const closeBtn2 = document.getElementById("modalSecondaryClose");

  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalImg = document.getElementById("modalImg");

  let lastFocusedEl = null;

  function openModal({ title, text, img }) {
    lastFocusedEl = document.activeElement;

    modalTitle.textContent = title || "Service";
    modalText.textContent = text || "";
    modalImg.src = img || "";
    modalImg.alt = title || "Service image";

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    // Trigger transitions (next frame)
    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");

      panel.classList.remove("opacity-0", "translate-y-6", "sm:scale-95");
      panel.classList.add("opacity-100", "translate-y-0", "sm:scale-100");
    });

    // Focus close for accessibility
    setTimeout(() => closeBtn.focus(), 50);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    // Reverse transitions
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");

    panel.classList.remove("opacity-100", "translate-y-0", "sm:scale-100");
    panel.classList.add("opacity-0", "translate-y-6", "sm:scale-95");

    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // After animation, hide
    setTimeout(() => {
      modal.classList.add("hidden");
      if (lastFocusedEl) lastFocusedEl.focus();
    }, 300);
  }

  // Open modal on card click
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", () => {
      openModal({
        title: card.dataset.title,
        text: card.dataset.text,
        img: card.dataset.img
      });
    });
  });

  // Close handlers
  closeBtn.addEventListener("click", closeModal);
  closeBtn2.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  // ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
 

  const btn = document.getElementById("aboutToggle");
  const shortBlock = document.getElementById("aboutShort");
  const fullBlock = document.getElementById("aboutFull");
  const chevron = document.getElementById("aboutChevron");

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      // Collapse
      fullBlock.classList.add("hidden");
      shortBlock.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "false");
      btn.firstChild.textContent = "Read more";
      chevron.classList.remove("rotate-90");
    } else {
      // Expand
      fullBlock.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      btn.firstChild.textContent = "Read less";
      chevron.classList.add("rotate-90");
    }
  });