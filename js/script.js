/* ============================================================
   PORTFOLIO — script.js
   1. Loader → hero title entrance
   2. Header switch on scroll
   3. Animated SVG shapes + parallax
   4. Scroll reveals (slide-title, project cards, r-fade)
   5. Banner parallax
   6. Hamburger / mobile nav
   7. Contact form feedback
   ============================================================ */

(function () {
  "use strict";

  /* ── refs ─────────────────────────────────────────────────── */
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navOverlay = document.getElementById("navOverlay");
  const hero = document.getElementById("hero");
  const shapesWrap = document.getElementById("heroShapes");
  const heroWords = document.querySelectorAll(".hero__word");
  const bannerInner = document.querySelector(".banner__inner");

  /* ── 1. LOADER ───────────────────────────────────────────── */
  /*
    Timeline:
    0.2s  → loader name fades in  (CSS animation)
    0.4s  → progress bar fills    (CSS animation, 1.4s duration)
    ~1.9s → JS hides loader, triggers hero word entrance
  */
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("is-loading");

    // Trigger hero words after loader starts fading
    setTimeout(() => {
      heroWords.forEach((w) => w.classList.add("in"));
    }, 300);

    // Trigger card float-in slightly later
    setTimeout(() => {
      document.querySelectorAll(".flip-card").forEach((c, i) => {
        setTimeout(() => c.classList.add("card-in"), i * 120);
      });
    }, 500);
  }, 2000);

  /* ── 2. HEADER scroll switch ─────────────────────────────── */
  function syncHeader() {
    const bottom = hero ? hero.getBoundingClientRect().bottom : 0;
    header.classList.toggle("solid", bottom <= 10);
  }

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  /* ── 3. SVG SHAPES ───────────────────────────────────────── */
  function makeSVG(w, h, body) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    el.setAttribute("viewBox", `0 0 ${w} ${h}`);
    el.setAttribute("width", w);
    el.setAttribute("height", h);
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = body;
    return el;
  }

  /* 4-pointed sparkle cross */
  function sparkle(sz) {
    const c = sz / 2,
      arm = c * 0.82,
      b = c * 0.14;
    return makeSVG(
      sz,
      sz,
      `<path
      d="M${c} ${c - arm} C${c - b} ${c - b} ${c - b} ${c - b} ${c - arm} ${c}
         C${c - b} ${c + b} ${c - b} ${c + b} ${c} ${c + arm}
         C${c + b} ${c + b} ${c + b} ${c + b} ${c + arm} ${c}
         C${c + b} ${c - b} ${c + b} ${c - b} ${c} ${c - arm} Z"
      fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>`,
    );
  }

  /* Hollow circle */
  function ring(sz) {
    const r = sz / 2 - 1.5;
    return makeSVG(
      sz,
      sz,
      `<circle cx="${sz / 2}" cy="${sz / 2}" r="${r}"
      fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>`,
    );
  }

  const shapeCfg = [
    {
      fn: sparkle,
      sz: 44,
      top: "13%",
      left: "67%",
      cls: "sh-s",
      d: "9s",
      dl: "0s",
    },
    {
      fn: sparkle,
      sz: 28,
      top: "61%",
      left: "82%",
      cls: "sh-s",
      d: "12s",
      dl: "-4s",
    },
    {
      fn: sparkle,
      sz: 34,
      top: "37%",
      left: "50%",
      cls: "sh-l",
      d: "8s",
      dl: "-2s",
    },
    {
      fn: sparkle,
      sz: 20,
      top: "77%",
      left: "40%",
      cls: "sh-s",
      d: "11s",
      dl: "-6s",
    },
    {
      fn: ring,
      sz: 72,
      top: "17%",
      left: "17%",
      cls: "sh-r",
      d: "13s",
      dl: "-1s",
    },
    {
      fn: ring,
      sz: 50,
      top: "54%",
      left: "57%",
      cls: "sh-r",
      d: "15s",
      dl: "-8s",
    },
    {
      fn: ring,
      sz: 38,
      top: "79%",
      left: "71%",
      cls: "sh-r",
      d: "10s",
      dl: "-3s",
    },
    {
      fn: ring,
      sz: 26,
      top: "29%",
      left: "87%",
      cls: "sh-r",
      d: "11s",
      dl: "-5s",
    },
  ];

  shapeCfg.forEach((cfg) => {
    const el = cfg.fn(cfg.sz);
    el.classList.add(cfg.cls);
    el.style.top = cfg.top;
    el.style.left = cfg.left;
    el.style.setProperty("--d", cfg.d);
    el.style.animationDelay = cfg.dl;
    shapesWrap.appendChild(el);
  });

  /* ── 4. PARALLAX — shapes & banner ──────────────────────── */
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;

      // Hero shapes move at 30% of scroll speed (parallax depth)
      if (shapesWrap) {
        shapesWrap.style.transform = `translateY(${y * 0.3}px)`;
      }

      // Banner image moves at 20% speed (subtle depth)
      if (bannerInner) {
        const rect = bannerInner.closest(".banner").getBoundingClientRect();
        const offset = window.innerHeight / 2 - rect.top - rect.height / 2;
        bannerInner.style.transform = `translateY(${offset * 0.12}px)`;
      }

      ticking = false;
    });
    ticking = true;
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── 5. SCROLL REVEALS ───────────────────────────────────── */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        if (el.classList.contains("slide-title")) {
          el.classList.add("in");
        } else if (el.classList.contains("project-card")) {
          el.classList.add("in");
        } else if (el.classList.contains("r-fade")) {
          el.classList.add("in");
        }

        io.unobserve(el);
      });
    },
    { threshold: 0.18 },
  );

  document
    .querySelectorAll(".slide-title, .project-card, .r-fade")
    .forEach((el) => io.observe(el));

  /* ── 6. HAMBURGER / MOBILE NAV ───────────────────────────── */
  function openNav() {
    nav.classList.add("open");
    navOverlay.classList.add("active");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    nav.classList.remove("open");
    navOverlay.classList.remove("active");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () =>
    nav.classList.contains("open") ? closeNav() : openNav(),
  );
  navOverlay.addEventListener("click", closeNav);
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeNav));

  /* ── 7. CONTACT FORM ─────────────────────────────────────── */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".btn-submit");
      const orig = btn.textContent;
      btn.textContent = "SENT ✓";
      btn.style.background = "#2a7d4f";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = "";
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }
})();
