
const galleryModal = document.querySelector('.galleryModal');
// const modal = document.getElementById('modal')
const modal = document.querySelector('.modal');
const modal2 = document.querySelector('.modal2')
// const modal = document.querySelectorAll('.modal');

/* Affichage de la Modal uniquement si connecté grace au click sur le bouton modifié*/
function afficherModale() {
  // récupère la modale à partir de son id
  // const modal = document.getElementById('modal');
  // change le style de l'élément pour pouvoir l'afficher
  // if (modal2) {
  //   displayModal2();
  // } else {
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden')
    // on affiche la liste des projets de la modale
    afficherProjetsModale();
  // }
  // on ajoute un évènement pour fermer la modale au clic de la croix
  fermerModale();
  // on ajoute un évènement pour fermer la modale au clic en dehors de celle-ci
  window.addEventListener('click', fermerModaleExterne);

  // on ajoute un évèment pour fermer la modale au click de la croix
  // modal.addEventListener('click', fermerModale(modal))
}

// function fermerModale(modal) {
//   //sélectionner la croix de fermeture
//   const closeCross = document.querySelector('.close-modal-button');
//   //au clic sur la croix la modale se ferme (ne s'affiche plus)
//   closeCross.addEventListener('click', function() {
//     modal.style.display = "none";
//   })
// }
function fermerModale() {
  // sélectionner la croix de fermeture
  // const closeCross = document.querySelectorAll('.close-modal-button');
  const closeCross = document.querySelector('.close-modal-button');
  // au clic sur la croix la modale se ferme (ne s'affiche plus)
  closeCross.addEventListener('click', function () {
    // if (modal) {
      modal.style.display = "none";
      modal.setAttribute('aria-hidden', 'true');
    // } else if (modal2) {
    //   modal2.style.display = "none";
    //   modal2.setAttribute('aria-hidden', 'true');
    // }
    window.removeEventListener('click', fermerModaleExterne);
  });
}

function fermerModaleExterne(event) {
  event.preventDefault();
  // vérifier si le clic est en dehors de la modale
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
  } 
  // else if (event.target === modal2) {
  //   modal2.style.display = "none";
  //   modal2.setAttribute('aria-hidden', 'true');
  //   window.removeEventListener('click', fermerModaleExterne);
  // }
}

/** récupération des works & appel de la fonction de création de works dans la gallery de la modal */
function afficherProjetsModale() {
  galleryModal.innerHTML = '';
  // fetch pour récupérer les projets
  fetchWorks()
    .then(projetsJson => {
      projets = projetsJson;
      projets.forEach((projet) => {
        displayWorksModal(projet)
      });
    })
}

// crééer des éléments html pour avoir la liste de projets
function displayWorksModal(projet) {

  const figure = document.createElement('figure');
  figure.dataset.id = projet.id;

  const img = document.createElement('img');
  img.src = projet.imageUrl;
  img.alt = projet.title;
  img.classList.add('modalImg')

  // ajout de la poubelle
  const span = document.createElement("span")
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash-can");
  trash.id = projet.id;

  figure.appendChild(img);
  span.appendChild(trash)
  figure.appendChild(span);
  galleryModal.appendChild(figure);
}

/******** */
// function deleteProjet(projectId) {
//   //fetch method delete pour les supprimer dans l'API
//   fetchDelete(projectId, token)
//   // mise a jour modale et gallery principale

//   // ajoute de l'évèment au clique de la poubelle pour supprimer le projet
//   const trashIcon = document.querySelector(".fa-trash-can");
//   trashIcon.addEventListener('click', function (event) {
//     // appel de la fonction qui supprime le projet
// }
// function afficherModal2() {
//   //si modal disparait alors modal2 apparait
//   if (modal.style.display === "none" && modal.setAttribute('aria-hidden') === 'true') {
//   modal2.style.display = "flex";
//   modal2.removeAttribute('aria-hidden');
//   }
// }

// function goModal2AddPhoto() {
//   //selectionne le bouton ajouter une photo
//   const btnAddPhoto = document.querySelector('.addPhoto')
//   //au click sur le bouton "ajouter une photo" je passe à la modale2 et modale1 disparait
//   btnAddPhoto.addEventListener('click', afficherModal2)
//   // afficherModale2()
// }
// function selectBtnAddPhoto() {
//   const btnAddPhoto = document.querySelector('.addPhoto')
//   // ajouter un évènement pour qu'au click de "modifier"
//   // on affiche la modale
//   btnAddPhoto.addEventListener('click', function () {
//     afficherModal2();
//   });
// }

function addNewPhoto() {
  //selectionne bouton ajouter une photo(modale2)
  //au click sur ce bouton je recupere fichier 'photo'
  //  + previsualisation image de la photo 
  previewImg()
  //Ce fichier est envoyé (post fetchSend API) et stocké
}

function previewImg() {

}

function backModalGallery() {
  //selectionne arrow-left
  //selectionne modal1
  //au click sur l'icone, je suis redirigé vers modal1
}

//fonction du menu deoulant des categories(objet, appartement, restaurant)
function selectFormCategories() {

}

// fontion qui vérifie si tout les inputs sont remplis
function verifFormCompleted() { }



