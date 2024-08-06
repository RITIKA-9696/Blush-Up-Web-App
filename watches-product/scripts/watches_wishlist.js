let watchWishlistItemObjects;
onLoad();

function onLoad(){
  loadWatchWishlistItemObjects();
  displayWatchWishlistItems();
}

function loadWatchWishlistItemObjects(){
  console.log(watchWishlistItems);
  const uniqueProductIds = [...new Set (watchWishlistItems)];
  watchWishlistItemObjects = uniqueProductIds.map(productId => {
    for (let i = 0; i < watch_items.length; i++){
      if(productId == watch_items[i].id){
        return watch_items[i];
      }
    }
  });
  console.log(watchWishlistItemObjects);
}

function displayWatchWishlistItems(){
  let containerElement = document.querySelector('.wishlist');
  let innerHTML = '';
  watchWishlistItemObjects.forEach(watchWishlistItem => {
    innerHTML += generateItemHTML(watchWishlistItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeBtn(productId){
  watchWishlistItems = watchWishlistItems.filter(watchBagproductId => watchBagproductId != productId);
  localStorage.setItem('watchWishlistItems', JSON.stringify(watchWishlistItems));
  loadWatchWishlistItemObjects();
  displayWatchWishlistIcon();
  displayWatchWishlistItems();
 }

 function generateItemHTML(product){
  return `<div class="wishlist-item">
    <img src="./${product.image}" alt="Item 1">
      <div class="item-details">
    <div class="company">${product.company_name}</div>
    <div class="item-name">${product.item_name}</div>
        <div class="price-container">
    <span class="current-price">Rs ${product.current_price}</span>
    <span class="original-price">Rs ${product.original_price}</span>
    <span class="discount-percentage">(${product.discount}% OFF)</span>
        </div>
      </div>
          <button class="remove-btn" onclick = "removeBtn(${product.id})">Remove</button>
          <button class="btn-add-bag" onclick = "addBag(${product.id})">Add to Bag</button>
            </div>`;
 }