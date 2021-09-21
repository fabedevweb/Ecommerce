// Récupération de tous les produits avec la méthode GET
const fetchCameras = async () => {
  try {
    await fetch("http://localhost:3000/api/cameras")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw "Erreur sur l'appelle de l'API";
        }
      })
      .then((res) => {
        typeCameras = res;
      });
  } catch {
    console.log("Erreur sur l'appelle de l'API");
  }
};

//Affichage de tous les produits sur la page
let productAccueil = document.getElementById("headErrorCamera");

const getCameras = async () => {
  await fetchCameras();

  try {
    document.getElementById("headErrorCamera").innerHTML = typeCameras
      .map(
        (model) => `
      
    <div class="row row-cols-1  g-4 justify-content-center">
      <a href="product.html?id=${
        model._id
      }" class="card mb-3 text-dark bg-light">
        <div class="card-body text-center ">
          <h2 class="card-title header-accueil">${model.name}</h2>
          <p class="paragraph-accueil">from ${model.price / 100}€</p>
          <img src=${model.imageUrl} alt="" class="img-thumbnail img-fluid">
        </div>
      </a>
    </div>`
      )
      .join("");
  } catch {
    console.log("Erreur sur l'appelle de l'API || vérifier le DOM");
  }
};
getCameras();
