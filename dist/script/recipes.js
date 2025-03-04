document.addEventListener("DOMContentLoaded", function () {
    const recipesContainer = document.querySelector(".recipes-grid");
    const categorySelect = document.querySelector(".filter-options select");
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");

    let recipesData = [];


    recipesContainer.innerHTML = '<div class="loading">Loading recipes...</div>';

    // Fetch recipes from JSON file
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
                recipesData = data;
                displayRecipes(recipesData);
            }
        )
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = "";
        
        // Check if recipes array exists and has items
        if (!recipes || recipes.length === 0) {
            recipesContainer.innerHTML = `
                <div class="no-recipes">
                    <p>No recipes found matching your criteria.</p>
                </div>
            `;
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
                    <a href="recipe.html?id=${recipe.id}" class="btn" onclick="saveRecipeData('${recipe.id}', ${JSON.stringify(recipe).replace(/"/g, '&quot;')})">View Recipe</a>
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
                recipe.title.toLowerCase().includes(searchQuery) ||
                recipe.description.toLowerCase().includes(searchQuery)
            );
        }

        displayRecipes(filteredRecipes);
    }

    
    window.saveRecipeData = function(id, recipeData) {
        localStorage.setItem('currentRecipe', JSON.stringify(recipeData));
    };


    categorySelect.addEventListener("change", filterRecipes);
    searchInput.addEventListener("input", filterRecipes);
    searchButton.addEventListener("click", filterRecipes);
});