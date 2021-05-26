
/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Appareil----------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/

searchBarAppareil.addEventListener('keyup',(e) => {
    const filterWordAppareil = e.target.value;

    
    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listAppareilNoDoublon = deleteDoublon(listAppareilRaw);
  

    listAppareilNoDoublon.filter((element) =>{
        if(filterWordAppareil === element) {
            filterWordListAppareil.push(filterWordAppareil.toLowerCase());
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


 
    filterAppareilAlgorithme();

  
    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch
    }


    // Suppression des éléments choisis dans la liste 
    const filterRefreshList = listAppareilNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
      }).join('');
      selectAppareil.innerHTML = filterRefreshList;



    

    /*--------------------------------------------------------------------------------------------*/
    /*------------EVENT: -------------------------------------------------------------------------*/
    /*------------Supression des mots clés--------------------------------------------------------*/
    /*--------------------------------------------------------------------------------------------*/

    for(const element of filterWordListAppareil){

        const closeBtnAppareilFilter = document.getElementById("close-btn-"+element);
        const keywordBlockAppareil = document.getElementById("keyword-block-"+element);
      
        closeBtnAppareilFilter.addEventListener("click", function () {
       
            filterWordListAppareil.filter((element) => {
                keywordBlockAppareil.style.display ="none"; 
                deleteKeyWord(filterWordListAppareil, element);
                listAppareilNoDoublon.push(element);
                selectAppareil.innerHTML ="";

              
        
                const filterRefreshList = listAppareilNoDoublon.map((element) => {    
                    return `
                            <option value="${element}">${element}</option>
                          `;
                }).join('');
                selectAppareil.innerHTML = filterRefreshList;
        
                  
                filterAppareilAlgorithme();
        
            
                
            })
        })

       
    }

    filterWordListIngredient.filter((element) => {
       const closeBtnIngredientFilter = document.getElementById("close-btn-"+element);
       const  keywordBlockIngredient = document.getElementById("keyword-block-"+element);
       

        // Au clic sur la croix d'une etiquette de mot clé
        closeBtnIngredientFilter.addEventListener("click", function() {

       
            keywordBlockIngredient.style.display ="none";  // Retrait du visuel etiquette
            deleteKeyWord(filterWordListIngredient, element);
            listIngredientNoDoublon.push(element); 
            selectIngredient.innerHTML ="";


            // Renvoie d'une nouvelle liste d'ingredient avec le retour de l'élément supprimé
            const filterRefreshList = listIngredientNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                    `;
            }).join('');
            selectIngredient.innerHTML = filterRefreshList; 
                
            filterIngredientAlgorithme();
              
            
            // Si plus aucun resultat afficher car liste de filtre vide
            if(filterWordListIngredient.length === 0 ){
                return recetteDisplay(allRecetteList);
            }
            
        
        })
    });
    
    filterWordListUstensile.filter((element) => {
        const closeBtnUstensileFilter = document.getElementById("close-btn-"+element);
        const keywordBlockUstensile = document.getElementById("keyword-block-"+element);
        
        closeBtnUstensileFilter2 = closeBtnUstensileFilter;
        keywordBlockUstensile2 = keywordBlockUstensile;

         closeBtnUstensileFilter.addEventListener("click", function() {

     
            keywordBlockUstensile.style.display ="none"; 
            deleteKeyWord(filterWordListUstensile, element);
            listUstensileNoDoublon.push(element);
            selectUstensile.innerHTML ="";

    
            // Liste MAJ
            const filterRefreshList = listUstensileNoDoublon.map((element) => {    
                return `
                    <option value="${element}">${element}</option>
                        `;
            }).join('');
            selectUstensile.innerHTML = filterRefreshList;
    
    
            filterUstensileAlgorithme();
           
 
        })
    })   
});





  



function filterAppareilAlgorithme(){
    // Systeme de filtre
    if(filterWordListIngredient.length == 0 && filterWordListUstensile.length == 0 && filterWordListMainBar.length == 0) {

        filterWordListAppareil.filter((element) => {
            if(filterWordListAppareil.length === 1){
                resultatFilter = allRecetteList.filter((recette) => {
                    let resultat = []
                    if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                    
                    resultatFilter = resultat
                })
        }

        if(filterWordListAppareil.length >=2){
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
                })
            }   
        })
    }

    if(filterWordListIngredient.length >= 1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListIngredient.length >= 1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListIngredient.length >= 1 && filterWordListMainBar.length >=1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >=1) {
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListAppareil == 0 && filterWordListIngredient >= 1 && filterWordListUstensile >=1){
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    
    if(filterWordListAppareil == 0 && filterWordListIngredient >= 0 && filterWordListUstensile >=1){
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListAppareil == 0 && filterWordListIngredient >= 1 && filterWordListUstensile >= 0){
        filterWordListAppareil.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

}
   