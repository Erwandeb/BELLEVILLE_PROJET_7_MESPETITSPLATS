/*--------------------------------------------------------------------------*/
/*------------Filtre par Ingredient-----------------------------------------*/
/*--------------------------------------------------------------------------*/



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

    console.log("filterWordsList", filterWordListIngredient);


    //Système de filtre par réduction 
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
        console.log('resultatfiler', resultatFilter)
        console.log('boum')

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
        console.log('resultatfiler', resultatFilter)
        console.log('boum')

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
    console.log('apres le script', resultatFilter)
    
    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

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

    filterWordListIngredient.filter((element) => {

            console.log("element ingredient :", element);
            const closeBtnIngredientFilter = document.getElementById("close-btn-"+element);
            const keywordBlockIngredient = document.getElementById("keyword-block-"+element);

            // Au clic sur la croix d'une etiquette de mot clé
            closeBtnIngredientFilter.addEventListener("click", function hideFilterIngredient() {

                keywordBlockIngredient.style.display ="none";  // Retrait du visuel etiquette

                deleteKeyWord(filterWordListIngredient, element);
                listIngredientNoDoublon.push(element); 
                selectIngredient.innerHTML ="";
                console.log('click Appareil croix');

                // Renvoie d'une nouvelle liste d'ingredient avec le retour de l'élément supprimé
                const filterRefreshList = listIngredientNoDoublon.map((element) => {    
                    return `
                            <option value="${element}">${element}</option>
                        `;
                }).join('');
                selectIngredient.innerHTML = filterRefreshList; 
                
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
                    console.log('resultatfiler', resultatFilter)
                    console.log('boum')

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
                    console.log('resultatfiler', resultatFilter)
                    console.log('boum')

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
                recetteDisplay(resultatFilter);

                // Si plus aucun resultat afficher car liste de filtre vide
                if(filterWordListIngredient.length === 0){
                    console.log('plus rien a afficher');
                    filterWordListIngredient = [];
                    resultOfGetIngredientFilter = [];
                    resultatFilter= [];
                return recetteDisplay(allRecetteList);
            }
        })
    });
});