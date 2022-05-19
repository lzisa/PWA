"use strict";
import KWM_Utils from './kwm-utils.js?v=0.2';
import KWM_Translator from './kwm-translator.js?v=0.2';
import KWM_Templater from './kwm-templater.js?v=0.2';
import KWM_Router from './kwm-router.js?v=0.2';
import KWM_Model from "./kwm-model.js";

/**********************************************************************
 *     Class-Bundle for KWM-Applications.
 *     App-Shell needs an ID "#kwmJS".
 *
 *     @param:
 *     webRoot - Give me the root-URL of your App
 *     routes - Give me an Object with "slug" : "template" Routes
 *     config - Want to store some Config in your App? Here you go!
 *     ...languages - Give me all languages you want your App to support.
 *
 *     KWM - 2022-03-26
 **********************************************************************/

export default class kwmJS {
    constructor() {
        console.log("kwm.js initialisiert");
        window.kwm = this;
        this.options = {
            appContainer: document.getElementById('kwmJS'),
            debugMode: true,
            webRoot: "https://app.s2010456035.student.kwmhgb.at/",
        };
        this.utils = KWM_Utils;
        this.translator = new KWM_Translator("de", "en");
        this.templater = new KWM_Templater(this.options.webRoot + "/templates/");
        this.model = new KWM_Model();
        this.router = new KWM_Router();
    }

    t(key) {
        return this.translator.translate(key);
    }
}
new kwmJS();