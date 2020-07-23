import { apiCamera } from "./util/Api.js";
import { Camera } from "./util/Class.js";
import { badgeCount, cartDropdown, price } from "./util/Function.js";

// Appel des fonction badgeCount(), cartDropdown() et apiCamera() avec les paramètres attendu
badgeCount();
cartDropdown();

apiCamera("GET", "http://localhost:3000/")
    .then(res => {
        // J'initialise un array vide afin de pushé par la suite chaque caméra donnée par l'api
        let newCamera = [];
        let cameraObject = res.map((camera) => {
          newCamera.push(
            new Camera(
              camera._id,
              camera.description,
              camera.imageUrl,
              camera.lenses,
              camera.name,
              camera.price
            )
          );
        });

        // Je retourne un block HTML avec l'affichage de chaque appareil photo dans cardProduct
        const cardProduct = document.getElementById('cardProduct')
        let cardView = res.map((camera) => {
            return `
                <div class="d-flex align-items-center mb-5">
                    <div class="col-md-8">
                        <div class="card-image">
                            <a href="product.html?id=${camera._id}">
                                <img alt="${camera.name}" src="${camera.imageUrl}" class="img-center img-fluid rounded" id="picture">
                            </a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <h2><a href="product.html?id=${camera._id}" id="title">${camera.name}</a></h2>
                        <p class="text-sm" id="description">${camera.description}</p>
                        <span class="card-price h5" id="price">${price(camera.price)} €</span>
                        <div class="link mt-3">
                            <a href="product.html?id=${camera._id}">+ de détails sur l'appareil ${camera.name}</a>
                        </div>
                    </div>
                </div>
                 `;
          })
          .join("");
        cardProduct.innerHTML = cardView;
    })
    .catch(err => {
        // affiche dans la console le message d'erreur
        console.log(err)
    })