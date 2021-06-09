
// Variables ingrédients
const ingredientButton = document.getElementById('ingredientButton');
const searchBarIngredient = document.getElementById('searchBarIngredient');
const selectIngredientButton = document.getElementById('selectIngredientButton');

// Variables Appareils
const appareilButton = document.getElementById('appareilButton');
const searchBarAppareil = document.getElementById('searchBarAppareil');
const selectAppareilButton = document.getElementById('selectAppareilButton');

// Variables ustensiles
const ustensileButton = document.getElementById('ustensileButton');
const searchBarUstensile = document.getElementById('searchBarUstensile');
const selectUstensileButton = document.getElementById('selectUstensileButton');


// Animation du bouton ingrédient 
document.addEventListener('click', function(event) {
    const isClickInside = ingredientButton.contains(event.target);
    if (isClickInside) {
      searchBarIngredient.style.display ="block";
      appareilButton.style.left = 80 +"px";
      ustensileButton.style.position = "absolute";
      ustensileButton.style.right = 365 +"px";
      
    }
    if(isClickInside){
      ustensileButton.style.left = 80 +"px";
    }
    else {
      searchBarIngredient.style.display ="none";
      appareilButton.style.left ="";
      ustensileButton.style.position = "relative";
      ustensileButton.style.right = 0 +"px";
      ustensileButton.style.left = "";
    }
});


// Animation du bouton Appareil 
document.addEventListener('click', function(event) {
    const isClickInside = appareilButton.contains(event.target);
    if (isClickInside) {
      searchBarAppareil.style.display ="block";
      ustensileButton.style.left = 80 +"px";
    }
    else {
      searchBarAppareil.style.display ="none";
      ustensileButton.style.left ="";
    }
});


// Animation du bouton Ustensile 
document.addEventListener('click', function(event) {
    const isClickInside = ustensileButton.contains(event.target);
    if (isClickInside) {
      searchBarUstensile.style.display ="block";
    }
    else {
      searchBarUstensile.style.display ="none";
    }
});