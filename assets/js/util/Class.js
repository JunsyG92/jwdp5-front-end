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
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
    
    isValidCharacter(element) {
        const regExCharacter = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (regExCharacter.test(element)) return true
        else return false
    }

    isValidMail(element) {
        const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regExMail.test(element)) return true
        else return false
    }

    isValidAddress(element) {
        const regExAddress = /([a-zA-Zà-ÿ0-9\s]{2,})+$/
        if (regExAddress.test(element)) return true
        else return false
    }
    isEmpty(element) {
        if(element.trim() !== '') return true;
        else return false;
    }
}

export { Camera, AddProduct, NewForm };
