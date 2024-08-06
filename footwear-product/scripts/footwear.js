let bagItems;
let wishlistItems;

onLoad();

function onLoad(){
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  
  let wishlistItemsStr = localStorage.getItem('wishlistItems');
  wishlistItems = wishlistItemsStr ? JSON.parse(wishlistItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
  displayWishlistIcon();
}

function addToBag(itemId){
 bagItems.push(itemId);
 localStorage.setItem('bagItems',JSON.stringify(bagItems));
 displayBagIcon();
}

function displayBagIcon(){
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if(bagItems.length > 0){
   bagItemCountElement.style.visibility = 'visible';
   bagItemCountElement.innerText = bagItems.length;
  } else{
   bagItemCountElement.style.visibility = 'hidden';
  }
}

function addtoWishlist(itemId){
  wishlistItems.push(itemId);
  localStorage.setItem('wishlistItems',JSON.stringify(wishlistItems));
  displayWishlistIcon();
}

function displayWishlistIcon(){
  let wishlistItemCountElement = document.querySelector('.wishlist-item-count');
  if(wishlistItems.length > 0){
    wishlistItemCountElement.style.visibility = 'visible';
    wishlistItemCountElement.innerText = wishlistItems.length;
  }else{
    wishlistItemCountElement.style.visibility = 'hidden';
  }
 }

function displayItemsOnHomePage(){
  let itemsContainerElement = document.querySelector('.items-container');
  if(!itemsContainerElement){
    return;
  }
let innerHtml = '';
f_items.forEach(item => {
  innerHtml += `
  <div class="item-container">
            <img class="item-image"
            src="${item.item_image}" alt="item image">
            <div class="rating">
              ${item.rating.stars} ⭐ | ${item.rating.noOfReviews}k
            </div>
            <div class="comapny-name">${item.company_name}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
              <span class="current-price">Rs ${item.current_price}</span>
              <span class="Original-price">Rs ${item.original_price}</span>
              <span class="Discount-price">(${item.discount}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick = "addToBag(${item.id})">Add to Bag</button>
            <button class="btn-wishlist" onclick = "addtoWishlist(${item.id})">Wishlist</button>
          </div>`;
          
});
itemsContainerElement.innerHTML = innerHtml;

}

