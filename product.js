//Récupération de l'URL pour l'id de chaque produit
const queryString = window.location.search;
let params = new URLSearchParams(queryString);
let idCamera = params.get("id");

// Création d'une classe pour afficher mes instances sur la page
class ProductCamera {
  constructor(description, imageUrl, name, price, lenses, id) {
    this.description = description;
    this.imageUrl = imageUrl;
    this.name = name;
    this.price = price;
    this.lenses = lenses;
    this.id = id;
  }
}

// Appeller l'API pour chaque ID pour n'afficher que le produit sélectionné
let fetchModelCameras = async () => {
  try {
    await fetch(`http://localhost:3000/api/cameras/${idCamera}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw "Erreur sur l'appelle de l'API";
        }
      })
      .then((res) => {
        modelCamera = res;
      });
  } catch (e) {
    console.log("Erreur sur l'appelle de l'API : " + e);
  }
};

// Afficher mon produit sur la page
let showProductCamera = async () => {
  try {
    await fetchModelCameras();
    let cameraOnPage = new ProductCamera(
      modelCamera.description,
      modelCamera.imageUrl,
      modelCamera.name,
      modelCamera.price,
      modelCamera.lenses,
      modelCamera._id
    );

    //Je test que mon object cameraOnPage est une instance de ma classe ProductCamera
    if (cameraOnPage instanceof ProductCamera) {
      for (let camera of modelCamera.lenses) {
        let listLenses = (modelCamera.lenses += `<option value="${camera}">${camera}</option>`);
        document.getElementById("product").innerHTML = `
          <div class="card  mx-auto mt-5 mb-5 col-xxl-6">
            <img src="${cameraOnPage.imageUrl}" class="card-img-top " alt="...">
            <div class="card-body">
              <h5 class="card-title">${cameraOnPage.name}</h5>
              <p class="card-text">${cameraOnPage.description}</p>
              <p>${cameraOnPage.price / 100}€</p>
              <div class="mt-4 formOption ">
                <form>
                  <label for="option_produit"></label>
                  <select name="option_produit" class="form-select" id="valueOption" aria-label="Default select example">
                    ${listLenses}
                  </select>
                </form>
              </div>
            </div>
          </div>
          `;
      }
      console.log("Objet contact OK");
    } else {
      console.error(
        "Vérifier que l'objet correspond bien à la class ProductCamera"
      );
    }
  } catch (e) {
    console.log("Erreur ==> " + e);
  }
};
showProductCamera();

// Création d'une fonction functionOnclick qui sera appellé au click sur mon boutton en html ligne 36
// Afficher un madal avec le résumé de la commande
let functionOnclick = () => {
  let cameraCart = new ProductCamera(
    modelCamera.description,
    modelCamera.imageUrl,
    modelCamera.name,
    modelCamera.price,
    modelCamera.lenses,
    modelCamera._id
  );

  //Au click, sur "add to cart", ligne 36 html, afficher un modal
  //Je test que mon object cameraOnPage est une instance de ma classe ProductCamera
  if (cameraCart instanceof ProductCamera) {
    document.getElementById("product").innerHTML += `
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
  
            <h4 class="modal-title">ADDED TO THE BASKET!</h4>
          </div>
          <div class="modal-body">
          <div class="col-md-8">
          <div class="card-body">
            <div class="col-md-4">
              <img src="${
                cameraCart.imageUrl
              }" class="img-fluid rounded-start" alt="...">
            </div>
            <p class="card-title">Model ${cameraCart.name}</p>
            <p class="card-text">Price ${cameraCart.price / 100}€</p>
            <p class="card-text">id ${cameraCart.id}</p>
          </div>
          </div>
          <div class="d-grid gap-2">
          <a href="cart.html" class="btn btn-primary" role="button" data-bs-toggle="button">FINALISE THE ORDER</a>
          <a href="" class="btn btn-primary active" role="button" data-bs-toggle="button" aria-pressed="true">CONTINUE SHOPPING</a>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  `;
  } else {
    console.error("Vérifier que l'objet correspond bien à la class Contact");
  }
  localStorageProduct();
};

// Envoyer dans le localstorage mon objet objectCameraLocalstorage
let localStorageProduct = () => {
  let cameraLocalstorage = new ProductCamera(
    modelCamera.description,
    modelCamera.imageUrl,
    modelCamera.name,
    modelCamera.price,
    modelCamera.lenses,
    modelCamera._id
  );

  // *********************** Création du Local storage **************************
  //Je regarde s'il y a quelque-chose dans le LS avec getItem(format JSON)
  //Pour une meilleure lisibilité, je converti en JS avec JSON.parse.
  let productSaveLocalStorage = JSON.parse(localStorage.getItem("product"));
  try {
    productSaveLocalStorage;
  } catch (e) {
    console.error("Parsing error:", e);
  }
  //S'il n'y a pas de clé product, créer un tableau, et l'ajouter au localstorage
  if (!productSaveLocalStorage) {
    productSaveLocalStorage = [];
    productSaveLocalStorage.push(cameraLocalstorage);
    localStorage.setItem("product", JSON.stringify(productSaveLocalStorage));
    console.log(Array.isArray(productSaveLocalStorage));
    //Si une clé product est présente et qu'il s'agit bien d'un tableau rajouter une ligne au tableau
  } else if (
    productSaveLocalStorage &&
    Array.isArray(productSaveLocalStorage)
  ) {
    productSaveLocalStorage.push(cameraLocalstorage);
    localStorage.setItem("product", JSON.stringify(productSaveLocalStorage));
    console.log(Array.isArray(productSaveLocalStorage));
  }
  if (!Array.isArray(productSaveLocalStorage)) {
    console.error("L'objet envoyé n'est pas un array");
  }
};
