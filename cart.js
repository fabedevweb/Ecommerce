//J'importe mon objet présent dans le localstorage au format JS
function unityTestProductSaveLocalStorage() {
  try {
    let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));
    return productSaveLocalStorage;
  } catch {
    console.error("Parsing error:", e);
  }
}
unityTestProductSaveLocalStorage();

//Afficher sur la page tous les produits sélectionnés
function showProductCartInTable() {
  try {
    if (unityTestProductSaveLocalStorage().length) {
      // Calcul du prix total
      let total = 0;

      for (let cart of unityTestProductSaveLocalStorage()) {
        total += cart.price / 100;
      }
      //Stocker le prix total pour l'afficher plus tard sur la page de confirmation de la commande
      localStorage.setItem("totalPrice", JSON.stringify(total));
      //Header du tableau pour afficher les produits
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
                                                            <tbody id="bodyTableCart"></tbody>
                                                            <tr id="tableCart">
                                                            <th>TOTAL</th>
                                                            <th></th>
                                                            <th>${total}€</th>
                                                            <th></th>
                                                            </tr>
                                                          </table>
                                                       
                                                      `;
      //Ajouter dans le tableau tous les produits sélectionnés par l'utilisateur
      document.getElementById(
        "bodyTableCart"
      ).innerHTML = unityTestProductSaveLocalStorage()
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
      //Je n'affiche pas le message indiquant que le panier est vide
      document.getElementById("cartEmpy").style.display = "none";
    } else {
      //Je n'affiche pas le formulaire de contact
      document.getElementById("formConcat").style.display = "none";
      //J'affiche le message indiquant que le panier est vide
      document.getElementById("cartEmpy").style.display = "inline";
    }
  } catch (e) {
    console.log("Veuillez pointer correctement dans le DOM " + e);
  }
}
showProductCartInTable();

//*************VALIDATION FORMULAIRE COTE JS****************/
//Création des Regex
const regxFirstName = /^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$/;
const regxAddress = /^[0-9a-zA-Z\s'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50}$/;
const regxCity = /^([0-9a-zA-Z\s'àâéèêôùûçÀÂÉÈÔÙÛÇs-]{1,50})$/;
const regxEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

// Variables qui testent chaque champ et valide au click
let validationForm = () => {
  try {
    let validFirstName = regxFirstName.test(
      document.getElementById("firstName").value
    );
    let validLastName = regxFirstName.test(
      document.getElementById("lastName").value
    );
    let validAddress = regxAddress.test(
      document.getElementById("address").value
    );
    let validCity = regxCity.test(document.getElementById("city").value);
    let validEmail = regxEmail.test(document.getElementById("email").value);
    //*********************TEST VALIDATION FORMULAIRE************************/

    let testValid =
      validFirstName &&
      validLastName &&
      validAddress &&
      validCity &&
      validEmail;
    let testValidTerner = testValid ? true : false;

    return testValidTerner;
  } catch {
    console.log("Vérifiez que l'on pointe correctement sur le DOM");
  }
};

//Création d'une classe pour l'objet contact à envoyer au backend
class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

//Création de l'objet contact à envoyer au backend
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

//****************************TEST OBJET CONTACT*************************************/
//Je test que mon object contactForm correspond à ma classe Contact
function testFormLocalstorage() {
  let contactTest = formLocalstorage();
  if (contactTest instanceof Contact) {
  } else if (!unityTestProductSaveLocalStorage()) {
    console.log("Le formulaire n'est plus disponible");
  } else {
    console.log("Vérifier que l'objet correspond bien à la class Contact");
  }
}
testFormLocalstorage();
//****************************FIN DU TEST OBJET CONTACT*************************************/

//Création du string array id à envoyer au backend
let products = [];
for (let product of unityTestProductSaveLocalStorage()) {
  let productsId = product.id;
  products.push(productsId);
}

//Fonction qui envoie mon objet contact et le string array id au backend
let submitForm = () => {
  try {
    let contact = formLocalstorage();
    let localStorageBackend = {
      contact,
      products,
    };
    //****************************TEST*************************************/
    //Je vérifie le type objet contact, le type string array product id et que la validation du formulaire est true
    if (
      contact === Object(contact) &&
      Array.isArray(products) &&
      validationForm()
    ) {
      //Retourne l'objet contact, le tableau produits et orderId (string)
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
      console.log(
        "contact != object || product != string array id || validationForm()=false"
      );
    }

    //****************************TEST*************************************/
    //Je test l'envoie des objets "contact" et "products" attendu en sortie
  } catch (e) {
    console.log("Vérifier l'orthographe de l'objet : " + e);
  }
};
//*************************************Supprimer individuellement chaque produit du panier*************************************/

function deleteOneProductCart() {
  try {
    //Je sélection tous les bouttons créés à chaque ligne
    let btnDelete = document.getElementsByClassName("btnDeleteProduct");
    let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));
    for (let i = 0; i < btnDelete.length; i++) {
      //J'écoute chacun des bouttons
      btnDelete[i].addEventListener("click", (e) => {
        e.preventDefault();
        //Quand je click sur un boutton je supprime dans le LocalStorage la ligne du tableau qui lui correspond
        productSaveLocalStorage.splice(i, 1);
        //Une fois la ligne du tableau supprimée, je réinjecte les lignes restantes dans le localstorage en écrasant l'ancienne key
        localStorage.setItem(
          "product",
          JSON.stringify(productSaveLocalStorage)
        );
        //Je recharge la page pour afficher la mise à jour du Local storage sur la page

        location.reload();
      });
    }
  } catch (e) {
    console.log("Erreur suivante : " + e);
  }
}

deleteOneProductCart();
