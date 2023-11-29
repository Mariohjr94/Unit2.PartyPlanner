const COHORT = "2310-FSA-ET-WEB-PT-SF";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#artists");
const addEventForm = document.querySelector("#addEvent");
//addArtistForm.addEventListener("submit", addArtist);

/**
 * Sync state with the API and rerender
 */
async function render() {
  getEvents();
  renderEvents();
}
render();

/**
 * Update state with events from API
 */
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Render events from state
 */
function renderEvents() {
  if (!state.events.length) {
    eventList.innerHTML = "<li>No artists</li>";
    return;
  }

  const eventsCards = state.events.map((events) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2> ${events.name}</h2>
    <p>${events.location}</p>
    <p>${events.date}</p>
    <p>${events.description}</p>`;
    return li;
  });
  eventList.replaceChildren(...eventsCards);
}
