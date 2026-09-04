/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const removePreloader = () => {
      if (!preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          if (preloader.parentNode) {
            preloader.remove();
          }
        }, 400);
      }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      removePreloader();
    } else {
      document.addEventListener('DOMContentLoaded', removePreloader);
    }
    window.addEventListener('load', removePreloader);
    // Safety fallback: ensure preloader does not block page beyond 400ms
    setTimeout(removePreloader, 400);
  }

  /**
   * Per-card image loading state (Shimmer & Spinner placeholder)
   */
  const cardContainers = document.querySelectorAll('.portfolio-content, .research-content');
  cardContainers.forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;

    const markLoaded = () => {
      img.classList.add('loaded');
      container.classList.remove('img-loading');
      container.classList.add('img-loaded');
    };

    if (img.complete && img.naturalWidth !== 0) {
      markLoaded();
    } else {
      container.classList.add('img-loading');
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', markLoaded);
    }
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aosInit);
  } else {
    aosInit();
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js with smooth continuous pacing and raw text typing (zero entity delays)
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',').map(s => s.trim());
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2200,
      startDelay: 300,
      smartBackspace: false,
      contentType: 'null',
      showCursor: true,
      cursorChar: '|'
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters with progressive image loading support
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let container = isotopeItem.querySelector('.isotope-container');

    if (!container) return;

    let initIsotope = new Isotope(container, {
      itemSelector: '.isotope-item',
      layoutMode: layout,
      filter: filter,
      sortBy: sort
    });

    if (typeof imagesLoaded !== 'undefined') {
      imagesLoaded(container).on('progress', function() {
        initIsotope.layout();
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Dynamic Stats Loader (Google Scholar Primary + Semantic Scholar & GitHub Fallback)
   */
  async function loadDynamicStats() {
    let stats = {
      citations: 339,
      papers: 5,
      githubRepos: 39,
      githubStars: 530
    };

    let loadedFromJson = false;

    // 1. Primary: Fetch synced Google Scholar & GitHub stats from assets/data/stats.json
    try {
      const resp = await fetch('assets/data/stats.json', { cache: 'no-cache' });
      if (resp.ok) {
        const json = await resp.json();
        if (json.citations) stats.citations = json.citations;
        if (json.papers) stats.papers = json.papers;
        if (json.githubRepos) stats.githubRepos = json.githubRepos;
        if (json.githubStars) stats.githubStars = json.githubStars;
        loadedFromJson = true;
      }
    } catch (e) {
      console.info("Notice: Using live API fallback for stats:", e.message);
    }

    // 2. If stats.json is not available, fetch live APIs
    if (!loadedFromJson) {
      // Fallback: Semantic Scholar API for citations
      try {
        const scholarResp = await fetch('https://api.semanticscholar.org/graph/v1/author/2232951291?fields=citationCount');
        if (scholarResp.ok) {
          const scholarData = await scholarResp.json();
          if (scholarData.citationCount) stats.citations = scholarData.citationCount;
        }
      } catch (err) {
        console.warn("Semantic Scholar fallback error:", err);
      }

      // Fallback: GitHub API for public repos and stars
      try {
        let url = 'https://api.github.com/users/crypto-code/repos?per_page=100';
        const ghResp = await fetch(url);
        if (ghResp.ok) {
          const repos = await ghResp.json();
          if (Array.isArray(repos)) {
            stats.githubRepos = repos.length;
            stats.githubStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
          }
        }
      } catch (err) {
        console.warn("GitHub API fallback error:", err);
      }
    }

    // Update DOM elements
    const papersEl = document.getElementById("scholar-papers-auto");
    const citationsEl = document.getElementById("scholar-citations-auto");
    const reposEl = document.getElementById("github-repos-auto");
    const starsEl = document.getElementById("github-stars-auto");

    if (papersEl) papersEl.setAttribute("data-purecounter-end", `${stats.papers}`);
    if (citationsEl) citationsEl.setAttribute("data-purecounter-end", `${stats.citations}`);
    if (reposEl) reposEl.setAttribute("data-purecounter-end", `${stats.githubRepos}`);
    if (starsEl) starsEl.setAttribute("data-purecounter-end", `${stats.githubStars}`);

    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  }

  loadDynamicStats();



})();