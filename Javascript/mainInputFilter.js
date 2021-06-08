/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Remplissage barre de recherche principale---------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


let filterWordListMainSearch = [];
const searchBarGeneral = [];
let userSearchWord = [];
//let filtreRecetteBySearchBar = [];

// Récupération des caractères dans la Search Bar 
const mainSearchBarinput = document.getElementById('searchBarInput');
mainSearchBarinput.addEventListener('keyup', (e) => {

    // Déclaration variable 
    userSearchWord = e.target.value.toLowerCase();

    // Bloquage du input avant 3 lettres 
    if(userSearchWord.length <= 2 ){
        noResultatBloc.innerHTML ="";
        e.preventDefault();
        e.stopPropagation();
        return;
    } else{
        resultatFilter = allRecetteList.filter((recette) => {
            let resultat = []
        
            for(const ingredient of recette.ingredients)
                if(
                    ingredient.ingredient.toLowerCase().includes(userSearchWord) ||
                    recette.name.toLowerCase().includes(userSearchWord) ||
                    recette.appliance.toString().toLowerCase().includes(userSearchWord) ||
                    recette.ustensils.toString().toLowerCase().includes(userSearchWord) 
                ){
                    return resultat
                }
            
            resultatFilter = resultat
        })
    }
    
    console.log('filterWordList', filterWordListMainSearch);
    console.log('resultat filter', resultatFilter);

    recetteDisplay(resultatFilter);

    /*
    for(element of allRecetteList){
        if(userSearchWord.includes(element)){
            console.log('hello de lu')
            filterWordListMainSearch.push(userSearchWord);
        }
       
    }
    */

  
    
    
   
    console.log('testing FWLISR', filterWordListMainBar);

    // Algorithme de filtre
   // filterMainSearchBarAlgorithme();

})



function filterMainSearchBarAlgorithme(){


    /*
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
*/

if(filterWordList.length === 0){

    filterWordListMainSearch.filter((element) => {
        console.log('filterWordListMain', filterWordListMainBar);
        console.log('bingoo');
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

    /*
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
    */

/*

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
*/


    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
}