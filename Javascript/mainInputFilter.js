/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Remplissage barre de recherche principale---------------------------------------*/
/*--------------------------------------------------------------------------------------------*/



const searchBarGeneral = [];
//let filtreRecetteBySearchBar = [];

// Récupération des caractères dans la Search Bar 
const mainSearchBarinput = document.getElementById('searchBarInput');
mainSearchBarinput.addEventListener('keyup', (e) => {

    // Déclaration variable 
    let userSearchWord = e.target.value.toLowerCase();

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
    
    filterWordList.push(userSearchWord);
   
    // Algorithme de filtre
    filterMainSearchBarAlgorithme();

    /*
    
     //Système de filtre par réduction 
     
    if(filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListIngredient.length == 0){

        filterWordListMainBar.filter((element) => {

            resultatFilter = allRecetteList.filter((recette) => {
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
  
    if(filterWordListUstensile.length >= 1 && filterWordListMainBar.length >= 1 ) {
        console.log('hello1')
        filterWordListMainBar.filter((element) => {
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
        
    if(filterWordListAppareil.length >= 1 && filterWordListMainBar.length >= 1 ) {
        console.log('hello2')
        filterWordListMainBar.filter((element) => {
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

    if(filterWordListIngredient.length >=1 && filterWordListMainBar.length >= 1 ) {
        filterWordListMainBar.filter((element) => {
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

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1  && filterWordListIngredient.length == 0 && filterWordListMainBar.length >= 1 ) {
        filterWordListMainBar.filter((element) => {
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

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length == 0  && filterWordListIngredient.length >= 1 && filterWordListMainBar.length >= 1 ) {
        filterWordListMainBar.filter((element) => {
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

    if(filterWordListUstensile.length == 0 && filterWordListAppareil.length >= 1  && filterWordListIngredient.length >= 1 && filterWordListMainBar.length >= 1 ) {
        filterWordListMainBar.filter((element) => {
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


    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListIngredient.length >= 1 && filterWordListMainBar.length >= 1 ) {
        filterWordListMainBar.filter((element) => {
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
    
    
    if(filterWordListMainBar.length != undefined && filterWordListUstensile.length >= 1 && filterWordListAppareil.length == 0 && filterWordListIngredient.length == 0) {
        console.log('bouum')
        filterWordListMainBar.filter((element) => {
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

 
    // Affichage des résultats via fonction recetteDisplay
    recetteDisplay(resultatFilter);
   

    // Affichage du message d'erreur 
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }
    */
})



function filterMainSearchBarAlgorithme(){

    /*
    if(filterWordList.length == 1){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.appliance.toString().toLowerCase().includes(filterWordList.toString()));
    }
    */

    if(filterWordList.length >= 1 ){
        filterWordList.filter((element) => {

            resultatFilter = allRecetteList.filter((recette) => {
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