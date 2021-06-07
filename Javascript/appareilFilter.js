
/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Appareil----------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/
let filterWordList =[];

searchBarAppareil.addEventListener('keyup',(e) => {
    
    const filterWordAppareil = e.target.value;

    
    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
  

    // Envoyer le filtre selectionné dans une liste générale pour le traitement en algorithme   
    listAppareilNoDoublon.filter((element) =>{
        if(filterWordAppareil === element) {
            filterWordList.push(filterWordAppareil.toLowerCase());
        }
    })

    // Manipulation de la liste ingrédient : Retrait d'un ingrédient sélectionnés par l'utilisateur
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


    // Manipulation de la liste appareil: Ré-écriture de la liste mise à jour
    function filterRefreshListAppareil(){
        selectAppareil.innerHTML="";
        listAppareilNoDoublon.map((element) => {    
            return  selectAppareil.innerHTML += `<option value="${element}">${element}</option>`;
        }).join('');
    } 
    filterRefreshListAppareil();

    // Fonction de filtre Algorithme
    filterAppareilAlgorithme();

    // Affichage message d'erreur si aucun résultat existe
    noResultatDiplay();

    // Fonction pour supprimer une étiquette en cliquant sur la croix 
    closeCrossFilter();

});



function filterAppareilAlgorithme(){

    if(filterWordList.length == 1){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.appliance.toString().toLowerCase().includes(filterWordList.toString()));
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
   

function deleteFiltreAppareil(){
  
    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);


    if(filterWordList.length === 0 ){
        recetteDisplay(allRecetteList);
    }
}