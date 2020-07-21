// Promise de l'api
function apiCamera(method, url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
}

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