/*gsap.registerPlugin(ScrollTrigger)

const heroOne = document.querySelector(".heroTextOne");
const heroTwo = document.querySelector(".heroTextTwo");
const heroThree = document.querySelector(".heroTextThree");

gsap.to(heroOne, {
    xPercent : 300,
    duration : 2,
    scrollTrigger : {
        trigger : heroOne,
        toggleActions : "play none none reverse",
        start : "top 30%",
        end : "bottom 20%",
        markers : true,
        scrub : 1,
       // pin : true,
    }
})*/
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    pin: true
  }
});


  tl.to('.first', { opacity: 1, duration: 1 })
  .to('.first', { opacity: 0, duration: 1 })
  .to('.second', { opacity: 1, duration: 1 })
  .to('.second', { opacity: 0, duration: 1 })
  .to('.third', { opacity: 1, duration: 1 });
