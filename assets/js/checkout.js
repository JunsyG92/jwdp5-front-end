import { sendForm } from './util/Api.js'
import { badgeCount, cartChekcout, displayPrice, addOrderLocalStorage, getJsonItems } from './util/Function.js';
import { NewForm } from './util/Class.js'

if(getJsonItems().length == 0) {
    const section = document.getElementById('container');
    section.innerHTML = "<p class='text-center mb-0'>Vous n'avez aucun produit dans votre panier. <a href='index.html'>Retourner dans la boutique</a></p>";
} else {
    badgeCount();
    cartChekcout();
    displayPrice();
    
    const formCheckout = document.forms['paiement'];
    const button = document.getElementById('button');
    const errorHtml = document.getElementById('error');
    const totalPriceSpan = document.querySelector('span.total')
    
    button.addEventListener('click', function () {
        event.preventDefault()
    
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
    
        const price = totalPriceSpan.textContent
        price.substring(0, price.length -1)
        const id = Math.floor(Math.random() * 999 + Math.random() * 9999)
        
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
        let errors = {};
        let arrayError = ['firstName', 'lastName', 'email', 'numberStreet', 'address', 'zipCode', 'city', 'creditCard', 'date', 'cvc']
        if (!newDataFrom.isValidCharacter(firstName) && !newDataFrom.isEmpty(firstName)) errors.firstName = 'Une erreur est survenue dans le champ de votre prénom. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidCharacter(lastName) && !newDataFrom.isEmpty(lastName)) errors.lastName = 'Une erreur est survenue dans le champ de votre nom. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidCharacter(address) && !newDataFrom.isEmpty(address)) errors.address = 'Une erreur est survenue dans le champ de votre adresse. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidNumber(numberStreet) && !newDataFrom.isEmpty(numberStreet)) errors.numberStreet = 'Une erreur est survenue dans le numéro de votre rue. Vérifiez à utiliser uniquement des nombres.'
        if (!newDataFrom.isValidCharacter(city) && !newDataFrom.isEmpty(city)) errors.city = 'Une erreur est survenue dans le champ de votre ville. Vérifiez à ne pas utiliser des caractère spéciaux ou des nombres.'
        if (!newDataFrom.isValidNumber(zipCode) && !newDataFrom.isEmpty(zipCode)) errors.zipCode = 'Une erreur est survenue dans le numéro de votre code postale. Vérifiez à utiliser uniquement des nombres.'
        if (!newDataFrom.isValidCreditCard(creditCard) && !newDataFrom.isEmpty(creditCard)) errors.creditCard = 'Veuillez remplir le champ d\'un numéro de carte valide (Celui-ci doit commencer par "4").'
        if (!newDataFrom.isValidDate(date) && !newDataFrom.isEmpty(date)) errors.date = 'Veuillez remplir le champ d\'une date valide (De 01/2020 au 12/2039).'
        if (!newDataFrom.isValidMail(email) && !newDataFrom.isEmpty(email)) errors.email = "Veuillez remplir le champ d'une adresse mail valide"
        if (!newDataFrom.isValidCVC(cvc) && !newDataFrom.isEmpty(cvc)) errors.cvc = 'Veuillez renseigner un code cvc valide'

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
            arrayError.map(value => {
                if(formCheckout[value].classList.contains("is-invalid")) {
                    formCheckout[value].classList.remove("is-invalid")
                }
                formCheckout[value].classList.add('is-valid')
            })
            if(errorHtml.classList.contains("alert-danger")) {
                errorHtml.classList.remove("alert-danger")
            }
            addOrderLocalStorage(newDataFrom)
            setTimeout(
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
}