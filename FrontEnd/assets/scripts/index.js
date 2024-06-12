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

// Gestion de l'événement load quand utilisateur connecté (mode édition)
document.addEventListener("DOMContentLoaded", function () {
    displayMenuUserConnected();
    if (isConnected())
        //  && modal.getAttribute("aria-hidden") === "false" )
    // || modal2.getAttribute("aria-hidden") === "false")
    {
        afficherModale();
        fermerModale();
        // deleteProjet();
        modalNext();
        backModalGallery();
        selectFormCategories();
    }
});

