// const galleryModal = document.querySelector('.galleryModal');
// const token = window.localStorage.getItem("token");
// const inputCategory = document.getElementById('categoryInput')

// const modal = document.getElementById('modal')
// const modal2 = document.getElementById('modal2')


/* Fonction pour afficher de la Modal uniquement si connecté grace au click sur le bouton modifier*/
function afficherModale() {
  // récupère la modale à partir de son id
  // const modal = document.getElementById('modal');
  // change le style de l'élément pour pouvoir l'afficher
  modal.style.display = "flex";
  modal.removeAttribute('aria-hidden')
  // on affiche la liste des projets de la modale
  afficherProjetsModale();
  // on ajoute un évènement pour fermer la modale au clic en dehors de celle-ci
  window.addEventListener('click', fermerModaleExterne);
}

//Fonction pour fermer la modal
function fermerModale() {
  // sélectionner la croix de fermeture
  const closeCrossList = document.querySelectorAll('.close-modal-button');
  closeCrossList.forEach((closeCross) => {
    // au clic sur la croix la modale se ferme (ne s'affiche plus)
    closeCross.addEventListener('click', function (e) {
      // console.log(e, "close");
      if (e.target.closest(".modal").id == "modal") {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        window.removeEventListener('click', fermerModaleExterne);
      } else if (e.target.closest(".modal").id == "modal2") {
        modal2.style.display = "none";
        modal2.setAttribute('aria-hidden', 'true');
        window.removeEventListener('click', fermerModaleExterne);
      }
    });
  })
}

//Fonction pour fermer la modal en dehors de la fenêtre modal
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

//Fonction pour créer des éléments html(figure,img,span,i'trash') pour avoir la liste des projets et supprimer un projet au clic sur la poubelle
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
  // trash.id = projet.id;
  // Supprimer un projet (pour la galerie modale et galerie)
  trash.addEventListener('click', () => {
    deleteProjet(projet.id);
  });

  figure.appendChild(img);
  span.appendChild(trash)
  figure.appendChild(span);
  galleryModal.appendChild(figure);

}



// Fonction supprimer un projet
// const idProject = projet.id;
function deleteProjet(idProject) {
  console.log("delete project")
  const token = localStorage.getItem("token");

  // récupérer les deux figures (de gallery et galleryModal) et les supprimer du DOM :
  // .gallery figure[data-id='1']
  
  // `.gallery figure[data-id='${idProject}']`
  const figureGallery = document.querySelector(".gallery figure[data-id='"+idProject+"']");
  const figureGalleryModal = document.querySelector(".galleryModal figure[data-id='"+idProject+"']");

  fetchDelete(idProject, token)
    .then(response => {
      if (response.ok) {
        figureGallery.remove();
        figureGalleryModal.remove();
        
        console.log(`Le projet avec l'ID ${idProject} a été supprimé.`);
      } else {
        console.log(`Une erreur s'est produite lors de la suppression du projet avec l'ID ${projectId}.`);
      }
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la communication avec l\'API :', error);
    });
}

// Fetch Delete
function fetchDelete(idProject, token) {
  return fetch(`http://localhost:5678/api/works/${idProject}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

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

// function afficherModal2() {
//   //si modal disparait alors modal2 apparait
//   // if (modal.style.display === "none" && modal.setAttribute('aria-hidden') === 'true') {
//   modal2.style.display = "flex";
//   modal2.removeAttribute('aria-hidden');
//   // }
// }

//Fonction pour revenir sur la modal : galerie photo
function backModalGallery() {
  /**selectionne arrow-left*/
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

// Fonction pour choisir son image en local
function choosePhoto(event) {
  const file = event.target.files[0];
  const previewImage = document.getElementById('previewImage');
  const imageIcon = document.querySelector('.containerAddPhoto .fa-image');
  const addPhotoLabel = document.querySelector('.containerAddPhoto .labelFile');
  const formatText = document.querySelector('.containerAddPhoto .txtFormatPhoto');

  if (file && file.type.match('image.*')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';

      // Masquer les éléments
      imageIcon.style.display = 'none';
      addPhotoLabel.style.display = 'none';
      formatText.style.display = 'none';
    };

    reader.readAsDataURL(file);
  } else {
    alert('Veuillez sélectionner un fichier image valide (JPG ou PNG).');
    previewImage.style.display = 'none';

    // Afficher les éléments au cas où le fichier n'est pas valide
    imageIcon.style.display = 'block';
    addPhotoLabel.style.display = 'block';
    formatText.style.display = 'block';
  }
}

// Fonction pour avoir un aperçu de l'image récupéré en local
function previewImg() {
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', choosePhoto);
}

//fonction du menu deroulant des categories(objet, appartement, restaurant)
function selectFormCategories() {
  const formSelect = document.getElementById('categoryInput');
  fetchCategories()
    .then(categories => {
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        formSelect.appendChild(option);
      });
    })
}

const formAddWorks = document.querySelector("#formAddWorks");
const submitter = document.querySelector("input[value=Valider]");
// const formData = new FormData(formAddWorks, submitter);
const previewImage = document.getElementById('previewImage');

//Function d'ajout d'un nouveau projet en appuyant sur "valider"
function addWork() {
  formAddWorks.addEventListener("submit", (e) => {
    e.preventDefault();
    // Récupération des Valeurs du Formulaire
    // const formData = new FormData(formAddWorks);
    const formData = new FormData(formAddWorks, submitter);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      // fetchAddWorks()
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du fichier");
        }
        return response.json();
      })
      .then((data) => {
        // une fois le then récupéré, ajouter une nouvelle figure dans la modale et dans la page d'accueil
        console.log("Fichier envoyé avec succès :", data);

        // ???? ****si buttonValidForm est ".btnValider" pour l'ajout d'un nouveau projet(photo, titre, catégorie) alors addWork()

        displayWorksModal();
        displayWorks();
        formAddWorks.reset();
        modal.style.display = "flex";
        modal2.style.display = "none";
        previewImage.style.display = "none";
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  });
}
// function fetchAddWorks() {
//   fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     body: formData,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
// }

const inputTitle = document.getElementById('title')
const inputFile = document.querySelector("#file");
const buttonValidForm = document.querySelector(".btnValider");
// fonction qui vérifie si tout les inputs sont remplis alors le bouton "Valider" devient vert
function verifFormCompleted() {
  const formAddWorks = document.querySelector("#formAddWorks");

  formAddWorks.addEventListener("input", () => {
    if (!inputTitle.value == "" && !inputFile.files[0] == "") {
      buttonValidForm.classList.remove("btnValider");
      buttonValidForm.classList.add("buttonValidForm");
    } else {
      buttonValidForm.classList.remove("buttonValidForm");
      buttonValidForm.classList.add("btnValider");
    }
  });
}



