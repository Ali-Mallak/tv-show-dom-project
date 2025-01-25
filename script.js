async function checkIp() {
  try {
    // Get ip users
    const response = await fetch("https://ipapi.co/?format=json");
    const data = await response.json();
    const userIp = data.ip;
  console.log("User IP:", userIp);
// Get location data based on the user's IP
    const locationResponse = await fetch(`https://ipapi.co/${userIp}/json/`);
    const locationData = await locationResponse.json();

  console.log("Location Data:", locationData);
// Check if the location is in Iran
    if (locationData.country === "IR") {
      alert("لطفاً فیلترشکن خود را روشن کنید.");
    } else {
      alert("شما در ایران نیستید.");
    }
  } catch (error) {
  }
}
checkIp().then(() => {

}).catch(err => {
   console.error("Error in checkIp:", err); 
  }
);

async function ali() {
  try {
    const getData = await fetch("https://api.tvmaze.com/shows/82/episodes");
    const allData = await getData.json();
    return allData;
  } catch (error) {
    console.log(error);
  }
}
// select main and ...
const main = document.querySelector("main");
const btnLightAndDark = document.getElementById("changeBackground");
const search = document.getElementById("search");
const selectOpt = document.getElementById("select");
let allEpisodes = [];

// kar ba API API API
ali()
  .then((data) => {
    allEpisodes = data;
    displayEpisodes(allEpisodes);
    populateSelect(allEpisodes);
  })
  .catch((error) => console.log(error));

function displayEpisodes(episodes) {
  main.innerHTML = '';
  episodes.forEach((ele) => {
// making card
    const card = document.createElement("div");
    const nameFilm = document.createElement("h2");
    const image = document.createElement("img");
    const seasonsAndEpisodes = document.createElement("p");
    const summary = document.createElement("p");
    const link = document.createElement("a");
    const opt = document.createElement("option");
// set class
    card.className = "card";
    nameFilm.className = "titleFilm";
    image.className = "card-image";
    seasonsAndEpisodes.className = "se-ep";
    summary.className = "epitome";
    link.className = "link";
// address
    nameFilm.textContent = ele.name;
    if (ele.name.length > 20) {
      nameFilm.style.fontSize = "18px";
    }
    nameFilm.style.padding = "1rem 0rem";
    image.src = ele.image.medium;
    seasonsAndEpisodes.textContent = `S0${ele.season} - E0${ele.number}`;
    if (ele.number === 10) {
      seasonsAndEpisodes.innerText = `S0${ele.season} - E${ele.number}`;
    }
    summary.innerHTML = ele.summary;
    link.innerText = "play";
    link.href = ele.url;
// add option
    opt.value = ele.name;
    opt.innerText = `S0${ele.season} - E0${ele.number} - ${ele.name}`;
    if (ele.number === 10) {
      opt.innerText = `S0${ele.season} - E${ele.number} - ${ele.name}`;
    }
// appendChild ha
    card.appendChild(nameFilm);
    card.appendChild(image);
    card.appendChild(seasonsAndEpisodes);
    card.appendChild(link);
    card.appendChild(summary);
    selectOpt.appendChild(opt);
    main.appendChild(card);
  });
}

function populateSelect(episodes) {
  selectOpt.innerHTML = '';
  const allSeasonsOption = document.createElement("option");
  allSeasonsOption.value = "all";
  allSeasonsOption.innerText = "All Seasons"; 
  selectOpt.appendChild(allSeasonsOption); 

  episodes.forEach((ele) => {
    const opt = document.createElement("option");
    opt.value = ele.name;
    opt.innerText = `S0${ele.season} - E0${ele.number} - ${ele.name}`;
    selectOpt.appendChild(opt);
  });
}

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => 
    episode.name.toLowerCase().includes(query) 
  );
  displayEpisodes(filteredEpisodes); 
});

selectOpt.addEventListener("change", () => {
  const selectedOption = selectOpt.value;
  if (selectedOption === "all") {
    displayEpisodes(allEpisodes);
  } else {
  const filteredEpisodes = allEpisodes.filter((episode) => 
    episode.name === selectedOption
  );
  displayEpisodes(filteredEpisodes);
  }
});

btnLightAndDark.addEventListener("click", () => {
  if (btnLightAndDark.textContent === "dark") {
    main.style.backgroundColor = "#181818";
    btnLightAndDark.textContent = "light";
  } else if (btnLightAndDark.textContent === "light") {
    main.style.backgroundColor = "#d6cfb9c9";
    btnLightAndDark.textContent = "dark";
  }
});
