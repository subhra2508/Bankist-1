- Dom is the interface between the javascript and the browser
- 
### all the different methods for selecting a element
- document.querySelectorAll();
- document.getElementById();
- document.getElementByClassName();
- document.getElementByTagName();
\\
- document.createElement();
- innnerHTML
- getComputedStyle(ele)
- document.documentElement.style.setProperty('original','changed')
- classes , attributes , styles in javascript
```js
// Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);//we only can read the standard property.if we create a property
//for the image and try to read it ,it gives undefined

//so for this we can use getAttribute

//non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company','Bankist');
//inorder to get the absolute url
console.log(logo.getAttribute('src'));//or for link 'href'

//data attributes
console.log(logo.dataset.versionNumber)

//classes
// logo.classList.add('c')
// logo.classList.remove('c','j')
// logo.classList.toggle('c')
// logo.classList.contains('c')
```
### smooth scrolling
```js

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
```
- addEventListener()
- removeEventListener() //click,mouseenter
- page navigation
- event deligation //same as page navigation
- dom traversing
- getBoundingClientRect();
```js
//getBoundingClientRect();
//returns a object containing left,right,bottom,top,x,y,height,width.
//left - distance between left of the browser window to the left of the element we select
//right - distance between left of the browser window to the right of the element we select
//bottom - distance between top of the browser window to the bottom of the element we select
//top - distance between top of the browser window to the top of the element we select
//width is width,height is height
//x coordinates top left and top left of the select element//same as left
//y coordinates top left of the browser window and the top left of the selected element//same as top
```
- sticky navigation using getBoundingClientRect() method
- sticky navigation using intersection observer api
```js
// STICKY NAVIGATION: INTERSECTION OBSERVER API
// when the target(section1) element intersectint the view-port(root) at 10% then the callback fun 
// called no matter we are scrolling up or down.

// Basically what it mean is when the section1 come to 10% of the view port
// the callback function is called
const obsCallback = function(entries,observer){
     entries.forEach(entry => {
       console.log(entry);
     })
};

const obsOptions = {
  root:null,
  threshold:[0,0.2],
};

const observer = new IntersectionObserver(obsCallback,obsOptions);
observer.observe(section1);
```
```js
//the event is fired as soon as the html,css,script loads
document.addEventListener('DOMContentLoaded',function(e){
  console.log('built');
});

//this event fired as soon as all the images and all things loaded
window.addEventListener('load',function(e){
  console.log('page fully loaded',e);
});

//this event is fired when we close the tab "do you really want to close the tab"
window.addEventListener('beforeunload',function(e) {
   e.preventDefault();
   console.log('Do you really want to leave');
   e.returnValue = '';
})
```


