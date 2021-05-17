
// Animation du bouton ingrédient 
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


// Animation du bouton Appareil 
const appareilButton = document.getElementById('appareilButton');
const searchBarAppareil = document.getElementById('searchBarAppareil');
const selectAppareilButton = document.getElementById('selectAppareilButton');

document.addEventListener('click', function(event) {
    const isClickInside = selectAppareilButton.contains(event.target);
    if (isClickInside) {
      searchBarAppareil.style.display ="block";
    }
    else {
      searchBarAppareil.style.display ="none";
    }
});


// Animation du bouton Ustensile 
const ustensileButton = document.getElementById('ustensileButton');
const searchBarUstensile = document.getElementById('searchBarUstensile');
const selectUstensileButton = document.getElementById('selectUstensileButton');

document.addEventListener('click', function(event) {
    const isClickInside = selectUstensileButton.contains(event.target);
    if (isClickInside) {
      searchBarUstensile.style.display ="block";
    }
    else {
      searchBarUstensile.style.display ="none";
    }
});