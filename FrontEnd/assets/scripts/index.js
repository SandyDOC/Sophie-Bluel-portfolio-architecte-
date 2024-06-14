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

/** Affichage des travaux  et filtres par catégories**/
const gallery = document.querySelector('.gallery');
const categoryButtonsContainer = document.getElementById('filter-buttons');
// Fetch pour récupérer les travaux de l'API
let projets = [];
fetchWorks()
    .then(projetsJson => {
        projets = projetsJson;
        displayWorks(projets)
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Fetch pour récupérer les catégories de l'API
fetchCategories()
    .then(categories => {
        displayCategories(categories, projets)
        // console.log(categories);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Gestion de l'événement load quand utilisateur se connecte et est connecté (mode édition)
document.addEventListener("DOMContentLoaded", async function () {

    // Variables et sélecteurs
    

    //Changement d'affichage quand l'utilisateur se connecte
    displayMenuUserConnected();
    // Quand l'utilisateur est connecté
    if (isConnected()) {
        // afficherModale();
        fermerModale();

       
        // deleteProjet(idProject);

        modalNext();
        backModalGallery();
        
        //previewImg();
        //selectFormCategories();
        //addWork();
        //verifFormCompleted()
    }
});

