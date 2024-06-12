// const galleryModal = document.querySelector('.galleryModal');
// const modal = document.getElementById('modal')
// const modal2 = document.getElementById('modal2')
// const token = window.localStorage.getItem("token");

/* Fonction pour afficher de la Modal uniquement si connecté grace au click sur le bouton modifié*/
async function afficherModale() {
  // récupère la modale à partir de son id
  // const modal = document.getElementById('modal');
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

//Fonction pour fermer la modal
function fermerModale() {
  // sélectionner la croix de fermeture
  const closeCross = document.querySelector('.close-modal-button');
  // au clic sur la croix la modale se ferme (ne s'affiche plus)
  closeCross.addEventListener('click', function () {
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute('aria-hidden', 'true');
      window.removeEventListener('click', fermerModaleExterne);
    } else if (modal2) {
      modal2.style.display = "none";
      modal2.setAttribute('aria-hidden', 'true');
      window.removeEventListener('click', fermerModaleExterne);
    }
  });
}
//Fonction pour fermer la modal en dehors 
function fermerModaleExterne(event) {
  event.preventDefault();
  // vérifie si le clic est en dehors de la modale
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    window.removeEventListener('click', fermerModaleExterne);
  }
  else if (event.target === modal2) {
    modal2.style.display = "none";
    modal2.setAttribute('aria-hidden', 'true');
    window.removeEventListener('click', fermerModaleExterne);
  }
}

/**Fonction pour récupérer les works & appel de la fonction de création de works dans la gallery de la modal */
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

//Fonction pour crééer des éléments html(figure,img,span,i'trash') pour avoir la liste de projets
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
//Fonction pour supprimer les travaux, projets
// function deleteProjet() {
//    // ajoute de l'évèment au clique de la poubelle pour supprimer le projet
//   const trashIcon = document.querySelector(".fa-trash-can");
//   trashIcon.forEach(trash => {
//     trashIcon.addEventListener('click', (e) => {
//       const projectId = trash.id;
//       //fetch method delete pour les supprimer dans l'API
//       fetchDelete(projectId, token)
//       .then(() => {
//         displayWorksModal();
//         displayWorks();
//       })
//     })
//   })
// }

// Fetch Delete
// async function fetchDelete(projectId, token) {
//   return fetch(`http://localhost:5678/api/works/${projectId}`, {
//       method: 'DELETE',
//       headers: {
//           'Authorization': `Bearer ${token}`
//       }
//   });
// }

// function afficherModal2() {
//   //si modal disparait alors modal2 apparait
//   // if (modal.style.display === "none" && modal.setAttribute('aria-hidden') === 'true') {
//   modal2.style.display = "flex";
//   modal2.removeAttribute('aria-hidden');
//   // }
// }

//Fonction permettant de passer de la modal1(galerie photo) à la modal2(ajout photo)
function modalNext() {
  //selectionne le bouton ajouter une photo
  const btnAddPhoto = document.querySelector('.addPhoto')
  //au click sur le bouton "ajouter une photo" je passe à la modale2 et modale1 disparait
  btnAddPhoto.addEventListener('click', function () {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal2.style.display = "flex";
    modal2.removeAttribute('aria-hidden');
    // afficherModale2();
  })
}

//Fonction pour revenir sur la modal : galerie photo
function backModalGallery() {
  /**selectionne arrow-left*/
  // const arrowLeft = document.querySelector('a .arrowBack');
  const arrowLeft = document.querySelector('.modal2 .fa-arrow-left');
  //au click sur l'icone arrowLeft, je suis redirigé vers modal1 (modal2 disparait)
  arrowLeft.addEventListener('click', function () {
    // console.log(arrowLeft,"back")
    modal2.style.display = "none";
    modal2.setAttribute('aria-hidden', 'true');
    modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
  });
}

// Fonction ajouter une nouvelle photo dans modal "Galerie photo"
function addNewPhoto() {
  //selectionne bouton ajouter une photo(modale2)
  const btnAddPhoto = document.querySelector('label .btnAddPhoto')
  //au click sur ce bouton je recupere fichier 'photo'
  //  + previsualisation image de la photo 
  btnAddPhoto.addEventListener('click', function() {
    previewImg()
  })
}

// Fonction pour avoir un aperçu de l'image récupéré en local
function previewImg() {}

//fonction du menu deroulant des categories(objet, appartement, restaurant)
function selectFormCategories() {
  // const formSelect = document.getElementById('categoryInput');
  // const categories = fetch('http://localhost:5678/api/categories');
  // // const categories = fetchCategories();
  // categories.forEach(category => {
  //     const option = document.createElement('option');
  //     option.value = category.id;
  //     option.textContent = category.name;
  //     formSelect.appendChild(option);
  // });
}


