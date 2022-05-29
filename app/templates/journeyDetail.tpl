<div id="imgContainer">
    <img src="<&>theme_picture<&>" class="theme_picture">
    <div class="centered">
        <h1 class="journeyLink display-4 journeyHeaderName"><&>travelgroup_name<&></h1>
    </div>

</div>

<div id="detailContainer">


    <div class="detailView">
        <div class="row w-100 d-flex justify-content-between"">
            <div class="card float-left">
                <div class="card-header">
                    <h3>Reisedaten</h3>
                </div>
                <div class="card-body">
                    <h4>Zeitpunkt</h4>
                    <p><&>von<&> - <&>bis<&></p>
                    <h4>Beschreibung</h4>
                    <p><&>description<&></p>
                    <h4>Unterkunft</h4>
                    <a href="<&>unterkunft_link<&>"><&>unterkunft<&></a>
                </div>
            </div>
            <div class="float-right">
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe width="600" height="500" id="gmap_canvas"
                                src="https://maps.google.com/maps?q=<&>adresse_unterkunft<&>&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                frameborder="0"
                                scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        <a href="https://www.whatismyip-address.com/divi-discount/">divi discount</a><br>
                        <style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style>
                        <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
                        <style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style>
                    </div>
                </div>
            </div>
        </div>

        <nav class="nav">
            <div class="mainMenuItem">
                <button id="targets" class="btn btn-outline-dark btn-block">
                    <img class="imgMenu"
                         src="./../images/icons/activity.png" alt="Reiseziele">
                </button>
            </div>
            <div class="mainMenuItem">
                <button id="todos" class="btn btn-outline-dark btn-block">
                    <img class="imgMenu"
                         src="./../images/icons/todo.png" alt="To Do">
                </button>
            </div>
            <div class="mainMenuItem">
                <button id="members" class="mainMenuItem btn btn-outline-dark btn-block">
                    <img class="imgMenu"
                         src="./../images/icons/members.png" alt="group members">
                </button>
            </div>
        </nav>
    </div>
    <div id="viewSpecific"></div>
    <div class="margin"></div>

    <!--<button class="btn btn-dark" id="back">zurück zur Übersicht</button>-->
</div>
