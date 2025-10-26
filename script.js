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
  }*/
  
  const navlink = document.querySelectorAll('#menu a');
  navlink.forEach(navlink => {
    if (window.scrollY > 10) {
    navlink.classList.add('scrolled');
  } else {
    navlink.classList.remove('scrolled');
  }
  });


});

