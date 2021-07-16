/**
 * Get the order id in localStorage and display the informations.
 */
function main() {
    // console.log('Je suis dans order-tracking.js - main');

    const orderId = localStorage.getItem("orderId");

    if (orderId != null) {
        let customer = JSON.parse(localStorage.getItem("orderCustomer"));
        // console.log('Cart firstName : ', customer.firstName);
        let orderProducts = JSON.parse(localStorage.getItem("items"));
        
        displayOrder(customer, orderId);
        displayOffcanvas(customer, orderId, orderProducts);
        
    }
}

main();

/**
 * Display the order customer informations and order number(id).
 * Compute an estimated delivery date.
 * 
 * @param {object} customer the customer informations.
 * @param {string} orderId the order number send by the api.
 */
function displayOrder(customer, orderId) {

    // Title
    const mainTitle = document.getElementById("main-title");
    mainTitle.textContent = customer.firstName + ", Orinoco vous remercie pour votre commande !";
    mainTitle.classList.add('text-capitalize');

    // Template
    const templateElement = document.getElementById('purchase-order');
    const cloneElement = document.importNode(templateElement.content, true);
    
    // Order #
    cloneElement.getElementById("order-id").textContent = JSON.parse(orderId).toUpperCase();

    // Delivery Date
    let deliveryDate = addDaysToDate(7);
    let options = {year: "numeric", month: "long", day: "numeric"};
    cloneElement.getElementById("delivery-date").textContent = deliveryDate.toLocaleDateString("fr-FR", options);

    // Child clone injection in DOM
    document.getElementById("purchase-wrapper").appendChild(cloneElement);
    
}

/**
 * Call the displayCamera function.
 * Display the items of the purchase order.
 * 
 * @param {object} customer the customer informations.
 * @param {string} orderId the order number given by the api.
 * @param {object} orderProducts the items of the purchase order.
 */
function displayOffcanvas(customer, orderId, orderProducts) {
    // console.log(orderProducts);
    // Order #
    document.getElementById("purchaseOrder-number").textContent = "Commande : " + JSON.parse(orderId).toUpperCase();

    // Customer last Name
    document.getElementById("customer-name").textContent = customer.firstName + ' ' + customer.lastName;

    // Display all cameras
    for (let i = 0; i < orderProducts.length; i++) {
        const camera = orderProducts[i];
        displayCamera(camera);
    }    

    // console.log(orderProducts[0].name);
}

/**
 * Add <days> to the today's date
 * Return the new date
 * @param {integer} days the number of days to add 
 * @returns {date}
 */
function addDaysToDate(days) {
    let res = new Date();
    res.setDate(res.getDate() + days);
    return res;
}

/**
 * Display one <camera> informations.
 * 
 * @param {object} camera the camera informations to display
 */
function displayCamera(camera) {
    
    // Customer order products
    const printOrderTemplate = document.getElementById("print-order");
    const cloneTemplate = document.importNode(printOrderTemplate.content, true);
    
    let singleItemUrl = "http://127.0.0.1:5500/templates/shop-single.html?id=" + camera.id;
    
    // Image single link href
    const imgLink = cloneTemplate.querySelectorAll('.item-single-link');
    for (const item of imgLink) {
        item.setAttribute("href", singleItemUrl);
    }

    // Product img src url
    const imgSrc = cloneTemplate.querySelectorAll('.item-img_src');
    for (const item of imgSrc) {
        item.setAttribute("src", camera.imgUrl);
    }

    // Product Name & single link
    const itemsName = cloneTemplate.querySelectorAll('.item-name');
    for (const item of itemsName) {
        item.textContent = camera.name;
        item.setAttribute("href", singleItemUrl);
    }

    // Product price
    const itemsPrice = cloneTemplate.querySelectorAll('.item-price');
    for (const item of itemsPrice) {
        item.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(camera.price);
    }

    // Product quantity
    const itemsQuantity = cloneTemplate.querySelectorAll('.item-quantity');
    for (const item of itemsQuantity) {
        item.textContent = camera.quantity;
    }

    // Child clone injection in DOM
    document.getElementById("print-order-grid").appendChild(cloneTemplate);
}