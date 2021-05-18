
/*--------------------------------------------------------------------------*/
/*------------Barre de recherche principal --------------------------------*/
/*-------------------------------------------------------------------------*/
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
    
    filterWordListMainBar.push(userSearchWord);
   
    // Systeme de filtre

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
  
    
    if(filterWordListUstensile.length >= 1) {
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
        
    if(filterWordListAppareil.length >= 1) {
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

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1) {
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

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListIngredient >=1) {
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
    

   console.log("test filterwordList dans mainsearchbar", filterWordsList)
    // Affichage des résultats via fonction recetteDisplay
    recetteDisplay(resultatFilter);
   

    // Affichage du message d'erreur 
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }
})
