
const ingredientButton = document.getElementById('ingredientButton');
const searchBarIngredient = document.getElementById('searchBarIngredient');
const selectIngredientButton = document.getElementById('selectIngredientButton');

document.addEventListener('click', function(event) {
    const isClickInside = selectIngredientButton.contains(event.target);
    if (isClickInside) {
      searchBarIngredient.style.display ="block";
    }
    else {
      searchBarIngredient.style.display ="none";
    }
});