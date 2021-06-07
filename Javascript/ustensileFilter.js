

/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Appareil----------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


searchBarUstensile.addEventListener('keyup',(e) => {

    const filterWordUsentsile = e.target.value;

    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    // Envoyer le filtre selectionné dans une liste générale pour le traitement en algorithme
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

    
    // Manipulation de la liste ustensile : Ré-écriture de la liste mise à jour
    function filterRefreshListUstensile(){
        selectUstensile.innerHTML ="";
        listUstensileNoDoublon.map((element) => {    
            return  selectUstensile.innerHTML += `<option value="${element}">${element}</option>`;
        }).join('');
    } 
    filterRefreshListUstensile();


    // Fonction de filtre Algorithme
    filterUstensileAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();
    
    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();
    
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

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
    
}