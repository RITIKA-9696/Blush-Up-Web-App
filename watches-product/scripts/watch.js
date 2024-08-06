let watchBagItems;
let watchWishlistItems;

onLoad();

function onLoad(){
  let watchBagItemsStr = localStorage.getItem('watchBagItems');
  watchBagItems = watchBagItemsStr ? JSON.parse(watchBagItemsStr) : [];

  let watchWishlistItemsStr = localStorage.getItem('watchWishlistItems');
  watchWishlistItems = watchWishlistItemsStr ? JSON.parse(watchWishlistItemsStr) : [];

  displayWatchItemsOnHomePage();
  displayWatchBagIcon();
  displayWatchWishlistIcon();
}

function addBag(productId){
  watchBagItems.push(productId);
  localStorage.setItem('watchBagItems', JSON.stringify(watchBagItems));
  displayWatchBagIcon();
}

function displayWatchBagIcon(){
  let watchBagCountElement = document.querySelector('.bag-item-count');
  if(watchBagItems.length > 0){
    watchBagCountElement.style.visibility = 'visible';
    watchBagCountElement.innerText = watchBagItems.length;
  }else{
    watchBagCountElement.style.visibility = 'hidden';
  }
}

function addWishlist(productId){
  watchWishlistItems.push(productId);
  localStorage.setItem('watchWishlistItems', JSON.stringify(watchWishlistItems));
  displayWatchWishlistIcon();
}

function displayWatchWishlistIcon(){
  let watchWishlistCountElement = document.querySelector('.wishlist-item-count');
  if(watchBagItems.length > 0){
    watchWishlistCountElement.style.visibility = 'visible';
    watchWishlistCountElement.innerText = watchWishlistItems.length;
  }else{
    watchWishlistCountElement.style.visibility = 'hidden';
  }
}

function displayWatchItemsOnHomePage(){
  let watchItemsContainerElement = document.querySelector('.watch-items-container');
  if(!watchItemsContainerElement){
    return;
  }
  let innerHtml = '';
  watch_items.forEach(product => {
    innerHtml += `<div class="cosmetic-item-container">
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
  watchItemsContainerElement.innerHTML = innerHtml;
}