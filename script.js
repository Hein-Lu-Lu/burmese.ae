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

    // ===== Tax Calculator Rules =====
  // - Monthly charge = 2% of basic salary
  // - Charging starts no earlier than Oct 2023
  // - If entry date < Oct 2023: charge Oct 2023 -> Sep 2024
  // - Else:
  //   - If entry month <= Sep: charge from entry month -> Sep of same year
  //   - If entry month > Sep: charge from entry month -> Sep of next year
  // - Months counted inclusive

  const CHARGE_START = new Date(2023, 9, 1); // Oct 1, 2023

  const openBtn = document.getElementById("openTaxCalc");
  const modal = document.getElementById("taxModal");
  const backdrop = document.getElementById("taxBackdrop");
  const closeX = document.getElementById("closeTaxCalc");
  const closeBtn = document.getElementById("modalCloseBtn");

  const salaryEl = document.getElementById("basicSalary");
  const entryEl = document.getElementById("entryDate");
  const resultBox = document.getElementById("resultBox");
  const resetBtn = document.getElementById("resetBtn");

  function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    render(); // initial render
  }

  function hideModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", showModal);
  backdrop.addEventListener("click", hideModal);
  closeX.addEventListener("click", hideModal);
  closeBtn.addEventListener("click", hideModal);

  resetBtn.addEventListener("click", () => {
    salaryEl.value = "";
    entryEl.value = "";
    resultBox.innerHTML = '<p class="text-sm text-slate-600">Enter values to see the estimate.</p>';
  });

  salaryEl.addEventListener("input", render);
  entryEl.addEventListener("input", render);

  function parseISODate(value) {
    if (!value) return null;
    const parts = value.split("-");
    if (parts.length !== 3) return null;
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt;
  }

  function startOfMonth(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), 1);
  }

  function monthsInclusive(fromMonthStart, toMonthStart) {
    const y1 = fromMonthStart.getFullYear();
    const m1 = fromMonthStart.getMonth();
    const y2 = toMonthStart.getFullYear();
    const m2 = toMonthStart.getMonth();
    const diff = (y2 - y1) * 12 + (m2 - m1) + 1;
    return Math.max(0, diff);
  }

  function fmtMoneyAED(n) {
    // Keep it simple + consistent. If you prefer Arabic locale formatting, change "en-AE".
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 2,
    }).format(n);
  }

  function fmtMonthYear(dt) {
    return new Intl.DateTimeFormat("en-AE", { month: "short", year: "numeric" }).format(dt);
  }

  function computeTax(basicSalary, entryDate) {
    const salary = Number(basicSalary);

    if (!Number.isFinite(salary) || salary <= 0) {
      return { ok: false, error: "Please enter a valid basic salary." };
    }
    if (!entryDate) {
      return { ok: false, error: "Please select an entry date." };
    }

    // Start: max(entryDate, Oct 2023), month-start
    let start = entryDate < CHARGE_START ? CHARGE_START : entryDate;
    start = startOfMonth(start);

    // End:
    // - If entry date before Oct 2023 => Sep 2024
    // - Else => Sep same year if entry month <= Sep, else Sep next year
    const entryY = entryDate.getFullYear();
    const entryMonth = entryDate.getMonth() + 1; // 1..12
    let endYear;

    if (entryDate < CHARGE_START) {
      endYear = 2024;
    } else {
      endYear = entryMonth <= 9 ? entryY : entryY + 1;
    }

    const endMonthStart = new Date(endYear, 8, 1); // Sep 1
    const endDate = new Date(endYear, 8, 30); // Sep 30 (display)

    // If start after end month => 0 months
    if (start > endMonthStart) {
      return {
        ok: true,
        start,
        endDate,
        months: 0,
        monthlyCharge: salary * 0.02,
        total: 0,
        note: "Entry date is after the charging period end (September).",
      };
    }

    const months = monthsInclusive(start, endMonthStart);
    const monthlyCharge = salary * 0.02;
    const total = monthlyCharge * months;

    return { ok: true, start, endDate, months, monthlyCharge, total };
  }

  function render() {
    const entryDate = parseISODate(entryEl.value);
    const res = computeTax(salaryEl.value, entryDate);

    if (!salaryEl.value && !entryEl.value) {
      resultBox.innerHTML = '<p class="text-sm text-slate-600">Enter values to see the estimate.</p>';
      return;
    }

    if (!res.ok) {
      resultBox.innerHTML = `<p class="text-sm text-red-600">${res.error}</p>`;
      return;
    }

    resultBox.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-slate-600">Charging period</span>
          <span class="font-medium text-slate-900">${fmtMonthYear(res.start)} → ${fmtMonthYear(res.endDate)}</span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-slate-600">Months charged (inclusive)</span>
          <span class="font-medium text-slate-900">${res.months}</span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-slate-600">Monthly charge (2%)</span>
          <span class="font-medium text-slate-900">${fmtMoneyAED(res.monthlyCharge)}</span>
        </div>

        <div class="h-px w-full bg-slate-200"></div>

        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-slate-700">Estimated total</span>
          <span class="text-lg font-semibold text-slate-900">${fmtMoneyAED(res.total)}</span>
        </div>

        ${res.note ? `<p class="text-xs text-slate-500">${res.note}</p>` : ""}
      </div>
    `;
  }

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) hideModal();
  });