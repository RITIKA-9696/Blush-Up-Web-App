let bagBagItems;
let bagWishlistItems;

onLoad();

function onLoad(){
  let bagBagItemsStr = localStorage.getItem('bagBagItems');
  bagBagItems = bagBagItemsStr ? JSON.parse(bagBagItemsStr) : [];

  let bagWishlistItemsStr = localStorage.getItem('bagWishlistItems');
  bagWishlistItems = bagWishlistItemsStr ? JSON.parse(bagWishlistItemsStr) : [];
  displayBagItemsOnHomePage();
  displayBagBagIcon();
  displayBagWishlistIcon();
}

function addBag(itemId){
  bagBagItems.push(itemId);
  localStorage.setItem('bagBagItems', JSON.stringify(bagBagItems));
  displayBagBagIcon();
}

function displayBagBagIcon(){
  let bagBagCountElement = document.querySelector('.bag-item-count');
  if(bagBagItems.length > 0){
    bagBagCountElement.style.visibility = 'visible';
    bagBagCountElement.innerText = bagBagItems.length;
  }else{
    bagBagCountElement.style.visibility = 'hidden';
  }
}

function addWishlist(itemId){
  bagWishlistItems.push(itemId);
  localStorage.setItem('bagWishlistItems', JSON.stringify(bagWishlistItems));
  displayBagWishlistIcon();
}

function displayBagWishlistIcon(){
  let bagWishlistCountElement = document.querySelector('.wishlist-item-count');
  if(bagBagItems.length > 0){
    bagWishlistCountElement.style.visibility = 'visible';
    bagWishlistCountElement.innerText = bagWishlistItems.length;
  }else{
    bagWishlistCountElement.style.visibility = 'hidden';
  }
}



function displayBagItemsOnHomePage(){
  let bagItemsContainerElement = document.querySelector('.bags-items-container');
  if(!bagItemsContainerElement){
    return;
  }
  let innerHtml = '';
  bag_items.forEach(item => {
    innerHtml += `<div class="bag-item-container">
          <img class="bag-item-image" src="${item.image}">
          <div class="bag-rating">${item.rating.stars} ⭐ |${item.rating.noOfReviews}k</div>
          <div class="bag-company-name">${item.company_name}</div>
          <div class="bag-item-name">${item.item_name}</div>
          <div class="bag-price">
      <span class="bag-current-price">Rs ${item.current_price}</span>
      <span class="bag-original-price">Rs ${item.original_Price}</span>
      <span class="bag-discount-price">(${item.discount}% OFF)</span>
    </div>
    <button class="bag-btn-add-bag" onclick = "addBag(${item.id})">Add To Bag</button>
    <button class="bag-btn-wishlist" onclick = "addWishlist(${item.id})">Wishlist</button>
      </div>`;
  });
  bagItemsContainerElement.innerHTML = innerHtml;
}