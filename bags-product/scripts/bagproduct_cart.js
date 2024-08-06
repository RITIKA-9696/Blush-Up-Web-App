const BAG_CONVENIENCE_FEES = 99;
let bagBagItemObjects;
onLoad();

function onLoad(){
  loadBagBagItemObjects();
  displayBagBagItems();
  displayBagBagSummary();
}

function displayBagBagSummary(){
  let bagBagSummaryElement = document.querySelector('.bag-summary');
  let totalBagItem = bagBagItemObjects.length;
  let totalBagMRP = 0;
  let totalBagDiscount = 0;

  bagBagItemObjects.forEach(bagBagItem => {
    totalBagMRP += bagBagItem.original_Price;
    totalBagDiscount += (bagBagItem.original_Price - bagBagItem.current_price);
  });

  let finalBagPayment = totalBagMRP - totalBagDiscount + BAG_CONVENIENCE_FEES;

  console.log(finalBagPayment);

  bagBagSummaryElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalBagItem} Items) </div>
  <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalBagMRP}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalBagDiscount}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
  <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalBagPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function loadBagBagItemObjects(){
  console.log(bagBagItems);

  bagBagItemObjects = bagBagItems.map(itemId => {
    for (let i = 0; i < bag_items.length; i++) {
      if(itemId == bag_items[i].id){
        return bag_items[i];
      }
    }
  });
  console.log(bagBagItemObjects);
}

function displayBagBagItems(){
  let bagContainerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagBagItemObjects.forEach(bagBagItem => {
    innerHTML += generateBagItemHTML(bagBagItem);
  });
  bagContainerElement.innerHTML = innerHTML;
}

function removeFromCart(itemId){
  bagBagItems = bagBagItems.filter(bagBagItemId => bagBagItemId != itemId);
  localStorage.setItem('bagBagItems', JSON.stringify(bagBagItems));
  loadBagBagItemObjects();
  displayBagBagIcon();
  displayBagBagItems();
  displayBagBagSummary();
} 

function generateBagItemHTML(item){
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_Price}</span>
                <span class="discount-percentage">(${item.discount}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "removeFromCart(${item.id})">X</div>
          </div>`;
}

