async function likedCards() {
    console.log("likedCards");
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/likedCards", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const likedCards = await response.json();

    likedCards.forEach((likedCard) => {
        console.log(likedCard.card_id);
        const likeButton = document.getElementById("likeButton_" + likedCard.card_id);
        if (likeButton !== null) {likeButton.style.display ="none";};
        const unlikeButton = document.getElementById("unlikeButton_" + likedCard.card_id);
        if (unlikeButton !== null) {unlikeButton.style.display ="block";};
    });
};

async function actionCard(cardId, action) {
    const token = localStorage.getItem("token");
    console.log(action, cardId);
    await fetch("http://localhost:3000/" + action + "/" + cardId, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const likeButton = document.getElementById("likeButton_" + cardId);
    const unlikeButton = document.getElementById("unlikeButton_" + cardId);

    if (action == "likeCard") {
        if (likeButton !== null) {likeButton.style.display ="none";};
        if (unlikeButton !== null) {unlikeButton.style.display ="block";};
    } else {
        if (likeButton !== null) {likeButton.style.display ="block";};
        if (unlikeButton !== null) {unlikeButton.style.display ="none";};
    };
};