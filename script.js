// NAV – mobil menü
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// SLIDER LOGIKA
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("sliderDots");

let currentIndex = 0;
let autoTimer = null;

// pöttyök létrehozása
if (dotsContainer && slides.length) {
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("slider-dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Ugrás a ${index + 1}. diára`);
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

const dots = Array.from(document.querySelectorAll(".slider-dot"));

function updateSlides() {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function goToSlide(index) {
    if (!slides.length) return;
    currentIndex = (index + slides.length) % slides.length;
    updateSlides();
    restartAuto();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlideFn() {
    goToSlide(currentIndex - 1);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlideFn);
    nextBtn.addEventListener("click", nextSlide);
}

// automatikus váltás
function startAuto() {
    if (!slides.length) return;
    autoTimer = setInterval(nextSlide, 7000);
}

function restartAuto() {
    clearInterval(autoTimer);
    startAuto();
}

if (slides.length) {
    startAuto();
}

/* --- KALKULÁTOR --- */

const priceForm = document.getElementById("priceCalc");
const distInput = document.getElementById("distInput");
const weightInput = document.getElementById("weightInput");
const priceResult = document.getElementById("priceResult");

if (priceForm) {
    priceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const dist = Number(distInput.value || 0);
        const weight = Number(weightInput.value || 0);
        const type =
            priceForm.querySelector('input[name="ptype"]:checked')?.value;

        if (!dist || !weight || !type) {
            priceResult.textContent = "Becsült ár: – (tölts ki minden mezőt)";
            return;
        }

        let base = 1500 + dist * 40 + weight * 30;

        if (type === "fragile") base *= 1.25;
        if (type === "express") base *= 1.4;

        priceResult.textContent = `Becsült ár: ${Math.round(base)} Ft + áfa`;
    });
}

/* --- AJTÓTÓL AJTÓIG TABOK --- */

const d2dTabs = document.querySelectorAll(".d2d-tab");
const d2dPanels = document.querySelectorAll(".d2d-panel");

d2dTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");
        d2dTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        d2dPanels.forEach((panel) => {
            panel.classList.toggle("active", panel.id === `tab-${target}`);
        });
    });
});

/* --- ÉRTÉKELÉSEK SLIDER --- */

const testiTrack = document.getElementById("testiTrack");
const testiPrev = document.getElementById("testiPrev");
const testiNext = document.getElementById("testiNext");

if (testiTrack && testiPrev && testiNext) {
    const testiCards = Array.from(testiTrack.children);
    let testiIndex = 0;

    function updateTesti() {
        const cardWidth = testiCards[0].offsetWidth + 16; // kártya + rés
        testiTrack.style.transform = `translateX(-${testiIndex * cardWidth}px)`;
    }

    testiPrev.addEventListener("click", () => {
        testiIndex = Math.max(0, testiIndex - 1);
        updateTesti();
    });

    testiNext.addEventListener("click", () => {
        const maxIndex = Math.max(0, testiCards.length - 2);
        testiIndex = Math.min(maxIndex, testiIndex + 1);
        updateTesti();
    });

    window.addEventListener("resize", updateTesti);
}

/* --- GYIK / FAQ TOGGLE --- */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
        item.classList.toggle("open");
    });
});

/* --- VISSZA A TETEJÉRE GOMB --- */

const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

/* --- FOOTER ÉV --- */

const footerYearSpan = document.getElementById("footerYear");
if (footerYearSpan) {
    footerYearSpan.textContent = new Date().getFullYear();
}
