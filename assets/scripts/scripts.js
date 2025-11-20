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

window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  /*
  const navlink = document.querySelectorAll('.nav__link');
  if (window.scrollY > 10) {
    navlink.classList.add('scrolled');
  } else {
    navlink.classList.remove('scrolled');
  }
  */
  const navlink = document.querySelectorAll('#menu a');
  navlink.forEach(navlink => {
    if (window.scrollY > 10) {
    navlink.classList.add('scrolled');
  } else {
    navlink.classList.remove('scrolled');
  }
  });


});


/* ************ GSAP ***************************** */

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

/* services */

const card = document.querySelectorAll(".services_cards")
/*
gsap.from(card, {
  xPercent : 400
})
*/


gsap.from(card, {
  xPercent : 100,
  ease: "power3.out",
  scrollTrigger : {
        trigger : card,
        duration : 2 ,
        toggleActions : "play none none none",
        start : "top 90%",
        end : "40% 80%",
     
      
       scrub : 2, 
  }
})


let split = SplitText.create(".split",{
  type: "chars, words, lines",
  wordsClass: "words++",
})

gsap.from(split.chars, {
  yPercent: "random([-100, 100])",
  rotation: "random(-30, 30)",
  ease: "back.out",
  autoAlpha: 0,
  repeat: 0,
  yoyo: true,
  stagger: {
    amount: 0.5,
    from: "random",
  }
})



/* TESSSSSSSSSST
*/

// Split the text into lines and words (or chars)
let split2 = new SplitText(".split2", {
  type: "lines, words"
});

// Optionally, wrap lines in another SplitText for animation convenience
let splitParent = new SplitText(".split2", { type: "lines" });

// Animate words or lines on scroll
gsap.from(split2.words, {
  scrollTrigger: {
    trigger: ".split2",
    start: "top 80%",   // when the top of the element hits 80% of the viewport
    end: "bottom 60%",
    scrub: 1,           // makes it scroll-linked
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 50,
  stagger: 0.05,
  ease: "power2.out",
  duration: 1
});

/* contact */

const contact = document.querySelectorAll(".formu")
/*
gsap.from(card, {
  xPercent : 400
})
*/


gsap.from(contact, {
  xPercent : 100,
  
  scale: 1.5,
  ease: "power3.out",
  scrollTrigger : {
        trigger : contact,
        duration : 2 ,
        toggleActions : "play none none none",
        start : "top 90%",
        end : "40% 80%",
     
      
       scrub : 2, 
  }
})
/*

const band = document.querySelectorAll(".bandeau")

gsap.from(band, {
  xPercent : 100,
  ease: "power2.out",
  duration: 3,
    repeat: 0,
  yoyo: true,

})*/
/*
gsap.from(".bandeau svg", { y: 100, opacity: 0, duration: 1 });

*/
/*
gsap.from(".bandeau svg", {
  xPercent: 100,
  opacity: 0,
  duration: 3,
  ease: "power2.out"
});

gsap.from(".bandeau", {
  x: 500, // absolute pixel movement
  duration: 3,
  ease: "power2.out"
});
*/
const band2 = document.querySelector(".bandeau svg"); // target the SVG

gsap.from(band2, {
  xPercent: -50,
  duration: 8,
  repeat: 1000,
  yoyo: true,
  ease: "power2.out",
});
/*
gsap.to(band2, {
  xPercent: 0,
  duration: 8,
  repeat: 1000,
  yoyo: true
});
*/
/*
gsap.to(".bandeau", {
  backgroundColor: "#000",
  onUpdate() {
    const bg = getComputedStyle(document.querySelector(".bandeau")).backgroundColor;
    const lum = getLuminance(bg);
    gsap.to(".bandeau svg", { stroke: lum > 0.5 ? "#000" : "#fff", duration: 0.3 });
  }
});
*/
/*
function getLuminance(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  // sRGB to linear
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  // relative luminance
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

document.querySelectorAll(".bandeau").forEach(band => {
  const bg = getComputedStyle(band).backgroundColor;
  const lum = getLuminance(bg);
  const svg = band.querySelector("svg");
  // choose black or white based on brightness
  svg.style.stroke = lum > 0.5 ? "#000" : "#fff";
});

*/


function luminanceFromRGBString(rgb) {
  // rgb may be "rgb(255, 255, 255)" or "rgba(...)"
  const m = rgb.match(/\d+/g);
  if (!m) return 1;
  const [r,g,b] = m.slice(0,3).map(n => Number(n)/255);
  const a = [r,g,b].map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*a[0] + 0.7152*a[1] + 0.0722*a[2];
}

function adaptStrokeToBg(el) {
  const bg = getComputedStyle(el).backgroundColor;
  const lum = luminanceFromRGBString(bg);
  const strokeColor = lum > 0.9 ? '#f2fa08ff' : '#f8710aff';
  // either set color so stroke=currentColor works:
  el.style.color = strokeColor;
  // or directly set stroke on the svg paths:
  const svg = el.querySelector('svg');
  if (svg) svg.querySelectorAll('*').forEach(node => node.style.stroke = strokeColor);
}

// usage:
document.querySelectorAll('.bandeau').forEach(adaptStrokeToBg);


/* lenis */

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


const cache = document.querySelectorAll(".ssections_0")

gsap.to(cache, {
  xPercent : 80,
  ease: "power2.out",
  duration: 5,
    repeat: 0,
  yoyo: true,

})


/* logo */
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".content",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

/* LOGO FADE-IN + VERTICAL PARALLAX + SMALL DELAY */
tl.to(".background-logo", {
  opacity: 0.26,
  y: -28,            // elegant vertical parallax
  scale: 1.06,
  ease: "sine.out",
  duration: 1
}, 0.08)              // fade delay

/* GLOW EXPANSION — deeper and smoother */
.to(".logo-glow", {
  opacity: 0.8,
  scale: 2.7,
  ease: "sine.out",
  duration: 1
}, 0)

/* VIGNETTE FADE-IN (clean, premium) */
.to(".vignette", {
  opacity: 0.45,
  duration: 1,
  ease: "sine.out"
}, 0.2)

/* Elegant dark-warm background evolution */
.to("body", {
  backgroundColor: "#090503",
}, 0.25)
.to("body", {
  backgroundColor: "#130a06",
}, 0.5)
.to("body", {
  backgroundColor: "#1c0f08",
}, 0.75);