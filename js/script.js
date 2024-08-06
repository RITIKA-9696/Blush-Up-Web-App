let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
}

document.querySelector('#close-navbar').onclick = () =>{
  navbar.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
};

window.onscroll = () =>{
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev(){
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
};


// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
  // Initialize Swiper
  const swiper = new Swiper(".products-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      550: {
        slidesPerView: 2,
      },
      850: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});

    const products = [
      {
        discount: "-25%",
        imgSrc: "images/product-5.jpg",
        alt: "Product 5",
        name: "compact powder",
        price: "$49.99",
        oldPrice: "$79.99",
        stars: 4.5
      },
      {
        discount: "-25%",
        imgSrc: "images/product-6.jpg",
        alt: "Product 6",
        name: "scrub",
        price: "$49.99",
        oldPrice: "$79.99",
        stars: 4.5
      },
      {
        discount: "-25%",
        imgSrc: "images/product-7.jpg",
        alt: "Product 7",
        name: "face cream",
        price: "$49.99",
        oldPrice: "$79.99",
        stars: 4.5
      },
      {
        discount: "-25%",
        imgSrc: "images/product-8.jpg",
        alt: "Product 8",
        name: "sun cream",
        price: "$49.99",
        oldPrice: "$79.99",
        stars: 4.5
      }
    ];

    const swiperWrapper = document.getElementById('swiper-wrapper');

    products.forEach(product => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide', 'slide');

      const stars = Array.from({ length: 5 }, (_, i) => {
        const star = document.createElement('i');
        star.classList.add('fas', i < Math.floor(product.stars) ? 'fa-star' : (product.stars % 1 > 0 && i === Math.floor(product.stars)) ? 'fa-star-half-alt' : 'fa-star');
        return star;
      });

      slide.innerHTML = `
        <div class="image">
          <span class="discount">${product.discount}</span>
          <img src="${product.imgSrc}" alt="${product.alt}" />
          <div class="icons">
            <a href="#" class="fas fa-shopping-cart"></a>
            <a href="#" class="fas fa-heart"></a>
          </div>
        </div>
        <div class="content">
          <div class="stars">
            ${stars.map(star => star.outerHTML).join('')}
          </div>
          <p>${product.name}</p>
          <div class="price">${product.price} <span>${product.oldPrice}</span></div>
        </div>
      `;

      swiperWrapper.appendChild(slide);
    });

       // Initialize Swiper
       new Swiper(".products-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          550: {
            slidesPerView: 2,
          },
          850: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      });

      
    
