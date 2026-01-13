console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
    const cards = Array.from(document.getElementsByClassName("card"))

  // Création dynamique de la modale
  function createModal() {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    modalContent.innerHTML = `
      <h2>Ajouter une nouvelle tâche</h2>
      <form id="addCardForm">
        <label>Titre :</label>
        <input type="text" id="cardTitle" required>
        
        <label>Description :</label>
        <textarea id="cardDescription" required></textarea>
        
        <label>Priorité :</label>
        <select id="cardPriority" required>
          <option value="high">Haute</option>
          <option value="medium" selected>Moyenne</option>
          <option value="low">Basse</option>
        </select>
        
        <button type="submit">Créer la carte</button>
        <button type="button" id="cancelBtn">Annuler</button>
      </form>
    `;

    modal.appendChild(modalContent);
    return modal;
  }

  addCardBtn.addEventListener("click", () => {
    const modal = createModal();
    document.body.appendChild(modal);

    const form = document.getElementById("addCardForm");
    const cancelBtn = document.getElementById("cancelBtn");

    const closeModal = () => {
      document.body.removeChild(modal);
    };

    cancelBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("cardTitle").value;
      const description = document.getElementById("cardDescription").value;
      const priority = document.getElementById("cardPriority").value;

      const newID = Date.now();
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.setAttribute("data-id", newID);
      newCard.setAttribute("data-priority", priority);
      newCard.setAttribute("draggable", "true");
      newCard.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
      `;

      // Ajouter le drag & drop à la nouvelle carte
      newCard.addEventListener("dragstart", () => draggedCard = newCard);
      newCard.addEventListener("dragend", () => draggedCard = null);

      const todoColumn = document.querySelector('.column[data-status="todo"]');
      todoColumn.appendChild(newCard);

      console.log("Carte ajoutée dans la colonne To Do !");

      closeModal();
    });
  });

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value;

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent;
      const content = card.querySelector("p").textContent;
      const match = title.includes(keyword) || content.includes(keyword);
      card.style.display = match ? "" : "none";
    });
  });

  sortByPriorityBtn.addEventListener("click", () => {
    // ...
  });
});