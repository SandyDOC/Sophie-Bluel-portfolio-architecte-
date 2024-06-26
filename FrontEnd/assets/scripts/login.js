/*** Gestion de la page LOGIN du formulaire de CONNEXION */

// Variables de sélecteurs
/** Formulaire de connexion (LogIn) **/
const loginDiv = document.getElementById("loginDiv");
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
/** Mode édition **/
const modeEditOverlay = document.querySelector('.mode-edit-overlay');
const logLink = document.getElementById("login-link");
const editModif = document.querySelector('.edit-modif');

// Gestion de l'événement load quand l'utilisateur se connecte (vérification de la connexion à l'initialisation) 
document.addEventListener("DOMContentLoaded", function () {
    connect();
});

