/*** EXECUTION ou lancement des fonctionnalités de la gestion des projets (ou travaux) 
lors de la CONNEXION en tant qu'utilisateur ****/

// Variables de sélecteurs
/** Affichage des travaux et filtres par catégories**/
const gallery = document.querySelector('.gallery');
const categoryButtonsContainer = document.getElementById('filter-buttons');
/** Connexion **/
const token = window.localStorage.getItem("token");
const logLink = document.getElementById("login-link");
/** Mode édition **/
const modeEditOverlay = document.querySelector('.mode-edit-overlay');
const editModif = document.querySelector('.edit-modif');
/** Modal **/
const modal = document.getElementById('modal');
const closeCrossList = document.querySelectorAll('.close-modal-button');
const galleryModal = document.querySelector('.galleryModal');
const btnAddPhoto = document.querySelector('.addPhoto')

const modal2 = document.getElementById('modal2');
const arrowLeft = document.querySelector('.modal2 .fa-arrow-left');
/* ".containerAddPhoto" */
const imageIcon = document.querySelector('.containerAddPhoto .fa-image');
const addPhotoLabel = document.querySelector('.containerAddPhoto .labelFile');
const formatText = document.querySelector('.containerAddPhoto .txtFormatPhoto');
const formSelect = document.getElementById('categoryInput');
const formAddWorks = document.querySelector("#formAddWorks");
const previewImage = document.getElementById("previewImage");
/* champs du formulaire d'ajout de projet */
const inputTitle = document.getElementById('title')
const inputFile = document.querySelector("#file");
const buttonValidForm = document.querySelector(".btnValider");

/*** Requetes à l'API ****/
// Fetch pour récupérer les travaux de l'API
let projets = [];
fetchWorks()
    .then(projetsJson => {
        projets = projetsJson;
        displayWorksByCategories(projets)
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

/**** Gestion de l'événement load quand l'utilisateur se connecte et est connecté ("mode édition") ***/
document.addEventListener("DOMContentLoaded", async function () {
    //Changement d'affichage quand l'utilisateur se connecte ("mode édition")
    displayMenuUserConnected();
    // Quand l'utilisateur est connecté
    if (isConnected()) {
        closeModal();
        modalNext();
        backModalGallery();
        previewImg();
        selectFormCategories();
        addWork();
        verifFormCompleted();
    };
});

