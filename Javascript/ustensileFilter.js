

/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Appareil----------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/


searchBarUstensile.addEventListener('keyup',(e) => {
    console.log(e.target.value);
    const filterWordUsentsile = e.target.value;

    
    // Importer la liste des ustensiles brut et supprimer tous les doublons 
    let listUstensileNoDoublon = deleteDoublon(listUstensileRaw);

    listUstensileNoDoublon.filter((element) =>{
        if(filterWordUsentsile === element) {
            filterWordListUstensile.push(filterWordUsentsile.toLowerCase());
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


 
   // Systeme de filtre
   // Pour le premier filtre

   if( filterWordListIngredient == 0 && filterWordListAppareil.length == 0 && filterWordListMainBar.length == 0){
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

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

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
      filterWordListUstensile.filter((element) => {

        console.log("element ustensiles :", element);
        const closeBtnUstensileFilter = document.getElementById("close-btn-"+element);
        const keywordBlockUstensile = document.getElementById("keyword-block-"+element);

        closeBtnUstensileFilter.addEventListener("click", function hideFilterUstensile() {

            keywordBlockUstensile.style.display ="none"; 
            deleteKeyWord(filterWordListUstensile, element);
            listUstensileNoDoublon.push(element);
            selectUstensile.innerHTML ="";
            console.log('click Ustensile croix')

            // Liste MAJ
            const filterRefreshList = listUstensileNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectUstensile.innerHTML = filterRefreshList;


            // Affichage des resultats 
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
        
            // Affichage des résultats sur ecran
            recetteDisplay(resultatFilter);
        
            
            if(filterWordListUstensile.length == 0){
                console.log('plus rien a afficher');
                return recetteDisplay(allRecetteList);
            }
            
        })
        
    });
});

