// // Sélection des éléments du DOM du formulaire
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const loginForm = document.getElementById("loginForm");
// const logLink = document.getElementById("login-link");

// Fonction de création du message d'erreur pour le mot de passe
function afficherErreurConnexion(loginForm) {
  const loginDiv = document.getElementById("loginDiv");
  const spanErreurConnexion = document.createElement("span");
  spanErreurConnexion.innerHTML = "Email ou mot de passe invalide";
  spanErreurConnexion.classList.add("error-message");
  spanErreurConnexion.classList.add("dataLogin");
  loginDiv.insertBefore(spanErreurConnexion, loginForm);

  // const emailInput = document.getElementById("email");
  // const passwordInput = document.getElementById("password");
  // emailInput.style.border = "2px solid #FF0000";
  // passwordInput.style.border = "2px solid #FF0000";
}

// ***** Fonction pour gérer la connexion
function connect() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Vérifie les données du formulaire
    // if (checkDataSubmit(emailValid, passwordValid)){
      // const isValid = checkDataSubmit(emailValid, passwordValid);
      // if (!isValid) return;
      
      const userEmail = emailInput.value;
      const userPassword = passwordInput.value;
      const dataLogin = {
        email: userEmail,
        password: userPassword,
      };
  
      const chargeUtile = JSON.stringify(dataLogin);
      /****Envoi de la requête****/
      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
      })
        .then((response) => {
          console.log(response)
          if (!response.ok) {
            // emailInput.style.border = "2px solid #FF0000";
            // passwordInput.style.border = "2px solid #FF0000";
            // throw new Error(afficherErreurConnexion(dataLogin));
            throw new Error("Le mot de passe ou l'email que vous avez fourni est incorrect");
          } else if (response.status === 401) {
            throw new Error("Problème de connexion au serveur");
          }
          return response.json();
        })
        .then((data) => {
          // Stocke le token dans le stockage local 
          const token = data.token;
          localStorage.setItem('token', token);
          // Redirige vers la page d'accueil
          window.location.href = 'index.html';
        })
        .catch((error) => {
          afficherErreurConnexion(loginForm);
          console.error("Une erreur est survenue : ", error);
        });
    // };
  });
};

//***** Fonction pour vérifier si l'utilisateur est connecté
function isConnected() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

// Fonction pour afficher la liste des changements (mode édition, modigier, logout)
function displayMenuUserConnected() {
  // on récupère le lien du login
  const logLink = document.getElementById("login-link");
  // on vérifie si l'utilisateur est connecté. la fonction doit retouner true
  if (isConnected()) {
    // on change le lien "login" en "logout"
    logLink.textContent = "logout";
    // on affiche le bandeau en haut en mode édition
    selectModeEdition();
    // on affiche "modifier" à côté de "mes projets"
    selectModifier();
    // on cache les filtres
    hideFilters();

    // au click du lien "logout"
    logLink.addEventListener("click", () => {
      // on déconnecte l'utilisateur
      disConnect();
    })
  }
}

//MenuUserConnected :
//Fonction affichage bandeau "mode édition"
function selectModeEdition() {
  const modeEditOverlay = document.querySelector('.mode-edit-overlay');//mode édition
  modeEditOverlay.classList.remove('display-none');
}
//Fonction affichage lien "modifier"
function selectModifier() {
  const editModif = document.querySelector('.edit-modif');//modifier
  editModif.classList.remove('display-none');
  // ajouter un évènement pour qu'au click de "modifier"
  // on affiche la modale
  editModif.addEventListener('click', function () {
    afficherModale();
  });
}
//Fonction cache les boutons filtres
function hideFilters() {
  const categoryButtonsContainer = document.getElementById('filter-buttons');
  categoryButtonsContainer.classList.add('display-none')
}

//**** Fonction pour gérer la déconnexion (suppression du token)
function disConnect() {
  if (isConnected()) {
    localStorage.removeItem("token");
  } else {
    // renvoi sur page connexion
    window.location.href = "login.html";
  }
}

/**** Fonctions ****/
// // Fonction pour vérifier les données du formulaire
// function checkDataSubmit(emailValid, passwordValid) {
//   let emailValid = false;
//   if (emailInput.value.includes("@")) {
//     emailValid = true;
//     // const errorMail = document.getElementById('errorMail');
//     // if (errorMail) errorMail.style.display = 'none';
//   } else {
//     const errorMail = document.getElementById('errorMail');
//     errorMail.classList.remove('display-none');
//     errorMail.textContent = "Veuillez saisir un email avec un @";
//     const emailInput = document.getElementById("email");
//     emailInput.style.border = "2px solid #FF0000";
//     // createSpanErrorMail();
//   }
//   let passwordValid = false;
//   const trimmedPassword = passwordInput.value.trim();
//   if (trimmedPassword !== "" && !trimmedPassword.includes(" ") && trimmedPassword.length >= 6) {
//     passwordValid = true;
//     // const errorPassword = document.getElementById('errorPassword');
//     // if (errorPassword) errorPassword.style.display = 'none';
//   } else {
//     const errorPassword = document.getElementById('errorPassword');
//     errorPassword.classList.remove('display-none');
//     errorPassword.textContent = "Veuillez saisir un mot de passe de 6 caractères minimum et sans espaces";
//     const passwordInput = document.getElementById("password");
//     passwordInput.style.border = "2px solid #FF0000";
//     // createSpanErrorPassword();
//   }
//   return emailValid && passwordValid;
// };

// Fonction de création du message d'erreur pour l'email
// function createSpanErrorMail() {
//     const spanErrorMail = document.createElement('span');
//     spanErrorMail.classList.add('error-message');
//     spanErrorMail.id = 'errorMail';
//     spanErrorMail.textContent = 'Veuillez saisir un email avec un @';
//     const emailInput = document.getElementById('email');
//     emailInput.parentNode.insertBefore(spanErrorMail, emailInput.nextSibling);
// };

// Fonction de création du message d'erreur pour le mot de passe
// function createSpanErrorPassword() {
//     const spanErrorPassword = document.createElement('span');
//     spanErrorPassword.classList.add('error-message');
//     spanErrorPassword.id = 'errorPassword';
//     spanErrorPassword.textContent = 'Veuillez saisir un mot de passe de 6 caractères minimum et sans espaces';
//     passwordInput.parentNode.insertBefore(spanErrorPassword, passwordInput.nextSibling);
//   };


