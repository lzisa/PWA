"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';
import KWM_MODEL from "../js/kwm-model.js";

/*******************************************************************************
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/shop", async function(){
    await window.kwm.model.getAllPets();
   // kwm.model.pets;
    await this.rendering();


});

view.rendering = async function(){
    await kwm.templater.renderTemplate("shop", document.getElementById("kwmJS"));
    printPets();
};

function printPets(){
    console.log("this function works");
    //kwm.model.pets

  console.log(kwm.model.pets);

   for(let pet of kwm.model.pets){
        console.log("geht in Schleife");
        let div = document.createElement("div");
        div.classList.add("pet");
        let petDiv = document.getElementById("pets");
        petDiv.append(div);
        kwm.templater.renderTemplate("shop.pet-overview", div, pet);
    }
}
