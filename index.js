const COHORT = "2310-FSA-ET-WEB-PT-SF";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");
const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
  await renderEvents();
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
    // console.log(state.events);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Render events from state
 */
function renderEvents() {
  if (!state.events.length) {
    eventList.innerHTML = "<li>No events</li>";
    return;
  }

  const eventsCards = state.events.map((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2> ${event.name}</h2>
    <p>${event.location}</p>
    <date>${event.date}</date>
    <p>${event.description}</p>
    <button>Delete</button>`;

    return li;
  });
  eventList.replaceChildren(...eventsCards);
}

// Ask the API to create a new artist based on form data

async function addEvent(event) {
  event.preventDefault();

  // TODO

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        name: addEventForm.name.value,
        description: addEventForm.description.value,
        date: addEventForm.date.value,
        location: addEventForm.location.value,
      }),
      headers: { "Content-Type": "application/json charset=UTF-8" },
    });
    if (!response.ok) {
      throw new Error("Fail to create ");
    }
    render();
  } catch (error) {
    console.error(error);
  }
}
