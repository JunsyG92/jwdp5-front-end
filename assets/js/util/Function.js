// Calcule le nombre de produit existant dans le Local Storage
const badgeCount = () => {
    if(document.getElementById("badge")) {
        let badge = document.getElementById("badge");
    
        if (!getJsonItems()) {
            badge.classList.add("d-none");
        } else {
            let quantityCart = 0;
            for (let i in getJsonItems()) {
                quantityCart += getJsonItems()[i].add
                badge.innerHTML = quantityCart
            }
        }
    }
};
/**
 * [getJsonItems description]
 * Retourne en format JSON.parse les valeurs de la clé "Product" du localStrage
 *
 * @return  {[products]}  products récupère la clé "Product" du localStorage
 */

const getJsonItems = () => {
    if (localStorage.getItem("Product")) {
        let keyStorage = localStorage.getItem("Product");
        let products = JSON.parse(keyStorage);
        return products;
    } else {
        let products = []
        return products;
    }
};

// Ajouter un produit dans le Local Storage
const addProductLocalStorage = (data) => {
    localStorage.setItem("Product", JSON.stringify(data));
    badgeCount();
    cartDropdown();
};

const addOrderLocalStorage = (data) => {
    localStorage.setItem("Order", JSON.stringify(data));
    localStorage.removeItem("Product", JSON.stringify(data));
};

const updateLocalStorage = data => {
    localStorage.setItem("Product", JSON.stringify(data));
    listProductCartFunction();
    badgeCount();
}

// Supprimer un produit ou un ensemble de produit avec la même clé du Local    Storage
const removeProductLocalStorage = () => {
    var arrayIds = []
    if(getJsonItems().length > 0) {
        getJsonItems().map(product => {
            arrayIds.push(product)
            let removeProduct = document.getElementById('product-' + product.id);
            removeProduct.addEventListener("click", function() {
                let findObject = arrayIds.find(x => x.id === product.id)
                let keyObject = arrayIds.indexOf(findObject)
                arrayIds.splice(keyObject, 1)
                updateLocalStorage(arrayIds);
            })
        })
    }
}

const addMoreProduct = () => {
    var arrayIds = []
    if(getJsonItems().length > 0) {
        getJsonItems().map(product => {
            arrayIds.push(product)
            let removeProduct = document.getElementById('more-' + product.id);
            removeProduct.addEventListener("click", function() {
                product.add++
                updateLocalStorage(arrayIds);
            })
        })
    }
}
const removeMoreProduct = () => {
    let arrayIds = []
    if(getJsonItems().length > 0) {
        getJsonItems().map(product => {
            arrayIds.push(product)
            let removeProduct = document.getElementById('less-' + product.id);
            removeProduct.addEventListener("click", function() {
                product.add--
                updateLocalStorage(arrayIds);
                if(product.add == 0) {
                    let findObject = arrayIds.find(x => x.id === product.id)
                    let keyObject = arrayIds.indexOf(findObject)
                    arrayIds.splice(keyObject, 1)
                    updateLocalStorage(arrayIds);
                }
            })
        })
    }
}

const price = product => {
    let price = Math.round(product / 100)
    return price
}

const displayPrice = () => {
    let totalPrice = document.querySelector("span.total");
    let total = 0;
    if(getJsonItems().length > 0) {
        getJsonItems().map(product => {
            total += price(product.price) * product.add;
            totalPrice.innerHTML = `${total} €`;
        }).join("");
    } else {
        if (document.getElementById("cart-empty")) {
            let badge = document.getElementById("badge");
            let container = document.getElementById("cart-empty");
            container.innerHTML = "<p class='text-center mb-0'>Vous n'avez aucun produit dans votre panier. <a href='index.html'>Retourner dans la boutique</a></p>";
            badge.classList.add("d-none");
        }
    }
}

// Afficher la liste des produit du Local Storage dans le panier

const listProductCartFunction = () => {
  if(getJsonItems()) {
    let listProductCart = document.getElementById("list-array");

    let productCart = getJsonItems().map((product) => {
        return ` 
            <tr class="table-divider"></tr>
            <tr>
                <th scope="row">
                    <div class="media align-items-center">
                        <img alt="Image placeholder" src="${product.imageUrl}" style="width: 80px;">
                        <div class="media-body pl-3">
                            <div class="lh-100">
                                <a href="product.html?id=${product.id}" class="font-weight-bold mb-0">${product.name}</a>
                            </div>
                        </div>
                    </div>
                </th>
                <td class="price text-right pr-5">${price(product.price)} €</td>
                <td class="text-center pr-">
                    <button class="less bg-transparent border-0" id="less-${product.id}" >
                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </button>
                    
                    ${product.add}
                
                    <button class="more bg-transparent border-0" id="more-${product.id}" >
                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </button>
                </td>
                <td class="text-right">${price(product.price) * product.add} €</td>
                <td class="text-right pr-5">
                    <button class="remove bg-transparent border-0" id="product-${product.id}" >
                        <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-x-circle-fill text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    })
    .join("");
    listProductCart.innerHTML = productCart;
  }

  displayPrice();
  addMoreProduct();
  removeMoreProduct();
  removeProductLocalStorage()
};

// Afficher la liste des produit du Local Storage dans le hover du panier
const cartDropdown = () => {
  const listCart = document.getElementById("listCart");
  const table = document.getElementById('table-dropdown');
  const noProducts = document.getElementById('not-products');
  const priceDropdown = document.getElementById('price-dropdown');
  
  if (getJsonItems() != null) {
      let productCart = getJsonItems().map((product) => {
          return `
              <tr class="table-divider"></tr>
              <tr>
                  <th scope="row">
                      <div class="media align-items-center">
                          <img alt="Image placeholder" src="${product.imageUrl}" class="" style="width: 80px;">
                          <div class="media-body pl-3">
                              <div class="lh-100">
                                  <a href="product.html?id=${product.id}" class="font-weight-bold mb-0">${product.name}</a>
                              </div>
                          </div>
                      </div>
                  </th>
                  <td class="price text-right pr-5">${price(product.price)} €</td>
                  <td class="price text-right pr-5">${product.add}</td>
                  <td class="price text-right pr-5">${price(product.price) * product.add} €</td>
                  <td class="text-right">
                      <button class="remove bg-transparent border-0" id="product-${product.id}" >
                          <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-x-circle-fill text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
                          </svg>
                      </button>
                  </td>
              </tr>
          `;
        }).join("");
        noProducts.classList.add('d-none');
        noProducts.classList.remove('d-block');
        table.classList.add('d-block');
        priceDropdown.classList.remove('d-none');
        listCart.innerHTML = productCart;
        displayPrice();
    } 
    
    if (getJsonItems().length === 0) {
        table.classList.add('d-none');
        priceDropdown.classList.add('d-none');
        noProducts.classList.add('d-block');
        table.classList.remove('d-block');
        noProducts.innerHTML = "<p class='text-center mb-0'>Vous n'avez aucun produit dans votre panier</p>";
    }
};

const cartChekcout = () => {
    const listChekout = document.getElementById("listChekout");
    const quantityProduct = document.getElementById("quantityProduct");
    const delivery = document.getElementById("delivery");
    const getTotal = document.getElementById("total")
    if (getJsonItems()) {
        let productNumber = 0;
        let checkoutProduct = getJsonItems().map(product => {
            
            productNumber += product.add
            if (getJsonItems().length == 1 && product.add == 1) {
                quantityProduct.innerHTML = productNumber + " produit"
            } else {
                quantityProduct.innerHTML = productNumber + " produits"
            }
            return `
            <div class="row py-3">
                <div class="col-8">
                    <div class="media align-items-center">
                        <img alt="Image placeholder" class="mr-2" src="${product.imageUrl}" style="width: 42px;">
                        <div class="media-body">
                            <div class="text-limit lh-100">
                                <small class="font-weight-bold mb-0"><a href="product.html?id=${product.id}">${product.name}</a></small>
                            </div>
                            <small class="text-muted">${product.add} x ${price(product.price)} €</small>
                        </div>
                    </div>
                </div>
                <div class="col-4 text-right lh-100">
                    <small class="text-dark total">${product.add * price(product.price)} €</small>
                </div>
            </div>
            `
        }).join("");
        let deliveryPrice = 250
        listChekout.innerHTML = checkoutProduct
        delivery.innerHTML = deliveryPrice + " €"
        
        let total = 0;
        if(getJsonItems()) {
            getJsonItems().map(product => {
                total += price(product.price) * product.add;
                getTotal.innerHTML = `${total + deliveryPrice} €`;
            }).join("");
        }

    }
}

const errorMessage = (message) => {
    const info = document.getElementById('error');
    info.classList.remove('d-none')
    info.classList.add('d-block')
    info.innerHTML = `<p>${message}</p>`
}

export {
  badgeCount,
  cartDropdown,
  addProductLocalStorage,
  addOrderLocalStorage,
  listProductCartFunction,
  getJsonItems,
  removeProductLocalStorage,
  cartChekcout,
  displayPrice,
  errorMessage,
  price
};
