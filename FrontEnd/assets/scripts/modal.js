
const galleryModal = document.querySelector('.galleryModal');
const modal = document.getElementById('modal')

/* Affichage de la Modal uniquement si connecté grace au click sur le bouton modifié*/
function afficherModale() {
  // récupère la modale à partir de son id
  const modal = document.getElementById('modal');
  // change le style de l'élément pour pouvoir l'afficher
  modal.style.display = "flex";
  modal.removeAttribute('aria-hidden')
  // on affiche la liste des projets de la modale
  afficherProjetsModale();
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
  const closeCross = document.querySelector('.close-modal-button');
  // au clic sur la croix la modale se ferme (ne s'affiche plus)
  closeCross.addEventListener('click', function() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    window.removeEventListener('click', fermerModaleExterne);
  });
}

function fermerModaleExterne(event) {
  // vérifier si le clic est en dehors de la modale
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    window.removeEventListener('click', fermerModaleExterne);
  }
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
function deleteProjet(projectId) {
  //fetch method delete pour les supprimer dans l'API
  fetchDelete(projectId, token)
  // mise a jour modale et gallery principale
 .then(() => {
  modalWrapper.classList.add('display-none');
  galleryModal.innerHTML='';
 })

  // ajoute de l'évèment au clique de la poubelle pour supprimer le projet
  const trashIcon = document.querySelector(".fa-trash-can");
  trashIcon.addEventListener('click', function (event) {
    btnSelected(event)
    // appel de la fonction qui supprime le projet
    if (event.target.classList === "btn_selected"){
      deleteProjet(projectId);
    }
  })
}




