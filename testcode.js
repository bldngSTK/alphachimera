const JournalEntryOutput = [];
const ThereAreNoQuestions = [];
const ReflectionQs = [];
ReflectionQs.length = 3;
const ReflectionAs = [];
ReflectionAs.length = 3;
ThereAreNoQuestions.length = 3;
var EmotionforEmotionStatement = "";
var EmotionStatement = "";
var CircumstanceStatement = "";
var ExpectationStatement = "";




// const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
// Some formatters will format this literal's content as HTML
// "<canvas>\n</canvas>"; the "\n" becomes a line break


// Create an instance of a db object for us to store the open database in
let db;

function GetRadioValue(radioname) 
{
    var radio = document.getElementsByName(radioname);
      
    for(i = 0; i < radio.length; i++) 
    {
          
        if(radio[i].type="radio") 
        {
          
            if(radio[i].checked == true)
            {
                return radio[i].value;
            }
        }
    }
}
//Represent steps in the guided chat process
function Step1()
{
    //hide text input
    var input = document.getElementById('input0');
    EmotionforEmotionStatement += input.value.toLowerCase();
    var submitinput = document.getElementById('submitinput0');
    input.style.display = 'none';
    submitinput.style.display = 'none';

    //display type of input(in this case, radio button scale)
    var inputblock = document.getElementById('magnitudescale');
    inputblock.style.display = 'block';

    charts = document.getElementsByClassName('chartem');
    charts[0].style.display = 'none';
    charts[1].style.display = 'none';

    //Change prompt text
    var biggeroutput = document.getElementById('biggeroutput');
    //FNAF JUMPSCARE
    biggeroutput.innerHTML = "What is the magnitude of the emotion you are feeling?";
    var output = document.getElementById('output');
    output.innerHTML = "How strongly are you feeling whatever emotion you are feeling?";

}

//radio button submitted
function Step2()
{
    var magnitude = GetRadioValue('magnitude');
    var EmotionStatementOutput = document.getElementById('EmotionStatementOutput');
    EmotionStatement = "I feel " + magnitude.toLowerCase() + "ly " + EmotionforEmotionStatement + ". "; 
    EmotionStatementOutput.innerHTML = EmotionStatement;
    //FNAF JUMPSCARE
    JournalEntryOutput[0] = EmotionStatement;

    var scale = document.getElementById('magnitudescale')
    scale.style.display = "none";

    var biggeroutput = document.getElementById('biggeroutput');
    biggeroutput.innerHTML = "What caused you to feel the way you are feeling now? Why do you feel the way you feel?";
    var output = document.getElementById('output');
    output.innerHTML = "What happened out there in the external world that is causing you to internally feel this way right now?";
    
    //display text input
    var input = document.getElementById('input');
    var submitinput = document.getElementById('submitinput');
    input.style.display = 'block';
    submitinput.style.display = 'block';
}

//radio button submitted
function Step3()
{

    var biggeroutput = document.getElementById('biggeroutput');
    biggeroutput.innerHTML = "Expectation Identifier: What kind of expectations and 'idealness' did you have that caused you to feel this way?";
    var output = document.getElementById('output');
    output.innerHTML = "Emotions are often created by some sort of expectations being at play of what should/could/would ideally happen, what is the root expectation that caused your emotion?";
    
    //hide text input
    var input = document.getElementById('input');
    var CircumstancesOutput = document.getElementById('CircumstancesOutput');
    CircumstanceStatement = "Circumstances: " + input.value;
    CircumstancesOutput.innerHTML = CircumstanceStatement;
    JournalEntryOutput[1] = CircumstanceStatement;

    var submitinput = document.getElementById('submitinput');
    input.style.display = 'none';
    submitinput.style.display = 'none';

    //display text input
    var input2 = document.getElementById('input2');
    var submitinput2 = document.getElementById('submitinput2');
    input2.style.display = 'block';
    submitinput2.style.display = 'block';
    var disclaimer = document.getElementById('disclaimer');
    disclaimer.style.display = 'block'; 
}

function Step4()
{
    //hide text output
    var disclaimer = document.getElementById('disclaimer');
    disclaimer.style.display = 'none';
    var input2 = document.getElementById('input2');
    IdealsOutput = document.getElementById('IdealsOutput')
    ExpectationStatement = "Expectations: " + input2.value;
    IdealsOutput.innerHTML = ExpectationStatement;
    JournalEntryOutput[2] = ExpectationStatement;
    var submitinput2 = document.getElementById('submitinput2');
    input2.style.display = 'none';
    submitinput2.style.display = 'none';

    var biggeroutput = document.getElementById('biggeroutput');
    biggeroutput.innerHTML = "Your entry has been recorded.";
    var output = document.getElementById('output');
    output.style.display = "none";
    EmotionStatementOutput.style.display = "block";
    CircumstancesOutput.style.display = "block";
    IdealsOutput.style.display = "block";

    //even mad '


    //database add entry call
    addData();
}


//mozilla input into database
//
//
//
//
//
//
//
//
//
//
// Create needed constants
// const list = document.querySelector('.notelist');
// const titleInput = document.querySelector('#title');
// const bodyInput = document.querySelector('#body');
// const form = document.querySelector('form');
// const submitBtn = document.querySelector('.notebtn');

//const selectionbox = document.querySelector('#noteslistbox')

// Create an instance of a db object for us to store the open database in
// let db;

// Open our database; it is created if it doesn't already exist
// (see the upgradeneeded handler below)
const openRequest = window.indexedDB.open("notes_db", 1);

// error handler signifies that the database didn't open successfully
openRequest.addEventListener("error", () =>
  console.error("Database failed to open")
);

// success handler signifies that the database opened successfully
openRequest.addEventListener("success", () => {
  console.log("Database opened successfully");

  // Store the opened database object in the db variable. This is used a lot below
  db = openRequest.result;

  // Run the displayData() function to display the notes already in the IDB
  //displayData();
});

// Set up the database tables if this has not already been done
openRequest.addEventListener("upgradeneeded", (e) => {
    // Grab a reference to the opened database
    db = e.target.result;
  
    // Create an objectStore in our database to store notes and an auto-incrementing key
    // An objectStore is similar to a 'table' in a relational database
    const objectStore = db.createObjectStore("notes_os", {
      keyPath: "id",
      autoIncrement: true,
    });
  
    // Define what data items the objectStore will contain
    objectStore.createIndex("title", "title", { unique: false });
    objectStore.createIndex("tag", "tag", { unique: false });
    objectStore.createIndex("questions", "questions", {unique: false});
    objectStore.createIndex("answers", "answers", {unique: false});
    objectStore.createIndex("reflectQuestions", "reflectQuestions", {unique: false});
    objectStore.createIndex("reflectAnswers", "reflectAnswers", {unique: false});
  
    console.log("Database setup complete");
  });

  // Create a submit event handler so that when the form is submitted the addData() function is run
// form.addEventListener("submit", addData);

// Define the addData() function
function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    //e.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
    const newItem = { title: today, tag: "Chat", questions: ThereAreNoQuestions, answers: JournalEntryOutput, reflectQuestions: ReflectionQs, reflectAnswers: ReflectionAs};
  
    // open a read/write db transaction, ready for adding the data
    const transaction = db.transaction(["notes_os"], "readwrite");
  
    // call an object store that's already been added to the database
    const objectStore = transaction.objectStore("notes_os");
  
    // Make a request to add our newItem object to the object store
    const addRequest = objectStore.add(newItem);
  
    addRequest.addEventListener("success", () => {
      // Clear the form, ready for adding the next entry
      //titleInput.value = "";
      //bodyInput.value = "";
    });
  
    // Report on the success of the transaction completing, when everything is done
    transaction.addEventListener("complete", () => {
      console.log("Transaction completed: database modification finished.");
  
      // update the display of data to show the newly added item, by running displayData() again.
      //displayData();
    });
  
    transaction.addEventListener("error", () =>
      console.log("Transaction not opened due to error")
    );
  }

// Define the displayData() function
/*function displayData() {
    // Here we empty the contents of the list element each time the display is updated
    // If you didn't do this, you'd get duplicates listed each time a new note is added
    while (list.firstChild) {
      list.removeChild(list.firstChild);
      //selectionbox.removeChild(selectionbox.firstChild);
    }
  
    // Open our object store and then get a cursor - which iterates through all the
    // different data items in the store
    const objectStore = db.transaction("notes_os").objectStore("notes_os");
    objectStore.openCursor().addEventListener("success", (e) => {
      // Get a reference to the cursor
      const cursor = e.target.result;
  
      // If there is still another data item to iterate through, keep running this code
      if (cursor) {
        // Create a list item, h3, and p to put each data item inside when displaying it
        // structure the HTML fragment, and append it inside the list
        //const optionlist = document.createElement("option");
        const listItem = document.createElement("li");
        const h3 = document.createElement("h3");
        const para = document.createElement("p");
  
        //optionlist.appendChild(option)
        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);
        //selectionbox.appendChild(optionlist);

  
        // Put the data from the cursor inside the h3 and para
        //cursor.value --> the actual note
        var noteslistbox = document.getElementById('noteslistbox');
        //noteslistbox.options.add(cursor.value.title);
        //noteslistbox.
        //optionlist.textContent = cursor.value.title;
        h3.textContent = cursor.value.title; //Note title
        para.textContent = cursor.value.body; //Note desc.
  
        // Store the ID of the data item inside an attribute on the listItem, so we know
        // which item it corresponds to. This will be useful later when we want to delete items
        listItem.setAttribute("data-note-id", cursor.value.id);
  
        // Create a button and place it inside each listItem
        const deleteBtn = document.createElement("button");
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = "Delete";
  
        // Set an event handler so that when the button is clicked, the deleteItem()
        // function is run
        deleteBtn.addEventListener("click", deleteItem);
  
        // Iterate to the next item in the cursor
        cursor.continue();
      } else {
        // Again, if list item is empty, display a 'No notes stored' message
        if (!list.firstChild) {
          const listItem = document.createElement("li");
          listItem.textContent = "No notes stored.";
          list.appendChild(listItem);
        }
        // if there are no more cursor items to iterate through, say so
        console.log("Notes all displayed");
      }
    });
  }*/


  /*
  // Define the deleteItem() function
function deleteItem(e) {
    // retrieve the name of the task we want to delete. We need
    // to convert it to a number before trying to use it with IDB; IDB key
    // values are type-sensitive.
    const noteId = Number(e.target.parentNode.getAttribute("data-note-id"));
  
    // open a database transaction and delete the task, finding it using the id we retrieved above
    const transaction = db.transaction(["notes_os"], "readwrite");
    const objectStore = transaction.objectStore("notes_os");
    const deleteRequest = objectStore.delete(noteId);
  
    // report that the data item has been deleted
    transaction.addEventListener("complete", () => {
      // delete the parent of the button
      // which is the list item, so it is no longer displayed
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      console.log(`Note ${noteId} deleted.`);
  
      // Again, if list item is empty, display a 'No notes stored' message
      if (!list.firstChild) {
        const listItem = document.createElement("li");
        listItem.textContent = "No notes stored.";
        list.appendChild(listItem);
      }
    });
  }
  */
  