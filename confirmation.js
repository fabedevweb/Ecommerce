//Je récupère dans le localstorage l'objet de la key Order envoyé par le backend
let orderLocalstorage = JSON.parse(localStorage.getItem("Order"));

//Convertion de l'objet en array pour ne récupérer que l'order envoyé par le backend
let orderLocalstorageArray = Object.values(orderLocalstorage);

//Je récupère le prix total dans le localstorage
let totalPriceLocalStorage = JSON.parse(localStorage.getItem("totalPrice"));

document.querySelector(".thanks").innerHTML = `            <div class="row ">
<div class="">
    <div class="center-block  text-center ">
        <div class="card-header ">
        </div>
        <div class="card-body ">
        <h5 class="card-title">SUCCESSFUL</h5>
        <p class="card-text">Your order has been sent</p>
        <p class="card-text">Your Order : ${orderLocalstorageArray[2]}</p>
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

//Supprimer tout le contenu du localstorage
let clearLocalstorage = () => {
  location.href = "http://127.0.0.1:5500/index.html";
  localStorage.clear();
};
