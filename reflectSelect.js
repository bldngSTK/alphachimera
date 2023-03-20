const note = Number(localStorage.getItem("noteId"));

console.log(note);

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
  displayItem();
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

//function called above
//REDCOACH DRIVER APPEARS!!!!
function displayItem() {
    const transaction = db.transaction(["notes_os"], "readwrite");
    const objectStore = transaction.objectStore("notes_os");

    const objectStoreRequest = objectStore.get(note);

    objectStoreRequest.addEventListener("success", () => {
        const entry = objectStoreRequest.result;
        const title = document.createElement('h2')
        title.innerHTML = entry.title;
        document.body.appendChild(title);
        document.body.appendChild(document.createElement('hr'));

        const title2 = document.createElement('h3');
        title2.innerHTML = "Previous Entry";
        title2.style = "color: #FDC401";
        document.body.appendChild(title2);
        for (let i = 0; i < entry.questions.length; i++)
        {
            const question = document.createElement("p");
            question.style = "font-weight: bold";
            const answer = document.createElement("p");

            question.textContent = entry.questions[i];
            answer.textContent = entry.answers[i];

            document.body.appendChild(question);
            document.body.appendChild(answer);
        }
        
        if (entry.tag == "Chat") {
            document.body.appendChild(document.createElement("hr"))
            const header = document.createElement("h3");
            header.style = "color: #FDC401"
            header.innerHTML = "Reflection Answers";
            document.body.appendChild(header);
        }
        
        for (let i = 0; i < entry.reflectQuestions.length; i++)
        {
            const question = document.createElement("p");
            question.style = "font-weight: bold";
            const answer = document.createElement("p");

            question.textContent = entry.reflectQuestions[i];
            answer.textContent = entry.reflectAnswers[i];

            document.body.appendChild(question);
            document.body.appendChild(answer);
        }

        document.body.appendChild(document.createElement('hr'));

        //displayReflectionQuestions();

        if (entry.tag == "Chat") {
            displayReflectionQuestions();
        }
    });

    objectStoreRequest.addEventListener("error", () =>
      console.error("Failed to retreive data")
  );
    
}

function displayReflectionQuestions()
{
    const header = document.createElement("h3");
    header.style = "color: #FDC401"
    header.innerHTML = "Reflect";
    document.body.appendChild(header);

    const subtitle = document.createElement("p");
    subtitle.textContent = "Answer the reflect prompts.";
    document.body.appendChild(subtitle);

    const q1 = document.createElement("p");
    q1.style = "font-weight: bold";
    q1.textContent = "Looking back, how do you feel about what happened?";
    document.body.appendChild(q1);
    const txtbox1 = document.createElement("textarea");
    txtbox1.className = "ReflectAnswers";
    document.body.appendChild(txtbox1);

    const q2 = document.createElement("p");
    q2.style = "font-weight: bold";
    q2.textContent = "What are some negatives, downsides, or losses that you can acknowledge for what happened?";
    document.body.appendChild(q2);
    const txtbox2 = document.createElement("textarea");
    txtbox2.className = "ReflectAnswers";
    document.body.appendChild(txtbox2);

    const q3 = document.createElement("p");
    q3.style = "font-weight: bold";
    q3.textContent = "What are some positives, upsides, or wins that you can appreciate or be grateful for with happened?";
    document.body.appendChild(q3);
    const txtbox3 = document.createElement("textarea");
    txtbox3.className = "ReflectAnswers";
    document.body.appendChild(txtbox3);

    const SubmitReflectButton = document.createElement("button");
    SubmitReflectButton.textContent = "Submit Reflection";
    SubmitReflectButton.addEventListener('click', updateDB);
    document.body.appendChild(SubmitReflectButton);
}

function updateDB() {
    console.log("Update called");
    const ReflectQuestions = ["Looking back, how do you feel about what happened?", "What are some negatives, downsides, or losses that you can acknowledge for what happened?", "What are some positives, upsides, or wins that you can appreciate or be grateful for with happened?"]
    const ReflectAnswers = Array.from(document.getElementsByClassName("ReflectAnswers"));
    for (let i = 0; i < ReflectAnswers.length; i++)
    {
        ReflectAnswers[i] = ReflectAnswers[i].value;
    }

    const transaction = db.transaction(["notes_os"], "readwrite");
    const objectStore = transaction.objectStore("notes_os");

    const objectStoreRequest = objectStore.get(note);

    objectStoreRequest.addEventListener("success", () => {
        const entry = objectStoreRequest.result;
        
        entry.reflectQuestions = ReflectQuestions;
        entry.reflectAnswers = ReflectAnswers;

        const requestUpdate = objectStore.put(entry);

        requestUpdate.addEventListener("success", () => {
            console.log("Update was successful");
            location.reload();
        })

        requestUpdate.addEventListener("error", () => {
            console.log("Error occured: some descriptive number here");
        })

    });
}