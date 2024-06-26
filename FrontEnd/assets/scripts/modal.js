/* Fonction pour afficher de la Modal uniquement si connecté grace au click sur le bouton modifier*/
function showModal() {
  // change le style de l'élément pour pouvoir afficher la liste des projets
  modal.style.display = "flex";
  modal.removeAttribute('aria-hidden');
  showProjectsModal();
  // on ajoute un évènement pour fermer la modale au clic en dehors de celle-ci
  window.addEventListener('click', closeModalOutside);
}

//Fonction pour fermer la modal
function closeModal() {
  // const closeCrossList = document.querySelectorAll('.close-modal-button');
  closeCrossList.forEach((closeCross) => {
    // au clic sur la croix la modale se ferme (ne s'affiche plus)
    closeCross.addEventListener('click', function (e) {
      // console.log(e, "close");
      if (e.target.closest(".modal").id == "modal") {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        hideFieldFile();
        formAddWorks.reset();
        window.removeEventListener('click', closeModalOutside);
      } else if (e.target.closest(".modal").id == "modal2") {
        modal2.style.display = "none";
        modal2.setAttribute('aria-hidden', 'true');
        hideFieldFile();
        formAddWorks.reset();
        window.removeEventListener('click', closeModalOutside);
      }
    });
  })
}

//Fonction pour fermer la modal en dehors de la fenêtre modal
function closeModalOutside(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    previewImage.style.display = 'none';
    //Réinitialisation des champs du formulaire (titre, catégorie)
    formAddWorks.reset();
    window.removeEventListener('click', closeModalOutside);
  }
  else if (event.target === modal2) {
    modal2.style.display = "none";
    modal2.setAttribute('aria-hidden', 'true');
    previewImage.style.display = 'none';
    formAddWorks.reset();
    window.removeEventListener('click', closeModalOutside);
  }
}

/**Fonction pour récupérer les works & appel de la fonction de création de works dans la gallery de la modal */
function showProjectsModal() {
  // const galleryModal = document.querySelector('.galleryModal');
  galleryModal.innerHTML = '';
  // fetch pour récupérer les projets
  fetchWorks()
    .then(projetsJson => {
      projets = projetsJson;
      projets.forEach((projet) => {
        displayWorksModal(projet);
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
  // Supprimer un projet (pour la galerie modale et galerie) au clic sur la poubelle
  trash.addEventListener('click', () => {
    deleteProjet(projet.id);
  });

  figure.appendChild(img);
  span.appendChild(trash)
  figure.appendChild(span);
  galleryModal.appendChild(figure);
};

// Fonction pour supprimer un projet par rapport à son id
function deleteProjet(idProject) {
  // console.log("delete project")
  // const token = localStorage.getItem("token");
  const figureGallery = document.querySelector(`.gallery figure[data-id='${idProject}']`);
  // const figureGallery = document.querySelector(".gallery figure[data-id='" + idProject + "']");
  const figureGalleryModal = document.querySelector(`.galleryModal figure[data-id='${idProject}']`);

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
  // const btnAddPhoto = document.querySelector('.addPhoto')
  //au click sur le bouton "ajouter une photo" je passe à la modale2 et modale1 disparait
  btnAddPhoto.addEventListener('click', function () {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal2.style.display = "flex";
    modal2.removeAttribute('aria-hidden');
    displayFieldFile();
  })
}

//Fonction pour revenir sur la modal : galerie photo
function backModalGallery() {
  // const arrowLeft = document.querySelector('.modal2 .fa-arrow-left');
  //au click sur l'icone arrowLeft, je suis redirigé vers modal1 (modal2 disparait)
  arrowLeft.addEventListener('click', function () {
    modal2.style.display = "none";
    modal2.setAttribute('aria-hidden', 'true');
    modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
    previewImage.style.display = 'none';
    formAddWorks.reset();
    buttonValidForm.classList.remove("buttonValidForm");
    buttonValidForm.classList.add("btnValider");
  });
}


// Fonction pour choisir son fichier image en local
function choosePhoto(event) {
  const file = event.target.files[0];
  // const previewImage = document.getElementById('previewImage');

  if (file && file.type.match('image.*')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      hideFieldFile();
    };
    reader.readAsDataURL(file);
  } else {
    alert('Veuillez sélectionner un fichier image valide (JPG ou PNG).');
    displayFieldFile();
  };
};

/* Fonction pour voir le contenu du ".containerAddPhoto" 
en supprimant l'affichage du fichier image */
function displayFieldFile() {
  imageIcon.style.display = 'block';
  addPhotoLabel.style.display = 'block';
  formatText.style.display = 'block';
  previewImage.style.display = 'none';
}
/* Fonction pour cacher le contenu du ".containerAddPhoto" 
en affichant le fichier image */
function hideFieldFile() {
  imageIcon.style.display = 'none';
  addPhotoLabel.style.display = 'none';
  formatText.style.display = 'none';
  previewImage.style.display = 'block';
}

// Fonction pour avoir un aperçu de l'image récupéré en local
function previewImg() {
  const fileInput = document.querySelector("#file");
  fileInput.addEventListener('change', choosePhoto);
}

// Fonction du menu deroulant des categories(objet, appartement, restaurant)
function selectFormCategories() {
  // const formSelect = document.getElementById('categoryInput');
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

//Fonction d'ajout d'un nouveau projet en appuyant sur "valider"
function addWork() {
  // const formAddWorks = document.querySelector("#formAddWorks");
  formAddWorks.addEventListener("submit", (e) => {
    e.preventDefault();
    // Récupération des Valeurs du Formulaire
    const formData = new FormData(formAddWorks);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log('Response:', response);
        if (!response.ok) {
          //console.error("Erreur du serveur:", data);
          throw new Error(data.message || "Erreur lors de l'envoi du fichier");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fichier envoyé avec succès :", data);
        // Met à jour l'affichage des travaux dans la modale et sur la page d'accueil
        showProjectsModal();
        displayWorksGallery();
        // Réinitialise le formulaire et met à jour l'affichage des modales
        formAddWorks.reset();
        modal.style.display = "flex";
        modal2.style.display = "none";
        previewImage.src = "#";
        displayFieldFile();
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  });
}

// Fonction qui vérifie si tout les inputs sont remplis alors le bouton "Valider" devient vert
function verifFormCompleted() {
  // const inputTitle = document.getElementById('title')
  // const inputFile = document.querySelector("#file");
  // const buttonValidForm = document.querySelector(".btnValider");
  // const formAddWorks = document.querySelector("#formAddWorks");
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



