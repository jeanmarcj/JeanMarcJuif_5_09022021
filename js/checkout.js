import { cart, addToCart } from './Modules/cart.mjs';


console.log('Hello je suis dans checkout.js !');

function main() {
    console.log('Je suis dans main()');
    const targetOrderBtn = document.getElementById("orderBtn");
        
    // targetOrderBtn.addEventListener("click", checkForm);

}

main();

function checkForm() {

    // let lastname = document.getElementById("lastname").value;
    let lastName = cleanString(document.orderForm.lastName.value);
    // lastname = cleanString(lastname);
    console.log(lastName);
    // let firstname = document.getElementById("firstname").value;
    let firstName = document.orderForm.firstName.value;
    console.log(firstName);
    // let address = document.getElementById("address").value;
    let address = document.orderForm.address.value;
    console.log(address);
    // let city = document.getElementById("city").value;
    let city = document.orderForm.city.value;
    console.log(city);
    // let email = document.getElementById("email").value;
    let email = document.orderForm.email.value;
    console.log(email);

    alert('Bouton clické !');

}

function cleanString(stringToCheck) {
    return stringToCheck.replace(/^\s+|\s+$/gm,'');
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated');
          checkForm();
        }, false)
      })
  })()


  function testApi() {
    
    let contact = {
      firstName: "jean-marc",
      lastName: "juif",
      address: "6 allee du pre cesar",
      city: "ormesson sur marne",
      email: "jmjbup@gmail.com"

    }

    let products = ["5be1ed3f1c9d44000030b061", "5be9bc241c9d440000a730e7"];

    let purchaseOrder = {
      contact,
      products
    }

    // const url = "http://localhost:3000/api/cameras/order";
    // fetch(url, {
    //   method= "POST",
    // })
    // alert('Je temporise...');

    // return (await fetch(url)).json();

    console.log('Cart customer : ', cart.customer);
    console.log('Cart OrderId : ', cart.orderId);

    fetch('http://localhost:3000/api/cameras/order', { 
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(purchaseOrder)
      
    })
    .then(function (response) {
      if(response.ok) {
        alert('Response OK');
        // console.log(response.json);
        return response.json();
      } else {
        console.log('Erreur dans la base de données !');
      }
    })
    .then(function(datas) {
      localStorage.setItem("customer", JSON.stringify(datas.contact));
      localStorage.setItem("orderId", JSON.stringify(datas.orderId));
      cart.customer = JSON.stringify(datas.contact);
      cart.orderId = JSON.stringify(datas.orderId);
      // window.location.assign("./order-tracking.html");
    })
    .catch(function(error) {
      console.log("Erreur dans l'envoie des données ! " + error.message);
    });
    
    // return

    // fetch('http://localhost:3000/api/cameras/order', { 
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(purchaseOrder)
      
    // })
    // .then(response => response.json())
    // // console.log('Response json: ', response.json())
    // .then(function (retour) {
    //   localStorage.setItem("order", JSON.stringify(retour.order));
    //   window.location.assign("checkout.html?orderId=" + retour.orderId);
    // })
    // .catch(function (error) {
    //   alert("Commande non expédiée ! Vérifier le formulaire...", error);
    // });

    // A mettre dans un try catch
    // return fetch(url)
    // .then(function(httpBodyResponse) {
    //     return httpBodyResponse.json()
    // })
  }

  testApi();
