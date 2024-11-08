//NAVIGATION MENU

const menuBtn = document.querySelector(".menu_btn");
const navMenu = document.querySelector("nav");
const backdrop = document.querySelector(".backdrop");


menuBtn.addEventListener("click", () => {
    const icon = document.querySelector(".menu_btn img");
    menuBtn.classList.toggle("open");
    navMenu.classList.toggle("open");
    backdrop.classList.toggle("open");

    if (menuBtn.classList.contains("open")) {
        icon.src = "assets/images/icon-close.svg";
    } else {
        icon.src = "assets/images/icon-menu.svg";
    }
});


//MOBILE SILDES

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click" , () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if(newIndex < 0) newIndex = slides.children.length - 1
        if(newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

//DESKTOP GALLERY

const mainImages = document.querySelectorAll('.desktop_gallery .main_img img');
const thumbnails = document.querySelectorAll('.gallery .preview_img div');
const lightboxMainImages = document.querySelectorAll('.lightbox .main_img img');
const lightboxThumbnails = document.querySelectorAll('.lightbox .preview_img div');

let currentIndex = 0;

const changeImage = (index, mainImages, thumbnails) => {
    mainImages.forEach((img) => {
        img.classList.remove("active");
    });

    thumbnails.forEach((thumb) => {
        thumb.classList.remove("active");
    });

    mainImages[index].classList.add("active")
    thumbnails[index].classList.add("active")
    currentIndex = index;
}

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        changeImage(index, mainImages, thumbnails)
    });
});

//LIGHTBOX

const lightbox = document.querySelector('.lightbox');
const iconClose = document.querySelector('.lightbox_close');
const iconPrev = document.querySelector('.prev');
const iconNext = document.querySelector('.next');

mainImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        changeImage(index, lightboxMainImages, lightboxThumbnails)
    })
})

lightboxThumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        changeImage(index, lightboxMainImages, lightboxThumbnails)
    });
});

iconPrev.addEventListener('click', () => {
    if (currentIndex <= 0) {
        changeImage(mainImages.length -1, lightboxMainImages, lightboxThumbnails)
    } else {
        changeImage(currentIndex - 1, lightboxMainImages, lightboxThumbnails)
    }
});

iconNext.addEventListener('click', () => {
    if (currentIndex >= mainImages.length - 1) {
        changeImage(0, lightboxMainImages, lightboxThumbnails)
    } else {
        changeImage(currentIndex + 1, lightboxMainImages, lightboxThumbnails)
    }
});


iconClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
});
