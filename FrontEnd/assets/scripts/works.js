// Sélection des éléments du DOM
const gallery = document.querySelector('.gallery');

const displayWorks = (projets) => {

    projets.forEach(projet => {
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