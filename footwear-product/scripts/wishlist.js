let wishlistItemObjects;
onLoad();  


function onLoad(){
  loadWishlistItemObjects();
  diplayWishlistItems();
}

function loadWishlistItemObjects(){
  console.log(wishlistItems);
  const uniqueItemIds = [...new Set(wishlistItems)]; // Ensure unique item IDs
  wishlistItemObjects = uniqueItemIds.map(itemId => {
    for (let i = 0; i < f_items.length; i++){
      if(itemId == f_items[i].id){
        return f_items[i];
      }
    }
  });
     console.log(wishlistItemObjects);
}

function diplayWishlistItems(){
  let containerElement = document.querySelector('.wishlist');
  let innerHTML = '';
  wishlistItemObjects.forEach(wishlistItem => {
    innerHTML += generateItemHTML(wishlistItem);
  });
   containerElement.innerHTML = innerHTML;

}

function removeBtn(itemId){
  wishlistItems = wishlistItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  loadWishlistItemObjects();
  displayWishlistIcon();
  diplayWishlistItems();
 }
function generateItemHTML(item){
    return  `<div class="wishlist-item">
            <img src="./${item.item_image}" alt="Item 1">
                    <div class="item-details">
                        <div class="company">${item.company_name}</div>
                            <div class="item-name">${item.item_name}</div>
                                <div class="price-container">
                                    <span class="current-price">Rs ${item.current_price}</span>
                                    <span class="original-price">Rs ${item.original_price}</span>
                                    <span class="discount-percentage">(${item.discount}% OFF)</span>
                                </div>
                    </div>
                       <button class="remove-btn" onclick = "removeBtn(${item.id})">Remove</button>
                       <button class="btn-add-bag" onclick = "addToBag(${item.id})">Add to Bag</button>
            </div>`;
}