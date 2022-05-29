export default class KWM_Model {
    constructor() {
        this.journeys = [];
    }

    async getAllJourneys() {
        return new Promise(resolve => {
            if (window.kwm.utils.isEmpty(this.journeys)) {
                fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journey")
                    .then(response => response.json())
                    .then(allJourneys => {
                        for (let journey of allJourneys) {
                            this.journeys.push(journey.acf);
                            localStorage.setItem(journey.acf.travelgroup_name,journey);
                        }
                        resolve(this.journeys);
                    })
            } else {
                resolve(this.journeys);
            }
        })

    }
}