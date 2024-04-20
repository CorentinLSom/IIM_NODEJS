document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../front/signin.html";
    }

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        return;
    }

    const data = await response.json();

    document.getElementById("email").innerHTML = data.email;
    document.getElementById("name").innerHTML = data.name;
});