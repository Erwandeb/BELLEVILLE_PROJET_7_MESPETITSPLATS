
// Variables 
let allRecetteList = [];
let meals = [];


// Récupération des recettes dans recette.JSON
let loadAllRecette = async() => {
    let meals = await fetch('Javascript/recette.json')
    .then((response) => response.json())
    .then(function (data){
        allRecetteList = data.recipes;
        displayRecettes(data.recipes);
    });
}


const displayRecettes = (recettes) => {
    const mainSemantic = document.querySelector("main");
    for(item of recettes) {
        const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        mainSemantic.innerHTML += recette.render();
    };
}

// Affichage des recettes au chargement de la page 
loadAllRecette();

// Variables du DOM
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


let affichageIngredients = "";
// Fonction permettant d'afficher les recettes qui ont été trouvé suite à une recherche

function recetteDisplay(array){

    const mainSemantic = document.querySelector("main");
    mainSemantic.innerHTML ="";

    for(item of array){
        const recetteResultat = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
        mainSemantic.innerHTML += recetteResultat.render();
    };
    
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
