let projets = [];

// Sélection de l'élément DOM pour les liens de filtre
const categoryButtonsContainer = document.getElementById('filter-buttons');

// Sélection des éléments du DOM
const gallery = document.querySelector('.gallery');

// Fetch pour récupérer les travaux de l'API
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
        console.log(categories);
        // console.log(categories[0].name);

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Fetch pour récupérer les filtres sélectionnés des catégories 
fetchCategories()
    .then(categories => {
        for (let i = 0; i < categories.length; i++) {
            categoriesSelect = categories[i].name;
            console.log(categoriesSelect)
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });









