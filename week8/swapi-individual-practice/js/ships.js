const cards = document.getElementById("cards");
const pages = document.getElementById("pages");
const currentPageElement = document.getElementById("currentPage");

const baseUrl = "https://swapi.dev/api/starships/?page=";

let currentPage = 1;
let numPages = 1;

const loadResults = async (page) => {
  const data = await fetch(`${baseUrl}${page}`);
  const json = await data.json();
  const results = json.results;

  cards.innerHTML = "";

  results.forEach((ship) => {
    const details = document.createElement("details");
    details.innerHTML = `
    <summary>${ship.name}</summary>`;
    const ul = document.createElement("ul");
    const attributes = [
      "model",
			"manufacturer",
			"cost_in_credits",
			"length",
			"max_atmosphering_speed",
			"crew",
			"passengers",
			"cargo_capacity",
			"consumables",
			"hyperdrive_rating",
			"MGLT",
			"starship_class",
    ];
    ul.innerHTML = attributes
      .map(
        (attribute) =>
          `<li>${
            attribute.charAt(0).toUpperCase() +
            attribute.replace("_", " ").slice(1)
          }: ${ship[attribute]}</li>`
      )
      .join("");
    details.appendChild(ul);
    cards.appendChild(details);
  });
};

const updateCurrentPage = (newPage) => {
  currentPageElement.textContent = newPage;
};

const setup = async () => {
  const data = await fetch(baseUrl);
  const json = await data.json();
  numPages = Math.ceil(json.count / 10);
  const prevButton = document.createElement("button");
  prevButton.textContent = `<`;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      loadResults(currentPage - 1);
      currentPage = currentPage - 1;
      updateCurrentPage(currentPage);
    }
  });
  pages.appendChild(prevButton);

  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      loadResults(i);
      updateCurrentPage(currentPage);
    });
    pages.appendChild(button);
  }
  const nextButton = document.createElement("button");
  nextButton.textContent = `>`;
  nextButton.addEventListener("click", () => {
    if (currentPage < numPages) {
      loadResults(currentPage + 1);
      currentPage = currentPage + 1;
      updateCurrentPage(currentPage);
    }
  });
  pages.appendChild(nextButton);
  loadResults(1);
  updateCurrentPage(1);
  // {"count":82,"next":"https://swapi.dev/api/ships/?page=2","previous":null,"results":[{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","bi...
};
setup();
