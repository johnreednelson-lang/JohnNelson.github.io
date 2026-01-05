document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO LETTER SPACING ON SCROLL ================= */

  const hero = document.getElementById("hero-title");

  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const spacing = Math.min(scrollY / 10, 60);
      const opacity = Math.max(1 - scrollY / 400, 0);

      hero.style.letterSpacing = spacing + "px";
      hero.style.opacity = opacity;
    });
  }


  /* ================= WORK GALLERY INTERSECTION ================= */

  const workGallery = document.querySelector(".work-gallery");
  const workItems = document.querySelectorAll(".work-item");

  if (workGallery && workItems.length) {
    const workObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          workItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("visible");
            }, index * 160);
          });
          workObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    workObserver.observe(workGallery);
  }


  /* ================= WORK HOVER SYNC ================= */

  const items = document.querySelectorAll(".work-item");
  const labels = document.querySelectorAll(".work-labels li");

  if (items.length && labels.length) {

    function activate(index) {
      items[index]?.classList.add("is-active");
      labels[index]?.classList.add("is-active");

      labels.forEach((label, i) => {
        if (i !== index) label.classList.add("is-dimmed");
      });
    }

    function reset(index) {
      items[index]?.classList.remove("is-active");
      labels[index]?.classList.remove("is-active");
      labels.forEach(label => label.classList.remove("is-dimmed"));
    }

    items.forEach((item, index) => {
      item.addEventListener("mouseenter", () => activate(index));
      item.addEventListener("mouseleave", () => reset(index));
    });

    labels.forEach(label => {
      const index = Number(label.dataset.index);
      if (!isNaN(index)) {
        label.addEventListener("mouseenter", () => activate(index));
        label.addEventListener("mouseleave", () => reset(index));
      }
    });
  }


  /* ================= ABOUT SECTION TRIGGER ================= */

  const aboutSection = document.getElementById("about_section");

  if (aboutSection) {
    const aboutObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("active");
        }
      });
    }, { threshold: 0.3 });

    aboutObserver.observe(aboutSection);
  }


  /* ================= PAGE TRANSITIONS + SCROLL RESTORE ================= */

const page = document.querySelector(".page");

if (page) {

  /* ---------------- ENTER ANIMATION ---------------- */
  function enterPage() {
    page.classList.remove("is-exiting-up", "is-exiting-down");
    page.classList.add("is-entering");

    // Restore scroll from history state
    const scrollY = history.state?.scrollY;
    if (scrollY !== undefined) {
      window.scrollTo(0, scrollY);
    }
  }

  window.addEventListener("load", enterPage);

  /* ---------------- SAVE SCROLL ---------------- */
  window.addEventListener("scroll", () => {
    history.replaceState({ ...history.state, scrollY: window.scrollY }, "");
  });

  /* ---------------- EXIT ANIMATION ---------------- */
  function exitPage(navigateBack = false, href = null) {
    page.classList.add(navigateBack ? "is-exiting-down" : "is-exiting-up");

    setTimeout(() => {
      if (navigateBack) {
        history.back(); // go back without reloading
      } else if (href) {
        window.location.href = href; // normal navigation
      }
    }, 600);
  }

  /* ---------------- LINK HANDLER ---------------- */
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");

    // Ignore anchors & external links
    if (!href || href.startsWith("#") || href.startsWith("http")) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      // Determine if going back to home
      const isBackHome = link.classList.contains("close-btn") || document.body.classList.contains("project-page");

      exitPage(isBackHome, !isBackHome ? href : null);
    });
  });

  /* ---------------- BACK/FORWARD BUTTON ---------------- */
  window.addEventListener("popstate", () => {
    enterPage();
  });

}



});