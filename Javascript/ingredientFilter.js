
/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Ingredient---------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/



searchBarIngredient.addEventListener('keyup',(e) => {
    const filterWordIngredient = e.target.value;

    // Importer la liste des appareils brut et supprimer tous les doublons 
    let listIngredientNoDoublon = deleteDoublon(listIngredientRaw);
  
    listIngredientNoDoublon.filter((element) =>{
        if(filterWordIngredient === element) {
            filterWordListIngredient.push(filterWordIngredient.toLowerCase());
        }
    })

    // Retrait des elements sélectionnés par l'utilisateur
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


    filterIngredientAlgorithme();

    if(resultatFilter.length === 0){
        noResultatBloc.innerHTML = NoResultatForResearch;
    }


    // SUPPRESSION des éléments choisis dans la liste   
    const filterRefreshList = listIngredientNoDoublon.map((element) => {    
        return `
                <option value="${element}">${element}</option>
              `;
    }).join('');
    
    selectIngredient.innerHTML = filterRefreshList;





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



function filterIngredientAlgorithme(){

        // Ré-Affichage des nouveaux résultats
    if(filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
        filterWordListIngredient.filter((element) => {
            if(filterWordListIngredient.length === 1){
                resultatFilter = allRecetteList.filter((recette) => {
                    let resultat = []
                    for(const ingredient of recette.ingredients){
                        if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                    }
                    resultatFilter = resultat
                })
        }
    if(filterWordListIngredient.length >=2){
                resultatFilter = resultatFilter.filter((recette) => {
                    let resultat = []
                    for(const ingredient of recette.ingredients){
                        if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                            return resultat
                        } 
                    }
                    resultatFilter = resultat
                })
            }   
        })
    }

    if(filterWordListUstensile.length >= 1) {
    
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                    let resultat = [];
                    for(const ingredient of recette.ingredients){
                        if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                            return resultat
                        }  
                    }
                    resultatFilter = resultat
                })
            })
    }

    if(filterWordListAppareil.length >= 1) {
    
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 ) {

        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >= 1) {
    
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >= 1) {
        
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListIngredient.length == 0 && filterWordListAppareil.length >= 1 && filterWordListUstensile.length >=1) {
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListIngredient.length == 0 &&  filterWordListUstensile.length >=1) {
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListIngredient.length == 0 && filterWordListAppareil.length >= 1) {
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListUstensile.length >= 1 && filterWordListAppareil.length >= 1 && filterWordListMainBar.length >= 1) {
        
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >= 1) {
        
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListIngredient == 0 && filterWordListUstensile >=1 && filterWordListAppareil >=1){
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    
    if(filterWordListIngredient == 0 && filterWordListUstensile >=1 && filterWordListAppareil >=0){
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    
    if(filterWordListIngredient == 0 && filterWordListUstensile >=0 && filterWordListAppareil >=1){
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListIngredient.length == 0 && filterWordListUstensile.length == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length >= 1){
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
                }
                resultatFilter = resultat
            })
        })
    }

    if(filterWordListMainBar.length >= 1 ){
        filterWordListIngredient.filter((element) => {
            resultatFilter = resultatFilter.filter((recette) => {
                let resultat = [];
                for(const ingredient of recette.ingredients){
                    if(ingredient.ingredient.toLowerCase().includes(element.toString())){
                        return resultat
                    }  
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

    recetteDisplay(resultatFilter);
}