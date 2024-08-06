let cosmeticWishlistItemObjects;
onLoad();

function onLoad(){
  loadCosmeticWishlistItemObjects();
  displayCosmeticWishlistItems();
}

function loadCosmeticWishlistItemObjects(){
  console.log(cosmeticWishlistItems);
  const uniqueProductIds = [...new Set(cosmeticWishlistItems)];
  cosmeticWishlistItemObjects = uniqueProductIds.map(productId => {
    for (let i = 0; i < cosmetic_items.length; i++){
      if(productId == cosmetic_items[i].id){
        return cosmetic_items[i];
      }
    }
  });
  console.log(cosmeticWishlistItemObjects);
}

function displayCosmeticWishlistItems(){
  let containerElement = document.querySelector('.wishlist');
  let innerHTML = '';
  cosmeticWishlistItemObjects.forEach(cosmeticWishlistItem => {
    innerHTML += generateItemHTML(cosmeticWishlistItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeBtn(productId){
  cosmeticWishlistItems = cosmeticWishlistItems.filter(cosmeticBagproductId => cosmeticBagproductId != productId);
  localStorage.setItem('cosmeticWishlistItems', JSON.stringify(cosmeticWishlistItems));
  loadCosmeticWishlistItemObjects();
  displayCosmeticWishlistIcon();
  displayCosmeticWishlistItems();
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
