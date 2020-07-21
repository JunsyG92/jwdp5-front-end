// Création d'un classe pour l'affichage des caméra disponible dans l'api
class Camera {
  constructor(id, description, imageUrl, lenses, name, price) {
    this.id = id;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lenses = lenses;
    this.name = name;
    this.price = price;
  }
}

// Création d'un classe pour ajouter les produits dans le panier
class AddProduct {
  constructor(id, name, imageUrl, price, add) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.add = add;
  }
}

class NewForm {
    constructor(firstName, lastName, email, numberStreet, address, zipCoden, city, creditCard, date, cvc, price, id) {
        this.prenom = firstName;
        this.nom = lastName;
        this.email = email;
        this.numero_de_rue = numberStreet;
        this.adresse = address;
        this.code_postale = zipCoden;
        this.ville = city;
        this.carte_de_credit = creditCard;
        this.date_d_expiration = date;
        this.cvc = cvc;
        this.price = price;
        this.id = id;
    }
    
    isValidCharacter(element) {
        const regExCharacter = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (regExCharacter.test(element)) return true
        else return false
    }
    
    isValidNumber(element) {
        const regExZipCode = /^(?:[0-8]\d|9[0-8])\d{3}$/;
        if (regExZipCode.test(element)) return true
        else return false
    }
    
    isValidCreditCard(element) {
        const regExCreditCard = /^((4\d{3})|(5[1-5]\d{2})|(6011))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$/;
        if (regExCreditCard.test(element)) return true 
        else return false
    }
    
    isValidDate(element) {  
        const regExDate = /^(0[1-9]|1[0-2])\/(2[0-9]|20[2-3][0-9])$/;
        if (regExDate.test(element)) return true
        else return false
    }
    
    isValidMail(element) {
        const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regExMail.test(element)) return true
        else return false
    }
    isValidCVC(element) {
        const regExCVC = /^[0-9]{3}$/;
        if (regExCVC.test(element)) return true
        else return false
    }
    isEmpty = (element) => {
        if(element.trim() !== '') return true;
        else return false;
    }
}

export { Camera, AddProduct, NewForm };
