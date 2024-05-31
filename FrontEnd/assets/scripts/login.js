// Sélection des éléments du DOM 
/**formulaire**/
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
/**lien login*/
const logOut = document.getElementById("login-link");

// Vérifiez la connexion à l'initialisation
document.addEventListener("DOMContentLoaded", function () {
    connect();

    // if (isConnected()) {
    //     window.location.href = "index.html"; // Redirige vers index.html si l'utilisateur est déjà connecté
    // } else {
    //     connect(); // Configure l'écouteur d'événement pour le formulaire de connexion
    // }
    //   disConnect(); // Configure l'écouteur d'événement pour le bouton de déconnexion
    //   updateLogoutButton(); // Met à jour le texte du bouton de déconnexion
});

