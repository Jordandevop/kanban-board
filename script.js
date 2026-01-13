console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  const cards = document.querySelectorAll(".card");  
  console.log(cards)

  // Éventuellement, on écoute les événements
  addCardBtn.addEventListener("click", () => {
    // ...
  });

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value
    console.log(keyword)

    cards.forEach(card => {
    const title = card.querySelector("h3").textContent;
    const content = card.querySelector("p").textContent;

    const match =
    title.includes(keyword) || content.includes(keyword);

    card.style.display = match ? "" : "none";
  });
  });

  sortByPriorityBtn.addEventListener("click", () => {
    // ...
  });
});
