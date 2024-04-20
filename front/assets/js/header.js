document.addEventListener("DOMContentLoaded", () => {
    var menu = document.getElementById("myMenu")
var openButton = document.getElementById("openButton")
var closeButton = document.getElementById("closeButton")

openButton.addEventListener("click", function() {
    menu.classList.add("active")
})

closeButton.addEventListener("click", function() {
    menu.classList.remove("active")
})

menu.addEventListener("mouseleave", function() {
    menu.classList.remove("active")
})
});