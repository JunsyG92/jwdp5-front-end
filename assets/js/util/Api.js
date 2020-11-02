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

export { apiCamera }