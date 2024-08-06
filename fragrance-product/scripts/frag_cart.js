const FRAGRANCE_CONVENIENCE_FEES = 99;
let fragranceBagItemObjects;
onLoad();

function onLoad(){
  loadFragranceBagItemObjects();
  displayFragranceBagItems();
  displayFragranceBagSummary();
}

function displayFragranceBagSummary(){
  let fragranceBagSummaryElement = document.querySelector('.bag-summary');
  let totalFragranceItem = fragranceBagItemObjects.length;
  let totalFragranceMRP = 0;
  let totalFragranceDiscount = 0;

  fragranceBagItemObjects.forEach(fragranceBagItem => {
    totalFragranceMRP += fragranceBagItem.original_Price;
    totalFragranceDiscount += fragranceBagItem.original_Price - fragranceBagItem.current_price;
  });

  let finalFragrancePayment = totalFragranceMRP - totalFragranceDiscount + FRAGRANCE_CONVENIENCE_FEES;

  console.log(finalFragrancePayment);

  fragranceBagSummaryElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalFragranceItem} Items) </div>
  <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalFragranceMRP}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalFragranceDiscount}</span>
    </div>
  <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
  <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${finalFragrancePayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function loadFragranceBagItemObjects(){
  console.log(fragranceBagItems);

  fragranceBagItemObjects = fragranceBagItems.map(productId => {
    for (let i = 0; i < frag_items.length; i++) {
      if(productId == frag_items[i].id){
        return frag_items[i];
      }
    }
  });
  console.log(fragranceBagItemObjects);
}

function displayFragranceBagItems(){
  let fragranceContainerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  fragranceBagItemObjects.forEach(fragranceBagItem => {
    innerHTML += generateFragranceItemHTML(fragranceBagItem);
  });
  fragranceContainerElement.innerHTML = innerHTML; 
}

function removeFromCart(productId){
  fragranceBagItems = fragranceBagItems.filter(fragranceBagItemId => fragranceBagItemId != productId);
  localStorage.setItem('fragranceBagItems', JSON.stringify(fragranceBagItems));
  loadFragranceBagItemObjects();
  displayFragranceBagIcon();
  displayFragranceBagItems();
  displayFragranceBagSummary();
}

function generateFragranceItemHTML(product){
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