document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let errorContainer = document.querySelector(".message-error");
    let errorList = document.querySelector(".message-error ul");
    let failContainer = document.querySelector('.message-fail')

    failContainer.classList.remove("visible");
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

    if (
    email.classList.contains('success') && 
    nickname.classList.contains('success') && 
    password.classList.contains('success') &&
    passwordConfirm.classList.contains("success")
    ) {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("nickname").value;

        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify({name, password, email}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        if (response.status !== 201) {
            failContainer.classList.add('visible');
        } else {
            let successContainer = document.querySelector('.message-success')
            successContainer.classList.add('visible')

            const details = document.getElementById("signup-details");
            details.style.display="none";

            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response);

            const data = await response.json();

            const token = data.token;

            localStorage.setItem("token", token);

            setTimeout(() => { window.location.href = "../front/index.html"; }, 2000);
        }
    };
});
});