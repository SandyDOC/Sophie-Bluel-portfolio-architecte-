/*** Gestion de page d'accueil HTML des PROJETS(ou travaux : works) */

// Variables et sélecteurs
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

// Fetch Delete
// async function fetchDelete(projectId, token) {
//   return fetch(`http://localhost:5678/api/works/${projectId}`, {
//       method: 'DELETE',
//       headers: {
//           'Authorization': `Bearer ${token}`
//       }
//   });
// }








