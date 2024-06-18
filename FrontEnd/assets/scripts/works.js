/*** Fonctionnalités de la galerie principale de la page d'accueil */

// Fonction pour récupérer les travaux
async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const respWorks = await response.json();
    return respWorks;
}

// Fonction pour récupérer les catégories
async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const respCategories = await response.json();
    return respCategories;
}
// Fonction pour afficher les travaux filtrés par catégorie
function displayWorks(idCategorie = 0) {
    let filteredWorks;

    if (idCategorie > 0) {
        filteredWorks = projets.filter(function (projet) {
            return projet.categoryId == idCategorie;
        });
    } else {
        filteredWorks = projets;
    }
    // Vide la galerie
    gallery.innerHTML = "";

    for (let i = 0; i < filteredWorks.length; i++) {
        const projet = filteredWorks[i];
        createWork(projet)
    }
}

/* affichage des works dans le dom */
function displayWorksGallery() {
    gallery.innerHTML = "";
    fetchWorks()
    .then((data) => {
        // console.log(data);
        data.forEach((projet) => {
            createWork(projet)
        });
    });
}

//Fonction pour créer les éléments de la galerie principale 

function createWork(projet) {
    const figure = document.createElement('figure');
    figure.dataset.id = projet.id;

    const img = document.createElement('img');
    img.classList.add('sizeImg')
    img.src = projet.imageUrl;
    img.alt = projet.title;

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = projet.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

// Fonction pour créer et afficher tous les boutons de catégories
function displayCategories(categories) {
    // Réinitialise le conteneur des boutons de catégorie
    categoryButtonsContainer.innerHTML = "";

    // Création du bouton "Tous"
    const btnAll = document.createElement("button");
    btnAll.classList.add("btn");
    btnAll.classList.add("filters");
    btnAll.classList.add("btn_selected");
    btnAll.innerHTML = "Tous";
    btnAll.dataset.category = 0;

    categoryButtonsContainer.appendChild(btnAll);
    btnAll.addEventListener('click', handleFilterButtonClick);

    // Création des boutons de chaque catégorie
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("filters");
        button.innerHTML = category.name;
        button.dataset.category = category.id;

        categoryButtonsContainer.appendChild(button);
        button.addEventListener('click', handleFilterButtonClick);
    }
}

// Fonction pour ajouter la classe 'btn_selected' au bouton cliqué pour qu'il reste 'vert'
function btnSelected(event) {
    const buttons = document.querySelectorAll(".filters");

    for (let i = 0; i < buttons.length; i++) {
        const buttonSelect = buttons[i];
        if (buttonSelect === event.target) {
            buttonSelect.classList.add("btn_selected");
        } else {
            buttonSelect.classList.remove("btn_selected");
        }
    }
}

// Fonction pour gérer l'événement 'click' des boutons de filtre
function handleFilterButtonClick(event) {
    // Récupère l'ID de la catégorie depuis l'attribut data-category de l'élément cliqué
    const categoryId = event.target.dataset.category;
    // Appelle la fonction displayWorks avec l'ID de la catégorie converti en nombre. Cela affiche les travaux filtrés par la catégorie sélectionnée
    displayWorks(Number(categoryId));
    btnSelected(event);
}





