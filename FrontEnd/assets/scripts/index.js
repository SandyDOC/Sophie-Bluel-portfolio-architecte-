/*** Gestion de la CONNEXION en tant qu'utilisateur */

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
/** Modal **/
const galleryModal = document.querySelector('.galleryModal');
const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');

// Gestion de l'événement load quand utilisateur se connecte et est connecté (mode édition)
document.addEventListener("DOMContentLoaded", function () {
    //Changement d'affichage quand l'utilisateur se connecte
    displayMenuUserConnected();
    // Quand l'utilisateur est connecté
    if (isConnected()) {
        // afficherModale();
        fermerModale();

        deleteWork(projectId);

        modalNext();
        backModalGallery();
        
        previewImg();
        // selectFormCategories();
        addWork();
        verifFormCompleted()
    }
});

