const API_KEY = "c7e9d1fbb36749b2a8c307eb010c9df5";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("news-card-template");

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} • ${date}`;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav = navItem;
    curSelectNav.classList.add('active');
}

const searchInput = document.getElementById('search-input');
const searchBTN = document.getElementById('search-btn');

searchBTN.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
    curSelectNav?.classList.remove('active');
    curSelectNav = null;
})

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
    curSelectNav?.classList.remove('active');
    curSelectNav = null;
    }
});


const menuBtn = document.getElementById('menu-btn');
const searchBar = document.getElementById('search-bar');
const navLinks = document.getElementById('nav-links');
const menuIcon = document.getElementById('menu-icon');

menuBtn.addEventListener("click", () => {
    searchBar.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
        menuBtn.classList.toggle('menu-btn-transition');
    } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        menuBtn.classList.toggle('menu-btn-transition');
    }
})


const jet = document.getElementById('jet');
const jetIcon = document.getElementById('jet-icon');

jet.addEventListener('mouseover', () => {
    jetIcon.classList.add('jet-animation');
});

jet.addEventListener('mouseout', () => {
    jetIcon.classList.remove('jet-animation');
});

jet.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
});

const darkMode = document.getElementById('dark-mode');
const darkModeIcon = document.getElementById('dark-mode-icon');
const root = document.documentElement;
const currentRoot = getComputedStyle(root).getPropertyValue('--primary-trxt-color').trim();
const newsLogo = document.getElementById('news-logo');

darkMode.addEventListener('click', () => {
    if (darkModeIcon.classList.contains('fa-cloud-moon')) {
        darkModeIcon.classList.remove('fa-cloud-moon');
        darkModeIcon.classList.add('fa-sun');
        darkModeIcon.classList.toggle('dark-mode-transition');

        root.style.setProperty('--primary-trxt-color', '#ffffff');
        root.style.setProperty('--secondary-text-color', '#8899A6');
        root.style.setProperty('--accent-color', '#3265a8');
        root.style.setProperty('--accent-color-dark', '#06387a');
        root.style.setProperty('--body-bg-color', '#15202B');
        root.style.setProperty('--nav-bg-color', '#192734');
        root.style.setProperty('--card-bg-color', '#192734');
        root.style.setProperty('--card-hover-bg-color', '#22303C');
        root.style.setProperty('--card-box-shadow1', 'none');
        root.style.setProperty('--card-box-shadow2', 'none');
        newsLogo.src = "assets/newslogo_dark.png"
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-cloud-moon');
        darkModeIcon.classList.toggle('dark-mode-transition');

        root.style.setProperty('--primary-trxt-color', '#132b4b');
        root.style.setProperty('--secondary-text-color', '#3f4752');
        root.style.setProperty('--accent-color', '#3265a8');
        root.style.setProperty('--accent-color-dark', '#06387a');
        root.style.setProperty('--body-bg-color', '#e6f5ff');
        root.style.setProperty('--nav-bg-color', '#aedefa');
        root.style.setProperty('--card-bg-color', '#f8f4f8');
        root.style.setProperty('--card-hover-bg-color', '#f1e8f1');
        root.style.setProperty('--card-box-shadow1', '#a9bbe0');
        root.style.setProperty('--card-box-shadow2', '#ffffff');
        newsLogo.src = "assets/newslogo2.png"
    }
});