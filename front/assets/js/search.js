document.addEventListener("DOMContentLoaded", async () => {
    const searchBar = document.getElementById("searchBar");
    const cards = document.getElementsByClassName("card");

    searchBar.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();

        Array.from(cards).forEach(function(card) {
            const cardText = card.getElementsByClassName("card-name")[0].innerHTML.toLowerCase();

            if (cardText.includes(term) && card.id !== "card-template") {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});