let keyStorage = localStorage.getItem("Order");
let products = JSON.parse(keyStorage);

const searchParams = new URLSearchParams(document.location.href)
let idResponse
for(let p of searchParams) {
    idResponse = p[1]
}

const section = document.getElementById("container")
if (products && products.orderId == idResponse) {
    let order = document.getElementById("order")
    let reboot = document.querySelectorAll('a');
    
    document.getElementById("title").innerHTML = `Merci pour votre commande ${products.contact.firstName}.`;
    order.innerHTML = `
        Votre numéro de commande : <b>${products.orderId}</b>. <br>
        Un email de confirmation vous a été envoyé à l'adresse suivante : <b>${products.contact.email}</b>.<br>
        Votre colis vous sera livré à l'adresse suivante : <b>${products.contact.address}, ${products.contact.city}</b>`
    
    for (let i = 0; i < reboot.length; i++) {
        reboot[i].addEventListener("click", function() {
            localStorage.removeItem("Order")
        });
    }
} else if (products && products.orderId != idResponse && Boolean(idResponse)) {
    section.innerHTML =  `<p class='text-center mb-0'>Désolé mais ce numéro de commande ne vous appartient pas.<br>Merci de <a href='index.html'>retourner dans la boutique</a> ou d'aller sur <a href='http://127.0.0.1:5500/front-end/thanks.html?order=${products.orderId}'>votre numéro de commande</a></p>`;
} else if (Boolean(idResponse) === false) {
    if(products) {
        section.innerHTML =  `<p class='text-center mb-0'>Désolé, aucun numéro de commande est stipulé.<br>Merci de <a href='index.html'>retourner dans la boutique</a> ou d'aller sur <a href='http://127.0.0.1:5500/front-end/thanks.html?order=${products.orderId}'>votre numéro de commande</a></p>`;
    } else {
        section.innerHTML = "<p class='text-center mb-0'>Désolé, aucun numéro de commande est stipulé.<br>Merci de <a href='index.html'>retourner dans la boutique</a>";
    }
} else {
    section.innerHTML = "<p class='text-center mb-0'>Aucune commande n'a été faite, merci de <a href='index.html'>retourner dans la boutique</a></p>";
}
