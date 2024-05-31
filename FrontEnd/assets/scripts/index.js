/*** Gestion de la page d'accueil HTML du formulaire de CONNEXION en tant qu'utilisateur */

// Variables et sélecteurs
/** Connexion **/
const token = window.localStorage.getItem("token");
const user = window.localStorage.getItem("userId");
// const log = document.getElementById("login-link");
/** Mode édition **/
// const categoryButtonsContainer = document.getElementById('filter-buttons');
const modeEditOverlay = document.querySelector('.mode-edit-overlay');//mode édition
const editModif = document.querySelector('.edit-modif');//modifier
const portfoliotext = document.querySelector('.portfolio-text');

// Gestion de l'événement load 
document.addEventListener("DOMContentLoaded", function () {
    displayMenuUserConnected()
});
