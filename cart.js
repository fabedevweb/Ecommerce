// JE regarde ce qu'il y a dans le LocaStorage avec getItem
let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));

//Si le panier est vide AFFICHER un message et inviter le client à revenir au shopping
if (productSaveLocalStorage == null) {
  document.getElementById("cartForm").innerHTML = `
    <div class="center-block  text-center">
      <div class=" text-center ">
        <div class="card-header">
            Camera Shop
        </div>
        <div class="card-body">
          <h5 class="card-title">Hi</h5>
          <p class="card-text">YOUR SHOPPING CART IS EMPTY</p>
          <a href="index.html" class="btn btn-primary">Continue shopping</a>
        </div>
        <div class="card-footer text-muted">
          Camera Shop
        </div>
      </div>
    </div>
    `;
}
//***************S'il y a des produits dans le localStorage, afficher les produits et un formulaire de contact**********************
else {
  // Calcul du prix total
  let total = 0;

  for (let cart of productSaveLocalStorage) {
    total += cart.price / 100;
  }
  //Stocker le prix total pour l'afficher plus tard sur la page de cofirmation de commande
  localStorage.setItem("totalPrice", JSON.stringify(total));
  //Afficher un tableau de base pour afficher Name, id, Price et Delete
  document.getElementById("cartTable").innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">id</th>
          <th scope="col">Price</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody id="bodyTableCart">
      </tbody>
      <tr >
          <th >TOTAL</th>
          <th></th>
          <th>${total}€</th>
          <th></th>
      </tr>
    </table>`;
  //Ajouter dans le tableau tous les produits sélectionnés par l'utilisateur
  document.getElementById("bodyTableCart").innerHTML = productSaveLocalStorage
    .map(
      (camera) => `
                    <tr id="${camera.id}">
                      <td>${camera.name}</td>
                      <td>${camera.id}</td>
                      <td>${camera.price / 100}€</td>
                      <th scope="col">
                        <button class="fas fa-times-circle cursor btnRemove btn btn-outline-secondary btnDeleteProduct" ></button>
                      </th>
                    </tr>
                    `
    )
    .join("");

  //*****************************CREATION DU FORMULAIRE de contact quand il y a quelque chose dans le panier**************************************
  //Afficher le formulaire de contact avec champs obligatoires et regex
  document.getElementById("formConcat").innerHTML = `  
                      
                        <form action="" onsubmit="event.preventDefault();submitForm()" class="mt-5">
                        <h2 class="header-form">MY CONTACT FORM</h2>
                          <div>
                          <input id="firstName" class="col-5" type="text" name="firstName" placeholder="Your firstName" required pattern="^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$">
                            <p class="pfirstName"></p>
                          </div>
                          <div>
                            <input id="lastName" class="col-5" type="text" name="lastName" placeholder="Your lastName" required pattern="^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$">
                            <p class="plastName"></p>
                          </div>
                          <div>
                            <input id="address" class="col-5" type="text" name="address" placeholder="Your address" required pattern="^([0-9a-zA-Z\\s'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$">
                            <p class="paddress"></p>
                          </div>
                          <div>
                            <input id="city" class="col-5" type="text" name="city" placeholder="Your city" required pattern="^([0-9a-zA-Z\\s'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$">
                            <p class="pcity"></p>
                          </div>
                          <div>
                            <input id="email" class="col-5" type="email" name="email" placeholder="Your email" required pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$">
                            <p class="pemail"></p>
                          </div>
                          <input type="submit" value="Submit" class="btn btn-secondary">
                        </form>`;
}
//*********************************************ENVOI DU FORMULAIRE ET DU PRODUIT AU BACKEND****************************************/
//Création d'une classe pour l'objet contact envoyé au backend
class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}
//Création de l'objet contact envoyé au backend
function formLocalstorage() {
  let contactForm = new Contact(
    document.getElementById("firstName").value,
    document.getElementById("lastName").value,
    document.getElementById("address").value,
    document.getElementById("city").value,
    document.getElementById("email").value
  );
  return contactForm;
}
let contactTest = formLocalstorage();
//Création des Regx
let regxFirstName = /^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$/;
let regxAddress = /^([0-9a-zA-Z\\s'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$/;
let regxCity = /^([0-9a-zA-Z\\s'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$/;
let regxEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
// Variables qui testent chaque champ
let testForm = () => {
  let validFirstName = regxFirstName.test(
    document.getElementById("firstName").value
  );
  let validLastName = regxFirstName.test(
    document.getElementById("lastName").value
  );
  let validAddress = regxAddress.test(document.getElementById("address").value);
  let validCity = regxCity.test(document.getElementById("city").value);
  let validEmail = regxEmail.test(document.getElementById("email").value);
  if (
    validFirstName &&
    validLastName &&
    validAddress &&
    validCity &&
    validEmail
  ) {
    return true;
  } else {
    return false;
  }
};

//****************************TEST*************************************/
if (contactTest instanceof Contact) {
  console.log("Objet contact OK");
} else {
  console.error("Vérifier que l'objet correspond bien à la class Contact");
}

let products = [];
let productLocastorage = JSON.parse(localStorage.getItem("product"));
for (let product of productLocastorage) {
  let productsId = product.id;
  products.push(productsId);
}

let submitForm = () => {
  try {
    let contact = formLocalstorage();
    let localStorageBackend = {
      contact,
      products,
    };
    //****************************TEST*************************************/
    //Je vérifie avoir un objet contact et un string array product id
    if (contact === Object(contact) && Array.isArray(products) && testForm()) {
      console.log("contact est bien un objet et products un string array id");
      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        body: JSON.stringify(localStorageBackend),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((dataModel) => dataModel.json())
        .then(function (value) {
          console.log(value);
          localStorage.setItem("Order", JSON.stringify(value));
          window.location = "confirmation.html";
        })
        .catch(() => {
          console.error("Erreur sur le POST de l'API");
        });
    } else {
      alert(
        "contact != object || product != string array id || testForm()=false"
      );
    }

    //****************************TEST*************************************/
  } catch (e) {
    console.log("Voici l'erreur à corriger : " + e);
  }
};
//*************************************Supprimer individuellement chaque produit du panier*************************************/

//Je sélection tous les bouttons créés à chaque ligne
let btnDelete = document.getElementsByClassName("btnDeleteProduct");

for (let i = 0; i < btnDelete.length; i++) {
  //J'écoute chacun des bouttons
  btnDelete[i].addEventListener("click", (e) => {
    e.preventDefault();
    //Vérification de la sélection d'un id unique
    let remove = productSaveLocalStorage[i].id;
    console.log(remove);
    //Quand je click sur un boutton je supprime dans le LocalStorage la ligne du tableau qui lui correspond
    productSaveLocalStorage.splice(i, 1);
    //Une fois la ligne du tableau supprimée, je réinjecte les lignes restantes dans le localstorage en écrasant l'ancienne key
    localStorage.setItem("product", JSON.stringify(productSaveLocalStorage));
    //Je recharge la page pour afficher la mise à jour du Local storage sur la page
    if (productSaveLocalStorage.length == 0) {
      localStorage.clear();
    }
    location.reload();
  });
}
