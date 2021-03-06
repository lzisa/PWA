import KWM_Route from '../js/kwm-route.js?v=0.2';
import KWM_Model from "../js/kwm-model.js";


export let view = new KWM_Route("/journeys", async function () {
    await kwm.model.getAllJourneys();
    await this.rendering();
});


view.rendering = async function () {
    await kwm.templater.renderTemplate("journeyOverview", document.getElementById("kwmJS"));
    fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey")
        .then(function (response) {
            paginate(response.headers.get("X-WP-TotalPages"));
            return response;
            /* }).then(response => response.json())
             .then(posts => this.renderPosts(posts));*/
        });
};


function renderPosts(journeys) {
    clearRenderList();
    let journeysListContainer = document.getElementById("renderList");

    let valueFilter = $('#continent').find(":selected").text();
    let selectedJourneys;
    if (valueFilter === "-") {
        selectedJourneys = journeys;
    } else
        selectedJourneys = filterfunction(journeys, valueFilter);

    for (let journey of selectedJourneys) {
        //render List View

        let user = window.localStorage.getItem("user_display_name");
        let members = journey.acf.gruppenmitglieder;
        for (let member of members) {
            let name = member.member.display_name;
            if (name === user) {
                let journeyContainer = document.createElement("div");
                journeyContainer.classList.add("journeyEvent");
                journeyContainer.setAttribute("id", "journey" + journey.id);
                journeyContainer.dataset.resourceid = journey.id;
                journeyContainer.addEventListener("click", function () {
                    toggleHidden(journeys, journey);
                });
                kwm.templater.renderTemplate("journeyList", journeyContainer, journey.acf);
                journeysListContainer.append(journeyContainer);
            }
        }

    }
    initialiseSelectClickhandler();
}

async function initialiseSelectClickhandler() {
    continent.addEventListener("change", function () {
        paginate();
    })
}

function filterfunction(journeys, valueFilter) {

    let selectedJourneys = [];

    for (let journey of journeys) {
        if (journey.acf.continent === valueFilter) {
            selectedJourneys.push(journey);
        }
    }
    return selectedJourneys;
}
function sortfunction(journeys, valueFilter){

}

function clearDetailList() {
    //clear detailList
    let getDetailList = document.getElementById("detailList");
    while (getDetailList.hasChildNodes()) {
        getDetailList.removeChild(getDetailList.firstChild);
    }
}
function clearRenderList() {
    let renderList = document.getElementById("renderList");
    while (renderList.hasChildNodes()) {
        renderList.removeChild(renderList.firstChild);
    }
}

async function clearViewSpecific() {
    let getclearSpecific = document.getElementById("viewSpecific");
    while (getclearSpecific.hasChildNodes()) {
        getclearSpecific.removeChild(getclearSpecific.firstChild);
    }
}

async function toggleHidden(journeys, journey) {
    //clearDetailView
    clearDetailList();

    let journeysDetailContainer = document.getElementById("main_content");
    //render Detail View
    for (let currJourney of journeys) {
        if (journey.id === currJourney.id) {

            let journeyDetail = document.createElement("div");
            journeyDetail.setAttribute("id", "journeyDetail" + journey.id);
            await kwm.templater.renderTemplate("journeyDetail", journeyDetail, journey.acf);
            journeysDetailContainer.append(journeyDetail);

            //await renderSlider(journey);
        }
    }

    //don't display journey List
    let journeyList = document.getElementById("journeyList");
    journeyList.classList.add("hidden");

    //get back to list View
    let back = document.getElementById("back");
    back.addEventListener("click", viewJourneyList);

    createSpecView(journey);

}

/**
 * create Detail Views
 * @param journey
 * @returns {Promise<void>}
 */
async function createSpecView(journey) {

    //create EventListener
    let viewTargetsB = document.getElementById("targets");
    viewTargetsB.addEventListener("click", function () {
        viewTargets(journey);
    });

    let viewTodosB = document.getElementById("todos");
    viewTodosB.addEventListener("click", function () {
        viewTodos(journey);
    });

    let viewMembersB = document.getElementById("members");
    viewMembersB.addEventListener("click", function () {
        viewMembers(journey);
    });
}

async function viewMembers(journey) {
    clearViewSpecific();

    let viewSpecificContainer = document.getElementById("viewSpecific");

    //create targetContainer
    let journeyMembers = document.createElement("div");
    journeyMembers.setAttribute("id", "journeyMembers" + journey.id);
    await kwm.templater.renderTemplate("members", journeyMembers, journey.acf);
    viewSpecificContainer.append(journeyMembers);

    //Create targets
    let members = journey.acf.gruppenmitglieder;
    for (let member of members) {
        let div = document.createElement("ul");
        div.classList.add("list-group");
        await kwm.templater.renderTemplate("member", div, member.member);
        journeyMembers.append(div);
    }
}

async function viewTodos(journey) {
    clearViewSpecific();

    let viewSpecificContainer = document.getElementById("viewSpecific");
    //create targetContainer
    let journeyTodos = document.createElement("div");
    journeyTodos.setAttribute("id", "journeyTodos" + journey.id);
    journeyTodos.classList.add("todoContainer");

    //check if there are todos
    let keys = Object.keys(journey.acf);
    let condition = journey.acf.to_dos;
    if (condition !== undefined) {
        if (condition.length !== 0) {
            if (condition !== false) {
                await kwm.templater.renderTemplate("todos", journeyTodos, journey.acf);
                viewSpecificContainer.append(journeyTodos);
                let todos = journey.acf.to_dos;
                // let node = document.getElementById("journeyT");
                for (let todo of todos) {
                    let div = document.createElement("div");
                    div.classList.add("custom-control");
                    div.classList.add("custom-checkbox");
                    div.classList.add("todo");
                    div.setAttribute("id", "todoContainer");
                    await kwm.templater.renderTemplate("todo", div, todo);
                    let card = document.getElementById("todoDiv");
                    card.append(div);
                    //journeyTodos.append(div);
                }
            }
        } else createMessageToDo("Es gibt noch keine To Dos");
    } else createMessageToDo("Es gibt noch keine To Dos");
}

function createMessageToDo() {
    let p = document.createElement("p");
    let viewSpecific = document.getElementById("viewSpecific");
    let text = "Es gibt noch keine To Dos";

    p.append(text);
    viewSpecific.append(p);
}

async function viewTargets(journey) {
    clearViewSpecific();
    let viewSpecificContainer = document.getElementById("viewSpecific");

    //create targetContainer
    let journeyTargets = document.createElement("div");
    journeyTargets.setAttribute("id", "journeyTargets" + journey.id);
    await kwm.templater.renderTemplate("targets", journeyTargets, journey.acf);
    viewSpecificContainer.append(journeyTargets);

    //Create targets
    let activities = journey.acf.activities;
    for (let activity of activities) {
        let target = document.createElement("div");
        await kwm.templater.renderTemplate("target", target, activity);
        journeyTargets.append(target);
    }
}

function viewJourneyList() {
    let getJourneyList = document.getElementById("journeyList");
    getJourneyList.classList.remove("hidden");
    clearDetailList();
}

function paginate(totalPages) {
    fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey")
        .then(response => response.json())
        .then(posts => {
            renderPosts(posts);
            if (totalPages > 1) {
                let button = document.createElement("button");
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
                main_content.append(button);
            }
        });
}


/**
 * not used functions
 * @param acf
 */
function createJourney(acf) {
    createHardfacts(acf);
    createGallery(acf);
}

function createGallery(acf) {
    let pictures = acf['gallery'];
    for (let pic of pictures) {
        fetchPicture(pic);
    }
}

//TODO: mit URL arbeiten

function fetchPicture(pic) {
    let pfad = pic['picture']['url'];
    let image = `<image src="${pfad}"></image>`;
    $("#hardfacts").append(image);

}

function renderFilter() {
    //fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/wp/v2/categories").then(function (response
    //  ) {
    //TODO: Auslesen der Filter und dynamischen Filter erzeugen


    // });

}

function createHardfacts(acf) {
    let travelgroup_name = acf['travelgroup_name'];
    let unterkunft = acf['unterkunft'];
    let unterkunft_link = acf['unterkunft_link'];
    let description = acf['description'];
    let destinationenA = acf['destinationen'];

    let von = acf['von'];
    let bis = acf['bis'];

    //Create Menu with Teaser
    let teaser = $(`<li class="list-group-item" id="${travelgroup_name}">${travelgroup_name}</li>`);
    $("#journeyList").append(teaser);

    //create Post with all Content Elements
    let hardfactAusgabe = $(`<div>
<h1>${travelgroup_name}</h1>
<p>Von: ${von}</p>
<p>Bis: ${bis}</p>
<h2>Beschreibung</h2><p>${description}</p>
<a href="${unterkunft_link}">Link zur Unterkunft</a>
</div>`);
    $("#hardfacts").append(hardfactAusgabe);

}