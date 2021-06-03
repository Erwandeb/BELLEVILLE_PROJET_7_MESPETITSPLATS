

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


function filterUstensileAlgorithme(){
    // Systeme de filtre
    // Pour le premier filtre

    console.log("filterword list", filterWordList);
    if(filterWordList.length === 1){
        resultatFilter = allRecetteList.filter((recette) => 
        recette.ustensils.toString().toLowerCase().includes(filterWordList.toString()));
    }
  
    if(filterWordList.length >= 2 ){
        console.log('aie ustensile');
        for(element of filterWordList){
            resultatFilter = resultatFilter.filter((recette) => 
            recette.ustensils.toString().toLowerCase().includes(element.toString()) ||
            recette.appliance.toString().toLowerCase().includes(element.toString()) );
        }
    }

    console.log('resultatfilter', resultatFilter);
    console.log('filterwordlist ', filterWordList);

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

    /*

    if(filterWordListIngredient == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
        filterWordListUstensile.filter((element) => {
            if(filterWordListUstensile.length === 1){
                resultatFilter = allRecetteList.filter((recette) => {
                    let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                    
                    resultatFilter = resultat
                })
            }
            if(filterWordListUstensile.length >=2){
                resultatFilter = resultatFilter.filter((recette) => {
                    let resultat = []
                        if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                    resultatFilter = resultat
                })
            }   
        })
    }

    if(filterWordListIngredient.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }
        
    if(filterWordListAppareil.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >=1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListAppareil.length >= 1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile >=0 && filterWordListIngredient >= 1 && filterWordListAppareil >=1){
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    
    if(filterWordListUstensile >=0 && filterWordListIngredient >= 0 && filterWordListAppareil >=1){
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile >=0 && filterWordListIngredient >= 1 && filterWordListAppareil >= 0){
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                if(recette.appliance.toString().toLowerCase().includes(element.toString())){
                    return resultat
                } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length == 0 && filterWordListAppareil.length ==0 && filterWordListIngredient.length == 0 && filterWordListMainBar.length >=1) {
        filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >= 1){
      filterWordListUstensile.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = []
                    if(recette.ustensils.toString().toLowerCase().includes(element.toString())){
                        return resultat
                    } 
                resultatFilter = resultat
            })
        })
    }

    
    if(filterWordListIngredient.length == 0 && filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 ){
        return recetteDisplay(allRecetteList)
    }

    if(filterWordListIngredient.length == 0 && filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length ==0){
        return recetteDisplay(allRecetteList)
    }

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);
*/
}