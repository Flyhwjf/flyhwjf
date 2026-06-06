const searchInput = document.getElementById("searchInput");
const articles = document.querySelectorAll(".article");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();

    articles.forEach(article => {
      const title = article.dataset.title ? article.dataset.title.toLowerCase() : "";
      const text = article.innerText.toLowerCase();

      if (title.includes(keyword) || text.includes(keyword)) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  });
}
