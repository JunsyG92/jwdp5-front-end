// La fonction qui représente la base de l'application.
// Elle prend en paramètre une méthode ainsi qu'une URL et retourne une nouvelle Promesse
function apiCamera(method, url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
}

// L'envoie du formulaire passe par une fonction qui prend quatre paramètres :
// une méthode, une URL, un corp de body et une redirection. Elle retourne une nouvelle Promesse.
function sendForm (method, url, jsonBody, redirection) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.onload = () => resolve(window.location.href = redirection);
      xhr.onerror = () => reject(console.log("Une erreur est survenue"));
      xhr.send(JSON.stringify(jsonBody));
    });
}

export { apiCamera, sendForm }