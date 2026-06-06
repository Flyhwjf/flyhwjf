// 首页文章搜索
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

// 归档页搜索和分类筛选
const archiveSearchInput = document.getElementById("archiveSearchInput");
const archiveItems = document.querySelectorAll(".archive-item");
const filterButtons = document.querySelectorAll(".filter-btn");
const archiveCount = document.getElementById("archiveCount");
const noArchiveResult = document.getElementById("noArchiveResult");

let currentCategory = "all";

function updateArchiveList() {
  if (!archiveItems.length) return;

  const keyword = archiveSearchInput
    ? archiveSearchInput.value.trim().toLowerCase()
    : "";

  let visibleCount = 0;

  archiveItems.forEach(item => {
    const title = item.dataset.title ? item.dataset.title.toLowerCase() : "";
    const category = item.dataset.category || "";
    const keywords = item.dataset.keywords ? item.dataset.keywords.toLowerCase() : "";
    const text = item.innerText.toLowerCase();

    const matchKeyword =
      title.includes(keyword) ||
      keywords.includes(keyword) ||
      text.includes(keyword);

    const matchCategory =
      currentCategory === "all" || category === currentCategory;

    if (matchKeyword && matchCategory) {
      item.style.display = "grid";
      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  if (archiveCount) {
    archiveCount.textContent = visibleCount;
  }

  if (noArchiveResult) {
    noArchiveResult.style.display = visibleCount === 0 ? "block" : "none";
  }
}

if (archiveSearchInput) {
  archiveSearchInput.addEventListener("input", updateArchiveList);
}

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    currentCategory = this.dataset.category;
    updateArchiveList();
  });
});

updateArchiveList();
