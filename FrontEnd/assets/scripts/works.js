
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
   
    if(idCategorie > 0)  {
        filteredWorks = projets.filter((projet) => {
            return projet.categoryId == idCategorie;
        });
    } 
    else {
        filteredWorks = projets;
    }  

    // vide la gallery
    gallery.innerHTML="";

    filteredWorks.forEach(projet => {
        // for (let i = 0; i < projets.length; i++) {
        //     const projet = projets[i];
        //     console.log(projets)

        // Création des élément galerie principale
        const figure = document.createElement('figure');
        figure.dataset.id = projet.id; // Ajout de l'identifiant du projet à l'attribut data-id

        const img = document.createElement('img');
        img.src = projet.imageUrl; // Utilisation de la propriété imageUrl de l'objet projet
        img.alt = projet.title; // Utilisation de la propriété title de l'objet projet

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = projet.title; // Utilisation de la propriété title de l'objet projet

        // Ajout des éléments dans la galerie principal
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });
}

//Création du bouton "Tous"
const createBtnAll = () => {
    const btnAll = document.createElement("input");
    btnAll.type = "button";
    btnAll.classList.add("filters");
    btnAll.value = "Tous";
    // btnAll.innerHTML = "Tous";
    btnAll.dataset.category = 0;
    btnAll.addEventListener('click', (event) => {
        
        displayWorks();
    });
    
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

    button.addEventListener('click', () => {
        
        displayWorks(category.id);
    });

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
