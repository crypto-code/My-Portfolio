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

  // Auto update functions
  async function getScholarStats(authorId) {
    try {
      const response = await fetch(`https://api.semanticscholar.org/graph/v1/author/${authorId}?fields=paperCount,citationCount`);
      if (!response.ok) throw new Error(`Semantic Scholar API Error: ${response.statusText}`);
      const data = await response.json();
      return {
        citationCount: data.citationCount ?? 0,
        paperCount: 5
      };
    } catch (error) {
      console.warn("Could not fetch Scholar stats, using fallback:", error);
      return {
        citationCount: 72,
        paperCount: 5
      };
    }
  }

  // Fetch Scholar Stats (Author ID: 2232951291 - Atin Sakkeer Hussain)
  getScholarStats("2232951291").then((data) => {
    if (!data) return;
    const papersElement = document.getElementById("scholar-papers-auto");
    const citationsElement = document.getElementById("scholar-citations-auto");
    if (papersElement) papersElement.setAttribute("data-purecounter-end", `${data.paperCount}`);
    if (citationsElement) citationsElement.setAttribute("data-purecounter-end", `${data.citationCount}`);
    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  }).catch((err) => {
    console.warn("Could not retrieve Scholar stats:", err);
  });

  async function getGitHubStats(username) {
    let url = `https://api.github.com/users/${username}/repos`;
    let totalStars = 0;
    let totalRepos = 0;
    let page = 1;

    try {
      while (url) {
        const response = await fetch(`${url}?per_page=100&page=${page}`);
        if (!response.ok) throw new Error(`GitHub API Error: ${response.statusText}`);

        const repos = await response.json();
        totalRepos += repos.length;
        totalStars += repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        // Pagination: Check if there's another page
        const linkHeader = response.headers.get("link");
        if (linkHeader && linkHeader.includes('rel="next"')) {
          page++;
        } else {
          break; // No more pages
        }
      }
      return { totalRepos, totalStars };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Example usage:
  getGitHubStats("crypto-code").then((data) => {
    if (!data) return;
    const { totalRepos, totalStars } = data;
    const repoElement = document.getElementById("github-repos-auto");
    const starElement = document.getElementById("github-stars-auto");
    if (repoElement) repoElement.setAttribute("data-purecounter-end", `${totalRepos}`);
    if (starElement) starElement.setAttribute("data-purecounter-end", `${totalStars}`);
    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  }).catch((err) => {
    console.warn("Could not retrieve GitHub stats:", err);
  });



})();