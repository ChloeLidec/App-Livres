const dataQ={qmoins30:[
    {name: "Quel est le nom de Supergirl ?",
    type:"radio",
    answer: "Kara Zor-El",
    choices: ["Kara Luthor","Kara Zor-L","Kara Zor-El","Kara Luthor-L"]},
    {name: "A quelle date est sorti avengers endgame (en France)?",
    type:"date",
    answer: "2019-04-24"},
    {name: "Combien de films sont sortis dans la saga star wars (seulement les épisodes principaux)?",
    type:"slider",
    answer: "9",
    min:"4",
    max:"15",
    step:"1"},
    {name: "Quel est le nom de la planète d'origine de Supergirl ?",
    type:"text",
    answer: "Krypton"},
    {name: "Quels sont les mobs qui apparaissent seuleument dans la nuit ou dans les grottes dans minecraft parmis ceux présents dans la liste?",
    type:"checkbox",
    answer:["Creeper","Zombie","Araignée",],
    choices: ["Creeper","Zombie","Lapin","Araignée","Cochon"]},
    {name: "Comment s'apelle la chanteuse qui joue dans la série High School Musical et qui est fan de Taylor Swift?",
    type:"select",
    answer: "Olivia Rodrigo",
    choices: ["Vanessa Hudgens","Jenna Ortega","Zac Efron","Olivia Rodrigo","Sofia Wylie","Sofia Carson"]},
    {name: "Combien de saisons y a t'il eu dans la série Supergirl ?",
    type:"number",
    answer: "6",
    min:"0",
    max:"10"},
    {name: "Comment s'apelle le livre écrit par Taylor Jenkins Reid qui se déroule dans un Hollywood des années 50 ?",
    type:"selectS",
    answer: "The Seven Husbands of Evelyn Hugo",
    choices: ["The Seven Wives of Evelyn Hugo","The Seven Husbands of Evelyn Hugo","The Seven Husbands of Evelyn Hug","The Seven Wives of Evelyn Hug","One last stop","If you still recognise me","Les filles du docteur March","Portrait de la jeune fille en feu"]},
    {name: "Quel est le nom de la saga de 3 films qui tournent autout de Beca Mitchell?",
    type:"radio",
    answer: "Pitch Perfect",
    choices: ["Pitch Perfect","Birds of Prey","Mean girls","The Hunger Games","Labyrinthe","Divergent"]},
],
qplus30:[
    {name: "Comment s'apelle la sitcom autour d'un groupe d'amis à New York avec Jennifer Anniston?",
    type:"radio",
    answer: "Friends",
    choices: ["How I met your mother","The Big Bang Theory","Friends","The Office","Modern Family"]},
    {name: "Quelle est la date où Marty McFly et Doc Brown arrivent dans le futur dans Retour vers le futur 2 ?",
    type:"date",
    answer: "2015-10-21"},
    {name: "Quel est le nombre de films qui composent la saga Harry Potter ?",
    type:"slider",
    answer: "8",
    min:"3",
    max:"10",
    step:"1"},
    {name: "Quel est le nom de la voiture de Doc Brown dans Retour vers le futur ?",
    type:"text",
    answer: "DeLorean"},
    {name: "Quels sont les personnages qui apparaissent dans la série Friends parmis ceux présents dans la liste?",
    type:"checkbox",
    answer:["Rachel Green","Joey Tribbiani","Phoebe Buffay"],
    choices: ["Rachel Green","Chandler Bong","Will Schuester","Marley Rose","Joey Tribbiani","Santana Lopez","Phoebe Buffay"]},
    {name: "Comment s'apelle l'actrice qui joue Black Widow dans la saga Avengers ?",
    type:"select",
    answer: "Scarlett Johansson",
    choices: ["Brie Larson","Elizabeth Olsen","Zoe Saldana","Scarlett Johansson","Karen Gillan","Natalie Portman"]},
    {name: "En quelle année est sorti le premier film de la saga Harry Potter ?",
    type:"number",
    answer: "2001",
    min:"1995",
    max:"2010"},
    {name: "Quel est l'alias de la chanteuse qui s'apelle Stefani Joanne Angelina Germanotta?",
    type:"selectS",
    answer: "Lady Gaga",
    choices: ["Ariana Grande","Taylor Swift","Selena Gomez","Lady Gaga","Dua Lipa","Beyoncé"]},
    {name: "Quel est le nom de la série qui tourne autour de la vie d'adolescents dans un club de chant avec pour professeur Will Schuester?",
    type:"radio",
    answer: "Glee",
    choices: ["High School Musical","Pitch Perfect","The Voice","The Masked Singer","The Voice Kids","Glee"]},
]
};

const quizzes = {
    0: {
        name: "Quiz 1",
        questions: [{
            name: "Quel est le nom de la série qui tourne autour de la vie d'adolescents dans un club de chant avec pour professeur Will Schuester?",
            type: "radio",
            answer: "Glee",
            choices: ["High School Musical", "Pitch Perfect", "The Voice", "The Masked Singer", "The Voice Kids", "Glee"]
        }, {
            name: "Quel est le nom de la planète d'origine de Supergirl ?",
            type: "text",
            answer: "Krypton"
        }, {
            name: "Quels sont les mobs qui apparaissent seuleument dans la nuit ou dans les grottes dans minecraft parmis ceux présents dans la liste?",
            type: "checkbox",
            answer: ["Creeper", "Zombie", "Araignée", ],
            choices: ["Creeper", "Zombie", "Lapin", "Araignée", "Cochon"]
        }],
        nbQuestions: 3,
        description: "Quiz sur les séries et les films"
            },
    1: {
        name: "Quiz 2",
        questions: [{
            name: "Quel est le nom de la planète d'origine de Supergirl ?",
            type: "text",
            answer: "Krypton"
        }, {
            name: "Quels sont les mobs qui apparaissent seuleument dans la nuit ou dans les grottes dans minecraft parmis ceux présents dans la liste?",
            type: "checkbox",
            answer: ["Creeper", "Zombie", "Araignée", ],
            choices: ["Creeper", "Zombie", "Lapin", "Araignée", "Cochon"]
        }
        ],
        nbQuestions: 2,
        description: "Quiz sur Minecraft"
    },
    
};



// read only if session storage is available
if(typeof(sessionStorage) != 'undefined') {
    // read only if exists
    if (sessionStorage.getItem("quizzes")) {
        listQuizzes = JSON.parse(sessionStorage.getItem("quizzes"));
    }
}
var score = 0;
var currentQuestion = 0;
var nbQuestions = 0;

function hide(){
    //hide all sections with quest class
    document.getElementById("question").style.display="none";
    document.getElementById("sfin").style.display="none";
    document.getElementById("myProgress").style.display="none";
    document.getElementById("choices").style.display="none";
    //put all the inputs in the form back to their default value
    document.querySelectorAll(".finfos").forEach(function (element) {
        if (element.type == "checkbox") {
            element.checked = false;
        } else {
            element.value = "";
        }
        element.value = "";
    });
    document.getElementById("questioninfos").style.display="block";
}
window.onload=hide();

function sendInfos(){
    //send all the infos the user entered in the form
    //here the variables are in french because the website is for school in France so these stay in french
    let date = document.getElementById("date");
    // Since as explained in the readme, the patterns didn't work, i had to do it manually
    let mess ="";  
    //checks that the date is not empty and that it is a valid date
    if(!date.value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
        mess+="‣ La date doit être sous la forme YYYY-MM-DD\n";
    }
    //first alert for the errors in the form
    if (mess != "") {
        alert(mess);
    }
    else{
        //then if no errors in the form checks that the user is older than 16
        let age = olderThanSixteen();
        if (!age) {
            alert("Vous devez avoir plus de 16 ans pour participer");
            document.getElementById("date").value = "";
        }
        else{
            //if everything is ok, stock the infos in the local storage and load the quiz based on the age of the user
            if(age<30){
                //si l'utilisateur a moins de 50 ans on utilise la liste qmoin50 du fichier json ficquest
                window.qAuto = dataQ.qmoins30; //window.qAuto est une variable globale qui contient le quiz à afficher en fonction de l'age de l'utilisateur
            }
            else{
                //si l'utilisateur a plus de 50 ans on utilise la liste qplus50 du fichier json ficquest
                window.qAuto = dataQ.qplus30;
            }
            showChoices();
            //load("infos","1");
    }}
}

function olderThanSixteen() {
    // on recupere la date entrée et on verifie que l'utilisateur a plus de 16 ans aujourd'hui
    let date = document.getElementById("date").value;
    let birth = new Date(date);
    let today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    let month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    if (age < 16) {
        return false;
    }
    return age;
}

function showChoices(){
    //show the choices for the quizzes 
    document.getElementById("questioninfos").style.display="none";
    let choices = document.getElementById("choices");
    choices.innerHTML = "";
    //make the div for the auto quiz
    let autoQ = window.quiz;
    choices.innerHTML += '<div class="card bg-dark my-3" style="width:40rem;"><div class="card-header text-white"> Auto quiz'+
    '</div><div class="card-body"><h5 class="card-title text-white">Quiz de pop culture pour vous</h5>'+
      '<p class="card-text text-white">Effectuez un quiz de pop culture en fonction de votre age et découvrez votre niveau</p>'+
      '<input id="autoQ" type="button" value="Faire le quiz" onclick="loadQuiz()"></div></div>';
    //get the quizzes from the session storage
    let quizzes = JSON.parse(sessionStorage.getItem("quizzes"));
    console.log(quizzes);
    for (let i = 0; i < Object.keys(quizzes).length ; i++) {
        //get the name of the quiz
        let name = quizzes[i].name;
        //get the description of the quiz
        let desc = quizzes[i].description;
        //put the name and the description in the choices div
        choices.innerHTML += '<div class="card bg-dark my-3" style="width:40rem;"><div class="card-header text-white"> '+name+
        '</div><div class="card-body text-white"><h5 class="card-title text-white">Quiz n°'+(i+1)+'</h5>'+
            '<p class="card-text">'+desc+'</p>'+
            '<input id="'+name+'" type="button" value="Faire le quiz" onclick="loadQuiz()"></div></div>';
    }
    document.getElementById("choices").style.display="flex";
}

function loadQuiz(){
    let id = event.target.id;
    //if the id is autoQ, load the auto quiz
    if (id == "autoQ") {
        window.quiz = window.qAuto;
    }
    else{
        let quizzes = JSON.parse(sessionStorage.getItem("quizzes"));
        for (let i = 0; i < Object.keys(quizzes).length; i++) {
            if (quizzes[i].name == id) {
                window.quiz = quizzes[i].questions;                
            }
        }
    }
    nbQuestions = window.quiz.length;
    load("choices","1");
}

function load(prec,iden) {
    // if it's the end of the quizz hide the precendent question and show the end page while updating the score
    if (prec=="choices"){
        document.getElementById("choices").style.display = "none";
        document.getElementById("question").style.display = "block";
        document.getElementById("myProgress").style.display = "block";
        loadQ("1");
    }
    else if (iden=="end"){
        document.getElementById("question").style.display = "none";
        document.getElementById("sfin").style.display = "block";
        updateScore(iden);
    }
    else{
        //hide the precendent question and show the next one
        //load the next question using the function
        loadQ(iden);
    }
    //stop the navigator from reloading the page
    event.preventDefault();
    return false;
}

function updateScore(iden){
    // update the score
    if (iden =="end") {
        document.getElementById("sfin").innerHTML += "<p id='score'>Vous avez obtenu un score de :"+score+"/"+nbQuestions+"</p>";}
    else{
        document.getElementById("question").innerHTML += "<p id='score'>Votre score est de "+score+"/"+iden+"</p>";}
    
}

function loadQ(idQ){
    let question = window.quiz[idQ-1];
    let name = question.name;
    let choices = question.choices;
    let type = question.type;
    let input = "";
    let i = 0;
    // if it's a date, an url,a text, a number or a slider, no need to make a loop because there's only one input
    if (type == "date" || type == "url" || type == "text") {
            input += "<div id='answer"+idQ+"div'><input type='"+type+"' id='answer"+idQ+"' value=''></div>";
        }
    else if (type =="number"){
        min= question.min;
        max= question.max;
        input += "<div id='answer"+idQ+"div'><input type='number' min="+min+" max="+max+" id='answer"+idQ+"' value=''></div>";
    }
    else if (type == "slider") {
        min= question.min;
        max= question.max;
        step=question.step;
        input += "<div id='answer"+idQ+"div'><input type='range' id='answer"+idQ+"' value='' min="+min+" max="+max+" step="+step+" oninput='sliderChange(this.value)'><output id='sliderVal'> </output></div>";
    }
    else{
        //otherwise we make a loop to create the inputs
        for (let i = 0; i < choices.length; i++) {
            if (type == "radio"||type=="checkbox") {
                input += "<div id='"+choices[i]+"div'><input type='"+type+"' id='"+choices[i]+"' name='answer' value='"+choices[i]+"'>"+choices[i]+"</input></div><br>";
            }
            // for both of the select type we create the select the first time and then we add the options
            else if (type == "select") {
                //this one is a simple select
                if (i == 0) {
                    input += "<div id='answer"+idQ+"div'><select class='select' id='answer"+idQ+"' name='answer'>";
                    input+= "<option value=''>--Choisissez une réponse--</option>";
                }
                input += "<option class='select' id='"+choices[i]+"' value='"+choices[i]+"'>"+choices[i]+"</option>";
                if (i == choices.length-1) {
                    input += "</select></div>";
                }
            }
            else if (type == "selectS") {
                // this one is a scrollable select
                if (i == 0) {
                    input += "<div id='answer"+idQ+"div'><select class='select' size=3 id='answer"+idQ+"' name='answer'>";
                }
                input += "<option class='select' id='"+choices[i]+"' value='"+choices[i]+"'>"+choices[i]+"</option>";
                if (i == choices.length-1) {
                    input += "</select></div>";
                }
            }
            
        }
}
    document.getElementById("question").innerHTML = "<h2 id='numq'>Question "+idQ+"/"+nbQuestions+"</h2>"
    +"<h2>"+name+"</h2><form class='question' method='post'>"+
        input+"<button id='verif"+idQ+"' onclick='verifQuestion("+idQ+")'>Verifier</button></form>";
    
}
function sliderChange(val) {
    document.getElementById('sliderVal').innerHTML = val;
    }

function verifQuestion(idQ){
    // from the question idQ we get the question and the answer in the list and then proceed to check if the answer entered is the right one
    // again the texts are in french for the same reason as before
    let rightAnswer = window.quiz[parseInt(idQ)-1].answer;
    let type = window.quiz[parseInt(idQ)-1].type;
    let valid=true;
    if (type == "radio") {
        if (document.querySelector('input[name="answer"]:checked')== null) {
            valid=false;
        }
        else{
        let answer = document.querySelector('input[name="answer"]:checked').value;
        if (answer == rightAnswer) {
            score++;
            document.getElementById("question").innerHTML+="</br><p>✅Bonne réponse</p>";
            document.getElementById(answer+"div").style.backgroundColor = "green";
        }
        else{
            document.getElementById(answer+"div").style.backgroundColor = "red";
            document.getElementById(rightAnswer+"div").style.backgroundColor = "green";
            document.getElementById("question").innerHTML+="</br><p>❌Mauvaise réponse</p>";
        }}
    }
    else if (type == "checkbox") {
        //for the checkbox, since there are multiple answers we need to loop and check if the exact answers are checked
        let answer = document.querySelectorAll('input[name="answer"]:checked');
        let answersList = [];
        for (let i = 0; i < answer.length; i++) {
            answersList.push(answer[i].value);
            document.getElementById(answer[i].value+"div").style.backgroundColor = "red";
        }
        if (answersList.length == 0 ){valid=false;}
        else{
        let goodAns = true;
        //verifie que toutes les bonnes réponses sont cochées et que aucune case qui est cochée est dans les mauvaises réponses
        for (let i = 0; i < rightAnswer.length; i++) {
            document.getElementById(rightAnswer[i]+"div").style.backgroundColor = "green";
            if (!answersList.includes(rightAnswer[i])) {
                goodAns = false;
            }
        }
        for (let i = 0; i < answersList.length; i++) {
            if (!rightAnswer.includes(answersList[i])) {
                goodAns = false;
            }
        }
        if (goodAns) {
            score++;
            document.getElementById("question").innerHTML+="</br><p>✅Bonne réponse</p>";
        }
        else{
            document.getElementById("question").innerHTML+="</br><p>❌Mauvaise réponse</p>";
        }}
    }
    // for all the other type the verification is the same
    else if (type == "text" || type == "date" || type == "slider" || type == "select" || type == "selectS" || type == "number") {
        let answer = document.getElementById("answer"+idQ).value;
        // if the answer is empty we don't check it
        if (answer == "" ||answer=="--Choisissez une réponse--") {valid=false;}
        //if the url is not valid we don't check it
        
        else if (answer == rightAnswer) {
            score++;
            document.getElementById("question").innerHTML+="</br><p>✅Bonne réponse</p>";
            document.getElementById("answer"+idQ+"div").style.backgroundColor = "green";
        }
        else{
            document.getElementById("question").innerHTML+="</br><p>❌Mauvaise réponse la bonne réponse était "+rightAnswer+"</p>";
            document.getElementById("answer"+idQ+"div").style.backgroundColor = "red";
        }
    }
    if(!valid){
        alert("Vous n'avez pas répondu à la question");
        event.preventDefault();
    }
    else{
    // we change the verif button to a next button
    let verif = document.getElementById("verif"+idQ);
    verif.innerHTML = "Suivant";
    //we change the event onclick to the function load 
    verif.setAttribute("onclick", "load('"+idQ+"','"+(parseInt(idQ)+1).toString()+"')");
    if (idQ == nbQuestions) {
        //if it's the end change it to an end button 
        verif.innerHTML = "Fin";
        verif.setAttribute("onclick", "load('0','end')");
    }
    progBar=document.getElementById("myProgress");
    //get float with one decimal of (idQ/nbQuestions)*100
    let percent = Math.round((idQ/nbQuestions)*1000)/10;
    //change the width of the progress bar
    progBar.style.width = percent+"%";
    //change the text of the progress bar
    progBar.innerHTML = percent+"%";
    //we always update the score here 
    updateScore(idQ);}
    
}



//quiz creation part
function loadForm(idQ){
    //get the value of the select that calls this function
    let type = document.getElementById("selecttype"+idQ).value;
    //get the div that contains the form
    let section = document.getElementById("question"+idQ);
    //add html to the section depending on the type
    let html = '<select id="selecttype'+idQ+'" class="form-select my-3" onchange="loadForm('+idQ+')">';
    if (type == "reset") {
        html+='<option value="reset" selected>Choisissez un quiz</option>';
    }
    else{
        html+='<option value="reset">Choisissez un quiz</option>';
    }
    if (type == "radio") {
        html+='<option value="radio" selected>Radio button</option>';
    }
    else{
        html+='<option value="radio">Radio button</option>';
    }
    if (type == "checkbox") {
        html+='<option value="checkbox" selected>Checkbox</option>';
    }
    else{
        html+='<option value="checkbox">Checkbox</option>';
    }
    if (type == "text") {
        html+='<option value="text" selected>Text</option>';
    }
    else{
        html+='<option value="text">Text</option>';
    }
    if (type == "number") {
        html+='<option value="number" selected>Number</option>';
    }
    else{
        html+='<option value="number">Number</option>';
    }
    if (type == "date") {
        html+='<option value="date" selected>Date</option>';
    }
    else{
        html+='<option value="date">Date</option>';
    }
    if (type == "slider") {
        html+='<option value="slider" selected>Slider</option>';
    }
    else{
        html+='<option value="slider">Slider</option>';
    }
    if (type == "select") {
        html+='<option value="select" selected>Select</option>';
    }
    else{
        html+='<option value="select">Select</option>';
    }
    html+='</select>';
    if (type == "reset") {
        section.innerHTML = html;
    }
    else if (type == "radio" || type == "select") {
        qhtml = '<h5>'+type+'</h5><input type="text" id="question'+idQ+'" class="form-control" placeholder="Question" aria-label="Question">'+
        '<input type="text" id="answer'+idQ+'1" class="form-control" placeholder="Réponse" aria-label="Réponse">'+
        '<input type="text" id="answer'+idQ+'2" class="form-control" placeholder="Mauvaise réponse" aria-label="Mauvaise réponse">'+
        '<input type="text" id="answer'+idQ+'3" class="form-control" placeholder="Mauvaise réponse" aria-label="Mauvaise réponse">'+
        '<input type="text" id="answer'+idQ+'4" class="form-control" placeholder="Mauvaise réponse" aria-label="Mauvaise réponse">';
        section.innerHTML = html+qhtml;
        }
    else if (type == "checkbox") {
        qhtml = '<h5>'+type+'</h5><input type="text" id="question'+idQ+'" class="form-control" placeholder="Question" aria-label="Question">'+
        '<input type="text" id="answer'+idQ+'1" class="form-control" placeholder="Réponse(s) séparées par |" aria-label="Réponse">'+
        '<input type="text" id="answer'+idQ+'2" class="form-control" placeholder="Mauvaise réponse" aria-label="Mauvaise réponse">'+
        '<input type="text" id="answer'+idQ+'3" class="form-control" placeholder="Mauvaise réponse" aria-label="Mauvaise réponse">'+
        '<input type="text" id="answer'+idQ+'4" class="form-control" placeholder="Mauvaise réponse" aria-label="Mauvaise réponse">';
        section.innerHTML = html+qhtml;
    }
    else if (type == "date") {
        qhtml = '<h5>'+type+'</h5><input type="text" id="question'+idQ+'" class="form-control" placeholder="Question" aria-label="Question">'+
        '<input type="date" id="answer'+idQ+'" class="form-control" placeholder="Réponse(aaaa-mm-dd)" aria-label="Réponse">';
        section.innerHTML = html+qhtml;
    }
    else if (type == "slider") {
        qhtml = '<h5>'+type+'</h5><input type="text" id="question'+idQ+'" class="form-control" placeholder="Question" aria-label="Question">'+
        '<input type="number" id="answer'+idQ+'1" class="form-control" placeholder="Réponse" aria-label="Réponse">'+
        '<input type="number" id="answer'+idQ+'2" class="form-control" placeholder="Réponse max" aria-label="Réponse max">'+
        '<input type="number" id="answer'+idQ+'3" class="form-control" placeholder="Réponse min" aria-label="Réponse min">'+
        '<input type="number" id="answer'+idQ+'4" class="form-control" placeholder="Réponse step" aria-label="Réponse step">';
        section.innerHTML = html+qhtml;
    }
    else if (type == "text") {
        qhtml = '<h5>'+type+'</h5><input type="text" id="question'+idQ+'" class="form-control" placeholder="Question" aria-label="Question">'+
        '<input type="text" id="answer'+idQ+'" class="form-control" placeholder="Réponse" aria-label="Réponse">';
        section.innerHTML = html+qhtml;
    }
    else if (type == "number") {
        qhtml = '<h5>'+type+'</h5><input type="text" id="question'+idQ+'" class="form-control" placeholder="Question" aria-label="Question">'+
        '<input type="number" id="answer'+idQ+'1" class="form-control" placeholder="Réponse" aria-label="Réponse">'+
        '<input type="number" id="answer'+idQ+'2" class="form-control" placeholder="Réponse max" aria-label="Réponse max">'+
        '<input type="number" id="answer'+idQ+'3" class="form-control" placeholder="Réponse min" aria-label="Réponse min">';
        section.innerHTML = html+qhtml;
    }

}

//add a new question to the form
function addQuestion(){
    //get the main div
    let main = document.getElementById("main");
    //get the number of sections that have the class quest
    let nbQ = document.getElementsByClassName("quest").length;
    //add a new section with the id question+nbQ
    main.innerHTML+='<section class="quest" id="question'+(nbQ+1)+'">'+
    '<select id="selecttype'+(nbQ+1)+'" class="form-select my-3" onchange="loadForm('+(nbQ+1)+')">'+
            '<option>Choisissez un quiz</option>'+
            '<option value="radio">Radio button</option>'+
            '<option value="checkbox">Checkbox</option>'+
            '<option value="text">Text</option>'+
            '<option value="number">Number</option>'+
            '<option value="date">Date</option>'+
            '<option value="select">Select</option>'+
            '<option value="slider">Slider</option>'+
            '</select>'+
            '</section>';
}

function saveQuiz(){
    //get all quests sections
    let quests = document.getElementsByClassName("quest");
    //get the number of quests
    let nbQ = quests.length;
    //create an array to store the questions
    let questions = [];
    //get name of the quiz
    let name = document.getElementById("name").value;
    //get the description of the quiz
    let desc = document.getElementById("desc").value;
    //for each quest
    for (let i = 0; i < nbQ; i++) {
        //get the id of the quest
        let id = quests[i].id;
        //get the last character of the id
        id = id.charAt(id.length-1);
        //get the type of the quest
        let type = document.getElementById("selecttype"+(id)).value;
        //get the question
        let question = document.getElementById("question"+(id)).value;
        console.log(question);
        
        //{
           // name: "Quel est le nom de la série qui tourne autour de la vie d'adolescents dans un club de chant avec pour professeur Will Schuester?",
            //type: "radio",
            //answer: "Glee",
            //choices: ["High School Musical", "Pitch Perfect", "The Voice", "The Masked Singer", "The Voice Kids", "Glee"]
        //}
        //if the type is radio or checkbox or select
        if (type == "radio" || type == "select") {
            //create an array to store the choices
            let choices = [];
            for (let j = 1; j < 5; j++) {
                //get the choice
                let choice = document.getElementById("answer"+(id)+j).value;
                //add the choice to the array
                choices.push(choice);
            }
            //get the answer
            let answer = document.getElementById("answer"+(id)+"1").value;
            //create a new question
            let quest = {
                name: question,
                type: type,
                answer: answer,
                choices: choices
            }
            //add the question to the array
            questions.push(quest);
        }
        else if (type == "checkbox") {
            //create an array to store the choices
            let choices = [];
            for (let j = 1; j < 5; j++) {
                //get the choice
                console.log("answer"+(id)+j);
                let choice = document.getElementById("answer"+(id)+j).value;
                //add the choice to the array
                choices.push(choice);
            }
            //get the answer
            let answers = document.getElementById("answer"+(id)+"1").value;
            //get the different answers separated by a |
            let answer = answers.split("|");
            //create a new question
            let quest = {
                name: question,
                type: type,
                answer: answer,
                choices: choices
            }
            //add the question to the array
            questions.push(quest);
        }


        //if the type is date
        else if (type == "date" || type == "text") {
            //get the answer
            let answer = document.getElementById("answer"+(id)).value;
            //create a new question
            let quest = {
                name: question,
                type: type,
                answer: answer
            }
            //add the question to the array
            questions.push(quest);
        }
        //if the type is slider
        else if (type == "slider") {
            //get the answer
            let answer = document.getElementById("answer"+(id)+"1").value;
            //get the max
            let max = document.getElementById("answer"+(id)+"2").value;
            //get the min
            let min = document.getElementById("answer"+(id)+"3").value;
            //get the step
            let step = document.getElementById("answer"+(id)+"4").value;
            //create a new question
            let quest = {
                name: question,
                type: type,
                answer: answer,
                max: max,
                min: min,
                step: step
            }
            //add the question to the array
            questions.push(quest);
        }
        //if the type is number
        else if (type == "number") {
            //get the answer
            let answer = document.getElementById("answer"+(id)+"1").value;
            //get the max
            let max = document.getElementById("answer"+(id)+"2").value;
            //get the min
            let min = document.getElementById("answer"+(id)+"3").value;
            //create a new question
            let quest = {
                name: question,
                type: type,
                answer: answer,
                max: max,
                min: min
            }
            //add the question to the array
            questions.push(quest);
        }
    }

    //create a new quiz
    let quiz = {
        name: name,
        description: desc,
        questions: questions,
        nbQuestions: nbQ
    }
    //add to the quizzes object
    let nbqzs = Object.keys(quizzes).length;
    quizzes[(nbqzs)] = quiz;
    //save the quizzes object in the session storage
    sessionStorage.setItem("quizzes", JSON.stringify(quizzes));
        
}
