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
                const response = await fetch('https://script.google.com/macros/s/AKfycbzRdwu2Nx5_cfReaZwwOjokXeZY1Rsk79I5RLsvZR9sSLo23vlyWZLM4Dy02S59Guv29A/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // Success
                formMessage.textContent = '✓ form ဖြည့်ပြီးပါပြီ၊ကျေးဇူးတင်ပါသည်။ ကျွန်ုပ်တို့ သင့်အား မကြာမီ ဆက်သွယ်ပါမည်။';
                formMessage.className = 'text-center text-sm font-medium text-green-600';
                formMessage.classList.remove('hidden');
                 e.target.reset();
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
    modalText.innerHTML = modalText.textContent.replace(/\./g, "<br>");
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

  
    /* ================= TAX CONFIG ================= */
  const taxCHARGE_START = new Date(2023, 9, 1); // Oct 1, 2023
  const taxRATE = 0.02;
  const taxCURRENCY = "AED";

  /* ================= DOM ELEMENTS ================= */
  const taxOpenBtn = document.getElementById("openTaxCalc");
  const taxModal = document.getElementById("taxModal");
  const taxBackdrop = document.getElementById("taxBackdrop");
  const taxCloseIcon = document.getElementById("closeTaxCalc");
  const taxCloseBtn = document.getElementById("modalCloseBtn");

  const taxSalaryEl = document.getElementById("basicSalary");
  const taxEntryDateEl = document.getElementById("entryDate");
  const taxResultBox = document.getElementById("resultBox");
  const taxResetBtn = document.getElementById("resetBtn");

  /* ================= MODAL CONTROLS ================= */
  function taxShowModal() {
    taxModal.classList.remove("hidden");
    taxModal.classList.add("flex");
    document.body.style.overflow = "hidden";
    taxRender();
  }

  function taxHideModal() {
    taxModal.classList.add("hidden");
    taxModal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  taxOpenBtn.addEventListener("click", taxShowModal);
  taxBackdrop.addEventListener("click", taxHideModal);
  taxCloseIcon.addEventListener("click", taxHideModal);
  taxCloseBtn.addEventListener("click", taxHideModal);

  /* ================= RESET ================= */
  taxResetBtn.addEventListener("click", () => {
    taxSalaryEl.value = "";
    taxEntryDateEl.value = "";
    taxResultBox.innerHTML =
      '<p class="text-sm text-slate-600">Enter values to see the estimate.</p>';
  });

  taxSalaryEl.addEventListener("input", taxRender);
  taxEntryDateEl.addEventListener("input", taxRender);

  /* ================= HELPERS ================= */
  function taxParseDate(value) {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }

  function taxStartOfMonth(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), 1);
  }

  function taxMonthsInclusive(start, end) {
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1
    );
  }

  function taxFmtMoney(amount) {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: taxCURRENCY,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function taxFmtMonthYear(dt) {
    return new Intl.DateTimeFormat("en-AE", {
      month: "short",
      year: "numeric",
    }).format(dt);
  }

  /* ================= CORE LOGIC ================= */
    function taxCompute(salaryValue, entryDate) {
    const salary = Number(salaryValue);

    if (!salary || salary <= 0) {
      return { ok: false, error: "Please enter a valid basic salary." };
    }

    if (!entryDate) {
      return { ok: false, error: "Please select an entry date." };
    }

    /* ---- START DATE: no earlier than Oct 2023 ---- */
    let taxStart = entryDate < taxCHARGE_START ? taxCHARGE_START : entryDate;
    taxStart = taxStartOfMonth(taxStart);

    /* ---- END DATE: based on CURRENT date (today) ---- */
    const taxToday = new Date();
    const taxCurrentYear = taxToday.getFullYear();
    const taxCurrentMonth = taxToday.getMonth() + 1; // 1..12

    // If current month is after Sep, charge through NEXT year's Sep
    const taxEndYear = taxCurrentMonth <= 9 ? taxCurrentYear : taxCurrentYear + 1;

    const taxEndMonthStart = new Date(taxEndYear, 8, 1); // Sep 1

    // If the start is after end, nothing to charge
    if (taxStart > taxEndMonthStart) {
      return {
        ok: true,
        start: taxStart,
        end: taxEndMonthStart,
        months: 0,
        monthly: salary * taxRATE,
        total: 0,
        note: "Entry date is after the charging period end (September).",
      };
    }

    const taxMonths = taxMonthsInclusive(taxStart, taxEndMonthStart);
    const taxMonthly = salary * taxRATE;
    const taxTotal = taxMonthly * taxMonths;

    return {
      ok: true,
      start: taxStart,
      end: taxEndMonthStart,
      months: taxMonths,
      monthly: taxMonthly,
      total: taxTotal,
    };
  }


  /* ================= RENDER ================= */
  function taxRender() {
    const taxEntryDate = taxParseDate(taxEntryDateEl.value);
    const result = taxCompute(taxSalaryEl.value, taxEntryDate);

    if (!taxSalaryEl.value && !taxEntryDateEl.value) {
      taxResultBox.innerHTML =
        '<p class="text-sm text-slate-600">Enter values to see the estimate.</p>';
      return;
    }

    if (!result.ok) {
      taxResultBox.innerHTML =
        `<p class="text-sm text-red-600">${result.error}</p>`;
      return;
    }

    taxResultBox.innerHTML = `
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-slate-600">Charging period</span>
          <span class="font-medium text-slate-900">
            ${taxFmtMonthYear(result.start)} → ${taxFmtMonthYear(result.end)}
          </span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-slate-600">Months charged</span>
          <span class="font-medium text-slate-900">${result.months}</span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-slate-600">Monthly charge (2%)</span>
          <span class="font-medium text-slate-900">${taxFmtMoney(result.monthly)}</span>
        </div>

        <div class="border-t border-slate-200 pt-2 flex justify-between">
          <span class="font-medium text-slate-700">Estimated total</span>
          <span class="text-lg font-semibold text-slate-900">
            ${taxFmtMoney(result.total)}
          </span>
        </div>
      </div>
    `;
  }

  /* ================= ESC CLOSE ================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !taxModal.classList.contains("hidden")) {
      taxHideModal();
    }
  });

  /* ================= WHATSAPP POPUP ================= */
  const waToggle = document.getElementById("waToggle");
  const waPopup = document.getElementById("waPopup");
  const waClose = document.getElementById("waClose");
  const waForm = document.getElementById("waForm");

  const WA_NUMBER = "971551725009"; // digits only (no +)

  function openWA() {
    waPopup.classList.remove("hidden");
  }

  function closeWA() {
    waPopup.classList.add("hidden");
  }

  waToggle.addEventListener("click", openWA);
  waClose.addEventListener("click", closeWA);

  waForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const message = this.message.value.trim();

    const text = `Hello!\nName: ${name}\nMessage: ${message}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
    this.reset();
    closeWA();
  });

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (!waPopup.contains(e.target) && !waToggle.contains(e.target)) {
      closeWA();
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWA();
  });