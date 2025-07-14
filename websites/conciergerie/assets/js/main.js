/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

// scroll navbar


let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
   const navbar = document.getElementById('navbar');

   if(window.scrollY > lastScrollY){
      //down
      navbar.classList.add('hide');
   }
   else{
      //up
      navbar.classList.remove('hide');
   }
   lastScrollY = window.scrollY;

});

//fade in

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // optional: remove observer after trigger
        }
      });
    },
    {
      threshold: 0.1 // 10% of element must be visible to trigger
    }
  );

  document.querySelectorAll(".fade-inY").forEach(el => {
    observer.observe(el);
  });
    document.querySelectorAll(".fade-inX").forEach(el => {
    observer.observe(el);
  });
  moveHighlightToActive();
  gsap.registerPlugin(ScrollTrigger,SplitText)

});

 function initParallax() {
  // kill old triggers to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
/*
  gsap.to(".parallax-bg", {
    yPercent: -25,
    ease: "none",
    scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1, // <-- smoothing: try values between 0.5 and 2
    }
  });
  */
  document.querySelectorAll('.parallax-section').forEach(section => {
    const bg = section.querySelector('.parallax-bg');

    gsap.to(bg, {
      yPercent: -25,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });
  /*
 SplitText.create(".hero-text", {
  type: "words, chars",
  reduceWhiteSpace: false, 
  onSplit(self) { // runs every time it splits
    gsap.from(self.chars, {
      duration: 1, 
      y: 100, 
      autoAlpha: 0, 
      stagger: 0.05
     
    });
  }
});
*/
const lines = gsap.utils.toArray(".hero-text .line");
lines.forEach(line => {
  let split = new SplitText(line, { type: "chars" });
  gsap.from(split.chars, {
    duration: 1, 
      y: 100, 
      autoAlpha: 0, 
      stagger: 0.05
  });
});

}




window.addEventListener('load', () => {
  setTimeout(moveHighlightToActive(), 50);
});

//function animation

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // optional
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  document.querySelectorAll(".fade-inY").forEach(el => observer.observe(el));
  document.querySelectorAll(".fade-inX").forEach(el => observer.observe(el));
}

function content(page, push = true) {
  const loader = document.getElementById('loader');
  const pageDiv = document.getElementById('page');

 // loader.style.display = 'block';
updateActiveLink(page);
  // STEP 1: Fade out
  pageDiv.style.opacity = '0';

  // STEP 2: Wait for fade-out before loading new content
  setTimeout(() => {
    fetch(`${page}.html`)
      .then(response => {
        if (!response.ok) throw new Error("404");
        return response.text();
      })
      .then(data => {
        pageDiv.innerHTML = data;

        // Trigger fade-in
        requestAnimationFrame(() => {
          pageDiv.style.opacity = '1';
        });

        initScrollAnimations();
        initParallax();
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (push) {
          history.pushState({ page }, "", `?page=${page}`);
        }
      })
      .catch(error => {
        pageDiv.innerHTML = "<h2>Page not found (404)</h2>";
        pageDiv.style.opacity = '1';
      })
      .finally(() => {
        if (page === 'villas'){
          vignets();
        }
      //  loader.style.display = 'none';
      // sleep(500).then(() => { loader.style.display = 'none'; });
       setTimeout(() => {  navMenu.classList.remove('show-menu'); }, 300);
      });
  }, 500); // Match your fade-out transition time
 // navMenu.classList.remove('show-menu');
}


// function to read url

function getPageFromURL() {
   const params = new URLSearchParams(window.location.search);
  return params.get("page") || "home";
}

    document.addEventListener("DOMContentLoaded", () => {
      const pageToLoad = getPageFromURL();
      content(pageToLoad);
      moveHighlightToActive();
    });

window.addEventListener("popstate", event => {
  const page = event.state?.page || getPageFromURL();
  content(page, false); // don't push again!
});

// active link

function updateActiveLink(page) {
  const links = document.querySelectorAll('#menu a');
  links.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });

  moveHighlightToActive();
}


function moveHighlightToActive() {
  const highlight = document.getElementById('highlight');
  const activeLink = document.querySelector('.nav__link.active');

  if (!highlight || !activeLink) return;

  const linkRect = activeLink.getBoundingClientRect();
  const parentRect = activeLink.parentElement.offsetParent.getBoundingClientRect();

  const isMobile = window.innerWidth < 768; // You can adjust this breakpoint

  if (isMobile) {
    highlight.style.width = `100%`;
    highlight.style.height = `${linkRect.height}px`;
    highlight.style.transform = `translateY(${linkRect.top - parentRect.top}px)`;
  } else {
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.height = `100%`;
    highlight.style.transform = `translateX(${linkRect.left - parentRect.left}px)`;
  }
}


// prefetch

document.querySelectorAll("nav a").forEach(link => {
  const page = link.getAttribute("data-page");
  link.addEventListener("mouseover", () => {
    fetch(`${page}.html`).catch(() => {}); // silently warm up cache
  });
});

// villas

function vignets(){
  fetch('villas.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('vignette-container');

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vignette';




      card.innerHTML = `
      <div class="card js-card">
    <div class="card__content">
      <button class="card__close js-close-button">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="card__header">
        <img
          class="card__user-image js-animatable"
          src="${item.image}"
          alt=""
        />
        <div class="card__user-info">
          <h2 class="card__title js-animatable">${item.title}</h2>
          <div class="card__subtitle js-animatable">
            ${item.description}
          </div>
          <ul class="card__user-links js-animatable">
            <li class="card__user-link">
              <a href="https://tahazsh.com" alt="Blog">
                
              </a>
            </li>
            <li class="card__user-link">
              <a href="https://twitter.com/tahazsh" alt="Twitter">
               </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="card__bio js-animatable">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
        iusto. Sed, hic corrupti autem atque provident debitis ex modi
        facilis iusto mollitia nam maxime sit eos vitae illo nisi eligendi
        animi reiciendis laborum odit in aperiam natus! Voluptatibus
        perferendis doloribus tenetur veritatis numquam natus, iste, eaque
        dicta, magni aspernatur sunt corrupti consequatur? Porro tempora
        veritatis vitae maxime dolor, facilis quidem quae ipsam voluptatibus
        doloribus eius eum temporibus assumenda deleniti nulla minus quos
        possimus magnam adipisci dignissimos sapiente consequatur
        recusandae. Quaerat saepe adipisci, nihil, quae necessitatibus dicta
        assumenda labore blanditiis fugit similique ipsum quod culpa
        distinctio dolore ex quasi odio veritatis.
      </div>

      <div class="card__images js-animatable">
        <img
          class="card__image"
          src="assets/images/Gmail/1000010460.png"
          alt=""
        />
        <img
          class="card__image"
          src="assets/images/Gmail/1000010460.png"
          alt=""
        />
        <img
          class="card__image"
          src="assets/images/Gmail/1000010460.png"
          alt=""
        />
        <img
          class="card__image"
          src="assets/images/Gmail/1000010460.png"
          alt=""
        />
        <img
          class="card__image"
          src="assets/images/Gmail/1000010460.png"
          alt=""
        />
        <img
          class="card__image"
          src="assets/images/Gmail/1000010460.png"
          alt=""
        />
      </div>
    </div>
  </div>
      `;





      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });

}

window.addEventListener('resize', () => {
  moveHighlightToActive();
});





