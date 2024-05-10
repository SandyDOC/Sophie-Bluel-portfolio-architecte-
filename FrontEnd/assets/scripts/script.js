// Fetch pour récupérer les travaux de l'API
fetchWorks()
    .then(projets => {

        // Sélection des éléments du DOM
        const gallery = document.querySelector('.gallery');

        // Boucle sur les données
        // for (let i = 0; i < projets.length; i++) {
        //     const projet = projets[i];
        projets.forEach(projet => {

            // Création des élément galerie principale
            const figure = document.createElement('figure');

            const img = document.createElement('img');
            img.src = projet.imageUrl; // Utilisation de la propriété imageUrl de l'objet projet
            img.alt = projet.title; // Utilisation de la propriété title de l'objet projet

            const figcaption = document.createElement('figcaption');
            figcaption.textContent = projet.title; // Utilisation de la propriété title de l'objet projet

            // Ajout des éléments dans la galerie principal
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);

        })

    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Fetch pour récupérer les catégories de l'API
fetchCategories()
    .then(categories => {

        // Sélection de l'élément DOM pour les liens de filtre
        const linksOfButtonsFilter = document.getElementById('filter-buttons');

        //Création du bouton "Tous"
        const btnAll = document.createElement("a");
        btnAll.href = "#";
        btnAll.classList.add("filters");
        btnAll.innerHTML = "Tous";
        btnAll.dataset.category = "all";

        //Ajout du bouton "Tous" dans le parent
        linksOfButtonsFilter.appendChild(btnAll);

        // Parcourir les catégories pour créer les boutons
        categories.forEach(category => {

            // Créer les boutons des chaque catégorie (<a href class>category.name</a>)
            const button = document.createElement("a");
            // button.setAttribute("href","#");
            button.href = "#";
            button.classList.add("filters");
            button.innerHTML = category.name;
            button.dataset.category = category.id;

            // Rattachement du bouton créer (<a>) au conteneur des boutons de catégories ('filter-buttons')
            linksOfButtonsFilter.appendChild(button);

            // Ajouter un gestionnaire d'événements au clic sur le bouton

        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des catégories :', error);
    });





