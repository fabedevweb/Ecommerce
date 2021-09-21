//Je récupère dans le localstorage l'objet renvoyé par le backend
function unityTestorderLocalstorage() {
  try {
    let orderLocalstorage = JSON.parse(localStorage.getItem("Order"));
    return orderLocalstorage;
  } catch {
    console.error("Parsing error:", e);
  }
}
//Je convertie cette objet en array pour ne récupérer que l'order envoyé par le backend

function checkOrderTrueInLocalstorage() {
  let orderLocalstorageArray = Object.values(unityTestorderLocalstorage());
  if (orderLocalstorageArray[2] == undefined) {
    console.error("Order non reçu");
  } else {
    console.log("Order bien reçu");
    return orderLocalstorageArray[2];
  }
}
//Je récupère le prix total dans le localstorage
function thankForOrder() {
  try {
    let totalPriceLocalStorage = JSON.parse(localStorage.getItem("totalPrice"));
    document.querySelector(
      ".thanks"
    ).innerHTML = `            <div class="row ">
    <div class="">
        <div class="center-block  text-center ">
            <div class="card-header ">
            </div>
            <div class="card-body ">
            <h5 class="card-title">SUCCESSFUL</h5>
            <p class="card-text">Your order has been sent</p>
            <p class="card-text">Your Order : ${checkOrderTrueInLocalstorage()}</p>
            <p class="card-text">Total price : ${totalPriceLocalStorage}€ </p>
            <p class="card-text">We thank you for your order</p>
            <button class="btn btn-primary" onclick="clearLocalstorage()">Continue shopping</button>
            </div>
            <div class="card-footer text-muted">
            </div>
        </div>
    </div>
    </div>
    `;
  } catch {
    console.log("Vérifier les variables");
  }
}
thankForOrder();

//Supprimer tout le contenu du localstorage
let clearLocalstorage = () => {
  location.href = "http://127.0.0.1:5500/index.html";
  localStorage.clear();
};
