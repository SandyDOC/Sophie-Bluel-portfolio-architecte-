// Sélection de l'élément DOM pour les liens de filtre
const categoryButtonsContainer = document.getElementById('filter-buttons');


//Création du bouton "Tous"
const createBtnAll = () => {
    const btnAll = document.createElement("a");
    btnAll.href = "#";
    btnAll.classList.add("filters");
    btnAll.innerHTML = "Tous";
    btnAll.dataset.category = "all";

    categoryButtonsContainer.appendChild(btnAll);//Ajout du bouton "Tous" dans le parent
}

const displayCategories = (categories) => {

    createBtnAll();

    // Créer les boutons des chaque catégorie (<a href class>category.name</a>)
    categories.forEach(category => {

        const button = document.createElement("a");
        // button.setAttribute("href","#");
        button.href = "#";
        button.classList.add("filters");
        button.innerHTML = category.name;
        button.dataset.category = category.id;

        // Rattachement du bouton créer (<a>) au conteneur des boutons de catégories ('filter-buttons')
        categoryButtonsContainer.appendChild(button);
    })
}
