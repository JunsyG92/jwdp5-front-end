// Cette classe reprèsente la base de l'application.
// Elle prend dans son constructeur tous les champs que l'api nous retourne (id, description, image, lentilles, nom et le prix).
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

// La classe AddProduct permet de créer de nouveaux objets de produits pour, plus tard, l'ajout dans le panier. Dans son constructeur, on y retrouve :
// l'id, le nom, l'image, le prix et sa quantité
class AddProduct {
  constructor(id, name, imageUrl, price, add) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.add = add;
  }
}

// NewForm est une classe qui créera de nouveaux objets pour l'envoie du formulaire.
// Celui-ci fera des vérifications au niveau des données qu'on lui passera dans son constructeur
// (Prénom, nom, email, N° de rue, adresse, code postal, ville, carte de crédit, date d'expiration et le code CVC).
// On y retrouve aussi deux champs qui n'ont pas besoin de vérification : l'id et le prix.
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
        const regExZipCode = /^([0-9]{1,5}$)/;
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
