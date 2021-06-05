
/*---------------------------------------------------------------------------------------------*/
/*------------Ajout des mots clés Ingredient---------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/

searchBarIngredient.addEventListener('keyup',(e) => {
    const filterWordIngredient = e.target.value;

    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);
  
    // Envoyer le filtre selectionné dans une liste générale pour le traitement en algorithme
    listIngredientNoDoublon.filter((element) =>{
        if(filterWordIngredient === element) {
            filterWordList.push(filterWordIngredient.toLowerCase());
        }
    })

    // Manipulation de la liste ingrédient : Retrait d'un ingrédient sélectionnés par l'utilisateur
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

    // Manipulation de la liste ingrédient : Ré-écriture de la liste mise à jour
    function filterRefreshList(){
        listIngredientNoDoublon.map((element) => {    
            return  selectIngredient.innerHTML += `<option value="${element}">${element}</option>`;
        }).join('');
    } 
    filterRefreshList();

    // Fonction de filtre Algorithme
    filterIngredientAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();

    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();
    
});




// Algorithme de filtre 
function filterIngredientAlgorithme(){

    if(filterWordList.length == 1){
        filterWordList.filter((element) => {
            resultatFilter = allRecetteList.filter((recette) => {
                let resultat = []
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordList.length >= 2 ){
        filterWordList.filter((element) => {

            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
            
                for(const ingredient of recette.ingredients)
                    if(
                        ingredient.ingredient.toLowerCase().includes(element) ||
                        recette.name.toLowerCase().includes(element) ||
                        recette.appliance.toString().toLowerCase().includes(element) ||
                        recette.ustensils.toString().toLowerCase().includes(element) 
                    ){
                        return resultat
                    }
                
                resultatFilter = resultat
            })
            
        })
    }
  

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }

}




function deleteFiltreIngredient(){

    if(filterWordList.length == 1){
        console.log('delete Filter 1')
        filterWordList.filter((element) => {
            resultatFilter = allRecetteList.filter((recette) => {
                let resultat = []
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                }
                resultatFilter = resultat
            })
        })
        console.log("testing", resultatFilter)
        recetteDisplay(resultatFilter);
    }

    if(filterWordList.length >= 2 ){
        resultatFilter = resultatFilter.filter((recette) => {
            console.log('testign222')
            let resultat = []
            for(const ingredient of recette.ingredients)
                if(
                    ingredient.ingredient.toLowerCase().includes(filterWordList.toString()) ||
                    recette.name.toLowerCase().includes(filterWordList.toString()) ||
                    recette.appliance.toString().toLowerCase().includes(filterWordList.toString()) ||
                    recette.ustensils.toString().toLowerCase().includes(filterWordList.toString()) 
                ){
                    return resultat
                }
                
            resultatFilter = resultat
        })
    }

    console.log("resutlat filter", resultatFilter)
  
    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
}
