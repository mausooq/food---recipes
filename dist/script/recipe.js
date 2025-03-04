document.addEventListener('DOMContentLoaded', function() {
    const recipeData = JSON.parse(localStorage.getItem('currentRecipe'));
    
    if (!recipeData) {
        window.location.href = 'recipes.html';
        return;
    }

    displayRecipeDetails(recipeData);
});

function displayRecipeDetails(recipe) {
    document.title = `${recipe.title} - Recipe Details`;


    document.getElementById('recipeName').textContent = recipe.title;
    document.getElementById('recipeCategory').innerHTML = `<i class="fas fa-tag"></i> ${recipe.category}`;
    document.getElementById('recipePrepTime').innerHTML = `<i class="far fa-clock"></i> ${recipe.time}`;
    document.getElementById('recipeServings').innerHTML = `<i class="fas fa-utensils"></i> ${recipe.servings}`;
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeImage').alt = recipe.title;
    document.getElementById('recipeDescription').textContent = recipe.description;


    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = recipe.ingredients
        .map(ingredient => `<li>${ingredient}</li>`)
        .join('');

    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = recipe.instructions
        .map(instruction => `<li>${instruction}</li>`)
        .join('');
}