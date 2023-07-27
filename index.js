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

async function spellPage(target){
    const spellDetailsContainer = document.getElementById("spell-details");
    spellDetailsContainer.innerHTML = '';
      
    try {
        const resp = await fetch(`https://www.dnd5eapi.co/api/spells/${target}/`);
        const data = await resp.json()
      
        const h3 = document.createElement("h3")
        const p1 = document.createElement("p")
        const p2 = document.createElement("p")
        const p3 = document.createElement("p")
        const p4 = document.createElement("p")
        h3.innerText = `Spell Name: ${data.name}`
        p1.innerText = `Range: ${data.range}`
        p2.innerText = `Casting Time: ${data.casting_time}`
        p3.innerText = `Components: ${data.components}`
        p4.innerText = `Description: ${data.desc}`
        h3.appendChild(p1)
        p1.appendChild(p2)
        p2.appendChild(p3)
        p3.appendChild(p4)
        spellDetailsContainer.appendChild(h3)
        h3.id = "spell-name"
        } catch (error) {
          console.error('Error fetching spell details:', error)
      }}

function filterSearch() {
    const searchInput = document.getElementById('search-input');
    const spellButtons = document.querySelectorAll('.spell.button');
      
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
      
        spellButtons.forEach(button => {
        const buttonText = button.innerText.toLowerCase();
        if (searchTerm === "" || buttonText.includes(searchTerm)) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
        })
    })
    searchInput.addEventListener('focus', () => {
        searchInput.value = ''
    })
}
