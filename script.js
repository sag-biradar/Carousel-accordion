import teamsData from "./data.js";
console.log(teamsData);

const teamPillsContainerId = "teams-container";
const teamContentContainerId = "team-content-container";

displayTeamPills(teamsData);

const teamPillsContainer = document.getElementById(teamPillsContainerId);

// Event handler to show Carousel with images for selected team
teamPillsContainer.addEventListener("click", (e) => {
  //e.target -> element node where the "click" event is fired from
  //events fired in child, bubbles up to the parent
  // console.log(e.target);

  // 1. Get the team content container div
  const teamContentContainer = document.getElementById(teamContentContainerId);
  // console.log(teamContentContainer);

  // 2. Create content for selected team
  // 2.1. Get the selected team id
  const selectedTeamId = e.target.id;
  // console.log(selectedTeamId);

  // 2.2. Get the image links for the selected team
  const selectedTeamData = teamsData.find((team) => team.id === selectedTeamId); // Find selected team's data
  const imageLinks = selectedTeamData.images; // Get the list of images for the selected team
  // console.log(imageLinks);

  // 2.3. Get Carousel outer structure
  // 2.4. Overwrite team content container body with the Carousel outer structure
  teamContentContainer.innerHTML = getCarouselOuterStructure();
  // console.log(teamContentContainer);

  // 2.5. For each image link, append Carousel item with image to "div.carousel-inner" element
  const carouselItemParent = document.getElementById("carousel-item-parent");
  addCarouselItems(carouselItemParent, imageLinks);
});

// Displaying team pills for each team
function displayTeamPills(teamsData) {
  // 1. Get the pill container div
  const teamPillsContainer = document.getElementById(teamPillsContainerId);
  // console.log(teamPillsContainer);

  // 2. For each of the team
  teamsData.forEach((team) => {
    // 2.1 Create team pill and set id for team
    let teamPillElement = getTeamPill(team);
    // console.log(teamPillElement);

    // 2.2 Append team pill to the pill container div
    teamPillsContainer.append(teamPillElement);
  });
}

function getTeamPill(team) {
  let teamPillElement = document.createElement("div");
  teamPillElement.classList.add("card", "m-2");
  teamPillElement.innerHTML = `<div id="${team.id}" class="card-body">${team.name}</div>`;
  return teamPillElement;
}

function getCarouselOuterStructure() {
  return `
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width:70vw;height:50vh">
    <div class="carousel-inner h-100" id="carousel-item-parent">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
}

function addCarouselItems(carouselItemParent, imageLinks) {
  imageLinks.forEach((link, idx) => {
    const carouseItemElement = document.createElement("div");

    // Set as active if id is 0 i.e, first element
    idx === 0
      ? carouseItemElement.classList.add("carousel-item", "h-100", "active")
      : carouseItemElement.classList.add("carousel-item", "h-100");

    carouseItemElement.innerHTML = `<img src=${link} class="w-100 h-100" alt="..." style="object-fit:cover">`;
    // console.log(carouseItemElement);

    carouselItemParent.append(carouseItemElement);
  });
}
