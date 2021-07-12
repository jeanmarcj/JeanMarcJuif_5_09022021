function main() {
    // console.log('Je suis dans order-tracking.js - main');

    const orderId = localStorage.getItem("orderId");

    if (orderId != null) {
        let customer = JSON.parse(localStorage.getItem("customer"));
        // console.log('Cart firstName : ', customer.firstName);
        displayOrder(customer, orderId);
        
    } else {
        console.log("Pas de commande en cours");
    }
}

main();

function displayOrder(customer, orderId) {

    // Title
    document.getElementById("main-title").textContent = customer.firstName + ", Orinoco vous remercie pour votre commande !";

    // Order #
    const templateElement = document.getElementById('purchase-order');
    const cloneElement = document.importNode(templateElement.content, true);

    cloneElement.getElementById("order-id").textContent = JSON.parse(orderId).toUpperCase();

    // Child clone injection in DOM
    document.getElementById("purchase-wrapper").appendChild(cloneElement)
    
}