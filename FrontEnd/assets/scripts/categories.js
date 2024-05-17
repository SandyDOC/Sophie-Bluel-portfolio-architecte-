// Sélection de l'élément DOM pour les liens de filtre
const categoryButtonsContainer = document.getElementById('filter-buttons');

//Création du bouton "Tous"
const createBtnAll = () => {
    const btnAll = document.createElement("input");
    btnAll.type = "button";
    btnAll.classList.add("filters");
    btnAll.value = "Tous";
    // btnAll.innerHTML = "Tous";
    btnAll.dataset.category = "all";
    
    categoryButtonsContainer.appendChild(btnAll);//Ajout du bouton "Tous" dans le parent
};

//Création des boutons de chaque catégorie
const createCategory = (category) => {
    const button = document.createElement("input");
    // button.setAttribute("type","button");
    button.type = "button";
    button.classList.add("filters");
    button.value = category.name;
    // button.innerHTML = category.name;
    button.dataset.category = category.id;

    // Rattachement du bouton créé au conteneur des boutons de catégories ('filter-buttons')
    categoryButtonsContainer.appendChild(button);
}

// Créer tous les boutons de toutes les catégories (<a href class>category.name</a>)
const displayCategories = (categories) => {

    createBtnAll();

    categories.forEach(category => {

        createCategory(category);
        // const button = document.createElement("a");
        // // button.setAttribute("href","#");
        // button.href = "#";
        // button.classList.add("filters");
        // button.innerHTML = category.name;
        // button.dataset.category = category.id;

        // // Rattachement du bouton créé (<a>) au conteneur des boutons de catégories ('filter-buttons')
        // categoryButtonsContainer.appendChild(button);
    })
};








