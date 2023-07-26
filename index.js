document.addEventListener("DOMContentLoaded", init)
async function init() {
  await addSpells()
  filterSearch()
}