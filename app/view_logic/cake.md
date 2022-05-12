#CWP4 - Lesson_002
    Prerequisites:
      - Lesson_001
      - Lesson_002
      - Translation Engine
      - Template Engine
      - Router
      - Views
## In order to obtain the cake 🍰, solve the following tasks:

<details>
    <summary>1. Model (50)</summary>

###Develop a very simple Data-Model.

Create /js/kwm-model.js and create a Model-Class (KWM_Model). 
   1. In its constructor, you expect to receive no arguments.
   2. Add an empty Member-Array this.pets.
   3. Your Model should have one methods: async getAllPets().
      1. getAllPets() should retrieve Pets from a public Pet-Shop Api.
         1. The API is free for public read-access. You can basically just [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) a .json from "https://api.neuwersch.kwmhgb.at/wp-json/acf/v3/kwm_pet";
         2. Look at the data you receive from that API and how it is structured.
         3. Now go ahead and save the acf-object of each pet into your Member-Array for pets.
            1. This should only happen once. If there are already Pets in your Member-Array, use them.
         4. Make sure, that this method can be used asynchronously.
   4. Add your Model to your kwm object. But think wisely, when/where you want to add it.
  
</details>
<details>
     <summary>2. Shop (50)</summary>

###Put some Pets in your Pet-Shop.

Open /views/view.shop.js. You want to load all the pets, and render them.
   1. Load all the Pets from the API, when this view is activated. 
   2. **Once this is done**, render the basic shop template (/templates/shop.tpl) into the #kwmJS div.
   3. **Once this is done**, do the following for each pet in your model:
      1. Create a div-element.
      2. Add "pet" to the elements classlist.
      3. Append the new Element to the **#pets** div (this was loaded in shop.tpl).
      4. Bonus (10): Do the next step(5), but delete the template-file first, without looking into its content.
         1. Create a new /templates/shop.pet-overview.tpl.
         2. Now open /templates/petbox-example.jpg and style.css.
         3. Try to rebuild the correct template for the given styling and the wanted result in the picture.
      5. Render the pet-overview Template (/templates/shop.pet-overview.tpl) into the newly created div, and give it the data of the pet from your model.
      6. Init is a function. Init will be executed, when the router activates this route.
</details>