// const token = window.localStorage.getItem("token");
// const user = window.localStorage.getItem("userId");
// const logOut = document.getElementById("login-link");

// const categoryButtonsContainer = document.getElementById('filter-buttons');
// const modeEditOverlay = document.querySelector('.mode-edit-overlay');//mode édition
// const editModif = document.querySelector('.edit-modif');//modifier
// const portfoliotext = document.querySelector('.portfolio-text');

/** Fonctions **/
//Fonction affichage bandeau "mode édition"
// function selectModeEdition() {
//     const modeEditOverlay = document.querySelector('.mode-edit-overlay');//mode édition
//     modeEditOverlay.classList.remove('display-none');
// }
// //Fonction affichage lien "modifier"
// function selectModifier() {
//     const editModif = document.querySelector('.edit-modif');//modifier
//     editModif.classList.remove('display-none');
// }
// //Fonction cache les boutons filtres
// function hideFilters() {
//     const categoryButtonsContainer = document.getElementById('filter-buttons');
//     categoryButtonsContainer.classList.add('display-none')
// }

document.addEventListener("DOMContentLoaded", function () {
    // afficher les menus de l'utilisateur connecté
    displayMenuUserConnected()
//     // if (isConnected() = true){
//     if (isConnected().ok) {
//         selectModeEdition();
//         selectModifier();
//         hideFilters();
//     }
});

//  function logAdmin() {
//     logOut.addEventListener("click", () => {
//       if (user) {
//         window.sessionStorage.setItem("token", "");
//         logOut.textContent = "login";
//         window.sessionStorage.setItem("userId", "");
//         window.location.href = "index.html";
//       } else {
//         //renvoi sur page connexion
//         window.location.href = "login.html";
//       }
//     });
//   }