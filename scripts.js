//Gallery functionality

//get ordered array of gallery images
let imgs = Array.from(document.querySelectorAll(".gallery-img"));
let gallery = document.querySelector(".community__gallery");


//arrow buttons and number of current image
let currentSliderId = document.getElementById("currentImg");
const sliderButtonFwd = document.querySelector(".forward");
const sliderButtonBack = document.querySelector(".back");


//width vars for 1 slide movement
let imgWidth, galleryWidth, gapBetweenImages;

//index for current image
let clickIndex = 0;

const resetGallery = () => {
 
  clickIndex=0;
  currentSliderId.innerHTML = 1;
  imgs.forEach(img=> {
    img.style.transform = "unset";
    });
  imgs[0].classList.remove("gallery-passive");
}

const calcWIdth = () => {
  imgWidth = imgs[0].offsetWidth+1;
  galleryWidth = gallery.offsetWidth;
  gapBetweenImages = (galleryWidth - (imgWidth*imgs.length))/(imgs.length-1);
}

const moveImgs = () => {
  calcWIdth();
  imgs.forEach(img=> {
    if(!img.style.transform) {img.style.transform=0}; //fist time click or after reset, since otherwise null
    const moveBy = -img.style.transform.match(/\d+/)-(imgWidth+gapBetweenImages);
    img.style.transform=`translateX(${moveBy}px)`;
  });
  imgs[clickIndex].classList.remove("gallery-passive");
  imgs[clickIndex-1].classList.add("gallery-passive");
  currentSliderId.innerHTML = clickIndex+1;
}

const moveImgsBack = ()=> {
  calcWIdth();
  imgs.forEach(img=> {
    if(!img.style.transform) {img.style.transform=0}; //fist time click or after reset, since otherwise null
    const moveBy = -img.style.transform.match(/\d+/)+(imgWidth+gapBetweenImages);
    img.style.transform=`translateX(${moveBy}px)`;
  });
  imgs[clickIndex].classList.add("gallery-passive");
  imgs[clickIndex-1].classList.remove("gallery-passive");

  currentSliderId.innerHTML = clickIndex;
  clickIndex--;
}

const resetGalleryToEndOf = () => {
  calcWIdth();
  currentSliderId.innerHTML = imgs.length;
  clickIndex=imgs.length-1;

  imgs.forEach(img=> {
    if(!img.style.transform) {img.style.transform=0}; //fist time click or after reset, since otherwise null
    const moveBy = (imgWidth+gapBetweenImages)*(imgs.length-1);
    img.style.transform=`translateX(${-moveBy}px)`;
  });
  imgs[0].classList.add("gallery-passive");
  imgs[clickIndex].classList.remove("gallery-passive");
}

sliderButtonFwd.addEventListener("click", () => {
  clickIndex=clickIndex+1;
  if (clickIndex>imgs.length-1) {
    resetGallery();
    return;
  } 
  else {
    moveImgs();
  }
})


sliderButtonBack.addEventListener("click", () => {

  if (currentSliderId.innerHTML==1) {
   resetGalleryToEndOf();
  } 
  else {
    moveImgsBack(); 
  }
})

window.addEventListener('resize', ()=>{
  resetGallery();
});
  

function show(className) {
  var shows = document.querySelectorAll(className);
  for (var i = 0; i < shows.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = shows[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      shows[i].classList.add("active");
    } else {
      shows[i].classList.remove("active");
    }
  }
}

const showFromBottom = () => { show(".show") };
const showToLeft = () => { show(".showToLeft") };
const showToRight = () => { show(".showToRight") };

window.addEventListener("scroll", showFromBottom);
window.addEventListener("scroll", showToLeft);
window.addEventListener("scroll", showToRight);

const showOnScroll = () => {
  showFromBottom();
  showToLeft();
  showToRight();
}

showOnScroll(); 
