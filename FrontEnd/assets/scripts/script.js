// Récupération des travaux depuis l'url GET de l'API
// const result = fetch('http://localhost:5678/api/works')
//   .then(response => response.json())
//   .then(data => console.log(data));

// Fetch pour récupérer les travaux de l'API
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(projets => {
        const gallery = document.querySelector('.gallery');

        for (let i = 0; i < projets.length; i++) {
            const projet = projets[i];

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            img.src = projet.imageUrl; // Utilisation de la propriété imageUrl de l'objet projet
            img.alt = projet.title; // Utilisation de la propriété title de l'objet projet
            figcaption.textContent = projet.title; // Utilisation de la propriété title de l'objet projet

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Fetch pour récupérer les catégories de l'API
// fetch('http://localhost:5678/api/categories')
//   .then(response => response.json())
//   .then(categories => {
//     // Utilisation de l'objet Set pour stocker les catégories uniques
//     const categoriesSet = new Set();
//     // Parcourir les catégories pour les ajouter à l'ensemble
//     for (let i = 0; i < categories.length; i++) {
//       categoriesSet.add(categories[i]);
//     }
//     // Génération dynamique du menu de catégories à partir de l'objet Set
//     const menu = document.querySelector('#menu-categories');
//     // Parcourir l'ensemble des catégories uniques pour créer les éléments du menu de catégories
//     const categoriesArray = Array.from(categoriesSet);
//     for (let i = 0; i < categoriesArray.length; i++) {
//       const catégorie = categoriesArray[i];
//       const menuItem = document.createElement('li');
//       menuItem.textContent = catégorie;
//       // Ajouter un gestionnaire d'événements pour trier les travaux au clic sur une catégorie
//       menuItem.addEventListener('click', function() {
//         // Récupère la catégorie sélectionnée
//         const selectedCategory = menuItem.textContent;
//         // Sélectionne tous les travaux dans la galerie
//         const allProjects = document.querySelectorAll('.gallery figure');
//         // Parcours tous les travaux
//         for (let j = 0; j < allProjects.length; j++) {
//           const project = allProjects[j];
//           // Si le travail correspond à la catégorie sélectionnée, l'affiche, sinon le cache
//           if (project.textContent.includes(selectedCategory)) {
//             project.style.display = 'block';
//           } else {
//             project.style.display = 'none';
//           }
//         }
//       });


// Fetch pour récupérer les catégories de l'API
fetch('http://localhost:5678/api/categories')

    .then(response => response.json())
    .then(categories => {
        const categoryButtonsContainer = document.getElementById('filter-buttons');
        // const categoryButtonsContainer = document.getElementById('category-buttons');

        // Parcourir les catégories pour créer les boutons
        categories.forEach(category => {
            // Créer un bouton (input de type button)
            const button = document.createElement('input');
            button.type = 'button';
            button.value = category.name;

            console.log(categories)
            console.log(categories.length)

            // Ajouter un gestionnaire d'événements au clic sur le bouton
            button.addEventListener('click', function () {
                filterProjectsByCategory(category.name);
            });

            // Ajouter le bouton au conteneur des boutons de catégories
            categoryButtonsContainer.appendChild(button);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
    });

// Fonction pour filtrer les travaux par catégorie
function filterProjectsByCategory(category) {
    // Sélectionner tous les travaux dans la galerie
    const allProjects = document.querySelectorAll('.gallery figure');

 // Parcourir tous les travaux
//      for (let j = 0; j < allProjects.length; j++) {
//      const project = allProjects[j];//
    allProjects.forEach(project => {

        // Si le projet appartient à la catégorie sélectionnée, l'afficher, sinon le cacher
        if (project.textContent.includes(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

