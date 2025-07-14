gsap.registerPlugin(ScrollTrigger);

gsap.to(".parallax-bg", {
  y: "-25%", // moves background image up
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});
