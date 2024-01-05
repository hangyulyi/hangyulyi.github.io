// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () =>  {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
})

// navbar active
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
   let scrollY = window.scrollY;

   sections.forEach(sec => {
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if(scrollY >= offset && scrollY < offset + height) {
         navLinks.forEach(link => {
            link.classList.remove('active');
         })
         document.querySelector('header nav a[href="#' + id +  '"]').classList.add('active');
      }
   })
})

// typed JS
var typed = new Typed('#multiple-text', {
   strings: ['Developer', 'Student', 'Enthusiast', 'Engineer', 'Explorer'],
   typeSpeed: 100,
   backSpeed: 50,
   loop: true
});

// ScrollRevealJS
ScrollReveal({
   reset: true,
   distance: '80px',
   duration: 2000
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.projects-box', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1', { origin: 'left' });