// NAV – mobil menü
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// HERO SLIDER
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("sliderDots");

let currentSlide = 0;
let slideIntervalId = null;

function renderDots() {
    if (!dotsContainer || !slides.length) return;
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "slider-dot" + (index === currentSlide ? " active" : "");
        dot.setAttribute("type", "button");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
    });
    if (dotsContainer) {
        const allDots = dotsContainer.querySelectorAll(".slider-dot");
        allDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }
}

function goToSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    updateSlides();
}

function nextSlideFn() {
    goToSlide(currentSlide + 1);
}

function prevSlideFn() {
    goToSlide(currentSlide - 1);
}

if (prevBtn) {
    prevBtn.addEventListener("click", prevSlideFn);
}
if (nextBtn) {
    nextBtn.addEventListener("click", nextSlideFn);
}

if (slides.length) {
    renderDots();
    updateSlides();
    slideIntervalId = setInterval(nextSlideFn, 7000);
}

// PRICE CALCULATOR – egyszerű becslés
const priceForm = document.getElementById("priceCalc");
if (priceForm) {
    const distInput = document.getElementById("distInput");
    const weightInput = document.getElementById("weightInput");
    const priceResult = document.getElementById("priceResult");

    priceForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const distance = distInput ? Number(distInput.value) || 0 : 0;
        const weight = weightInput ? Number(weightInput.value) || 0 : 0;

        let type = "standard";
        const typeInput = priceForm.querySelector('input[name="ptype"]:checked');
        if (typeInput) {
            type = typeInput.value;
        }

        // alapdíj és km / kg szorzók – tájékoztató jellegűek
        let base = 1290;
        let perKm = 95;
        let perKg = 40;

        if (type === "fragile") {
            base += 600;
            perKm += 20;
            perKg += 15;
        } else if (type === "express") {
            base += 900;
            perKm += 40;
            perKg += 25;
        }

        const estimated = Math.round(base + distance * perKm + weight * perKg);
        const formatted = estimated.toLocaleString("hu-HU");

        if (priceResult) {
            priceResult.textContent = `Becsült ár: ${formatted} Ft + áfa`;
        }
    });
}

// AJTÓTÓL AJTÓIG – TABOK
const tabButtons = document.querySelectorAll(".d2d-tab");
const tabPanels = document.querySelectorAll(".d2d-panel");

if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-tab");
            if (!target) return;

            tabButtons.forEach((b) => b.classList.remove("active"));
            tabPanels.forEach((panel) => panel.classList.remove("active"));

            btn.classList.add("active");
            const panelToShow = document.getElementById(`tab-${target}`);
            if (panelToShow) {
                panelToShow.classList.add("active");
            }
        });
    });
}

// ÉRTÉKELÉSEK – SLIDER
const testiTrack = document.getElementById("testiTrack");
const testiPrev = document.getElementById("testiPrev");
const testiNext = document.getElementById("testiNext");

if (testiTrack && testiPrev && testiNext) {
    const testiCards = testiTrack.querySelectorAll(".testi-card");
    let testiIndex = 0;

    function updateTestiSlider() {
        const cardWidth = testiCards[0].offsetWidth + 16; // kártya + gap
        testiTrack.style.transform = `translateX(-${testiIndex * cardWidth}px)`;
    }

    testiPrev.addEventListener("click", () => {
        testiIndex = Math.max(testiIndex - 1, 0);
        updateTestiSlider();
    });

    testiNext.addEventListener("click", () => {
        const visibleCount =
            Math.floor(testiTrack.parentElement.offsetWidth / (testiCards[0].offsetWidth + 16));
        const maxIndex = Math.max(testiCards.length - visibleCount, 0);
        testiIndex = Math.min(testiIndex + 1, maxIndex);
        updateTestiSlider();
    });

    window.addEventListener("resize", updateTestiSlider);
    updateTestiSlider();
}

// FAQ – LENYITHATÓ BLOKKOK
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
        item.classList.toggle("open");
    });
});

// VISSZA A TETEJÉRE GOMB
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

/* --- SZÁMLÁLÓ ANIMÁCIÓ – +1,254,826 db --- */

const counterElements = document.querySelectorAll("[data-counter-target]");

function animateCounter(el) {
    if (!el) return;
    if (el.dataset.counterDone === "1") return;

    const target = Number(el.dataset.counterTarget || 0);
    if (!target) return;

    el.dataset.counterDone = "1";

    const duration = 2000; // ms
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(target * progress);
        const formatted = value.toLocaleString("en-US"); // 1,254,826 formátum
        el.textContent = `+${formatted} db`;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

if (counterElements.length) {
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        counterElements.forEach((el) => observer.observe(el));
    } else {
        // nagyon régi böngészők
        counterElements.forEach((el) => animateCounter(el));
    }
}
