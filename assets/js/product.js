import { apiCamera } from "./util/Api.js";
import { badgeCount, cartDropdown, addProductLocalStorage, getJsonItems, price } from "./util/Function.js";
import { AddProduct } from "./util/Class.js";

badgeCount();
cartDropdown();
// .removeProductLocalStorage();

let urlcourante = document.location.href;
// Supprimons l'éventuel dernier slash de l'URL
urlcourante = urlcourante.replace(/\/$/, "");
// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
let queueUrl = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
let idResponse = queueUrl.substring(16);

// Récupération des élément du DOM
const nameProduct = document.getElementById("nameProduct");
const bigNameProduct = document.getElementById("bigNameProduct");
const pictureFancybox = document.getElementById("pictureFancybox");
const pictureProduct = document.getElementById("pictureProduct");
const idProduct = document.getElementById("idProduct");
const descProduct = document.getElementById("descProduct");
const viewLenses = document.getElementById("viewLenses");
const priceProduct = document.getElementById("priceProduct");
const addToCart = document.getElementById("addToCart");

apiCamera("GET", `http://localhost:3000/${idResponse}`)
  .then((res) => {

    /**
     * Affichage des élément du produit en modifiant le DOM
     */

    // Boucle pour l'affichage des lentilles
    let lenseShow = res.lenses.map((lense) => {
      return `
                <label class="btn btn-lg btn-neutral col-12 mb-2 text-left text-sm">
                    <input type="radio" name="radio-memory" value="1" checked="">
                    ${lense}
                </label>
            `;
    });
    // Ajout des données de l'API aux éléments du DOM
    nameProduct.innerHTML = res.name;
    bigNameProduct.innerHTML = res.name;
    idProduct.innerHTML = "ID : " + res._id;
    descProduct.innerHTML = res.description;
    viewLenses.innerHTML = lenseShow;
    priceProduct.innerHTML = price(res.price) + " €";
    pictureFancybox.setAttribute("href", res.imageUrl);
    pictureProduct.setAttribute("src", res.imageUrl);
    pictureProduct.setAttribute("alt", res.name);

    return res
  })
  .then(res => {
    /**
     * Fonction d'ajout du produit dans le panier
     */

    let add = 1;
    let product = [];

    addToCart.addEventListener("click", function () {
      let productData = new AddProduct(res._id, res.name, res.imageUrl, res.price, add);

      if (!getJsonItems()) {
        product.push(productData);
      } else {
        product = getJsonItems();
        const findProduct = product.find((element) => element.id === productData.id);
        if (findProduct) {
          findProduct.add += 1;
        } else {
          product.push(productData);
        }
      }
      addProductLocalStorage(product);
    });
  })
  .catch((err) => {
    console.log(err);
  });
