let bagWishlistItemObjects;
onLoad();

function onLoad(){
  loadBagWishlistItemObjects();
  displayBagWishlistItems();
}

function loadBagWishlistItemObjects(){
  console.log(bagWishlistItems);
  const uniqueItemIds = [...new Set (bagWishlistItems)];
  bagWishlistItemObjects = uniqueItemIds.map(itemId =>{
    for(let i = 0; i < bag_items.length; i++){
      if(itemId == bag_items[i].id){
        return bag_items[i];
      }
    }
  });
  console.log(bagWishlistItemObjects);
}

function displayBagWishlistItems(){
  let containerElement = document.querySelector('.wishlist');
  let innerHTML = '';
  bagWishlistItemObjects.forEach(bagWishlistItem => {
    innerHTML += generateItemHTML(bagWishlistItem)
  });
  containerElement.innerHTML = innerHTML;
}

function removeBtn(itemId){
  bagWishlistItems = bagWishlistItems.filter(bagBagproductId => bagBagproductId != productId);
  localStorage.setItem('bagWishlistItems', JSON.stringify(bagWishlistItems));
  loadBagWishlistItemObjects();
  displayBagWishlistIcon();
  displayBagWishlistItems();
}

function generateItemHTML(item){
  return `<div class="wishlist-item">
    <img src="./${item.image}" alt="Item 1">
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
          <button class="btn-add-bag" onclick = "addBag(${item.id})">Add to Bag</button>
            </div>`;
}

