import { cart } from './Modules/cart.mjs';

let purchaseOrder = {
  contact: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
  },
  products: []
}

main();

/**
 * start boostrapValidation function
 */
function main() {

  boostrapValidation();

}

/**
 * Add an event listener on the submit button.
 * Disabling form submissions if there are invalid fields.
 * Update the purchaseOrder object if the checkForm function return true and submit the form.
 * If checkValidity function return false, preventDefault and stop propagation.
 */
function boostrapValidation() {

  let form = document.getElementById("orderForm");

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let status = checkForm();

    if(status) {
      //Fetch all items id
      for (const itemId of cart.items) {
        // console.log(itemId.id);
        purchaseOrder.products.push(itemId.id);
      }

      submitOrder(purchaseOrder);

    }
      
    form.classList.add('was-validated');

    
  }, false)

}

/**
 * Validate the form elements with regex.
 * If all the form input are validated, update the purchaseOrder object. 
 * Return a boolean.
 * 
 * @returns { boolean } Return true if the form elements are validated.
 */
function checkForm() {
  
  let lastName = document.orderForm.lastName.value.trim().toLocaleLowerCase();
  let firstName = document.orderForm.firstName.value.trim().toLocaleLowerCase();
  let address = document.orderForm.address.value.trim().toLocaleLowerCase();
  let address2 = document.orderForm.address2.value.trim().toLocaleLowerCase();
  let postCode = document.orderForm.postCode.value.trim().toLocaleLowerCase();
  let city = document.orderForm.city.value.trim().toLocaleLowerCase();
  let phone = document.orderForm.phone.value.trim().toLocaleLowerCase();
  let email = document.orderForm.email.value.trim().toLocaleLowerCase();

  if (!testRegex(lastName, "lastName", /^[A-Za-z]+$/)) {
    return false;
  } else if (!testRegex(firstName, "firstName", /^[A-Za-z-]+$/)) {
    return false;
  } else if (!testRegex(address, "address", /((^[0-9]*).?((BIS)|(TER)|(QUATER))?)?((\W+)|(^))(([a-z]+.)*)$/gm )) {
    return false;
  } else if (!testRegex(address2, "address2", /^[A-Za-z0-9-&._ ]+$|^$/gm)) {
    return false;
  } else if (!testRegex(postCode, "postCode", /^[0-9]{5}/)) {
    return false;
  } else if (!testRegex(city, "city", /^[A-Za-z-]/)) {
    return false;
  } else if (!testRegex(phone, "phone", /^((\+)33|0)[1-9](\d{2}){4}$/)) {
    return false;
  } else if (!testRegex(email, "email", /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
    return false;
  } else {
    purchaseOrder.contact.lastName = lastName;
    purchaseOrder.contact.firstName = firstName;
    purchaseOrder.contact.address = address;
    purchaseOrder.contact.city = city;
    purchaseOrder.contact.email = email; 
    
    return true;
  }
  
}
/**
 * Test a regex rule for an input.
 * Apply the setCustomValidity function to the element id.
 * Return a boolean.
 * 
 * @param {string} inputName The value of the form input element.
 * @param {string} elt The id value of the input (dom).
 * @param {string} regex The regex to apply to the input.
 * @returns {boolean} Return true if the input is validated.
 */
function testRegex(inputName, elt, regex) {
  
  let element = document.getElementById(elt);
  
  if(inputName.match(regex)) {

    element.setCustomValidity("");
    return true;

  } else {
    element.setCustomValidity("Il y a une erreur dans le formulaire !");
    // alert("Vérifier ce champs");
    return false;
  }
}

/**
 * Submit the object purchaseOrder.
 * Update localStorage with the response and redirect the user to the confirmation html page.
 * 
 * @param {object} purchaseOrder the JS Object to Post
 */

function submitOrder(purchaseOrder) {

  console.log('PurchaseOrder : ', JSON.stringify(purchaseOrder));

  fetch('http://localhost:3000/api/cameras/order', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(purchaseOrder),
  })
  .then(function(response) {
    if(response.ok) {
      return response.json();
    } else {
      console.log("Erreur dans l'envoi des données du formulaire !");
    }
  })
  .then(function(datas){
    console.log(datas);
    // alert('Je suis dans datas !');
    localStorage.setItem("orderCustomer", JSON.stringify(datas.contact));
    localStorage.setItem("orderId", JSON.stringify(datas.orderId));
    localStorage.setItem("orderProducts", JSON.stringify(datas.products));
    cart.customer = JSON.stringify(datas.contact);
    cart.orderId = JSON.stringify(datas.orderId);

    window.location.assign("./order-tracking.html?" + datas.orderId);
  })
  .catch(function(error) {
    console.log("Le serveur de réception n'est pas disponible ! " + error.message);
  });
}