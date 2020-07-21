import { apiCamera } from "./util/Api.js";
import { Camera } from "./util/Class.js";
import { badgeCount, cartDropdown, price } from "./util/Function.js";

badgeCount();
cartDropdown();
apiCamera("GET", "http://localhost:3000/")
    .then(res => {
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

        let cardView = res
          .map((camera) => {
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
        console.log(err)
    })