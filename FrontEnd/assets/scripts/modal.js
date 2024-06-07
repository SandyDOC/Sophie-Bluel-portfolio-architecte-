
const galleryModal = document.querySelector('.galleryModal');

/* Affichage de la Modal uniquement si connecté grace au click sur le bouton modifié*/
function afficherModale() {
  // récupère la modale à partir de son id
  const modalWrapper = document.getElementById('modal');
  // change le style de l'élément pour pouvoir l'afficher
  // modalWrapper.classList.remove('display-none')

  modalWrapper.style.display = "flex";

  modalWrapper.removeAttribute('aria-hidden')
  // on affiche la liste des projets de la modale
  afficherProjetsModale();
  // on ajoute un évèment pour fermer la modaleau click de la croix
  modalWrapper.addEventListener('click', fermerModale(modalWrapper))
}

function fermerModale(modalWrapper) {
  //sélectionner la croix de fermeture
  const closeCross = document.querySelector('.close-modal-button')
  //au clic sur la croix la modale se ferme (ne s'affiche plus)
  closeCross.addEventListener('click', function () {
    modalWrapper.style.display = "none";
  })
}

/** récupération des works & appel de la fonction de création de works dans la gallery de la modal */
function afficherProjetsModale() {
  // fetch pour récupérer les projets
  galleryModal.innerHTML = '';

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

  //pour chaque projet créé une poubelle
  // projets.forEach((projet) => {
  //   const span = document.createElement("span")
  //   const trash = document.createElement("i");
  //   trash.classList.add("fa-solid", "fa-trash-can");
  //   trash.id = projet.id;
  // })
}


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




