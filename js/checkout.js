import { cart, addToCart } from './Modules/cart.mjs';

console.log('Hello je suis dans checkout.js !');

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

function main() {

  boostrapValidation();

  // checkForm();
}


function boostrapValidation() {

  let form = document.getElementById("orderForm");
  form.addEventListener('submit', function (event) {
    console.log("Etat de form.checkValidity :", form.checkValidity());

    let status = checkForm();
    if(status) {
      alert("Je pense que je peux envoyer le formulaire !");
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } 
      
    form.classList.add('was-validated');

    // if (form.checkValidity()) {
    //   alert("checkValidity OK !")
    
    //   let status = checkForm();

    //   if (status) {
    //     alert("Ok pour envoyer le formulaire !")
    //   } else {
    //     alert("Le formulaire comporte des erreurs !");
        
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }
    // }
    
  }, false)

}

function checkForm() {
  
  // LastName regex test
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
    console.log(purchaseOrder.contact);
    return true;
  }

  // Address regex test

  
}

function testRegex(inputName, elt, regex) {
  
  // console.log("inputName : ", inputName);
  // console.log("elt : ", elt);
  // console.log('regex :', regex);
  // console.log(purchaseOrder.contact);
  // alert("testRegex2");

  let element = document.getElementById(elt);
  
  if(inputName.match(regex)) {

    element.setCustomValidity("");
    return true;

  } else {
    element.setCustomValidity("Entrer un nom correct !");
    alert("Vérifier ce champs");
    return false;
  }
}



function submitOrder() {
  console.log('Hello submitOrder');

  let toBeSubmited = {
    contact: {
      firstName: 'Jean-Marc',
      lastName: 'Juif',
      address: 'Mon adresse',
      city: 'Ma ville',
      email: 'Mon email'
    },
    products: ["5be1ed3f1c9d44000030b061"]
  }

  console.log('PurchaseOrder : ', JSON.stringify(toBeSubmited));

  fetch('http://localhost:3000/api/cameras/order', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(toBeSubmited),
  })
  .then(function(response) {
    if(response.ok) {
      return response.json();
    } else {
      console.log("Erreur dans l'envoi des données !");
    }
  })
  .then(function(datas){
    alert('Je suis dans datas !');
    localStorage.setItem("customer", JSON.stringify(datas.contact));
    localStorage.setItem("orderId", JSON.stringify(datas.orderId));
    cart.customer = JSON.stringify(datas.contact);
    cart.orderId = JSON.stringify(datas.orderId);
    // window.location.assign("./order-tracking.html");
  })
  .catch(function(error) {
    console.log("Le serveur de réception n'est pas disponible ! " + error.message);
  });
}