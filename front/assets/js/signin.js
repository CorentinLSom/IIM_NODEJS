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

    let emailElt = document.querySelector("#email");
    if (emailElt.value === "") {
    errorContainer.classList.add("visible");
    emailElt.classList.remove("success");

    let err = document.createElement("li");
    err.innerText = "Le champ email ne doit pas être vide";

    errorList.appendChild(err);
    } else {
    emailElt.classList.add("success");
    }

    let passwordElt = document.querySelector("#password");
    if (passwordElt.value === "") {
    errorContainer.classList.add("visible");
    passwordElt.classList.remove("success");

    let err = document.createElement("li");
    err.innerText = "Le champ mot de passe ne doit pas être vide";

    errorList.appendChild(err);
    } else {
    passwordElt.classList.add("success");
    }

    if (emailElt.classList.contains("success") && passwordElt.classList.contains("success")) {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log(email);

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        if (response.status !== 200) {
            failContainer.classList.add('visible');

        } else {
            let successContainer = document.querySelector('.message-success')
            successContainer.classList.add('visible');

            const details = document.getElementById("signin-details");
            details.style.display="none";

            const data = await response.json();

            const token = data.token;

            localStorage.setItem("token", token);

            setTimeout(() => { window.location.href = "../front/index.html"; }, 2000);

            const profile = document.getElementById("profil");
            profile.classList.remove("profil");
        }
    };
});
});