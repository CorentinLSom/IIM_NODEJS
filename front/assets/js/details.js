document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const cardId = params.get("id");
    console.log(cardId)

    async function fetchCard(id) {
        console.log(id);
        const url = `https://hp-api.lainocs.fr/characters`;
        const response = await fetch(url);
        const data = await response.json();
        displayCard(data[id-1]);
    }

    function displayCard(card) {
        console.log(card);
        const template = document.getElementById("card-details");

        template.style.display = "block"; // Rend la carte visible
        template.id = ""; // Enlève l'id pour éviter les doublons
        template.querySelector(".card-name").textContent = card.name;
        template.querySelector(".card-house").textContent = card.house;
        template.querySelector(".card-eyes").textContent = card.eyes;
        template.querySelector(".card-hairs").textContent = card.hairs;
        template.querySelector(".card-birthday").textContent = new Date(card.birthday).toLocaleDateString();
        template.querySelector(".card-blood").textContent = card.blood;
        template.querySelector(".card-wand").textContent = card.wand;
        template.querySelector(".card-patronus").textContent = card.patronus;
        template.querySelector(".card-actor").textContent = card.actor;
        template.querySelector(".details-img").src = card.image;
        template.querySelector(".details-img").alt = card.slug;
        
        let lastHouseVisited = card.house;
        console.log(lastHouseVisited);

        fetch("http://localhost:3000/iot/house", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Iot:lastHouseVisited,
            }),
        });
    }

    fetchCard(cardId);


});