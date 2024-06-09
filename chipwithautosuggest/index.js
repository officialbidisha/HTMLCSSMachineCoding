const addChipForm = document.getElementsByClassName("add-chip")[0];
addChipForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();
  if (name !== "") {
    createChip(name);

    // Use null if profile icon is empty
    nameInput.value = "";
  }
});

function createChip(name) {
  const chipContainer = document.querySelector(".chips-container");
  const chip = document.createElement("div");
  chip.classList.add("chip");
  const chipAvatar = document.createElement("div");
  chipAvatar.classList.add("chip-avatar");
  chipAvatar.textContent = name.substring(0, 1);
  const chipName = document.createElement("div");
  chipName.textContent = name;
  const closeIcon = document.createElement("div");
  closeIcon.classList.add("close-icon");
  closeIcon.textContent = "x";
  closeIcon.addEventListener("click", function () {
    chip.remove();
  });
  chip.appendChild(chipAvatar);
  chip.appendChild(chipName);
  chip.appendChild(closeIcon);
  chipContainer.appendChild(chip);
}
