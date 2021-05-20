

// Variables 
const allRecetteList = [];
let meals = [];
const mainSemantic = document.querySelector("main");

// Récupération des recettes dans recette.JSON
const loadRecette = async() => {
    let meals = await fetch('Javascript/recette.json')
    .then((response) => response.json())
    .then(function (data){

        // Boucle création d'un nouvel objet recette
        for(item of data.recipes) {
            const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
            
            allRecetteList.push(recette);
            
            // Création d'un squelette HTML pour chaque recette 
            mainSemantic.innerHTML +=
            `
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

                if(ingredient.quantity === undefined && ingredient.unit === undefined ){
                    return `<p class="ingredients"><strong>${ingredient.ingredient}</strong></p>`;
                }
               else if(ingredient.unit == undefined){
                    return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</p>`;
                } 
            
                return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}  ${ingredient.unit}</p>`;
            }

            // Affichage dynamique des données 
            const listIngred = document.getElementById("liste-ingredient-id-"+recette.id);
            listIngred.innerHTML +=`${generateUnit()}` ;
            };

        };
    });
}

// Variables Asynchrone
const searchDisplay = async() => {
    await loadRecette();
}

// Affichage des données à l'ouverture de la page 
searchDisplay();

// Variables 
const selectIngredient = document.getElementById('selectIngredient');
const keyWordSelect = document.getElementById('keyWordSelect');
const selectAppareil = document.getElementById('selectAppareil');
const selectUstensile = document.getElementById('selectUstensile');
const noResultatBloc = document.querySelector('.no-resultat-bloc');

// Liste des éléments brut présent dans le JSON. Attention aux doublons.
let listIngredientRaw = [];
let listAppareilRaw = [];
let listUstensileRaw = [];
let listSearchAnswer = [];


// Cet array contient les mots clés filtrant choisi par l'utilisateur
let filterWordsList = [];
let resultatFilter = [];
let testCompiler = [];
let filterWordListIngredient = [];
let filterWordListAppareil = [];
let filterWordListUstensile = [];
let filterWordListMainBar = [];


// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

// Fonction de supression des mots clés
function deleteKeyWord(list, element){
    capitalizeFirstLetter(element);
    const index = list.indexOf(element)
    if(index > -1 || index === -1){ 
        list.splice(index, 1);
        return list;
    }
}

const filtreTexte = (arr, requete) => {
    return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
    }

// Fonction permettant de faire un string en lettre capitale
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



// Fonction permettant de transformer un array en String
let ingredientIntoString =""
function transformIngredientIntoString(array){
    let IngredientFromPropertyValuesListe = "";
    let propertyValues = [];
    // Dans le tableau ingredient, les elements sont des objets
   
    ingredientIntoString = array.filter((item) => {
        for(element of item.ingredients){ //Pour chaque objet du tableau
            propertyValues = Object.values(element); //Convertir l'objet en Array
            IngredientFromPropertyValuesListe = propertyValues.shift(); // Extraction du premier element de la list ingredient
        }
        return IngredientFromPropertyValuesListe.toLowerCase();
    });
}


// Fonction permettant d'afficher les recettes qui ont été trouvé suite à une recherche
function recetteDisplay(array){
   
    const htmlString = array.map((item) => {    
        //console.log("test item", item)

        for(const ingredient of item.ingredients){
            // Fonction permettant de générer les ingrédient automatiquement. Ceci est à implémenter avec la fonction RecetteDisplay

           // console.log('ingredient', ingredient)
            function generateUnitFromResultatFilter(){
                    if(ingredient.quantity === undefined && ingredient.unit === undefined ){
                        return `<p class="ingredients"><strong>${ingredient.ingredient}</strong></p>`;
                    }
                    else if(ingredient.unit == undefined){
                        return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</p>`;
                    } 
                    return `<p class="ingredients"><strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}  ${ingredient.unit}</p>`;
                
            } 
            // Affichage dynamique des données 
            const listIngred = document.getElementById("liste-ingredient-id-"+item.id);
            //listIngred.innerHTML +=`` ;
            
            //console.log('info', generateUnitFromResultatFilter())
        
            return `
                <article>
                    <div class="illustrationRecette"></div>
                    <div class="titreTempsCuisson"> 
                        <h3>${item.name}</h3>
                        <div class ="tempsCuisson">
                            <img class="timerClock" src="Maquettes/timer.png"></img>
                            <p>${item.time} min</p>
                        </div>
                    </div>
                    <div class="description-card">
                        <div class="liste-ingredient" id="liste-ingredient-id-${item.id}">${generateUnitFromResultatFilter()}</div>
                        <p class="description-recette">${item.description}</p>
                    </div>
                </article>
            `;
            
        }
    }).join('');
    
    mainSemantic.innerHTML = htmlString;
}

     
  


   


// Variable renvoyant un message d'erreur si aucun résultat ne correspond à la recherche 
const NoResultatForResearch = `<h3 class ="no-resultat-by-searchbar"> AUCUNE RECETTE NE CORRESPOND A VOTRE RECHERCHE <h3>`


// Récupération des données saisies dans la liste déroulante
let listIngredientNoDoublon = [];
let listAppareilNoDoublon = [];
let listUstensileNoDoublon = [];



// Récupération de la liste d'ingrédient provenant du  JSON
const boucleIngredientListe = fetch('Javascript/recette.json')
.then((response) => response.json())
.then(function (data){
    for(item of data.recipes){
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        for(list of recette.ingredients){
            listIngredientRaw.push(list.ingredient);   
        };
        for(element of recette.appliance){
            listAppareilRaw.push(element);
        }
        for(element of recette.ustensils){
            listUstensileRaw.push(element);
        }

    };
   
    // Suppression des doublons   
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);


    // affichage listes déroulante
    listIngredientNoDoublon.map((element) => {
        return   selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`;
    })

    listAppareilNoDoublon.map((element) => {
        return  selectAppareil.innerHTML +=`<option value="${element}">${element}</option>`;
    })

    listUstensileNoDoublon.map((element) => {
        return  selectUstensile.innerHTML +=`<option value="${element}">${element}</option>`;
    })

})


let ingredientTest ="";
