document.addEventListener("DOMContentLoaded", async function () {

    async function openBooster() {
        const url = `https://hp-api.lainocs.fr/characters`;
        const response = await fetch(url);
        const data = await response.json();
        displayCards(data);
        console.log("openBooster");
    }

    function displayCards(cards) {

        const booster = getBooster(cards);

        const container = document.getElementById("cards-container");
        const template = document.getElementById("card-template");

        container.innerHTML = "";
        container.appendChild(template);

        cards.forEach((card) => {
            if (booster.indexOf(card.id) !== -1) {
                const cardCard = template.cloneNode(true);
                cardCard.style.display = "block";
                cardCard.id = "";
                cardCard.querySelector(".card-name").textContent = card.name;
                cardCard.querySelector(".card-house").textContent = card.house;
                cardCard.querySelector(".card-img").src = card.image;
                cardCard.querySelector(".card-img").alt = card.slug;
                cardCard.querySelector(".card-details-link").href = `details.html?id=${card.id}`;container.appendChild(cardCard);
                addCard(card.id);
            };
        });
    };

    function getBooster(cards) {
        var arr = [];
        while(arr.length < 3){
            var r = Math.floor(Math.random() * cards.length) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        console.log(arr);
        return arr;
    };

    async function addCard(cardId) {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/addCard/" + cardId, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    const buttonBooster = document.getElementById("buttonBooster");
    buttonBooster.onclick = function() {openBooster()};
});