/**** Fonction Principale pour l'affichage des works dans la Modale */
/* Affichage de la Modal uniquement si conecté grace au click sur le bouton modifié*/
function afficherModale() {
  // récupère la modale à partir de son id

  // change le style de l'élément pour pouvoir l'afficher

  // on affiche la liste des projets de la modale
  afficherProjetsModale();

  // on ajoute un évèment pour fermer la modale
  // au click de la croix


}
/** récupération des works & appel de la fonction de création de works dans la gallery de la modal */
function afficherProjetsModale() {
    // fetch pour récupérer les projets

    // crééer des éléments html pour avoir la liste de projets

    // ajout de la poubelle

    // ajoute de l'évèment au clique de la poubelle pour supprimer le projet

    // appel de la fonction qui supprime le projet
    deleteProjet(id);
}

//******fonction d'affichage au click sur btn:"ajouter-photo" de la modalAddWorks
function displayModalAddWorks() {}

 /*** Nouveautés depuis la dernière session de mentorat ***/
 //Supression des works grace a la méthode DELETE & au Token user depuis la poubelle de la modale
//Objet de paramétrage pour requette DELETE avec token
const deleteWorkID = {
    method: "DELETE",}

 function deleteProjet(id) {
     //Sélectionner le projet par son id
     //fetch method delete pour les supprimer dans l'API
    // mise a jour modale et gallery principale
    fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID).then()

    }
    
/*création des balises et injection des donnés a partir du fetchWorks*/
function addProjet(id) {
    //créer un id pour le nouveau projet
    //afficher ce projet dans la modale (à sélectionner)
}


//Gestion de la fermeture des modales
function closeModalGallery() {
    //Fermuture de la modal sur la croix Portfolio
      //Fermuture de la modal sur la croix du projet
    //Supréssion de la prewiew a clik sur retour dans la modale
}

//Fermeture de la modal sur le container grisé
body.addEventListener("click", (e) => {
    if (e.target == modalContent) {
      //Supression de la prewiew a clik sur retour dans la modale
    }})


// Retour sur modalPortfolio depuis la flèche de la modalAddWorks
function returnToModalPortfolio() {
     //Supréssion de la prewiew a clik sur retour dans la modale
}


//Function d'ajout d'un nouveau projet
function addWorks() {
    formAddWorks.addEventListener("submit", (e) => {
      e.preventDefault();
      // Récupération des Valeurs du Formulaire
      const formData = new FormData(formAddWorks);
      fetch("http://localhost:5678/api/works", {
        method: "POST",})})}

//Fonction qui génère les catégorie dynamiquement pour la modale
async function displayCategoryModal() {}

//fonction prévisualisation de l'image
function prevImg() {
    inputFile.addEventListener("change", () => {})}
    
// fontion qui vérifie si tout les inputs sont remplis
function verifFormCompleted() {}



