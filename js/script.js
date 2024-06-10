// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () =>  {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
})

// NAVIGATION HANDLING
document.addEventListener('DOMContentLoaded', () => {
   const navbarLinks = document.querySelectorAll('.navbar a')

   navbarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
         e.preventDefault();
         const targetId = e.target.getAttribute('data-scroll')
         const targetElement = document.getElementById(targetId)

         if (targetElement) {
            window.scrollTo({
               top: targetElement.offsetTop,
               behavior: 'smooth'
            })
         }
      })
   })
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
            if (link.getAttribute('data-scroll') === id) {
               link.classList.add('active')
            }
         })
      }
   })
})


/* PROJECT FILTER BUTTONS */
document.addEventListener('DOMContentLoaded', () => {
   const filterButtons = document.querySelectorAll('.filter-btn')
   const projectContainers = document.querySelectorAll('.projects-box-container')

   filterButtons.forEach(button => {
      button.addEventListener('click', () => {
         const tag = button.getAttribute('data-tag')

         // update active class for button
         filterButtons.forEach( btn => {
            btn.classList.remove('active');
         })
         button.classList.add('active')

         projectContainers.forEach(container => {
            const tags = container.querySelectorAll('.tag')
            let match = tag === 'all'

            tags.forEach(projectTag => {
               if (projectTag.textContent === tag) {
                  match = true;
               }
            })

            if (match) {
               container.style.display = 'flex'
            } else {
               container.style.display = 'none'
            }
         })
      })
   })
})


/* CONTACT ME TO GOOGLE SHEET */
const scriptURL = 'https://script.google.com/macros/s/AKfycbzoRiz0y0hXmu4EGAA3zh2Pwzf4kTT8Mq76piK_i95Z23VqdrmItX_EITZPQFP9esgQpQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg-status")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML = "Message sent!"
      setTimeout(function(){
         msg.innerHTML = ""
      },5000)
      form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})


/* PNG click play GIF */
document.addEventListener('DOMContentLoaded', function () {
   const gifImage = document.getElementById('gifImage')
   const gifSrc = 'images/020.gif';
   const staticSrc = 'images/1.png';
   const endSrc = 'images/2.png';
   const gifDuration = 1600;

   gifImage.addEventListener('click', function () {
      if (gifImage.src.includes(staticSrc)) {
         gifImage.src = gifSrc;
         setTimeout(function () {
            gifImage.src = endSrc;
         }, gifDuration)
      }
   })
})


// typed JS
var typed = new Typed('#multiple-text', {
   strings: ['Developer', 'Student', 'Programmer', 'Creator', 'Problem-solver'],
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
ScrollReveal().reveal('.projects-box-container', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .projects h2', { origin: 'left' });