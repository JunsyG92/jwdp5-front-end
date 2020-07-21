let keyStorage = localStorage.getItem("Order");
let products = JSON.parse(keyStorage);

let urlcourante = document.location.href;
// Supprimons l'éventuel dernier slash de l'URL
urlcourante  = urlcourante.replace(/\/$/, "");
// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
let queueUrl = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
let idResponse = queueUrl.substring(18);

if (products && products.id == idResponse) {
    let order = document.getElementById("order")
    let reboot = document.querySelectorAll('a');
    
    document.getElementById("title").innerHTML = `Merci pour votre commande ${products.prenom}.`;
    order.innerHTML = `
        Votre numéro de commande : <b>${products.id}</b>. <br>
        Un email de confirmation vous a été envoyé à l'adresse suivante : <b>${products.email}</b>.<br>
        Votre colis vous sera livré à l'adresse suivante : <b>${products.numero_de_rue} ${products.adresse}, ${products.code_postale} ${products.ville}</b>`
    
    for (let i = 0; i < reboot.length; i++) {
        reboot[i].addEventListener("click", function() {
            localStorage.removeItem("Order")
        });
    }
} else if (products && products.id != idResponse && Boolean(idResponse)) {
    const section = document.getElementById('container');
    section.innerHTML =  `<p class='text-center mb-0'>Désolé mais ce numéro de commande ne vous appartient pas.<br>Merci de <a href='index.html'>retourner dans la boutique</a> ou d'aller sur <a href='http://127.0.0.1:5500/front-end/thanks.html?order=${products.id}'>votre numéro de commande</a></p>`;
} else if (Boolean(idResponse) === false) {
    if(products) {
        const section = document.getElementById('container');
        section.innerHTML =  `<p class='text-center mb-0'>Désolé, aucun numéro de commande est stipulé.<br>Merci de <a href='index.html'>retourner dans la boutique</a> ou d'aller sur <a href='http://127.0.0.1:5500/front-end/thanks.html?order=${products.id}'>votre numéro de commande</a></p>`;
    } else {
        const section = document.getElementById('container');
        section.innerHTML = "<p class='text-center mb-0'>Désolé, aucun numéro de commande est stipulé.<br>Merci de <a href='index.html'>retourner dans la boutique</a>";
    }
} else {
    const section = document.getElementById('container');
    section.innerHTML = "<p class='text-center mb-0'>Aucune commande n'a été faite, merci de <a href='index.html'>retourner dans la boutique</a></p>";
}
