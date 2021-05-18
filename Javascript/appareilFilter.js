

/*--------------------------------------------------------------------------------------------*/
/*------------EVENT: -------------------------------------------------------------------------*/
/*------------Ajout des mots clés Appareil----------------------------------------------------*/
/*--------------------------------------------------------------------------------------------*/

searchBarAppareil.addEventListener('keyup',(e) => {
    console.log(e.target.value);
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


    // Récupération des éléments dans la barre de saisie de l'utilisateur
    console.log("filterWordsList", filterWordListAppareil);
 

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

    // Affichage des résultats sur ecran
    recetteDisplay(resultatFilter);

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
    filterWordListAppareil.filter((element) => {

        console.log("element appareil :",element);
        const closeBtnAppareilFilter = document.getElementById("close-btn-"+element);
        const keywordBlockAppareil = document.getElementById("keyword-block-"+element);

        closeBtnAppareilFilter.addEventListener("click", function hideFilterAppareil() {

            keywordBlockAppareil.style.display ="none"; 
            deleteKeyWord(filterWordListAppareil, element);
            listAppareilNoDoublon.push(element);
            selectAppareil.innerHTML ="";
            console.log('click Appareil croix')
          

            const filterRefreshList = listAppareilNoDoublon.map((element) => {    
                return `
                        <option value="${element}">${element}</option>
                      `;
              }).join('');
              selectAppareil.innerHTML = filterRefreshList;

              
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

            // Affichage des résultats sur ecran
            recetteDisplay(resultatFilter);

              if(filterWordListAppareil.length === 0){
                return recetteDisplay(allRecetteList);
            }
        })
        
    });

});

