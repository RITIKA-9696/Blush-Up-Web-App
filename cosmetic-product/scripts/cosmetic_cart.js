const COSMETIC_CONVENIENCE_FEES = 99;
let cosmeticBagItemObjects;
onLoad();

function onLoad(){
  loadCosmeticBagItemObjects();
  displayCosmeticBagItems();
  displayCosmeticBagSummary();
}

function displayCosmeticBagSummary(){
  let cosmeticBagSummaryElement = document.querySelector('.bag-summary');
  let totalCosmeticItem = cosmeticBagItemObjects.length;
  let totalCosmeticMRP = 0;
  let totalCosmeticDiscount = 0;

  cosmeticBagItemObjects.forEach(cosmeticBagItem => {
    totalCosmeticMRP += cosmeticBagItem.original_Price;
    totalCosmeticDiscount += (cosmeticBagItem.original_Price - cosmeticBagItem.current_price);
  });
  
  let finalCosmeticPayment = totalCosmeticMRP - totalCosmeticDiscount + COSMETIC_CONVENIENCE_FEES;

  console.log(finalCosmeticPayment);

  cosmeticBagSummaryElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalCosmeticItem} Items) </div>
  <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalCosmeticMRP}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalCosmeticDiscount}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
  <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalCosmeticPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function loadCosmeticBagItemObjects(){
  console.log(cosmeticBagItems);

  cosmeticBagItemObjects = cosmeticBagItems.map(productId => {
    for (let i = 0; i < cosmetic_items.length; i++) {
      if(productId == cosmetic_items[i].id){
        return cosmetic_items[i];
      }
    }
  });
  console.log(cosmeticBagItemObjects);
}

function displayCosmeticBagItems(){
  let cosmeticContainerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  cosmeticBagItemObjects.forEach(cosmeticBagItem => {
    innerHTML += generateCosmeticItemHTML(cosmeticBagItem);
  });
  cosmeticContainerElement.innerHTML = innerHTML; 
}

function removeFromCart(productId){
  cosmeticBagItems = cosmeticBagItems.filter(cosmeticBagItemId => cosmeticBagItemId != productId);
  localStorage.setItem('cosmeticBagItems', JSON.stringify(cosmeticBagItems));
  loadCosmeticBagItemObjects();
  displayCosmeticBagIcon();
  displayCosmeticBagItems();
  displayCosmeticBagSummary();
}

function generateCosmeticItemHTML(product){
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