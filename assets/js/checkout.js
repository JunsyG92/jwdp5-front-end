import { sendForm } from './util/Api.js'
import { badgeCount, cartChekcout, displayPrice, addOrderLocalStorage, getJsonItems } from './util/Function.js';
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
    
    // Je récupère différents éléments HTML
    const formCheckout = document.forms['paiement'];
    const button = document.getElementById('button');
    const errorHtml = document.getElementById('error');
    const totalPriceSpan = document.querySelector('span.total')
    

    // Au click de l'élément "Button"
    button.addEventListener('click', function () {
        // J'annule l'événement par défaut
        event.preventDefault()
    
        // Je supprime une class puis j'initialise dans différente variable les valeur des inputs du formulaire
        errorHtml.classList.remove('d-none')
        const firstName = formCheckout['firstName'].value;
        const lastName = formCheckout['lastName'].value;
        const address = formCheckout['address'].value;
        const numberStreet = formCheckout['numberStreet'].value;
        const zipCode = formCheckout['zipCode'].value;
        const city = formCheckout['city'].value;
        const creditCard = formCheckout['creditCard'].value;
        const date = formCheckout['date'].value;
        const email = formCheckout['email'].value;
        const cvc = formCheckout['cvc'].value;
    
        // Je récupère le prix de l'élément html que je multiplie pour créer un id aléatoire
        const price = totalPriceSpan.textContent
        price.substring(0, price.length -1)
        const id = Math.floor(Math.random() * 999 + Math.random() * 9999)
        
        // Je créer une nouvelle instance newDataForm avec la class New Form
        const newDataFrom = new NewForm(
            firstName,
            lastName,
            email,
            numberStreet,
            address,
            zipCode,
            city,
            creditCard,
            date,
            cvc,
            price,
            id
        )

        // J'initialise un objet vide ainsi qu'un array qui possède tous les noms des inputs présent dans le formulaire
        // Je vérifie si chaque formulaire répond aux attentes des données transmises
        let errors = {};
        let arrayError = ['firstName', 'lastName', 'email', 'numberStreet', 'address', 'zipCode', 'city', 'creditCard', 'date', 'cvc']
        if (!newDataFrom.isValidCharacter(firstName) || !newDataFrom.isEmpty(firstName)) errors.firstName = 'Une erreur est survenue dans le champ de votre prénom. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidCharacter(lastName) || !newDataFrom.isEmpty(lastName)) errors.lastName = 'Une erreur est survenue dans le champ de votre nom. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidCharacter(address) || !newDataFrom.isEmpty(address)) errors.address = 'Une erreur est survenue dans le champ de votre adresse. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidNumber(numberStreet) || !newDataFrom.isEmpty(numberStreet)) errors.numberStreet = 'Une erreur est survenue dans le numéro de votre rue. Vérifiez à utiliser uniquement des nombres.'
        if (!newDataFrom.isValidCharacter(city) || !newDataFrom.isEmpty(city)) errors.city = 'Une erreur est survenue dans le champ de votre ville. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidNumber(zipCode) || !newDataFrom.isEmpty(zipCode)) errors.zipCode = 'Une erreur est survenue dans le numéro de votre code postale. Vérifiez à utiliser uniquement des nombres.'
        if (!newDataFrom.isValidCreditCard(creditCard) || !newDataFrom.isEmpty(creditCard)) errors.creditCard = 'Veuillez remplir le champ d\'un numéro de carte valide (Celui-ci doit commencer par "4").'
        if (!newDataFrom.isValidDate(date) || !newDataFrom.isEmpty(date)) errors.date = 'Veuillez remplir le champ d\'une date valide (De 01/2020 au 12/2039).'
        if (!newDataFrom.isValidMail(email) || !newDataFrom.isEmpty(email)) errors.email = "Veuillez remplir le champ d'une adresse mail valide"
        if (!newDataFrom.isValidCVC(cvc) || !newDataFrom.isEmpty(cvc)) errors.cvc = 'Veuillez renseigner un code cvc valide'

        // Si la longueur de l'objet errors n'est pas égale à 0 on affiche les message d'erreurs avec le changement des class des inputs
        if (Object.keys(errors).length != 0) {
            errorHtml.innerHTML = ""
            errorHtml.classList.add('alert-danger')
            if(errorHtml.classList.contains("alert-success")) {
                errorHtml.classList.remove("alert-success")
            }
            for(let error in errors) {
                formCheckout[error].classList.add('is-invalid')
                errorHtml.innerHTML += `<li class="ml-5">${errors[error]}</li>`
            }
        } else {
            // sinon on boucle dans l'array arrayError afin de retirer la class "is-invalid" des inputs qui l'a possède et on rajoute a la place la 
            // class "is-valid"
            // Idem pour la class "alert-danger"
            arrayError.map(value => {
                if(formCheckout[value].classList.contains("is-invalid")) {
                    formCheckout[value].classList.remove("is-invalid")
                }
                formCheckout[value].classList.add('is-valid')
            })
            if(errorHtml.classList.contains("alert-danger")) {
                errorHtml.classList.remove("alert-danger")
            }
            // On appel la fonction addOrderLocalStorage et on lui passe en paramètre newDataForm
            addOrderLocalStorage(newDataFrom)
            setTimeout(
                // Appel de la fonction sendform avec les paramètres attendu et affiche un message en cas de succés ou d'erreur
                sendForm('POST', "http://localhost:3000/order", newDataFrom, `http://127.0.0.1:5500/front-end/thanks.html?order=${id}`)
                  .then(res => {
                    errorHtml.classList.add('alert-success')
                    errorHtml.innerHTML = '<p>Transaction en cours...</p>'
                  })
                  .catch(err => {
                      console.log(err)
                  })
                , 1000)
        }
    })
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}