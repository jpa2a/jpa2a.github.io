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







