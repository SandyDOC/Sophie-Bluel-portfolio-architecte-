// // Sélection des éléments du DOM du formulaire
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const loginForm = document.getElementById("loginForm");
// const logOut = document.getElementById("login-link");

// Fonction de création du message d'erreur pour le mot de passe
function afficherErreurConnexion(loginForm) {
  const loginDiv = document.getElementById("loginDiv");
  const spanErreurConnexion = document.createElement("span");
  spanErreurConnexion.innerHTML = "Email ou mot de passe invalide";
  spanErreurConnexion.classList.add("error-message");
  spanErreurConnexion.classList.add("dataLogin");
  loginDiv.insertBefore(spanErreurConnexion, loginForm);
}

// Fonction pour gérer la connexion
function connect() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Vérifie les données du formulaire
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
        if (!response.ok) {
          afficherErreurConnexion(loginForm);
          emailInput.style.border = "2px solid #FF0000";
          passwordInput.style.border = "2px solid #FF0000";
          throw new Error("Le mot de passe ou l'identifiant que vous avez fourni est incorrect.");
        }
        return response.json();
      })
      .then((data) => {
        // Stocke le token dans le stockage local et redirige vers la page d'accueil
        const token = data.token;
        localStorage.setItem('token', token);
        window.location.href = 'index.html';
        // const userId = data.userId;
        // const userToken = data.token;
        // window.localStorage.setItem("token", userToken);
        // window.localStorage.setItem("userId", userId);
        // window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Une erreur est survenue : ", error);
      });

    // if (isConnected()) {
    //   window.location.href = "index.html"; 
    // }
  });
};

// Fonction pour vérifier si l'utilisateur est connecté
// export function isConnected() {
function isConnected() {
  const token = window.localStorage.getItem("token");
  // return token !== null && token !== "";
  if (token !== null && token !== "") {
    const logOut = document.getElementById("login-link");
    logOut.addEventListener("click", () => {
    window.location.href = "index.html";
    selectModeEdition();
    selectModifier();
    hideFilters();
    })
  }
};
//Fonction affichage bandeau "mode édition"
function selectModeEdition() {
  const modeEditOverlay = document.querySelector('.mode-edit-overlay');//mode édition
  modeEditOverlay.classList.remove('display-none');
}
//Fonction affichage lien "modifier"
function selectModifier() {
  const editModif = document.querySelector('.edit-modif');//modifier
  editModif.classList.remove('display-none');
}
//Fonction cache les boutons filtres
function hideFilters() {
  const categoryButtonsContainer = document.getElementById('filter-buttons');
  categoryButtonsContainer.classList.add('display-none')
}

// Fonction pour gérer la déconnexion
function disConnect() {
  logOut.addEventListener("click", () => {
    if (isConnected()) {
      window.localStorage.removeItem("token");
      // window.localStorage.removeItem("userId");
      logOut.textContent = "login";
      window.location.href = "index.html";
    } else {
      // renvoi sur page connexion
      window.location.href = "login.html";
    }
  });
}

/**** Fonctions ****/

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

// Fonction pour vérifier les données du formulaire
// function checkDataSubmit(emailValid,passwordValid) {
//   let emailValid = false;
//   if (emailInput.value.includes("@")) {
//     emailValid = true;
//     const errorMail = document.getElementById('errorMail');
//     if (errorMail) errorMail.style.display = 'none';
//   } else {
//     createSpanErrorMail();
//   }
//   let passwordValid = false;
//   const trimmedPassword = passwordInput.value.trim();
//   if (trimmedPassword !== "" && !trimmedPassword.includes(" ") && trimmedPassword.length >= 6) {
//     passwordValid = true;
//     const errorPassword = document.getElementById('errorPassword');
//     if (errorPassword) errorPassword.style.display = 'none';
//   } else {
//     createSpanErrorPassword();
//   }
//   return emailValid && passwordValid;
// };

//Fonction mise à jour
// function updateUI() {
//   const loginLink = document.getElementById("login-link")
//   const connected = localStorage.getItem("userId")
//   if (connected === "true") {
//     loginLink.innerHTML = "logout"
//     loginLink.removeEventListener("click", connexion)
//     loginLink.addEventListener("click", deconnexion)
//   } else {
//     loginLink.innerHTML = "login"
//     loginLink.removeEventListener("click", deconnexion)
//     loginLink.addEventListener("click", connexion)
//   }
// };

// Fonction pour mettre à jour le texte du bouton de déconnexion
// function updateLogoutButton() {
//   if (isConnected()) {
//     logOut.textContent = "logout";
//   } else {
//     logOut.textContent = "login";
//   }
// };

// Vérifiez la connexion à l'initialisation
// document.addEventListener("DOMContentLoaded", function () {
//   if (isConnected()) {
//     window.location.href = "index.html"; // Redirige vers index.html si l'utilisateur est déjà connecté
//   } else {
//     connect(); // Configure l'écouteur d'événement pour le formulaire de connexion
//   }
//   disConnect(); // Configure l'écouteur d'événement pour le bouton de déconnexion
//   updateLogoutButton(); // Met à jour le texte du bouton de déconnexion
// });

