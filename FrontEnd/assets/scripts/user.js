// // 3 fonctions : connect, isConnected et disConnect

// function connect() {
//     const login = document.getElementById("loginForm")
//     login.addEventListener("submit", function (event) {
//         event.preventDefault();

//         checkDataSubmit(email, password)
//         // Creation de l'objet des donnees email et password
//         const dataLogin = {
//             email: event.target.querySelector("[name=email]").value,
//             password: event.target.querySelector("[name=password]").value,
//         };
//         // Creation de la charge utile au format JSON
//         const chargeUtile = JSON.stringify(dataLogin);
//         //Appel de la fonction fetch avec toutes les informations
//         fetch("http://localhost:5678/api/users/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: chargeUtile
//         }).then(response => {
//             if (response.ok) {
//                 // Redirection vers la page d'accueil (index.html) après succès de la requête
//                 window.location.href = "index.html";
//             } else {
//                 console.error("Erreur lors de la connexion");
//             }
//         }).catch(error => {
//             console.error("Erreur réseau : ", error);
//         });

//     });
// }

// function checkDataSubmit(email, password) {
//     let validMail = "";
//     for (let i = 0; i < email.length; i++) {
//         if (email[i] === "@" || email !== "") {
//             return validMail.innerHTML = email.value;
//         } else {
//             return validMail.innerHTML = 'Remplissage incorrect';
//         }
//     }
//     let validMdp = "";
//     for (let j = 0; j < password.length; j++) {
//         if (password[i] !== "") {
//             return validMdp.innerHTML = password.value;
//         } else {
//             return validMdp.innerHTML = 'Remplissage incorrect';
//         }
//     }
// }

// function isConnected() {
//     if (isConnected() = true) {
//         const log = document.getElementById("log");
//         const display = document.querySelector(".display-none")
//         const filtersHide = document.querySelector(".filter-buttons")
//         log.addEventListener("click", function () {
//             if (log.textContent === "Logout") {
//                 log.innerHTML = "Login";
//                 display.style.display.value = "block";
//                 filtersHide.style.display = "hidden";
//             }
//         })
//     }
// }
// function disConnect() {
//     const log = document.getElementById("log");
//     log.addEventListener("click", function() {
//         if ( log.textContent === "Logout") {
//             log.innerHTML = "Login";
//         }
//     })
// }

// const emailSubmit = document.getElementById('email');
// const passwordSubmit = document.getElementById('password')
// const seConnecterBtn = document.getElementById('login')

// Fonction pour vérifier l'email et le mot de passe
function checkDataSubmit(email, password) {
    let emailValid = false;
    let passwordValid = false;

    // Vérification de l'email
    if (email.includes("@") && !password.includes(" ")) {
        emailValid = true;
        document.getElementById("emailError").textContent = "";
    } else {
        document.getElementById("emailError").textContent = "Email invalide";
    }

    // Supprime les espaces en début et fin de chaîne du mot de passe
    const trimmedPassword = password.trim();

    // Vérification du mot de passe
    if (trimmedPassword !== "") {
        passwordValid = true;
        document.getElementById("passwordError").textContent = "";
    } else {
        document.getElementById("passwordError").textContent = "Mot de passe invalide";
    }

    return emailValid && passwordValid;
}

// function connect() {
//     const emailSubmit = document.getElementById('email');
//     const passwordSubmit = document.getElementById('password')
//     const login = document.getElementById("loginForm");

//     // Écouteur d'événement pour la soumission du formulaire
//     login.addEventListener("submit", function (event) {
//         event.preventDefault();

//         // Récupération des valeurs de l'email et du mot de passe
//         const email = event.target.querySelector("[name=email]").value;
//         const password = event.target.querySelector("[name=password]").value;

//         // Vérification des données soumises
//         const isValid = checkDataSubmit(email, password);
//         if (!isValid) {
//             // Si les données sont invalides, on arrête le processus
//             return;

// Fonction pour rendre visible les messages d'erreur
// function showErrors() {
//     if (!isValid) {
//         document.getElementById("emailError").classList.remove("display-none");
//         document.getElementById("passwordError").classList.remove("display-none");
//     }
// }

// Fonction pour cacher les messages d'erreur
// function hideErrors() {
//     document.getElementById("emailError").classList.add("display-none");
//     document.getElementById("passwordError").classList.add("display-none");
// }

// Écouteur d'événement pour la soumission du formulaire
function connect() {
    const login = document.getElementById("loginForm");
    login.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = event.target.querySelector("[name=email]").value;
        const password = event.target.querySelector("[name=password]").value;

        // Vérification des données soumises
        const isValid = checkDataSubmit(email, password);
        if (!isValid) {
            // showErrors(); // Affiche les messages d'erreur si les données ne sont pas valides
            return;
        } 
        // else {
        //     hideErrors(); // Cache les messages d'erreur si les données sont valides
        // }

        // Création de l'objet des données email et password
        const dataLogin = {
            email: email,
            password: password,
        };

        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(dataLogin);

        // Appel de la fonction fetch avec toutes les informations
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json();
            })
            .then(data => {
                // Traitement de la réponse de l'API
                console.log("Réponse de l'API:", data);
                // Redirection vers index.html après une soumission réussie
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error("Erreur lors de la soumission du formulaire:", error);
            });
    });
}

// Fonction pour vérifier si l'utilisateur est connecté
function isConnected() {
    // Vérifie si les données soumises sont valides
    const isValid = checkDataSubmit(
        document.querySelector("[name=email]").value,
        document.querySelector("[name=password]").value
    );

    // Si les données sont valides, l'utilisateur est connecté
    return isValid;
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de la connexion
function updateUI() {
    const logLink = document.querySelector(".log");
    const editModif = document.querySelector(".edit-modif");
    const filterButtons = document.getElementById("filter-buttons");

    if (isConnected()) {
        logLink.textContent = "logout";
        editModif.classList.remove("display-none");
        filterButtons.hidden = true;
    } else {
        logLink.textContent = "login";
        editModif.classList.add("display-none");
        filterButtons.hidden = false;
    }
}

// Appeler updateUI pour mettre à jour l'interface utilisateur au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    updateUI();
    connect();
});
