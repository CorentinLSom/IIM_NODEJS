document.addEventListener("DOMContentLoaded", async function () {

    async function fetchAllCards() {
        const url = `https://hp-api.lainocs.fr/characters`;
        const response = await fetch(url);
        const data = await response.json();
        displayCards(data);
        console.log("fetchAllCards");
    }

    function displayCards(cards) {
        const container = document.getElementById("cards-container");
        const template = document.getElementById("card-template");

      // Supprime les cartes précédentes, sauf le template
        container.innerHTML = "";
        container.appendChild(template);

        cards.forEach((card) => {
        const cardCard = template.cloneNode(true);
        cardCard.style.display = "none";
        cardCard.id = "card_" + card.id;
        cardCard.querySelector(".card-name").textContent = card.name;
        cardCard.querySelector(".card-house").textContent = card.house;
        cardCard.querySelector(".card-img").src = card.image;
        cardCard.querySelector(".card-img").alt = card.slug;
        cardCard.querySelector(".card-details-link").href = `details.html?id=${card.id}`;container.appendChild(cardCard);
        });
    }

    async function myCards() {
        console.log("myCards");
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/ownedCards", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        const myCards = await response.json();
    
        myCards.forEach((myCard) => {
            console.log(myCard.card_id);
            const cardCard = document.getElementById("card_" + myCard.card_id);
            cardCard.style.display = "block";
        });
    };
    

    await fetchAllCards();
    myCards();
});