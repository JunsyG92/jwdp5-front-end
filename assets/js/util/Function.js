// Cette fonction permet d'afficher le nombre de produits existant dans le panier
// (c'est à dire dans la clé "Product" du localStorage).
// On y retrouve un aperçu dans toutes les pages du site.
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

// getJsonItems retroune un array JSON.parse des éléments se trouvant dans la clé "Product" du localStorage.
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

// Cette fonction créer une nouvelle clé qui se nomme "Product" et prend en valeur les données du produit ajouter au panier.
// On y retrouve un aperçu dans la page produit
const addProductLocalStorage = (data) => {
    localStorage.setItem("Product", JSON.stringify(data));
    badgeCount();
    cartDropdown();
};


// Cette fonction créer une nouvelle clé qui se nomme "Order" ou y on retrouve les informations de l'utilisateur transmise via le formulaire
// et supprime la clé "Product" et ses valeurs. On y retrouve un aperçu dans la page de remerciement.
const addOrderLocalStorage = (data, id) => {
    localStorage.setItem("Order", JSON.stringify(data));
    localStorage.removeItem("Product");
    window.location.href = `thanks.html?order=${id}`;
};

// Cette fonction permet de mettre à jour le localStorage après modification
// (par exemple, si on incrémente un produit à partir de la page panier, le localStorage, le prix totale et le nombre de produit dans le panier se met à jour).
const updateLocalStorage = data => {
    localStorage.setItem("Product", JSON.stringify(data));
    listProductCartFunction();
    badgeCount();
}

// removeProductLocalStorage retire le produit du localStorage.
// On y retrouve un aperçu de cette fonction dans la page du panier.
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


// addMoreProduct s'occupe de l'incrémentation du produit qu'on retrouve dans le localStorage.
// On y retrouve un aperçu de cette fonction dans la page du panier.
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

// removeMoreProduct s'occupe de la décrémentation du produit qu'on retrouve dans le localStorage.
// Lorsque le produit posséde la valeur de "0" dans sa quantité, celui-ci est supprimer de la clé "Produit".
// On y retrouve un aperçu de cette fonction dans la page du panier.
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


// Price() divise la somme donnée par 100.
const price = productPrice => {
    let price = Math.round(productPrice / 100)
    return price
}


// Cette fonction calcule la valeur total du prix de tous les produits existant dans le localStorage.
// Elle prend en compte la quantité d'un produit et le nombre total de produit.
// On y retrouve un aperçu dans le dropdown de la barre de navigation, la page panier et la page checkout.
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

// listProductCartFunction permet d'afficher le contenu du panier à partir des valeurs existante de la clé "Produit" du localStorage.
// On y retrouve un aperçu dans la page panier
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

// cartDropdown permet d'afficher le contenu du panier dans le hover (dropdown) à partir des valeurs existante dans la clé "Produit" du localStorage.
// Celui-ci se trouve au niveau de la barre de navigation (l'icône panier).
// On y retrouve un aperçu dans la page d'accueil et la page produit du site.
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


// cartCheckout permet d'afficher le contenu du panier à partir des valeurs existante dans la clé "Produit" du localStorage.
// On y retrouve un aperçu dans la page checkout
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

// errorMessage affiche les messages d'erreurs retourné par les vérifications de validation des champs de formulaire.
// On y trouve un aperçu dans la page checkout.
const errorMessage = (message) => {
    const info = document.getElementById('error');
    info.classList.remove('d-none')
    info.classList.add('d-block')
    info.innerHTML = `<p>${message}</p>`
}

const conditionsInput = (nameInput, validTypeClass, validEmptyClass) => {
    if (validTypeClass === true && validEmptyClass === true) {
        if(nameInput.classList.contains('is-invalid')) {
            nameInput.classList.remove('is-invalid')
        }
        nameInput.classList.add('is-valid')
        return true
    } else {
        nameInput.classList.add('is-invalid')
        return false
    }
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
  price,
  conditionsInput
};
