document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (token) {
        let profileElements = document.getElementsByClassName("profil");
        for (var i=0; i<profileElements.length; i++) {
            profileElements.item(i).style.display = "block";
        }

        let logoutElements = document.getElementsByClassName("logout");
        for (var i=0; i<logoutElements.length; i++) {
            logoutElements.item(i).style.display = "block";
        }
        
        let signinElements = document.getElementsByClassName("signin");
        for (var i=0; i<signinElements.length; i++) {
            signinElements.item(i).style.display = "none";
        }

        let signupElements = document.getElementsByClassName("signup");
        for (var i=0; i<signupElements.length; i++) {
            signupElements.item(i).style.display = "none";
        }
    }

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
    }
});

function logout() {
    localStorage.removeItem("token");
    location.reload();
}