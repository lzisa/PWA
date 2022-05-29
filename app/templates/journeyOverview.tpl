<section id="main_content">
    <div id="journeyList">
        <h1>Übersicht Deiner Reisegruppen</h1>

        <div id="filterandsort" class="row d-flex justify-content-end">
            <div id="filterOptions column">
                <label for="filterOptions">Filtern nach Kontinent </label>
                <form>
                    <div class="dropdown">
                        <select name="continent" id="continent" class="btn btn-secondary dropdown-toggle"
                                aria-label=".form-select-lg">
                            <option value="all">-</option>
                            <option value="europe">Europa</option>
                            <option value="africa">Afrika</option>
                            <option value="america">Nordamerika</option>
                        </select>
                    </div>
                </form>
            </div>

            <div id="sort" class="column">
                <label for="filterOptions">Sortieren nach Datum</label>
                <form>
                    <div class="dropdown">
                        <select name="continent" id="date" class="btn btn-secondary dropdown-toggle"
                                aria-label=".form-select-lg">
                            <option value="all">-</option>
                            <option value="europe">nach Datum aufsteigend</option>
                            <option value="africa">nach Datum absteigend</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>

        <div id="renderList"></div>

        <!--Anlegen einer neuen Reise-->

        <div id="newJourney">
            <form id="newJourneyForm">
                <div class="form-group">
                    <label for="title">Name der Reisegruppe</label>
                    <input type="text" class="form-control" id="title" aria-describedby="journeyHelp"
                           placeholder="Enter name of journey group">
                    <small id="journeyHelp" class="form-text text-muted">We'll never share your email with anyone
                        else.</small>
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
        <div class="margin">
        </div>
</section>