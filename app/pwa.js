"use strict";
import KWMJS from "./js/kwm.js";

Notification.requestPermission();

// Check if serviceworker is supported
if ('serviceWorker' in navigator) {
    try {
        // register Serviceworker
        await navigator.serviceWorker.register('./serviceworker.js');
        console.log("serviceWorker registered");
    } catch (error) {
        console.log("serviceWorker registration failed", error);
    }
} else console.log('serviceWorker is not supported');


if(window.localStorage.getItem("token")){
    login_state.classList.remove("red");
    user_display_name.innerHTML = "Willkommen zurück, "+window.localStorage.getItem("user_display_name")+"!";
    frm_login.style.display = "none";
    //frm_submit_post.classList.add("visible");
} else{
    //Bin leider nicht eingeloggt
    btn_login.addEventListener("click", function(e){
        e.preventDefault(); //Prevent Submit of Form
        let credentials = {
            username: username.value,
            password: password.value
        };
        fetch("https://api.s2010456010.student.kwmhgb.at/wp-json/jwt-auth/v1/token", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(credentials)
        }).then(function(response){
            if(response.status != 200){
                alert("Fehlgeschlagen! "+response.status)
                return false;
            } return response;
        }).then(response => response.json())
            .then(response =>{
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("user_display_name", response.user_display_name);
                login_state.classList.remove("red");
                user_display_name.innerHTML = "Willkommen zurück, "+window.localStorage.getItem("user_display_name")+"!";
                frm_login.style.display = "none";
                //frm_submit_post.classList.add("visible");
            })
    })
}

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey", requestOptions)
    .then(response => response.text())
  //  .then(result => console.log(result))
    .catch(error => console.log('error', error));




/*
let li = document.createElement("li");
let text = document.createTextNode(key);
li.append(text);
ul.append(li);
li.addEventListener("click", KWM_Translator.changeLanguage);
*/
//create model and fetch contents
//let PWAModel = new model();
/*
btn_submit_post.addEventListener("click", event => {
    event.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('token'),
            "Content-Type": "application/json",
        },
        redirect: 'follow',
        body: JSON.stringify({
            travelgroup_name: journey_name.value,
            title: post_title.value,
            content: post_content.value,
            status: 'publish'
        }),
    };

    fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey", requestOptions)
        .then(function (response) {
            if (response.status != 201) {
                alert("Fehlgeschlagen! " + response.status);
                console.log(response);
                return false;
            }
            return response;
        }).then(response => response.json())
        .then(posts => {
            renderPosts([posts]);
            post_title.value = "";
            post_content.value = "";
        });
});

*/