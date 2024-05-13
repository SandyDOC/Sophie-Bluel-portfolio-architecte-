// Fetch pour récupérer les travaux de l'API
fetchWorks()
    .then(projets => {
        displayWorks(projets)
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Fetch pour récupérer les catégories de l'API
fetchCategories()
    .then(categories => {
        displayCategories(categories)
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });







