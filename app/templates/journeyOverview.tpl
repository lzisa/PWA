<section id="main_content">
    <div id="journeyList">
        <h1>Übersicht der Reisegruppen</h1>
        <p class="lead">Hier ist eine Übersicht aller deiner Reisegruppen!</p>
        <div id="renderList"></div>


        <!--Anlegen einer neuen Reise-->

<div id="newJourney">
    <form id="newJourneyForm">
        <div class="form-group">
            <label for="title">Name der Reisegruppe</label>
            <input type="text" class="form-control" id="title" aria-describedby="journeyHelp" placeholder="Enter name of journey group">
            <small id="journeyHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <label for="unterkunft">Unterkunft</label>
            <input type="text" class="form-control" id="unterkunft" placeholder="Unterkunft">
            <label for="unterkunftLink">Link zur Unterkunft</label>
            <input type="text" class="form-control" id="unterkunftLink" placeholder="Link zur Unterkunft">
        </div>
        <div class="form-group">


        </div>

        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</div>

    <div id="detailList">
    </div>
</section>