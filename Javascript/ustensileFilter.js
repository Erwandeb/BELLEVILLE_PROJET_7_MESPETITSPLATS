

/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Appareil----------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


searchBarUstensile.addEventListener('keyup',(e) => {

    const filterWordUsentsile = e.target.value;

    
    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    listUstensileNoDoublon.filter((element) =>{
        if(filterWordUsentsile === element) {
            filterWordList.push(filterWordUsentsile.toLowerCase());
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

    filterUstensileAlgorithme();
   // filterAppareilAlgorithme2();
  
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    };


    
    // Suppression des éléments choisis dans la liste 
    const filterRefreshList = listUstensileNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
    }).join('');
      selectUstensile.innerHTML = filterRefreshList;





    
    /*--------------------------------------------------------------------------------------------*/
    /*------------EVENT: -------------------------------------------------------------------------*/
    /*------------Supression des mots clés--------------------------------------------------------*/
    /*--------------------------------------------------------------------------------------------*/
    
    closeCrossFilter()
    
});


function filterUstensileAlgorithme(){

    if(filterWordList.length == 1){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.ustensils.toString().toLowerCase().includes(filterWordList.toString()));
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



function deleteFiltreUstensile(){


    if(filterWordList.length === 1){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.ustensils.toString().toLowerCase().includes(filterWordList.toString()));
    }

    if(filterWordList.length >= 2 ){
        filterWordList.filter((element) => {

            console.log('cut');
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
        console.log('nada')
        recetteDisplay(allRecetteList);
    }
    

}