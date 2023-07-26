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

    function makeButtons(spells){
        const buttonsContainer = document.getElementById("buttons")
        buttonsContainer.innerHTML = ""
        spells.forEach(element => {
          const button = document.createElement("button")
          button.innerText = element.name
          button.className = "spell button"
          button.setAttribute("data-spell-name", element.index)
          button.addEventListener("click", (e) => spellPage(e.target.getAttribute("data-spell-name")))
                buttonsContainer.appendChild(button)
        })}
