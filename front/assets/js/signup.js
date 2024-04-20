document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let errorContainer = document.querySelector(".message-error");
    let errorList = document.querySelector(".message-error ul");

    errorList.innerHTML = "";
    errorContainer.classList.remove("visible");

    let nickname = document.querySelector("#nickname");
    if (nickname.value === "") {
    errorContainer.classList.add("visible");
    nickname.classList.remove("success");

    let err = document.createElement("li");
    err.innerText = "Le champ nom d'utilisateur ne doit pas être vide";

    errorList.appendChild(err);
    } else {
    nickname.classList.add("success");
    }

    let email = document.querySelector("#email");
    if (email.value === "") {
    errorContainer.classList.add("visible");
    email.classList.remove("success");

    let err = document.createElement("li");
    err.innerText = "Le champ email ne doit pas être vide";

    errorList.appendChild(err);
    } else {
    email.classList.add("success");
    }

    let passCheck = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    
    let password = document.querySelector("#password");
    if (password.value.length < 10 || passCheck.test(password.value) === false) {
        errorContainer.classList.add("visible");
        password.classList.remove("success");
    
        let err = document.createElement("li");
        err.innerText ="Le mot de passe doit avoir au moins 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
    
        errorList.appendChild(err);
    } else {
        password.classList.add("success");
    }
    
    let passwordConfirm = document.querySelector("#password2");
    if (password.value !== "") {
        if (password.value !== passwordConfirm.value) {
            errorContainer.classList.add("visible");
            passwordConfirm.classList.remove("success");
    
        let err = document.createElement("li");
            err.innerText = "Les deux mots de passe doivent être identiques";
    
            errorList.appendChild(err);
        } else {
            passwordConfirm.classList.add("success");
        }
    }

    let successContainer = document.querySelector('.message-success')
    successContainer.classList.remove('visible')

    if (
    email.classList.contains('success') && 
    nickname.classList.contains('success') && 
    password.classList.contains('success') &&
    passwordConfirm.classList.contains("success")
    ) {
    successContainer.classList.add('visible')
    }
});
});