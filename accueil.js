// GET ==> Retourne un tableau de tous les éléments
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

const getCameras = async () => {
  await fetchCameras();

  try {
    document.getElementById("headCamera").innerHTML = typeCameras
      .map(
        (model) => `
      
    <div class="w-50 mx-auto">
      <a href="product.html?id=${
        model._id
      }" class="card mb-3 text-dark bg-transparent border-0">
        <div class="card-body text-center ">
          <h2 class="card-title header-accueil">${model.name}</h2>
          <p class="paragraph-accueil">from ${model.price / 100}€</p>
          <img src=${
            model.imageUrl
          } alt="" class="img-thumbnail img-fluid w-75 border-0">
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
