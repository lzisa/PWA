"use strict";
console.log('hello world');

const answer= await Notification.requestPermission();
console.log(answer);


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

const requestOptions= {
    method: 'GET',
    redirect: 'follow'
};


//user
if (window.localStorage.getItem("token")) {
    login_state.classList.remove("red");
    user_display_name.innerHTML = "Willkommen zurück, " +window.localStorage.getItem("user_display_name") + "!";
    frm_login.style.display = "none";
    frm_submit_post.classList.add("visible");
} else {
    //Bin leider nicht eingeloggt
    btn_login.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent Submit of Form
        let credentials = {
            username: username.value,
            password: password.value
        }
        fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/jwt-auth/v1/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(credentials)
        }).then(function (response) {
            if (response.status !== 200) { // wenn nicht 200 = OK
                alert("Fehlgeschlagen! " + response.status);
                console.log(response);
                return false;
            }
            return response; // im response ist token drinnen
        }).then(response => response.json())
            .then(response => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("user_display_name", response.user_display_name);
                login_state.classList.remove("red");
                user_display_name.innerHTML = "Willkommen zurück, " +window.localStorage.getItem("user_display_name") + "!";
                frm_login.style.display = "none";
                frm_submit_post.classList.add("visible");
            })
    });
}


/*
//fetch travelplan
    fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/posts/23")
        .then(function (response) {
            paginate(response.headers.get("X-WP-TotalPages"));
            return response;
        }).then(response => response.json())
        .then(posts => renderPosts(posts));
    fetch_travelplan.style.display = 'none';
*/

fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey")
    .then(function (response) {
        paginate(response.headers.get("X-WP-TotalPages"));
        return response;
    }).then(response => response.json())
    .then(posts => renderPosts(posts));
fetch_travelplan.style.display = 'none';

function paginate(totalPages) {
    if (totalPages > 1) {
        let button =document.createElement("button");
        button.innerHTML = "Mehr laden";
        button.id = "load_more_posts";
        button.dataset.totalPages = totalPages;
        button.dataset.nextPage = 2;
        button.addEventListener("click", function () {
            fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey" + this.dataset.nextPage)
                .then(response => response.json())
                .then(posts => {
                    renderPosts(posts);
                    button.dataset.nextPage++;
                })
        });
        resources.append(button);
    }
}

function renderPosts(posts) {
    let acf = posts[0]['acf'];
    console.log(posts);

    let travelgroup_name=acf['travelgroup_name'];
    let unterkunft = acf['unterkunft'];
    let unterkunft_link=acf['unterkunft_link'];
    let description = acf['description'];
    let destinationenA = acf['destinationen'];

    let von =acf['von'];
    let bis =acf['bis'];

    let hardfactAusgabe =$(`<div>
<h1>${travelgroup_name}</h1>
<p>Von: ${von}</p>
<p>Bis: ${bis}</p>
<h2>Beschreibung</h2><p>${description}</p>
<a href="${unterkunft_link}">Link zur Unterkunft</a>
</div>`);
    $("#hardfacts").append(hardfactAusgabe);
}


btn_submit_post.addEventListener("click", event => {
    event.preventDefault();

    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " +window.localStorage.getItem('token'),
            "Content-Type": "application/json",
        },
        redirect: 'follow',
        body:JSON.stringify({
            travelgroup_name: journey_name.value,
            title: post_title.value,
            content: post_content.value,
            status: 'publish'
        }),
    };

    fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey", requestOptions)
        .then(function(response) {
            if (response.status != 201) {
                alert("Fehlgeschlagen! " + response.status);
                console.log(response);
                return false;
            } return response;
        }).then(response => response.json())
        .then(posts => {
            console.log(posts);
            renderPosts([posts]);
            post_title.value = "";
            post_content.value = "";
        });
});

