async function fetchPopularShows() {
    try {
      const response = await fetch("https://api.tvmaze.com/shows");
      const shows = await response.json();
      const popularShows = shows.filter(show => show.rating.average >= 8);
      displayPopularShows(popularShows);
    } catch (error) {
      console.error("Error fetching popular shows:", error);
    }
  }

function displayPopularShows(shows) {
    const main = document.querySelector("main");
    main.innerHTML = '';
  
    shows.forEach(show => {
      const card = document.createElement("div");
      const title = document.createElement("h2");
      const image = document.createElement("img");
      const summary = document.createElement("p");
  
      card.className = "card";
      title.textContent = show.name;
      image.src = show.image ? show.image.medium : "placeholder.jpg";
      summary.innerHTML = show.summary;
  
      card.appendChild(title);
      card.appendChild(image);
      card.appendChild(summary);
      main.appendChild(card);
    });
  }
  
fetchPopularShows();
  
  const btnLightAndDark = document.getElementById("changeBackground");
  const main = document.querySelector("main");
  btnLightAndDark.addEventListener("click", () => {
    if (btnLightAndDark.textContent === "dark") {
      main.style.backgroundColor = "#181818";
      btnLightAndDark.textContent = "light"; 
    } else if (btnLightAndDark.textContent === "light") {
      main.style.backgroundColor = "#d6cfb9c9";
      btnLightAndDark.textContent = "dark"; 
    }
  });