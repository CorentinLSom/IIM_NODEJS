document.addEventListener("DOMContentLoaded", function () {

    async function fetchCards() {
        const url = `https://hp-api.lainocs.fr/characters`;
        const response = await fetch(url);
        const data = await response.json();
        displayCards(data);
    }

    function displayCards(cards) {
        const container = document.getElementById("cards-container");
        const template = document.getElementById("card-template");

      // Supprime les cartes précédentes, sauf le template
        container.innerHTML = "";
        container.appendChild(template);

        cards.forEach((card) => {
        const cardCard = template.cloneNode(true);
        cardCard.style.display = "block"; // Rend la carte visible
        cardCard.id = ""; // Enlève l'id pour éviter les doublons
        cardCard.querySelector(".card-name").textContent = card.name;
        cardCard.querySelector(".card-house").textContent = card.house;
        cardCard.querySelector(".card-img").src = card.image;
        cardCard.querySelector(".card-img").alt = card.slug;
        cardCard.querySelector(".card-details-link").href = `details.html?id=${card.id}`;container.appendChild(cardCard);
        });
    }

    fetchCards();
});