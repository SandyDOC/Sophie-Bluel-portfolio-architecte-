/*** Gestion de la page LOGIN du formulaire de CONNEXION */

// Sélection des éléments du DOM 
/**formulaire**/
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
/**lien login*/
const log = document.getElementById("login-link");

// Gestion de l'événement load : vérifiez la connexion à l'initialisation
document.addEventListener("DOMContentLoaded", function () {
    connect();
});

