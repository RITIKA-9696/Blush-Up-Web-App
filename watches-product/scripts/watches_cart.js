const WATCH_CONVENIENCE_FEES = 99;
let watchBagItemObjects;
onLoad();

function onLoad(){
  loadWatchBagItemObjects();
  displayWatchBagItems();
  displayWatchBagSummary();
}

function displayWatchBagSummary(){
  let watchBagSummaryElement = document.querySelector('.bag-summary');
  let totalWatchItem = watchBagItemObjects.length;
  let totalWatchMRP = 0;
  let totalWatchDiscount = 0;

  watchBagItemObjects.forEach(watchBagItem => {
    totalWatchMRP += watchBagItem.original_Price;
    totalWatchDiscount += watchBagItem.original_Price - watchBagItem.current_price;
  });

  let finalWatchPayment = totalWatchMRP - totalWatchDiscount + WATCH_CONVENIENCE_FEES;

  console.log(finalWatchPayment);

  watchBagSummaryElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalWatchItem} Items) </div>
  <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalWatchMRP}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalWatchDiscount}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
  <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalWatchPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function loadWatchBagItemObjects(){
  console.log(watchBagItems);

  watchBagItemObjects = watchBagItems.map(productId => {
    for (let i = 0; i < watch_items.length; i++) {
      if(productId == watch_items[i].id){
        return watch_items[i];
      }
    }
  });
  console.log(watchBagItemObjects);
}

function displayWatchBagItems(){
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  watchBagItemObjects.forEach(watchBagItem => {
    innerHTML += generateWatchItemHTML(watchBagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromCart(productId){
  watchBagItems = watchBagItems.filter(watchBagItemId => watchBagItemId != productId);
  localStorage.setItem('watchBagItems', JSON.stringify(watchBagItems));
  loadWatchBagItemObjects();
  displayWatchBagIcon();
  displayWatchBagItems();
  displayWatchBagSummary();
}

function generateWatchItemHTML(product){
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${product.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${product.company_name}</div>
              <div class="item-name">${product.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${product.current_price}</span>
                <span class="original-price">Rs ${product.original_Price}</span>
                <span class="discount-percentage">(${product.discount}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${product.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${product.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "removeFromCart(${product.id})">X</div>
          </div>`;
}