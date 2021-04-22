/*--------------------------------------------------------------------------*/
/*------------Standard sortie ---------------------------------------------*/
/*-------------------------------------------------------------------------*/
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
                    return `<p class="ingredients"> <strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</p>`;
                } else if (ingredient.quantity == undefined){
                    return `<p class="ingredients"> <strong>${ingredient.ingredient}</strong> </p>`;
                }
                return `<p class="ingredients"> <strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}  ${ingredient.unit} </p>` ;
            }
            // Affichage dynamique des données 
            const listIngred = document.getElementById("liste-ingredient-id-"+recette.id);
            listIngred.innerHTML +=`${generateUnit()}` ;
        };
    };
    
});



// Variables 
const selectIngredient = document.getElementById('selectIngredient');
const keyWordSelect = document.getElementById('keyWordSelect');
const selectAppareil = document.getElementById('selectAppareil');
const selectUstensile = document.getElementById('selectUstensile');

// Liste des éléments brut présent dans le JSON. Attention aux doublons.
let listIngredientRaw = [];
let listAppareilRaw = [];
let listUstensileRaw = [];

// Cet array contient les mots clés filtrant choisi par l'utilisateur

let filterWordsList = [];

// Fonction suppression des doublons
function deleteDoublon(tableauOrigine){
    const sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

function deleteKeyWord(list, element){
    const index = list.indexOf(element)
    if(index > -1 || index === -1){ 
        list.splice(index, 1);
        return list;
    }
}

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
    console.log(e.target.value);

    // Nettoyage des doublons
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);

    // Ajout des filtres ingredients dans la liste de filtre générale
    const keyWordPusher = listIngredientNoDoublon.filter(function (element) {
        if(element === e.target.value){
            filterWordsList.push(e.target.value);
            return true 
        }
    });

    console.log("Liste mise avant retrait du mot choisi", listIngredientNoDoublon);

    // Retrait des elements sélectionnés par l'utilisateur
    listIngredientNoDoublon.filter(function (element){
        if(element === e.target.value){
            const index = listIngredientNoDoublon.indexOf(element)
            if(index > -1 ){ 
                listIngredientNoDoublon.splice(index, 1);
            }
            const keyWordSelect = document.getElementById('keyWordSelect');
            keyWordSelect.innerHTML +=`<div class="keyword-block-bleu" id="keyword-block-${element}">${element}<i id="close-btn-${element}" class="far fa-times-circle"></i></div> `
            searchBarIngredient.value="";
        }
    });
       
    console.log("Liste mise à jour apres retrait mot choisi", listIngredientNoDoublon);

    // Mise à jour de la liste sans les éléments selectionnés par l'utilisateur
    selectIngredient.innerHTML ="";
    for(const element of listIngredientNoDoublon){
        selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`
    }

    
    console.log("filterWords", filterWordsList);

    // Suppression des filtres
    for(const element of filterWordsList){
        const closeBtnIngredientFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);

        closeBtnIngredientFilter.addEventListener("click", function hideFilter() {
            
            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordsList,element);
            listIngredientNoDoublon.push(element);
            selectIngredient.innerHTML ="";
            
            for(const element of listIngredientNoDoublon){
                selectIngredient.innerHTML +=`<option value="${element}">${element}</option>`
            }
        })
    }
});

/*--------------------------------------------------------------------------*/
/*------------Filtre par Appareil-------------------------------------------*/
/*-------------------------------------------------------------------------*/

searchBarAppareil.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    console.log(listIngredientRaw)
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
  
    for(element of listAppareilNoDoublon){
        if(e.target.value === element) {
            filterWordsList.push(e.target.value);
        }
    }
    // Récupération des éléments dans la barre de saisie de l'utilisateur
    console.log("Liste mise avant retrait du mot choisi", listAppareilNoDoublon);

     //Traitement des mots clés
    for( const element of filterWordsList){
        // Retrait de l'ingrédient choisi dans la liste d'ingrédient générale
        const index = listAppareilNoDoublon.indexOf(element)
        if(index > -1){ 
            listAppareilNoDoublon.splice(index, 1);
        }
        // Affichage de l'ingredient choisi en étiquette HTML
        if(element === e.target.value){
            const keyWordSelect = document.getElementById('keyWordSelect');
            keyWordSelect.innerHTML +=`<div class="keyword-block-green" id="keyword-block-${element}">${element}<i id="close-btn-${element}" class="far fa-times-circle"></i></div> `
            searchBarAppareil.value="";
        }
    }

    console.log("Liste mise à jour apres retrait mot choisi", listAppareilNoDoublon);

    // Suppression des éléments choisis dans la liste 
    selectAppareil.innerHTML ="";
    for( const element of listAppareilNoDoublon){
        selectAppareil.innerHTML +=`<option value="${element}">${element}</option>`
    }

    console.log("filterWords", filterWordsList);

    for(const element of filterWordsList){
        const closeBtnAppareilFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);

        closeBtnAppareilFilter.addEventListener("click", function hideFilter() {
            
            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordsList,element);
            listAppareilNoDoublon.push(element);
            selectAppareil.innerHTML ="";
            
            for( const element of listAppareilNoDoublon){
                selectAppareil.innerHTML +=`<option value="${element}">${element}</option>`
            }
        })
    }
});



/*--------------------------------------------------------------------------*/
/*------------Filtre par ustensile-------------------------------------------*/
/*-------------------------------------------------------------------------*/

searchBarUstensile.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    console.log(listUstensileRaw)
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);
  
    
    for(element of listUstensileNoDoublon){
        if(e.target.value === element) {
            filterWordsList.push(e.target.value);
        }
    }
    // Récupération des éléments dans la barre de saisie de l'utilisateur
    console.log("Liste mise avant retrait du mot choisi", listUstensileNoDoublon);

     //Traitement des mots clés
    for(element of filterWordsList){
        // Retrait de l'ingrédient choisi dans la liste d'ingrédient générale
        const index = listUstensileNoDoublon.indexOf(element)
        if(index > -1){ 
            listUstensileNoDoublon.splice(index, 1);
        }
        // Affichage de l'ingredient choisi en étiquette HTML
        if(element === e.target.value){
            const keyWordSelect = document.getElementById('keyWordSelect');
            keyWordSelect.innerHTML +=`<div class="keyword-block-red" id="keyword-block-${element}">${element}<i id="close-btn-${element}" class="far fa-times-circle"></i></div> `
            searchBarUstensile.value="";
        }
    }

    console.log("Liste mise à jour apres retrait mot choisi", listUstensileNoDoublon);

    // Suppression des éléments choisis dans la liste 
    selectUstensile.innerHTML ="";
    for(element of listUstensileNoDoublon){
        selectUstensile.innerHTML +=`<option value="${element}">${element}</option>`
    }

    console.log("filterWords", filterWordsList);

    for(const element of filterWordsList){
        const closeBtnUstensileFilter = document.getElementById("close-btn-"+element);
        const keywordBlock = document.getElementById("keyword-block-"+element);

        closeBtnUstensileFilter.addEventListener("click", function hideFilter() {
            keywordBlock.style.display ="none"; 
            deleteKeyWord(filterWordsList,element);
            listUstensileNoDoublon.push(element);
            selectUstensile.innerHTML ="";
            
            for(const element of listUstensileNoDoublon){
                selectUstensile.innerHTML +=`<option value="${element}">${element}</option>`
            }
        })
    }
});

/*--------------------------------------------------------------------------*/
/*------------Barre de recherche principal ------------------------------*/
/*-------------------------------------------------------------------------*/
const searchBarGeneral = [];

// Récupération des caractères dans la Search Bar 
const mainSearchBarinput = document.getElementById('searchBarInput');
mainSearchBarinput.addEventListener('keyup', (e) => {
    
    const userSearchWord = e.target.value;

    // Recherche commence a partir de 3 lettre 
    if(userSearchWord.length < 3){
        e.preventDefault();
        return;
    }
    console.log('ceci est ', userSearchWord);
    mainSemantic.innerHTML = "";
    
    fetch('Javascript/recette.json')
        .then((response) => response.json())
        .then(function (data){
            // Boucle création d'un nouvel objet recette
            for(item of data.recipes){
                const recette = new Recette(item.id, item.name, item.servings, item.ingredients, item.time, item.description, item.appliance, item.ustensils);
            
                const result = data.filter(function(element){
                    if(element === userSearchWord){
                        console.log('hello', element);
                    }
                })
                
                if(item === userSearchWord){
                    console.log('bonjour', item);
                    return true 
                }
            
                if(item === undefined){
                    console.log("pas de resultat à afficher");
                    mainSemantic.innerHTML +=`<span class ="no-result"> Aucun résultat </span>`
                }
                
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
                        return `<p class="ingredients"> <strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}</p>`;
                    } else if (ingredient.quantity == undefined){
                        return `<p class="ingredients"> <strong>${ingredient.ingredient}</strong> </p>`;
                    }
                    return `<p class="ingredients"> <strong>${ingredient.ingredient}</strong> : ${ingredient.quantity}  ${ingredient.unit} </p>` ;
                }
                // Affichage dynamique des données 
                const listIngred = document.getElementById("liste-ingredient-id-"+recette.id);
                listIngred.innerHTML +=`${generateUnit()}` ;
                };
            };
        
        });

})

