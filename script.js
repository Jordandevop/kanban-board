console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.getElementById("addCardBtn");
  const searchInput = document.getElementById("searchInput");
  const sortByPriorityBtn = document.getElementById("sortByPriorityBtn");
  const columns = document.querySelectorAll(".column");
  let draggedCard = null;

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("dragstart", () => draggedCard = card);
    card.addEventListener("dragend", () => draggedCard = null);
  });

  columns.forEach(column => {
    column.addEventListener("dragover", e => e.preventDefault());
    column.addEventListener("drop", () => {
      if (draggedCard) {
        column.appendChild(draggedCard);
        draggedCard.dataset.status = column.dataset.status;
      }
    });
  });

  addCardBtn.addEventListener("click", () => {
    // ...
  });

  searchInput.addEventListener("input", () => {
    // ...
  });

  sortByPriorityBtn.addEventListener("click", () => {
    // ...
  });
});
