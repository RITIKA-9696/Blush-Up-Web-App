let fragranceBagItems;
let fragranceWishlistItems;

onLoad();

function onLoad(){
  let fragranceBagItemsStr = localStorage.getItem('fragranceBagItems');
  fragranceBagItems = fragranceBagItemsStr ? JSON.parse(fragranceBagItemsStr) : [];

  let fragranceWishlistItemsStr = localStorage.getItem('fragranceWishlistItems');
  fragranceWishlistItems = fragranceWishlistItemsStr ? JSON.parse(fragranceWishlistItemsStr) : [];
  
  displayFragranceItemsOnHomePage();
  displayFragranceBagIcon();
  displayFragranceWishlistIcon();
}

function addBag(productId){
  fragranceBagItems.push(productId);
  localStorage.setItem('fragranceBagItems', JSON.stringify(fragranceBagItems));
  displayFragranceBagIcon();
}

function displayFragranceBagIcon(){
  let fragranceBagCountElement = document.querySelector('.bag-item-count');
  if(fragranceBagItems.length > 0){
    fragranceBagCountElement.style.visibility = 'visible';
    fragranceBagCountElement.innerText = fragranceBagItems.length;
  }else{
    fragranceBagCountElement.style.visibility = 'hidden';
  }
}

function addWishlist(productId){
  fragranceWishlistItems.push(productId);
  localStorage.setItem('fragranceWishlistItems', JSON.stringify(fragranceWishlistItems));
  displayFragranceWishlistIcon();
}

function displayFragranceWishlistIcon(){
  let fragranceWishlistCountElement = document.querySelector('.wishlist-item-count');
  if(fragranceBagItems.length > 0){
    fragranceWishlistCountElement.style.visibility = 'visible';
    fragranceWishlistCountElement.innerText = fragranceWishlistItems.length;
  }else{
    fragranceWishlistCountElement.style.visibility = 'hidden';
  }
}

function displayFragranceItemsOnHomePage(){
  let fragranceItemsContainerElement = document.querySelector('.fragrance-items-container');
  if(!fragranceItemsContainerElement){
    return;
  }
  let innerHtml = '';
  frag_items.forEach(product => {
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
  fragranceItemsContainerElement.innerHTML = innerHtml;
}