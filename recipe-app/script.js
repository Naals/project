const recipeDetailsContainer = document.querySelector('.meal-details-content'); // Container for recipe details
const searchResultsContainer = document.querySelector('#meal'); // Container for search results (meals)
const closeRecipeButton = document.querySelector('#recipe-close-btn'); // Button to close the recipe details
const mealSearchButton = document.querySelector('#search-btn'); // Button to initiate meal search
const favoritesListContainer = document.querySelector('#favorites-list'); // Container for favorite meals

const spoonacularApiKey = "249efe5a6e1c493ab315a97f4fa17a28";

// Load favorites from localStorage or initialize an empty array
let favoriteMeals = JSON.parse(localStorage.getItem('favorites')) || [];

// Event listeners
mealSearchButton.addEventListener('click', searchMeals); // Triggers meal search
searchResultsContainer.addEventListener('click', fetchRecipeDetails); // Fetches recipe details on meal click
closeRecipeButton.addEventListener('click', () => {
    recipeDetailsContainer.parentElement.classList.remove('showRecipe'); // Hides recipe details section
});

// Function to fetch meal data based on user's input
function searchMeals() {
    const userQuery = document.querySelector('#search-input').value.trim(); // User's search input
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${userQuery}`)
        .then(response => response.json())
        .then(data => {
            let mealHtml = "";
            if (data.results) { // Check if results were found
                data.results.forEach(meal => {
                    mealHtml += `
                    <div class="meal-item" data-id="${meal.id}">
                        <div class="meal-img">
                            <img src="${meal.image}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.title}</h3>
                            <a href="#" class="recipe-btn">View</a>
                            <button class="favorite-btn" data-id="${meal.id}">❤️</button>
                        </div>
                    </div>
                    `;
                });
                searchResultsContainer.classList.remove('notFound');
            } else { // Display a message if no results found
                mealHtml = "Sorry, we didn't find any meal!";
                searchResultsContainer.classList.add('notFound');
            }
            searchResultsContainer.innerHTML = mealHtml; // Populate meal results container with HTML
        });
}

// Function to get detailed recipe information for a selected meal
function fetchRecipeDetails(event) {
    event.preventDefault();
    if (event.target.classList.contains('recipe-btn')) { // Check if 'View' button is clicked
        const selectedMeal = event.target.parentElement.parentElement; // Identify the meal item
        const mealId = selectedMeal.dataset.id; // Extract meal ID from data attribute

        fetch(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=${spoonacularApiKey}`)
            .then(response => response.json())
            .then(data => displayRecipeDetails(data)); // Display recipe details
    }
}

// Function to display detailed recipe data including ingredients and instructions
function displayRecipeDetails(meal) {
    const ingredientsList = meal.extendedIngredients.map(ingredient =>
        `<li>${ingredient.original}</li>`
    ).join("");

    recipeDetailsContainer.innerHTML = `
        <h2 class="recipe-title">${meal.title}</h2>
        <p class="recipe-category">${meal.dishTypes ? meal.dishTypes.join(', ') : 'No category'}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.instructions || 'No instructions available'}</p>
        </div>
        <div class="recipe-ingredients">
            <h3>Ingredients:</h3>
            <ul>${ingredientsList}</ul>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.image}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.sourceUrl}" target="_blank">View Full Recipe</a>
        </div>
    `;
    recipeDetailsContainer.parentElement.classList.add('showRecipe'); // Show the recipe section
}

// Event listener to add a meal to favorites when the heart button is clicked
// Event listener to add a meal to favorites when the heart button is clicked
searchResultsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('favorite-btn')) {
        const mealId = event.target.dataset.id; // Get the meal ID

        // Fetch the meal details to add to favorites
        fetch(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=${spoonacularApiKey}`)
            .then(response => response.json())
            .then(data => {
                addToFavorites(data); // Add meal to favorites
            });
    }
});

// Function to add a meal to favorites
function addToFavorites(meal) {
    // Check if meal is already in favorites
    if (!favoriteMeals.some(fav => fav.id === meal.id)) {
        favoriteMeals.push(meal); // Add meal to favorites
        localStorage.setItem('favorites', JSON.stringify(favoriteMeals)); // Save to localStorage
        renderFavoriteMeals(); // Re-render the favorite meals section
    }
}

// Function to render the favorite meals list
function renderFavoriteMeals() {
    favoritesListContainer.innerHTML = ''; // Clear existing list
    if (favoriteMeals.length === 0) {
        favoritesListContainer.innerHTML = '<p>No favorite meals added yet!</p>';
        return;
    }

    favoriteMeals.forEach(meal => {
        const mealHtml = `
            <div class="meal-item" data-id="${meal.id}">
                <div class="meal-img">
                    <img src="${meal.image}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.title}</h3>
                    <button class="remove-favorite-btn" data-id="${meal.id}">Remove</button>
                </div>
            </div>
        `;
        favoritesListContainer.innerHTML += mealHtml;
    });

    // Add event listeners for removing favorites
    document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const mealId = event.target.dataset.id; // Get meal ID from the button's dataset
            removeFromFavorites(mealId); // Call function to remove the meal from favorites
        });
    });
}

// Function to remove a meal from favorites
function removeFromFavorites(mealId) {
    // Convert mealId to a number if necessary
    mealId = parseInt(mealId);

    // Remove the meal with matching id
    favoriteMeals = favoriteMeals.filter(meal => meal.id !== mealId);
    localStorage.setItem('favorites', JSON.stringify(favoriteMeals)); // Update localStorage
    renderFavoriteMeals(); // Re-render the favorite meals section
}

// Render favorite meals when the page loads
renderFavoriteMeals();




