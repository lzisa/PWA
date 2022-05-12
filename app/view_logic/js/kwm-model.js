export default class KWM_Model{
    constructor() {
        this.habits = [];
        this.getAllHabits();
    }

    async getAllHabits(){
        return new Promise(resolve => {
            if(window.kwm.utils.isEmpty(this.habits)){
                fetch("https://api.s2010456035.student.kwmhgb.at/wp-json/acf/v3/journal")
                    .then(response => response.json())
                    .then(allHabits => {
                        for(let habit of allHabits){
                            this.habits.push(habit.acf);
                        }
                        resolve(this.habits);
                    })
                console.log(this.habits);
                console.log("test log geht");
            }
            else {
                resolve(this.habits);
            }
        });

    }
}