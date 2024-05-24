// // const fetchWorks = async () => {
// //     const response = await fetch('http://localhost:5678/api/works');
// //     return await response.json();
// // }
// // const fetchCategories = async () => {
// //     const response = await fetch('http://localhost:5678/api/categories');
// //     return await response.json();
// // };

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

// // Fonction pour afficher les travaux filtrés par catégorie
// // const displayWorks = (idCategorie = 0) => {
// function displayWorks(idCategorie = 0) {
//     let filteredWorks;

//     if (idCategorie > 0) {
//         filteredWorks = projets.filter((projet) => {
//             return projet.categoryId == idCategorie;
//         });
//     } else {
//         filteredWorks = projets;
//     }
//     // vide la gallery
//     gallery.innerHTML = "";

//     filteredWorks.forEach(projet => {
//         // for (let i = 0; i < filteredWorks.length; i++) {
//         //     const projet = filteredWorks[i];
//         // Création des élément galerie principale
//         const figure = document.createElement('figure');
//         figure.dataset.id = projet.id;

//         const img = document.createElement('img');
//         img.src = projet.imageUrl;
//         img.alt = projet.title;

//         const figcaption = document.createElement('figcaption');
//         figcaption.textContent = projet.title;

//         figure.appendChild(img);
//         figure.appendChild(figcaption);
//         gallery.appendChild(figure);
//     });
// }

// //Création du bouton "Tous"
// const createBtnAll = () => {
//     const btnAll = document.createElement("button");
//     btnAll.classList.add("filters");
//     btnAll.innerHTML = "Tous";
//     btnAll.dataset.category = 0;

//     btnAll.addEventListener('click', (event) => {
//         displayWorks();
//         btnSelected(event);
//     });

//     categoryButtonsContainer.appendChild(btnAll);//Ajout du bouton "Tous" dans le parent
// };

// //Création des boutons de chaque catégorie
// const createCategory = (category) => {
//     const button = document.createElement("button");
//     button.classList.add("filters");
//     button.innerHTML = category.name;
//     button.dataset.category = category.id;

//     button.addEventListener('click', (event) => {
//         displayWorks(category.id);
//         btnSelected(event);
//     });

//     // Rattachement du bouton créé au conteneur des boutons de catégories ('filter-buttons')
//     categoryButtonsContainer.appendChild(button);
// }

// // Créer tous les boutons de toutes les catégories (<a href class>category.name</a>)
// const displayCategories = (categories) => {
//     // Réinitialise le conteneur des boutons de catégorie
//     // categoryButtonsContainer.innerHTML = "";
//     createBtnAll();
//     categories.forEach(category => {
//         createCategory(category);
//     })
// };
// // Fonction pour ajouter la classe 'btn_selected' au bouton cliqué
// const btnSelected = (event) => {
//     const buttons = document.querySelectorAll(".filters");

//     for (let i = 0; i < buttons.length; i++) {
//         const button = buttons[i];
//         if (button === event.target) {
//             button.classList.add("btn_selected");
//         } else {
//             button.classList.remove("btn_selected");
//         }
//     }
// };

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
        filteredWorks = projets.filter(function(projet) {
            return projet.categoryId == idCategorie;
        });
    } else {
        filteredWorks = projets;
    }
    
    // Vide la galerie
    gallery.innerHTML = "";

    for (let i = 0; i < filteredWorks.length; i++) {
        const projet = filteredWorks[i];
        
        // Création des éléments galerie principale
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

// Créer et afficher tous les boutons de catégories
function displayCategories(categories) {
    // Réinitialise le conteneur des boutons de catégorie
    categoryButtonsContainer.innerHTML = "";

    // Création du bouton "Tous"
    const btnAll = document.createElement("button");
    btnAll.classList.add("filters");
    btnAll.innerHTML = "Tous";
    btnAll.dataset.category = 0;
    btnAll.addEventListener('click', handleFilterButtonClick);
    categoryButtonsContainer.appendChild(btnAll);

    // Création des boutons de chaque catégorie
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const button = document.createElement("button");
        button.classList.add("filters");
        button.innerHTML = category.name;
        button.dataset.category = category.id;
        button.addEventListener('click', handleFilterButtonClick);
        categoryButtonsContainer.appendChild(button);
    }
}

// Fonction pour ajouter la classe 'btn_selected' au bouton cliqué
function btnSelected(event) {
    const buttons = document.querySelectorAll(".filters");

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button === event.target) {
            button.classList.add("btn_selected");
        } else {
            button.classList.remove("btn_selected");
        }
    }
}

