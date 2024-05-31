/** Affichage des travaux  et filtres par catégories**/
const gallery = document.querySelector('.gallery');
const categoryButtonsContainer = document.getElementById('filter-buttons');
/** Connexion **/
// const logOut = document.getElementById("login-link");

// const token = window.localStorage.getItem("token");
// const user = window.localStorage.getItem("userId");
/** Mode édition **/
// const categoryButtonsContainer = document.getElementById('filter-buttons');
const modeEditOverlay = document.querySelector('.mode-edit-overlay');//mode édition
const editModif = document.querySelector('.edit-modif');//modifier
const portfoliotext = document.querySelector('.portfolio-text');

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

// import { isConnected } from "./user"; 

// document.addEventListener("DOMContentLoaded", function () {
//     // isConnected()
//     // if (isConnected() = true){
//     if (isConnected().ok) {
//         selectModeEdition();
//         selectModifier();
//         hideFilters();
//     }
// });









