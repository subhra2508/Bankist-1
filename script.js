'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

 
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////////////////////////////////////////////////
//page navigation

btnScrollTo.addEventListener('click',(e) => {
  const s1coords = section1.getBoundingClientRect();//getBoundingClientRect() is responsible for the visible port only
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)',window.pageXOffset,window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //old school way
  //scrolling
  //give only scroll not smooth
  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

  //for smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //modern school way
  section1.scrollIntoView({behavior:'smooth'});
});

///////////////////////////////////////////////////////////////////
//page navigation

// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click',function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   });
// });

//1.Add event listener to common parent element
//2.determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();

  //matching strategy//Event Deligation
  if(e.target.classList.contains('nav__link')){
  
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})
// ----------------------------------------------------------------------------
//DOM TRAVERSING :
/*
const h1 = document.querySelector('h1');

//Going downwards:child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);//all things like the tags,comment,br,highlights all.
console.log(h1.children)//all the nodes that h1 have inside.
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';

//Going upwards
console.log(h1.parentNode);//direct parent
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closet h1 element which has class .header,
//after that we were changing the background 
h1.closest('h1').style.background = 'var(--gradient-primary)';

//selecting siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((el) => {
  if(el !== h1) el.style.transform = 'scale(0.5)';
});
*/

//TAB COMPONENT

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//we can use addeventlistener to listen to event but for attaching eventhandler to all the function
//slow down the page
//that's why use event deligation

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  //remove the active class content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // console.log(clicked);

  //Gaurd class
  if(!clicked) return ;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Passing arguments to event handlers/////////////////////////////////////////////////////////////////////////////
//menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

//passing an argument into an eventhandler function//////////////////////////////////////////////////////////////
nav.addEventListener('mouseover',handleHover.bind(0.5));

nav.addEventListener('mouseout',handleHover.bind(1));

// //STICKY NAVIGATION

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// //using scroll event
// window.addEventListener('scroll',() => {
//     console.log(window.scrollY);
//     if(window.scrollY > initialCoords.top){
//       nav.classList.add('sticky');
//     }
//     else{
//       nav.classList.remove('sticky');
//     }
// });

//STICKY NAVIGATION: INTERSECTION OBSERVER API////////////////////////////////////////////////////////////////
//when the target(section1) element intersectint the view-port(root) at 10% then the callback fun 
//called no matter we are scrolling up or down.

//Basically what it mean is when the section1 come to 10% of the view port
//the callback function is called
// const obsCallback = function(entries,observer){
//      entries.forEach(entry => {
//        console.log(entry);
//      })
// };

// const obsOptions = {
//   root:null,
//   threshold:[0,0.2],
// };

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

//inorder to find the rootmargin dynamically
const navHeight = nav.getBoundingClientRect().height;//getting the height of the navbar

const stickyNav = (entries) => {
  const [entry] = entries;
  if(!entry.isIntersecting)nav.classList.add('sticky');
  else
  nav.classList.remove('sticky'); 
}


const headerObserver = new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,//it creates a margin of 90px of header
});
headerObserver.observe(header);

//REVEALING ELEMENT ON SCROLL

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries,observer){
     const [entry] = entries;
     if(!entry.isIntersecting) return;
     entry.target.classList.remove('section--hidden');
     observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,     
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
   section.classList.add('section--hidden');
});

//LAZY LOADING IMAGES//////////////////////////////////////////////////////////////////////////////////////////

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) return;
  //Replace the src attributes with data-src
  else
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',() => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px',
});

imgTarget.forEach(img => {
  imgObserver.observe(img);
});

//SLIDER COMPONENT
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;


const createDots = () => {
  slides.forEach((s,i) => {
    dotContainer.insertAdjacentHTML('beforeend',`
    <button class="dots__dot" data-slide="${i}"></button>`)
  });
};
createDots();

const activateDot = (slide) => {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activateDot(0);

//0% , 100%, 200%, 300%

const goToSlide = function(slide){
  slides.forEach((s,i) => (s.style.transform = `translateX(${100*(i-slide)}%)`));
}

goToSlide(0);

const nextSlide = function(){
  if(curSlide === maxSlide-1) curSlide =0;
  else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide-1;
  }
  else{
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

//next slide
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

//keyboard event
document.addEventListener('keydown',(e) => {
  if(e.key === 'ArrowLeft')prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
})



////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

//  const allSections = document.querySelectorAll('.section');
//  console.log(allSections);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

//getElementByClassName()
//getElementById()

//creating and inserting elements
//.insertingAdjacentHTML
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

// message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';


// // Headers.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// // document.querySelector('.btn--close-cookie').addEventListener('click',()=> message.remove());

// //styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%'; 

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height = Number.parseFloat(getComputedStyle(message).height + 40 + 'px');

// document.documentElement.style.setProperty('--color-primary','orangered');

// // Attributes

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);//we only can read the standard property.if we create a property
// //for the image and try to read it ,it gives undefined

// //so for this we can use getAttribute

// //non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company','Bankist');
// //inorder to get the absolute url
// console.log(logo.getAttribute('src'));//or for link 'href'

// //data attributes
// console.log(logo.dataset.versionNumber)

//classes
// logo.classList.add('c')
// logo.classList.remove('c','j')
// logo.classList.toggle('c')
// logo.classList.contains('c')
/*
//implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',(e) => {
  const s1coords = section1.getBoundingClientRect();//getBoundingClientRect() is responsible for the visible port only
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)',window.pageXOffset,window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //old school way
  //scrolling
  //give only scroll not smooth
  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

  //for smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //modern school way
  section1.scrollIntoView({behavior:'smooth'});
});

/////////////////////////////////////////////////////////////////////////////////////////

const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',(e) => {
//   alert('addEventListener: Great! You are reading the heading :D')
// })

//old school way
// h1.onmouseenter = (e) => {
//   alert('addEventListener: Great! You are reading the heading :D');  
// }

const alertH1 = (e) => {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter',alertH1);
}
h1.addEventListener('mouseenter',alertH1);

setTimeout(() => h1.removeEventListener('mouseenter',alertH1),3000);

*/
/////////////////////////////////////////////////////////////////////////////////////------>
/*
//rgb(255,255,255)
const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

//In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever. With arrow functions the this keyword always represents the object that defined the arrow function.
document.querySelector('.nav__link').addEventListener('click',function(e) {
    this.style.backgroundColor = randomColor();
    console.log('LINK',e.target,e.currentTarget);
    //STOP PROPAGATION
    // e.stopPropagation();//stop the propagation in this function.
     
})
document.querySelector('.nav__links').addEventListener('click',function(e) {
   this.style.backgroundColor = randomColor();
   console.log('CONTAINER',e.target,e.currentTarget)
})
 document.querySelector('.nav').addEventListener('click',function(e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV',e.target,e.currentTarget)
},true);
//by defining the true this handler capturing the event moving down ,other ones listen
// to the events that goes up
*/

/////////////////////////////////////////////////////////////////////////////////////////

//the event is fired as soon as the html,css,script loads
document.addEventListener('DOMContentLoaded',function(e){
  console.log('built');
});

//this event fired as soon as all the images and all things loaded
window.addEventListener('load',function(e){
  console.log('page fully loaded',e);
});

//this event is fired when we close the tab "do you really want to close the tab"
// window.addEventListener('beforeunload',function(e) {
//    e.preventDefault();
//    console.log('Do you really want to leave');
//    e.returnValue = '';
// })

//DIFFERENT WAYS OF LOADING A JAVASCRIPT <script></script> IN HTML



 
 
