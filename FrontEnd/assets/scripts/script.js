// Fetch pour récupérer les travaux de l'API
  fetchWorks()
    .then(projets => {

        // Sélection des éléments du DOM
        const gallery = document.querySelector('.gallery');
        
         // Boucle sur les données
        // for (let i = 0; i < projets.length; i++) {
        //     const projet = projets[i];
        projets.forEach (projet => {

            // Création des élément galerie principale
            const figure = document.createElement('figure');
            
            const img = document.createElement('img');
            img.src = projet.imageUrl; // Utilisation de la propriété imageUrl de l'objet projet
            img.alt = projet.title; // Utilisation de la propriété title de l'objet projet
            
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = projet.title; // Utilisation de la propriété title de l'objet projet

            // img.src = projet.imageUrl; // Utilisation de la propriété imageUrl de l'objet projet
            // img.alt = projet.title; // Utilisation de la propriété title de l'objet projet
            // figcaption.textContent = projet.title; // Utilisation de la propriété title de l'objet projet
            
            // Ajout des éléments dans la galerie principal
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);

        })    

            // const figure = document.createElement('figure');
            // const img = document.createElement('img');
            // const figcaption = document.createElement('figcaption');

            // img.src = projet.imageUrl; // Utilisation de la propriété imageUrl de l'objet projet
            // img.alt = projet.title; // Utilisation de la propriété title de l'objet projet
            // figcaption.textContent = projet.title; // Utilisation de la propriété title de l'objet projet

            // figure.appendChild(img);
            // figure.appendChild(figcaption);
            // gallery.appendChild(figure);
        // }

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Fetch pour récupérer les catégories de l'API
fetchCategories()
    .then(categories => {

        // Sélection de l'élément DOM pour les liens de filtre
        const categoryButtonsContainer = document.getElementById('filter-buttons');

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

