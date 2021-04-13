
/*--------------------------------------------------------------------------*/
/*------------ENTREES DE DONNEES-------------------------------------------*/
/*-------------------------------------------------------------------------*/

// Récupération des caractères dans la Search Bar 
const searchBarinput = document.getElementById('searchBarInput');

searchBarinput.addEventListener('keyup', (e) => {
    console.log(e.target.value);
})

// Liste déroulante INGREDIENTS 
const selectIngredient = document.getElementById('selectIngredient');
const keyWordSelect = document.getElementById('keyWordSelect');
let ingredientKeys = '';

// Array qui contient la totalité des ingrédients présent dans le JSON
let arrayIngredient = [];

// Cet array contient les mots clés 
let keyWordSelected = [];

// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

// Récupération des données Recette JSON
const boucleIngrédient = fetch('Javascript/recette.json')
.then((response) => response.json())
.then(function (data){
    for(item of data.recipes){
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        for(list of recette.ingredients){
            arrayIngredient.push(list.ingredient);   
        };
    };
    // Suppression des doublons   
    let ingredientSansDoublon = deleteDoublon(arrayIngredient);

    // affichage sur écran de la liste déroulante
    for(element of ingredientSansDoublon){
        selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`
    }
})

console.log('ceci est arrayIngredient', arrayIngredient)
// Récupération des données saisies dans la liste déroulante 
searchBarIngredient.addEventListener('keyup',(e) => {
    let keyWordIngrdient = e.target.value;
    console.log(keyWordIngrdient);
    let ingredientSansDoublon = deleteDoublon(arrayIngredient);
    for(element of ingredientSansDoublon){
        if(keyWordIngrdient === element){
            keyWordSelected.push(keyWordIngrdient);

            const index = ingredientSansDoublon.indexOf(element);
            if(index > -1){
                ingredientSansDoublon.splice(index, 1);
            }
            console.log("l'Array keywordSelected contient ", keyWordSelected);
            console.log('test suppression element', ingredientSansDoublon);
        }
    }
   

    for(element of keyWordSelected){
       const keyWordSelect = document.getElementById('keyWordSelect');
       keyWordSelect.innerHTML +=`<div class="keyword-block">${element}<i class="far fa-times-circle"></i></div> `
    }
    const closeCross = document.querySelector('.fa-times-circle');
    const keywordBlock = document.querySelector('.keyword-block')
    closeCross.addEventListener("click",()=>{
        keywordBlock.style.display ="none"
    })
})





// Sortie JSON
const mainSemantic = document.querySelector("main");
const loadRecette = fetch('Javascript/recette.json')
    .then((response) => response.json())
    .then(function (data){

        // Boucle création d'un nouvel objet recette
        for(item of data.recipes) {
            const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);

            // Création d'un squelette HTML pour chaque recette 
            mainSemantic.innerHTML +=`
            <article>
            <div class="illustrationRecette"></div>
            <div class="titreTempsCuisson"> 
                <h3>${recette.name}</h3>
                <div class ="tempsCuisson">
                    <img class="timerClock" src="Maquettes/timer.png"></img>
                    <p>${recette.time} min</p>
                </div>
            
            </div>
            <div class="description-card">
                <div class="liste-ingredient" id ="liste-ingredient-id-${recette.id}"></div>
                <p class="description-recette">${recette.description}</p>
            </div>
            </article>
            `
            // Affichage des ingrédients 
            for(ingredient of recette.ingredients){
            // Factory méthode pour l'affichage des données si UNIT ou QUANTITY sont undefined
            function generateUnit(){
                if(ingredient.unit == undefined){
                    return `<p class="ingredients"> ${ingredient.ingredient} : ${ingredient.quantity}</p>`;
                } else if (ingredient.quantity == undefined){
                    return `<p class="ingredients"> ${ingredient.ingredient}</p>`;
                }
                return `<p class="ingredients"> ${ingredient.ingredient} : ${ingredient.quantity}  ${ingredient.unit} </p>` ;
            }
            // Affichage dynamique des données 
            const listIngred = document.getElementById("liste-ingredient-id-"+recette.id);
            listIngred.innerHTML +=`${generateUnit()}` ;
        };
    };
    
});