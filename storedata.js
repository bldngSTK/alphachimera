// Create needed constants
//const list = document.querySelector('.notelist');
const scrollbox = document.getElementById("scrollbox");
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('.notebtn');
const card = document.getElementsByClassName('.card');
const uniqueTags = [];

//const selectionbox = document.querySelector('#noteslistbox')

// Create an instance of a db object for us to store the open database in
let db;

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
  displayData();
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
//form.addEventListener("submit", addData);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
// Define the addData() function
function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();
  
    // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
    const newItem = { title: titleInput.value, tag: bodyInput.value };
  
    // open a read/write db transaction, ready for adding the data
    const transaction = db.transaction(["notes_os"], "readwrite");
  
    // call an object store that's already been added to the database
    const objectStore = transaction.objectStore("notes_os");
  
    // Make a request to add our newItem object to the object store
    const addRequest = objectStore.add(newItem);
  
    addRequest.addEventListener("success", () => {
      // Clear the form, ready for adding the next entry
      titleInput.value = "";
      bodyInput.value = "";
    });
  
    // Report on the success of the transaction completing, when everything is done
    transaction.addEventListener("complete", () => {
      console.log("Transaction completed: database modification finished.");
  
      // update the display of data to show the newly added item, by running displayData() again.
      displayData();
    });
  
    transaction.addEventListener("error", () =>
      console.log("Transaction not opened due to error")
    );
  }
  */
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Define the displayData() function
function displayData() {
    // Here we empty the contents of the list element each time the display is updated
    // If you didn't do this, you'd get duplicates listed each time a new note is added
    /*
    while (list.firstChild) {
      list.removeChild(list.firstChild);
      //selectionbox.removeChild(selectionbox.firstChild);
    }
    */
    while (scrollbox.firstChild) {
      scrollbox.removeChild(scrollbox.firstChild);
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
        //const listItem = document.createElement("li");
        const newnote = document.createElement("div");
        newnote.className = "card";
        const titled = document.createElement("h3");
      
        //const expectationLine = document.createElement("p");

        newnote.appendChild(titled);

        titled.textContent = cursor.value.title; //Note title
        
        //console.log(Array(cursor.value.questions));
        //console.log(cursor.value.questions.length);

        for(let i = 0; i < cursor.value.questions.length; i++) { //FNAF JUMPSACE THERE WAS A COMMENT HERE BUT THE ANIMATRONICS GOT TO IT
          const question = document.createElement("p");
          const answer = document.createElement("p");

          newnote.appendChild(question);
          newnote.appendChild(answer);

          question.textContent = cursor.value.questions[i];
          answer.textContent = cursor.value.answers[i];

          //console.log(i);
          //console.log(cursor.value.answers[i]);
          //newnote.appendChild(document.createElement("p").textContent(cursor.value.answers[i]));
        }

        //const reflectBuffer = document.createElement("p"); //for when the relfect is done and will be added each note
        //newnote.appendChild(reflectBuffer);
        //reflectBuffer.textContent = "Reflection";

        for(let i = 0; i < cursor.value.reflectQuestions.length; i++) { //FNAF JUMPSCARE THERE WAS A COMMENT HERE BUT THE ANIMATRONICS GOT TO IT
          const reflectQuestion = document.createElement("p");
          const reflectAnswer = document.createElement("p");

          newnote.appendChild(reflectQuestion);
          newnote.appendChild(reflectAnswer);

          reflectQuestion.textContent = cursor.value.reflectQuestions[i];
          reflectAnswer.textContent = cursor.value.reflectAnswers[i];

          //console.log(i);
          //console.log(cursor.value.answers[i]);
          //newnote.appendChild(document.createElement("p").textContent(cursor.value.answers[i]));
        }
  
        //optionlist.appendChild(option)
        //listItem.appendChild(h3);
        //listItem.appendChild(emotionLine);
        //listItem.appendChild(circumstanceLine);
        //listItem.appendChild(expectationLine);
        //list.appendChild(listItem);

        //newnote.appendChild(emotionLine);
        //newnote.appendChild(circumstanceLine);
        //newnote.appendChild(expectationLine);
        if (uniqueTags.indexOf(cursor.value.tag) == -1) {
          uniqueTags.push(cursor.value.tag);
          let subtitle = document.createElement("h4");
          let divByTag = document.createElement("div");

          subtitle.textContent = cursor.value.tag;
          divByTag.id = cursor.value.tag;
          divByTag.className = "scrolling-wrapper";

          scrollbox.appendChild(subtitle);
          scrollbox.appendChild(divByTag);
          //console.log("unique tag found");
          //console.log(Array(uniqueTags));
        }
        
        let devSelected = document.getElementById(cursor.value.tag);
        devSelected.appendChild(newnote);

        const buttonBuffer = document.createElement('div');
        newnote.appendChild(buttonBuffer);
        buttonBuffer.className = "buttonBuffer";
        //selectionbox.appendChild(optionlist);

  
        // Put the data from the cursor inside the h3 and para
        //cursor.value --> the actual note
        //var noteslistbox = document.getElementById('noteslistbox');
        //noteslistbox.options.add(cursor.value.title);
        //noteslistbox.
        //optionlist.textContent = cursor.value.title;
        //emotionLine.textContent = cursor.value.tag; //Note desc.
        //circumstanceLine.textContent = cursor.value.questions;
        //expectationLine.textContent = cursor.value.answers[0];


        // Store the ID of the data item inside an attribute on the listItem, so we know
        // which item it corresponds to. This will be useful later when we want to delete items
        //listItem.setAttribute("data-note-id", cursor.value.id);
        newnote.setAttribute("data-note-id", cursor.value.id);
        //listItem.setAttribute("data-note-tag", cursor.value.tag);
        newnote.setAttribute("data-note-tag", cursor.value.tag);

        //FNAF JUMPSCARE OMG PRESS IT QUICK PRESS THE selectBtn
        const selectBtn = document.createElement("button");
        //listItem.appendChild(selectBtn);
        newnote.appendChild(selectBtn);
        selectBtn.textContent = "Select";
        //selectBtn.style.display = "inline";
        selectBtn.className = "selectBtns";
  
        selectBtn.addEventListener('click', selectedItem);
        // Create a button and place it inside each listItem
        const deleteBtn = document.createElement("button");
        //listItem.appendChild(deleteBtn);
        newnote.appendChild(deleteBtn);
        deleteBtn.textContent = "Delete";
        //deleteBtn.style.display = "inline";
        deleteBtn.className = "deleteBtns";
  
        // Set an event handler so that when the button is clicked, the deleteItem()
        // function is run
        deleteBtn.addEventListener("click", deleteItem);

        // Iterate to the next item in the cursor
        cursor.continue();
      } else {
        // Again, if list item is empty, display a 'No notes stored' message
        /*
        if (!list.firstChild) {
          const listItem = document.createElement("li");
          listItem.textContent = "No notes stored.";
          list.appendChild(listItem);
        }
        */
        if (!scrollbox.firstChild) {
          const newnote = document.createElement("div");
          newnote.textContent = "No notes stored.";
          scrollbox.appendChild(newnote);
        }
        // if there are no more cursor items to iterate through, say so
        console.log("Notes all displayed");
      }
    });
  }

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
      if (!scrollbox.firstChild) {
        const newnote = document.createElement("div");
        newnote.textContent = "No notes stored.";
        scrollbox.appendChild(newnote);
      }

      location.reload();
    });
  }
  
//  var myFunction = function() {
//    var attribute = this.getAttribute("data-myattribute");
//     alert(attribute);
//  };

  function selectedItem(e) {

    const noteId = Number(e.target.parentNode.getAttribute("data-note-id"));
    localStorage.setItem("noteId", noteId);
    window.location.href = 'reflectSelect.html';
}

/*
Selected Note Old Code
    const h3 = document.createElement("h3");
    const emotionLine = document.createElement("p");
    const circumstanceLine = document.createElement("p");
    const expectationLine = document.createElement("p");

    document.getElementById("scrollbox").style.display = 'none';

    const selection = document.getElementById('selectedNote');
    const selNote = document.createElement("div");

    selNote.appendChild(h3);
    selNote.appendChild(emotionLine);
    selNote.appendChild(circumstanceLine);
    selNote.appendChild(expectationLine);
    selNote.className = "card center";
    selection.appendChild(selNote);

    console.log(objectStoreRequest.result);
    const data = objectStoreRequest.result;
    if (data == undefined) {
      console.error("undefined error");
    }
    h3.textContent = data.title;
    emotionLine.textContent = data.tag; //Note desc.
    circumstanceLine.textContent = data.questions;
    expectationLine.textContent = data.answers;


    
    
    const transaction = db.transaction(["notes_os"], "readwrite");
    const objectStore = transaction.objectStore("notes_os");

    const objectStoreRequest= objectStore.get(noteId);

    objectStoreRequest.addEventListener("success", () => {
      localStorage.setItem("noteId", noteId)
    });

    objectStoreRequest.addEventListener("error", () =>
      console.error("Failed to retreive data")
  );
    */
