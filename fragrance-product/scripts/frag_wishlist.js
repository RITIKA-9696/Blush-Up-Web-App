let fragranceWishlistItemObjects;
onLoad();

function onLoad(){
  loadFragranceWishlistItemObjects();
  displayFragranceWishlistItems();
}

function loadFragranceWishlistItemObjects(){
  console.log(fragranceWishlistItems);
  const uniqueProductIds = [...new Set(fragranceWishlistItems)];
  fragranceWishlistItemObjects = uniqueProductIds.map(productId => {
    for (let i = 0; i < frag_items.length; i++){
      if(productId == frag_items[i].id){
        return frag_items[i];
      }
    }
  }) ;
  console.log(fragranceWishlistItemObjects);
}

function displayFragranceWishlistItems(){
  let containerElement = document.querySelector('.wishlist');
  let innerHTML = '';
  fragranceWishlistItemObjects.forEach(fragranceWishlistItem => {
    innerHTML += generateItemHTML(fragranceWishlistItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeBtn(productId){
  fragranceWishlistItems = fragranceWishlistItems.filter(fragranceBagproductId => fragranceBagproductId != productId);
  localStorage.setItem('fragranceWishlistItems', JSON.stringify(fragranceWishlistItems));
  loadFragranceWishlistItemObjects();
  displayFragranceWishlistIcon();
  displayFragranceWishlistItems();
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