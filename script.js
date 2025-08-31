const API_KEY = "a6324418b4694d8eb7085039f2ffbf08";
const BASE_URL = "https://newsapi.org/v2";

// Fetch Top Headlines (default)
async function loadNews(category = "general") {
  fetchNews(`${BASE_URL}/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`);
}

// Fetch News with URL
async function fetchNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    if (data.status !== "ok" || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>⚠️ No news found.</p>";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News image">
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;

      newsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("news-container").innerHTML = "<p>⚠️ Failed to load news.</p>";
  }
}

// Search Function
function searchNews() {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    fetchNews(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`);
  } else {
    loadNews(); // fallback
  }
}

// Filter by Category
function filterByCategory() {
  const category = document.getElementById("category").value;
  loadNews(category);
}

window.onload = () => loadNews();
