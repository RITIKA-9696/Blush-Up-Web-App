let cosmeticBagItems;
let cosmeticWishlistItems;

onLoad();

function onLoad(){
  let cosmeticBagItemsStr = localStorage.getItem('cosmeticBagItems');
  cosmeticBagItems = cosmeticBagItemsStr ? JSON.parse(cosmeticBagItemsStr) : [];

  let cosmeticWishlistItemsStr = localStorage.getItem('cosmeticWishlistItems');
  cosmeticWishlistItems = cosmeticWishlistItemsStr ? JSON.parse(cosmeticWishlistItemsStr) : [];

  displayCosmeticItemsOnHomePage();
  displayCosmeticBagIcon();
  displayCosmeticWishlistIcon();
}


function addBag(productId){
  cosmeticBagItems.push(productId);
  localStorage.setItem('cosmeticBagItems', JSON.stringify(cosmeticBagItems));
  displayCosmeticBagIcon();
}

function displayCosmeticBagIcon(){
  let cosmeticBagCountElement = document.querySelector('.bag-item-count') ;
  if(cosmeticBagItems.length > 0){
    cosmeticBagCountElement.style.visibility = 'visible';
    cosmeticBagCountElement.innerText = cosmeticBagItems.length;
  }else{
    cosmeticBagCountElement.style.visibility = 'hidden';
  }
}

function addWishlist(productId){
  cosmeticWishlistItems.push(productId);
  localStorage.setItem('cosmeticWishlistItems', JSON.stringify(cosmeticWishlistItems));
  displayCosmeticWishlistIcon();
}

function displayCosmeticWishlistIcon(){
  let cosmeticWishlistCountElement = document.querySelector('.wishlist-item-count');
  if(cosmeticBagItems.length > 0){
    cosmeticWishlistCountElement.style.visibility = 'visible';
    cosmeticWishlistCountElement.innerText = cosmeticWishlistItems.length;
  }else{
    cosmeticWishlistCountElement.style.visibility = 'hidden';
  }
}

function displayCosmeticItemsOnHomePage(){
  let cosmeticItemsContainerElement = document.querySelector('.cosmetic-items-container');
  if(!cosmeticItemsContainerElement){
    return;
  }
  let innerHtml = '';
  cosmetic_items.forEach(product => {
     innerHtml += `
     <div class="cosmetic-item-container">
          <img class="cosmetic-item-image" src="${product.image}">
          <div class="cosmetic-rating">${product.rating.stars} ⭐ |${product.rating.noOfReviews}k</div>
          <div class="cosmetic-company-name">${product.company_name}</div>
          <div class="cosmetic-item-name">${product.item_name}</div>
          <div class="cosmetic-price">
      <span class="cosmetic-current-price">Rs ${product.current_price}</span>
      <span class="cosmetic-original-price">Rs ${product.original_Price}</span>
      <span class="cosmetic-discount-price">(${product.discount}% OFF)</span>
    </div>
    <button class="cosmetic-btn-add-bag" onclick = "addBag(${product.id})">Add To Bag</button>
    <button class="cosmetic-btn-wishlist" onclick = "addWishlist(${product.id})">Wishlist</button>
      </div>`;
  });
  cosmeticItemsContainerElement.innerHTML = innerHtml;
}

