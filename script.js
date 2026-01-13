console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  const columns = document.querySelectorAll(".column");
  let draggedCard = null;
  let cards = Array.from(document.querySelectorAll(".card"));

  // Fonction pour mettre à jour la liste des cartes
  function updateCardsList() {
    cards = Array.from(document.querySelectorAll(".card"));
  }

  // ===== DRAG & DROP =====
  function enableDragAndDrop(card) {
    card.setAttribute("draggable", "true");

    card.addEventListener("dragstart", () => {
      draggedCard = card;
      card.style.opacity = "0.5";
    });

    card.addEventListener("dragend", () => {
      draggedCard = null;
      card.style.opacity = "1";
    });
  }

  document.querySelectorAll(".card").forEach(card => {
    enableDragAndDrop(card);
  });

  columns.forEach(column => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", () => {
      if (draggedCard) {
        column.appendChild(draggedCard);
        draggedCard.dataset.status = column.dataset.status;
        console.log(`Carte déplacée vers ${column.dataset.status}`);
      }
    });
  });

  // ===== DELETE BUTTON =====
  function addDeleteButton(card) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.remove();
      updateCardsList();
      console.log("Carte supprimée");
    });

    card.style.position = "relative";
    card.appendChild(deleteBtn);
  }

  // ===== PRIORITY BADGE =====
  function addPriorityBadge(card) {
    const priority = card.dataset.priority;
    const labels = { high: "Haute", medium: "Moyenne", low: "Basse" };
    const badge = document.createElement("span");
    badge.className = `priority-badge ${priority}`;
    badge.textContent = labels[priority] || priority;
    card.insertBefore(badge, card.firstChild);
  }

  document.querySelectorAll(".card").forEach(card => {
    addDeleteButton(card);
    addPriorityBadge(card);
  });

  // ===== MODAL =====
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
      newCard.setAttribute("data-status", "todo");
      newCard.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
      `;

      enableDragAndDrop(newCard);
      addDeleteButton(newCard);
      addPriorityBadge(newCard);

      const todoColumn = document.querySelector('.column[data-status="todo"]');
      todoColumn.appendChild(newCard);

      updateCardsList();

      console.log("Carte ajoutée dans la colonne To Do !");

      closeModal();
    });
  });

  // ===== SEARCH =====
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const content = card.querySelector("p").textContent.toLowerCase();
      const match = title.includes(keyword) || content.includes(keyword);
      card.style.display = match ? "" : "none";
    });
  });

  sortByPriorityBtn.addEventListener("click", () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    columns.forEach(column => {
      const cardsInColumn = [...column.querySelectorAll(".card")];
      cardsInColumn
        .sort((a, b) => priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority])
        .forEach(card => column.appendChild(card));
    });
  });
});