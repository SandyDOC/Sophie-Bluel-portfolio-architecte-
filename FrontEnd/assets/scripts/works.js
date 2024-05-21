
const fetchWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();

}

const fetchCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
};

const displayWorks = (idCategorie = 0) => {
    let filteredWorks;

    if (idCategorie > 0) {
        filteredWorks = projets.filter((projet) => {
            return projet.categoryId == idCategorie;
        });
    } else {
        filteredWorks = projets;
    }
    // vide la gallery
    gallery.innerHTML = "";

    filteredWorks.forEach(projet => {
        // Création des élément galerie principale
        const figure = document.createElement('figure');
        figure.dataset.id = projet.id;

        const img = document.createElement('img');
        img.src = projet.imageUrl;
        img.alt = projet.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = projet.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

//Création du bouton "Tous"
const createBtnAll = () => {
    const btnAll = document.createElement("button");
    btnAll.classList.add("filters");
    btnAll.innerHTML = "Tous";
    btnAll.dataset.category = 0;

    btnAll.addEventListener('click', (event) => {
        displayWorks();
        btnSelected(event);
        // btnSelected();
    });

    categoryButtonsContainer.appendChild(btnAll);//Ajout du bouton "Tous" dans le parent
};

//Création des boutons de chaque catégorie
const createCategory = (category) => {
    const button = document.createElement("button");
    button.classList.add("filters");
    button.innerHTML = category.name;
    button.dataset.category = category.id;

    button.addEventListener('click', () => {
        displayWorks(category.id);
        btnSelected(event);
        // btnSelected();
    });

    // Rattachement du bouton créé au conteneur des boutons de catégories ('filter-buttons')
    categoryButtonsContainer.appendChild(button);
}

// Créer tous les boutons de toutes les catégories (<a href class>category.name</a>)
const displayCategories = (categories) => {
    // Réinitialise le conteneur des boutons de catégorie
    // categoryButtonsContainer.innerHTML = "";
    createBtnAll();
    categories.forEach(category => {
        createCategory(category);
    })
};
// Fonction pour ajouter la classe 'btn_selected' au bouton cliqué
const btnSelected = (event) => {
    // Sélectionne tous les boutons de filtre
    const buttons = document.querySelectorAll(".filters");

    // Parcours de tous les boutons avec une boucle for
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        // Ajoute la classe 'btn_selected' au bouton cliqué
        if (button === event.target) {
            button.classList.add("btn_selected");
        } else {
            button.classList.remove("btn_selected");
        }
    }
};
