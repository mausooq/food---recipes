document.addEventListener("DOMContentLoaded", function () {
  const recipesContainer = document.querySelector(".recipes-grid");
  const categorySelect = document.querySelector(".filter-options select");
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-box button");

  let recipesData = [];


  fetch("./recipes.json")
      .then(response => response.json())
      .then(data => {
          recipesData = data;
          displayRecipes(recipesData);
      })
      .catch(error => console.error("Error fetching recipes:", error));


  function displayRecipes(recipes) {
      recipesContainer.innerHTML = ""; 
      if (recipes.length === 0) {
          recipesContainer.innerHTML = "<p>No recipes found.</p>";
          return;
      }

      recipes.forEach(recipe => {
          const recipeCard = document.createElement("div");
          recipeCard.classList.add("recipe-card");

          recipeCard.innerHTML = `
              <div class="recipe-image">
                  <img src="${recipe.image}" alt="${recipe.title}" />
                  <div class="recipe-tags">
                      <span>${recipe.category}</span>
                  </div>
              </div>
              <div class="recipe-info">
                  <h2>${recipe.title}</h2>
                  <div class="recipe-meta">
                      <span><i class="far fa-clock"></i> ${recipe.time}</span>
                      <span><i class="fas fa-utensils"></i> ${recipe.servings}</span>
                  </div>
                  <p>${recipe.description}</p>
                  <a href="${recipe.link}" class="btn">View Recipe</a>
              </div>
          `;
          recipesContainer.appendChild(recipeCard);
      });
  }

  function filterRecipes() {
      const selectedCategory = categorySelect.value.toLowerCase();
      const searchQuery = searchInput.value.toLowerCase().trim();

      let filteredRecipes = recipesData;

      if (selectedCategory !== "all" && selectedCategory !== "") {
          filteredRecipes = filteredRecipes.filter(recipe =>
              recipe.category.toLowerCase() === selectedCategory
          );          
      }

      if (searchQuery !== "") {
          filteredRecipes = filteredRecipes.filter(recipe =>
              recipe.title.toLowerCase().includes(searchQuery)
          );
      }

      displayRecipes(filteredRecipes);
  }


  categorySelect.addEventListener("change", filterRecipes); 
  searchInput.addEventListener("input", filterRecipes); 
  searchButton.addEventListener("click", filterRecipes); 
});
