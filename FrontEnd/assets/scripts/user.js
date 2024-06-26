/*** Fonctionnalités de l'utilisateur(user) lors de la connexion sur la page LogIn **/

// ***** Fonction pour gérer la CONNEXION
function connect() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Récupèration des valeurs du champ 'email' et 'password'
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    // Crée un objet pour les données de connexion
    const dataLogin = {
      email: userEmail,
      password: userPassword,
    };
    const chargeUtile = JSON.stringify(dataLogin);
    /**** Envoi de la requête ****/
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          emailInput.style.border = "2px solid #FF0000";
          passwordInput.style.border = "2px solid #FF0000";
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
        showConnexionError(loginForm);
        console.error("Une erreur est survenue : ", error);
      });
  });
};

// Fonction de création du message d'invalidité des champs email ou mot de passe
function showConnexionError(loginForm) {
  // const loginDiv = document.getElementById("loginDiv");
  const spanErreurConnexion = document.createElement("span");
  spanErreurConnexion.innerHTML = "Email ou mot de passe invalide";
  spanErreurConnexion.classList.add("error-message");
  spanErreurConnexion.classList.add("dataLogin");
  loginDiv.insertBefore(spanErreurConnexion, loginForm);
}

//***** Fonction pour vérifier si l'utilisateur EST CONNECTE
function isConnected() {
  // const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

// Fonction pour afficher la liste des changements (mode édition, modifier, logout)
function displayMenuUserConnected() {
  // const logLink = document.getElementById("login-link");
  // on vérifie si l'utilisateur est connecté (la fonction doit retouner true)
  if (isConnected()) {
    logLink.textContent = "logout";
    selectModeEdition();
    selectModifier();
    hideFilters();
    // au click du lien "logout", on déconnecte l'utilisateur
    logLink.addEventListener("click", () => {
      disConnect();
    });
  };
};

// " MenuUserConnected " :
//Fonction affichage du bandeau "mode édition"
function selectModeEdition() {
  // const modeEditOverlay = document.querySelector('.mode-edit-overlay');
  modeEditOverlay.classList.remove('display-none');
};
//Fonction affichage du lien "modifier" et au clic affiche la modal
function selectModifier() {
  // const editModif = document.querySelector('.edit-modif');
  editModif.classList.remove('display-none');

  // Ajout d'un évènement pour qu'au clic de "modifier", on affiche la modale
  editModif.addEventListener('click', function () {
    showModal();
  });
};
//Fonction qui cache les boutons 'filtres' des catégories
function hideFilters() {
  // const categoryButtonsContainer = document.getElementById('filter-buttons');
  categoryButtonsContainer.classList.add('display-none');
};

//**** Fonction pour gérer la DECONNEXION (suppression du token)
function disConnect() {
  if (isConnected()) {
    // Supprime le token dans le 'local stockage' 
    localStorage.removeItem("token");
  } else {
    // Renvoi sur la page connexion
    window.location.href = "login.html";
  };
};


