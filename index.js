document.addEventListener("DOMContentLoaded", init)
async function init() {
  await addSpells()
  filterSearch()
}

function addSpells(){
    return fetch('https://www.dnd5eapi.co/api/spells/')
    .then(resp => resp.json())
    .then(data => makeButtons(data.results))
    .catch(error => {
      console.error('Error fetching spells:', error)
      })
    }