// // 3 fonctions : connect, isConnected et disConnect

// Fonction pour vérifier l'email et le mot de passe
function checkDataSubmit(email, password) {
    let emailValid = false;
    let passwordValid = false;

    // Vérification de l'email
    if (email.includes("@")) {
        emailValid = true;
        document.getElementById("emailError").textContent = "";
    } else {
        document.getElementById("emailError").textContent = "Vous devez saisir un email avec un @";
    }

    // Supprime les espaces en début et fin de chaîne du mot de passe
    const trimmedPassword = password.trim();
    // Vérification du mot de passe
    if (trimmedPassword !== "" && !password.includes(" ") && trimmedPassword.length >= 6) {
        passwordValid = true;
        document.getElementById("passwordError").textContent = "";
    } else {
        document.getElementById("passwordError").textContent = "Veuillez saisir un mot de passe de 6 caractères au moins et sans espace";
    }

    return emailValid && passwordValid;
}

// Écouteur d'événement pour la soumission du formulaire
function connect() {
    const login = document.getElementById("loginForm");
    login.addEventListener("submit", function (event) {
        event.preventDefault();// Empêche le formulaire de soumettre de manière traditionnelle

        const email = event.target.querySelector("[name=email]").value;
        const password = event.target.querySelector("[name=password]").value;
        // const email = document.getElementById('email').value;
        // const password = document.getElementById('password').value;

        // Création de l'objet des données email et password
        const dataLogin = {
            email: email,
            password: password,
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(dataLogin);

        // Appel de la fonction fetch avec toutes les informations
        // fetchLogin({
        try {
            const response = fetch("http://localhost:5678/api/users/login", {
                // fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });
            if (response.ok) {
                const result = response.json();
                // Stocke les données de connexion dans le localStorage
                localStorage.setItem('dataLogin', chargeUtile);
                console.log(chargeUtile)
                // Redirige vers homepage
                window.location.href = 'index.html';
            } else if (response.status === 401) {
                throw new Error('Adresse email ou mot de passe invalide');
            }
            else {
                throw new Error('Erreur lors de la connexion')
                // Gère les erreurs de connexion, par exemple, afficher un message d'erreur
                // document.getElementById('passwordError').textContent = 'Email ou mot de passe incorrect.';
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire:", error);
            afficherErreurConnexion(login);
        }
    });

    // .then(response => {
    // if (response.ok) {
    //     return response.json();
    // } else if (response.status === 401) {
    //     throw new Error (afficherErreurConnexion(login));
    // } else {
    //     throw new Error ('Erreur lors de la connexion')
    // }
    //     if (!response.ok) {
    //         throw new Error('Erreur de réseau');
    //     } else if (response.status === 401) {
    //         throw new Error('Adresse email ou mot de passe invalide');
    //     }
    //     return response.json();
    // })
    //         .then(data => {
    //             // Traitement de la réponse de l'API
    //             console.log("Réponse de l'API:", data);

    //             const token = data.token;
    //             localStorage.setItem('token', token)

    //             // Redirection vers index.html après une soumission réussie
    //             window.location.href = "index.html";
    //         })
    //         .catch(error => {
    //             console.error("Erreur lors de la soumission du formulaire:", error);
    //             afficherErreurConnexion(login);
    //         });
    // });
}

function afficherErreurConnexion(login) {
    const loginDiv = document.getElementById("loginDiv");
    const spanErreurConnexion = document.createElement("span");
    spanErreurConnexion.innerHTML = "Email ou mot de passe invalide";
    spanErreurConnexion.classList.add("error-message");
    spanErreurConnexion.classList.add("dataLogin");
    loginDiv.insertBefore(spanErreurConnexion, login);
}

// // Fonction pour mettre à jour l'interface utilisateur en fonction de la connexion
// function updateUI() {
//     const logLink = document.querySelector(".log");
//     const editModif = document.querySelector(".edit-modif");
//     const filterButtons = document.getElementById("filter-buttons");

//     if (isConnected()) {
//         logLink.textContent = "logout";
//         editModif.classList.remove("display-none");
//         filterButtons.hidden = true;
//     } else {
//         logLink.textContent = "login";
//         //editModif.classList.add("display-none");
//         filterButtons.hidden = false;
//     }
// }

