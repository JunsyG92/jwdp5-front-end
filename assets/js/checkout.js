import { badgeCount, cartChekcout, displayPrice, addOrderLocalStorage, getJsonItems, conditionsInput } from './util/Function.js';
import { NewForm } from './util/Class.js'

// Je vérifie si la longueur de getJsonItems() est égale à 0
if(getJsonItems().length == 0) {
    // Si c'est le cas je modifie la syntaxe de l'élément HTML qui possède l'id "container" par un message
    const section = document.getElementById('container');
    section.innerHTML = "<p class='text-center mb-0'>Vous n'avez aucun produit dans votre panier. <a href='index.html'>Retourner dans la boutique</a></p>";
} else {
    // Je fais appel aux fonctions suivante :
    badgeCount();
    cartChekcout();
    displayPrice();
    
    let errors = {};
    // Je récupère différents éléments HTML
    const formCheckout = document.forms['paiement'];
    const button = document.getElementById('button');
    const errorHtml = document.getElementById('error');

    errorHtml.classList.remove('d-none')

    button.addEventListener('click', function () {
        event.preventDefault()

        const products = []
        const firstName = formCheckout['firstName'].value;
        const lastName = formCheckout['lastName'].value;
        const address = formCheckout['address'].value;
        const city = formCheckout['city'].value;
        const email = formCheckout['email'].value;
        
        getJsonItems().map(product => {
            products.push(product.id)
        })
        
        const newDataForm = new NewForm(
            firstName,
            lastName,
            address,
            city,
            email
        )
        const validationInput = (array) => {
            array.map(inputValue => {
                formCheckout[inputValue].classList.remove('is-invalid')
                formCheckout[inputValue].addEventListener('change', e => {
                    let value = e.target.value
                    if(inputValue === 'email'){
                        if (conditionsInput(formCheckout['email'], newDataForm.isValidMail(value), newDataForm.isEmpty(value))) {
                            console.log('succés')
                        } else {
                            console.log('echec')
                        }
                        
                    } else if (inputValue === 'address') {
                        conditionsInput(formCheckout['address'], newDataForm.isValidAddress(value), newDataForm.isEmpty(value))
                    } else {
                        conditionsInput(formCheckout[inputValue], newDataForm.isValidCharacter(value), newDataForm.isEmpty(value))
                    }
                    
                })
            })
        }
        
        let array = ['firstName', 'lastName', 'address', 'city', 'email']
        validationInput(array)
        
    // Je créer une nouvelle instance newDataForm avec la class New Form

        array.map(e => {
            if(!formCheckout[e].value) {
                formCheckout[e].classList.add('is-invalid')
            }
        })
        let infos = {}
        if(newDataForm.isValidCharacter(firstName) === false || newDataForm.isEmpty(firstName) === false ) {
             errors.firstName = "Une erreur est survenue dans le champ de votre prénom. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres."
            } else {
                infos.firstName = firstName
            }
        if(newDataForm.isValidCharacter(lastName) === false  || newDataForm.isEmpty(lastName) === false ) {
             errors.lastName = "Une erreur est survenue dans le champ de votre nom. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres."
            } else {
                infos.lastName = lastName
            }
        if(newDataForm.isValidAddress(address) === false  || newDataForm.isEmpty(address) === false ) {
             errors.address = "Une erreur est survenue dans le champ de votre adresse. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres."
            } else {
                infos.address = address
            }
        if(newDataForm.isValidCharacter(city) === false  || newDataForm.isEmpty(city) === false ) {
             errors.city = "Une erreur est survenue dans le champ de votre ville. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres."
            } else {
                infos.city = city
            }
        if(newDataForm.isValidMail(email) === false  || newDataForm.isEmpty(email) === false ) {
            errors.email = "Veuillez remplir le champ d'une adresse mail valide"
        } else {
            infos.email = email
        }
 
        if (Object.keys(errors).length != 0) {
            errorHtml.innerHTML = ""
            errorHtml.classList.add('alert-danger')
            if(errorHtml.classList.contains("alert-success")) {
                errorHtml.classList.remove("alert-success")
            }
            for(let error in errors) {
                formCheckout[error].classList.remove('is-valid')
                formCheckout[error].classList.add('is-invalid')
                errorHtml.innerHTML += `<li class="ml-5">${errors[error]}</li>`
            }
        } else {
            array.map(e => {
                formCheckout[e].classList.remove('is-invalid')
                formCheckout[e].classList.add('is-valid')
            })
            if(errorHtml.classList.contains("alert-danger")) {
                errorHtml.classList.remove("alert-danger")
            }
            
            let jsonBody = {
                contact: infos,
                products: products
            }
            const options = {
                method: 'POST',
                body: JSON.stringify(jsonBody),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            fetch("http://localhost:3000/api/cameras/order", options)
              .then(res => {
                  return res.json()
              })
              .then(data => {
                  errorHtml.classList.add('alert-success')
                  errorHtml.innerHTML = '<p>Transaction en cours...</p>'
                  let id = data.orderId
                  addOrderLocalStorage(data, id)
              })
              .catch(err => {
                console.log("test : " + err)
              })
        }
    })
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}