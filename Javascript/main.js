

/*--------------------------------------------------------------------------*/
/*------------Standard sortie ---------------------------------------------*/
/*-------------------------------------------------------------------------*/
const allRecetteList = [];
let meals = [];
const mainSemantic = document.querySelector("main");

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


// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

function deleteKeyWord(list, element){
    capitalizeFirstLetter(element);
    const index = list.indexOf(element)
    if(index > -1 || index === -1){ 
        list.splice(index, 1);
        return list;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


function generateUnit(item, array){

    for(element of array)
    if(item.unit == undefined){
        return `<p class="ingredients"> <strong>${item.ingredient}</strong> : ${item.quantity}</p>`;
    } else if (item.quantity == undefined){
        return `<p class="ingredients"> <strong>${item.ingredient}</strong> </p>`;
    }
    return `<p class="ingredients"> <strong>${item.ingredient}</strong> : ${item.quantity}  ${item.unit} </p>` ;
}


//function objectToArray()
           
function recetteDisplay(array){
    const htmlString = array.map((item) => {    
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
                        <div class="liste-ingredient" id ="liste-ingredient-id-${item.id}">${generateUnit(item,array)}</div>
                        <p class="description-recette">${item.description}</p>
                    </div>
                </article>
    
            `;
    }).join('');
    mainSemantic.innerHTML = htmlString;
}

/*
function generateIngredientList(item, array){
    for(element of array)
    if(item.unit != undefined){
        return item.ingredient.toString().toLowerCase();
    } else if (item.quantity != undefined){
        return item.ingredient.toString().toLowerCase();
    }
    return item.ingredient.toString().toLowerCase(); ;
}
*/

// Variable message d'erreur
const NoResultatForResearch = `<h3 class ="no-resultat-by-searchbar"> AUCUNE RECETTE NE CORRESPOND A VOTRE RECHERCHE <h3>`

// Récupération des données saisies dans la liste déroulante
let listIngredientNoDoublon = [];
let listAppareilNoDoublon = [];
let listUstensileNoDoublon = [];


// Récupération de la liste d'ingrédient provenant du  JSON
const boucleIngrédient = fetch('Javascript/recette.json')
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

    // affichage listes déroulantes
    for(element of listIngredientNoDoublon){
        selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`;
    }

    for(element of listAppareilNoDoublon){
        selectAppareil.innerHTML +=`<option value="${element}">${element}</option>`;
    }

    for(element of listUstensileNoDoublon){
        selectUstensile.innerHTML+=`<option value="${element}">${element}</option>`;
    }

})

console.log('Liste des ingredient avant traitement :', listIngredientRaw);
console.log('Liste des appareil avant traitement :', listAppareilRaw);
console.log('Liste des ustensile avant traitement :', listUstensileRaw);


/*--------------------------------------------------------------------------*/
/*------------Filtre par Ingredient----------------------------------------*/
/*------------------------------------------------------------------------*/

searchBarIngredient.addEventListener('keyup',(e) => {
    const filterWordIngredient = e.target.value;

    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);
  
    listIngredientNoDoublon.filter((element) =>{
        if(filterWordIngredient === element) {
            filterWordsList.push(filterWordIngredient.toLowerCase());
        }
    })
        // Retrait des elements sélectionnés par l'utilisateur
        listIngredientNoDoublon.filter((element) => {
            if(element === filterWordIngredient){
                const index = listIngredientNoDoublon.indexOf(element)
                if(index > -1 ){ 
                    listIngredientNoDoublon.splice(index, 1);
                }
                const keyWordSelect = document.getElementById('keyWordSelect');
                keyWordSelect.innerHTML +=`<div class="keyword-block-bleu" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                searchBarIngredient.value="";
            }
        });


    // Récupération des éléments dans la barre de saisie de l'utilisateur
    //console.log("Liste mise avant retrait du mot choisi", listIngredientNoDoublon);

    console.log("filterWordsList", filterWordsList);
    let ingredientRaw = [];
    let ingredientLowerCase = "";
    let ingredientArrayLower = [];
    let propertyValues = [];
    let IngredientFromPropertyValuesListe = "";

   // Filtre toutes les recettes en fonction des ingredients
   resultatFilter = allRecetteList.filter((item) => {
    //console.log("ceci est item", item)
    // Convertir l'objet ingredient en Arra
    for(element of item.ingredients){
        propertyValues = Object.values(element); //Convertir l'objet ingredient en Array
        if(propertyValues.length != null){
            IngredientFromPropertyValuesListe = propertyValues.shift(); // Extraction du premier element de la list ingredient
        }
        console.log("test", IngredientFromPropertyValuesListe.toLowerCase());
    }
    console.log("test", IngredientFromPropertyValuesListe.toLowerCase());
    console.log("filterwordList", filterWordsList);
    return(
        IngredientFromPropertyValuesListe.toLowerCase().includes(filterWordsList) // Tri des données  
        );
    })

    console.log("test filtreRecetteByFilterIngredient ", resultatFilter)


    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    }

    //console.log("Liste mise à jour apres retrait mot choisi", listIngredientNoDoublon);

    // Suppression des éléments choisis dans la liste 
  
    const filterRefreshList = listIngredientNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
      }).join('');
      selectIngredient.innerHTML = filterRefreshList;

    filterWordsList.filter((element) => {
       
        const closeBtnIngredientFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);

        //console.log("yoooo",element)
        closeBtnIngredientFilter.addEventListener("click", function hideFilter() {

            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordsList, element);
            listIngredientNoDoublon.push(element);
            selectIngredient.innerHTML ="";
            console.log('filterWordList ', filterWordsList);
            const filterRefreshList = listIngredientNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectIngredient.innerHTML = filterRefreshList;

              if(filterWordsList.length === 0){
                console.log('plus rien a afficher');
                return searchDisplay();
            }
        })
        
    });

});


/*--------------------------------------------------------------------------*/
/*------------Filtre par Appareil-------------------------------------------*/
/*-------------------------------------------------------------------------*/

searchBarAppareil.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    const filterWordAppareil = e.target.value;

    
    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
  

    listAppareilNoDoublon.filter((element) =>{
        if(filterWordAppareil === element) {
            filterWordsList.push(filterWordAppareil.toLowerCase());
        }
    })

        // Retrait des elements sélectionnés par l'utilisateur
        listAppareilNoDoublon.filter((element) => {
            if(element === filterWordAppareil){
                const index = listAppareilNoDoublon.indexOf(element)
                if(index > -1 ){ 
                    listAppareilNoDoublon.splice(index, 1);
                }
                const keyWordSelect = document.getElementById('keyWordSelect');
                keyWordSelect.innerHTML +=`<div class="keyword-block-green" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                searchBarAppareil.value="";
            }
        });


    // Récupération des éléments dans la barre de saisie de l'utilisateur
    console.log("Liste mise avant retrait du mot choisi", listAppareilNoDoublon);

    console.log("filterWordsList", filterWordsList);

   // Systeme de filtre
   resultatFilter = allRecetteList.filter((item) => {
    return(
        item.appliance.toString().toLowerCase().includes(filterWordsList) 
        );
    })

    console.log("test filtreRecetteByFilterAppareil ", resultatFilter)

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }

    console.log("Liste mise à jour apres retrait mot choisi", listAppareilNoDoublon);

    // Suppression des éléments choisis dans la liste 
  
    const filterRefreshList = listAppareilNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
      }).join('');
      selectAppareil.innerHTML = filterRefreshList;



    filterWordsList.filter((element) => {
        const closeBtnAppareilFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);
        closeBtnAppareilFilter.addEventListener("click", function hideFilter() {

            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordsList, element);
            listAppareilNoDoublon.push(element);
            selectAppareil.innerHTML ="";
            console.log('filterWordList BONSOIRE', filterWordsList);

            const filterRefreshList = listAppareilNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectAppareil.innerHTML = filterRefreshList;

              if(filterWordsList.length === 0){
                return searchDisplay();
            }
        })
        
    });

});

/*--------------------------------------------------------------------------*/
/*------------Filtre par Ustensile------------------------------------------*/
/*-------------------------------------------------------------------------*/

searchBarUstensile.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    const filterWordUsentsile = e.target.value;

    
    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    listUstensileNoDoublon.filter((element) =>{
        if(filterWordUsentsile === element) {
            filterWordsList.push(filterWordUsentsile.toLowerCase());
        }
    })

        // Retrait des elements sélectionnés par l'utilisateur
        listUstensileNoDoublon.filter((element) => {
            if(element === filterWordUsentsile){
                const index = listUstensileNoDoublon.indexOf(element)
                if(index > -1 ){ 
                    listUstensileNoDoublon.splice(index, 1);
                }
                const keyWordSelect = document.getElementById('keyWordSelect');
                keyWordSelect.innerHTML +=`<div class="keyword-block-red" id="keyword-block-${element.toLowerCase()}">${element}<i id="close-btn-${element.toLowerCase()}" class="far fa-times-circle"></i></div> `
                searchBarUstensile.value="";
            }
        });


    // Récupération des éléments dans la barre de saisie de l'utilisateur
    console.log("Liste mise avant retrait du mot choisi", listUstensileNoDoublon);

  
    console.log("filterWordsList", filterWordsList);

   // Systeme de filtre
   resultatFilter = allRecetteList.filter((item) => {
    return(
        item.ustensils.toString().toLowerCase().includes(filterWordsList) 
        );
    })

    console.log("test filtreRecetteByFilterAppareil ",resultatFilter)

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    }


    console.log("Liste mise à jour apres retrait mot choisi", listUstensileNoDoublon);

    // Suppression des éléments choisis dans la liste 

    const filterRefreshList = listUstensileNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
      }).join('');
      selectAppareil.innerHTML = filterRefreshList;



    filterWordsList.filter((element) => {
       
        const closeBtnUstensileFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);
        closeBtnUstensileFilter.addEventListener("click", function hideFilter() {
            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordsList, element);
            listUstensileNoDoublon.push(element);
            selectAppareil.innerHTML ="";

            console.log('filterWordList BONSOIRE', filterWordsList);

            const filterRefreshList = listUstensileNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectAppareil.innerHTML = filterRefreshList;

              if(filterWordsList.length === 0){
                console.log('plus rien a afficher');
                return searchDisplay();
            }
        })
        
    });
});


/*--------------------------------------------------------------------------*/
/*------------Barre de recherche principal --------------------------------*/
/*-------------------------------------------------------------------------*/
const searchBarGeneral = [];
//let filtreRecetteBySearchBar = [];

// Récupération des caractères dans la Search Bar 
const mainSearchBarinput = document.getElementById('searchBarInput');
mainSearchBarinput.addEventListener('keyup', (e) => {

    // Déclaration variable 
    const userSearchWord = e.target.value.toLowerCase();

    // Bloquage du input avant 3 lettres 
    if(userSearchWord.length === 0){
        //searchDisplay();
        console.log('pas de requete');
    } else if(userSearchWord.length <= 2){
        noResultatBloc.innerHTML ="";
        e.preventDefault();
        e.stopPropagation();
        return;
    }
   
    // Systeme de filtre
    resultatFilter = allRecetteList.filter((item) => {
        return(
            item.name.toLowerCase().includes(userSearchWord) ||
            item.ingredients.toString().toLowerCase().includes(userSearchWord)  ||
            item.appliance.toString().toLowerCase().includes(userSearchWord) ||
            item.ustensils.toString().toLowerCase().includes(userSearchWord) 
        );
    })

   console.log("test filterwordList dans mainsearchbar", filterWordsList)
    // Affichage des résultats via fonction recetteDisplay
    recetteDisplay(resultatFilter);
   

    // Affichage du message d'erreur 
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }
})

