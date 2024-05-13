document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("maisonFilter").addEventListener("change", function (e) {
        var house = e.target.value;
        fetchCards(house);
    });
    
    function fetchCards(h) {
        fetch("https://hp-api.lainocs.fr/characters")
            .then((response) => response.json())
            .then((data) => {
                if (h !== "(all)") {
                    data = data.filter((characters) => characters.house === h);
                }
                displayCards(data);
            })
            .catch((error) => console.log(error));
    }
    
    function displayCards(cards) {
        const container = document.getElementById("cards-container");
        const template = document.getElementById("card-template");

        container.innerHTML = "";
        container.appendChild(template);

        cards.forEach((card) => {
            const cardCard = template.cloneNode(true);
            cardCard.style.display = "block";
            cardCard.id = "";
            cardCard.querySelector(".card-name").textContent = card.name;
            cardCard.querySelector(".card-house").textContent = card.house;
            cardCard.querySelector(".card-img").src = card.image;
            cardCard.querySelector(".card-img").alt = card.slug;
            cardCard.querySelector(".card-details-link").href = `details.html?id=${card.id}`;container.appendChild(cardCard);
        });
    }
}); 