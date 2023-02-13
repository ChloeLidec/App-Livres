//the lists of questions are stocked here in a json format because i couln't find a way to import a json file in javascript           
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
    {name: "Quel est le lien de la vidéo youtube parodique de I knew you were trouble de Taylor Swift ?(prenez le lien entier présent dans la barre d'adresse)",
    type:"url",
    answer: "https://www.youtube.com/watch?v=-aLYvZ5sX28"},
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
    {name: "Quel est le lien vers l'article de Wikipédia sur la série Friends ?(prenez le lien entier présent dans la barre d'adresse)",
    type:"url",
    answer: "https://fr.wikipedia.org/wiki/Friends"},
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

var score = 0;

function hide(){
    //hide all the questions and the end page and show the form
    for (let i = 1; i < 11; i++) {
        document.getElementById("question"+i).style.display="none";
    };
    document.getElementById("sfin").style.display="none";
    document.getElementById("myProgress").style.display="none";
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
    let genre = document.getElementsByName("genre");
    let nom = document.getElementById("nom");
    let prenom = document.getElementById("prenom");
    let mail = document.getElementById("mail");
    let date = document.getElementById("date");
    let url = document.getElementById("url");
    let tel = document.getElementById("tel");
    // Since as explained in the readme, the patterns didn't work, i had to do it manually
    let verif = false;
    let mess ="";
    //checks that at least one pronoun is selected
    for (let i = 0; i < genre.length; i++) {
        if(genre[i].checked){
            verif = true;
        }
    }
    if(!verif){
        mess+="‣ Veuillez cocher au moins un pronom \n";
    }
    //checks that the name is not empty and that it starts with a capital letter
    if(!nom.value.match(/^[a-zA-Z-]+$/) || nom.value[0] != nom.value[0].toUpperCase() || nom.value.length < 2 || nom.value.length > 20){
        mess+="‣ Le nom doit commencer par une majuscule et ne peut contenir que des lettres sans accents\n";
    }
    //checks that the first name is not empty and that it starts with a capital letter
    if(!prenom.value.match(/^[a-zA-Z-]+$/) || prenom.value[0] != prenom.value[0].toUpperCase() || prenom.value.length < 2 || prenom.value.length > 20){
        mess+="‣ Le prenom doit commencer par une majuscule et ne peut contenir que des lettres sans accents\n";
    }
    //checks that the mail is not empty and that it is a valid mail
    if(!mail.value.match(/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)){
        mess+="‣ Le mail doit être sous la forme texte@email.ext \n"}
    //checks that the date is not empty and that it is a valid date
    if(!date.value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
        mess+="‣ La date doit être sous la forme YYYY-MM-DD\n";
    }
    //checks that if the url is not empty it is a valid url
    if(!(url.value=='') && !url.value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)){
        mess+="‣ L'url doit être sous la forme www.url.ext ou url.ext ou https://url.ext ou http://url.ext\n";
    }
    //checks that if the phone number is not empty it is a valid phone number
    if(!tel.value.match(/^[0-9]{10,12}$/)){
        mess+="‣ Le numéro de téléphone doit être composé de 10 à 12 chiffres\n";
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
            const user = {nom: nom.value, prenom: prenom.value, mail: mail.value, date: date.value, url: url.value, tel: tel.value,age:age};
            console.log(user);// ici le console.log est simplement pour montrer que les données sont conservées, on pourrait donc les utiliser ultérieurement
            if(age<30){
                //si l'utilisateur a moins de 50 ans on utilise la liste qmoin50 du fichier json ficquest
                window.listQ = dataQ.qmoins30; //window.listQ est une variable globale qui contient la liste des questions
            }
            else{
                //si l'utilisateur a plus de 50 ans on utilise la liste qplus50 du fichier json ficquest
                window.listQ = dataQ.qplus30;
            }
            load("infos","1");
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

function load(prec,iden) {
    // if it's the end of the quizz hide the precendent question and show the end page while updating the score
    if (iden=="end"){
        document.getElementById("question"+prec).style.display = "none";
        document.getElementById("sfin").style.display = "block";
        updateScore(iden);
    }
    else{
        //hide the precendent question and show the next one
        document.getElementById("question"+prec).style.display = "none";
        document.getElementById("question"+iden).style.display = "block";
        document.getElementById("myProgress").style.display = "block";
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
        document.getElementById("sfin").innerHTML += "<p id='score'>Vous avez obtenu un score de :"+score+"/10</p>";}
    else{
        document.getElementById("question"+iden).innerHTML += "<p id='score'>Votre score est de "+score+"/"+iden+"</p>";}
    
}

function loadQ(idQ){
    let question = window.listQ[idQ-1];
    let name = question.name;
    let choices = question.choices;
    let type = question.type;
    let input = "";
    let i = 0;
    // if it's a date, an url,a text, a number or a slider, no need to make a loop because there's only one input
    if (type == "date" || type == "url" || type == "text") {
            input += "<input type='"+type+"' id='answer"+idQ+"' value=''><br>";
        }
    else if (type =="number"){
        min= question.min;
        max= question.max;
        input += "<input type='number' min="+min+" max="+max+" id='answer"+idQ+"' value=''><br>";
    }
    else if (type == "slider") {
        min= question.min;
        max= question.max;
        step=question.step;
        input += "<input type='range' id='answer"+idQ+"' value='' min="+min+" max="+max+" step="+step+" oninput='sliderChange(this.value)'><output id='sliderVal'> </output><br>";
    }
    else{
        //otherwise we make a loop to create the inputs
        for (let i = 0; i < choices.length; i++) {
            if (type == "radio"||type=="checkbox") {
                input += "<input type='"+type+"' id='"+choices[i]+"' name='answer' value='"+choices[i]+"'>"+choices[i]+"<br>";
            }
            // for both of the select type we create the select the first time and then we add the options
            else if (type == "select") {
                //this one is a simple select
                if (i == 0) {
                    input += "<select class='select' id='answer"+idQ+"' name='answer'>";
                    input+= "<option value=''>--Choisissez une réponse--</option>";
                }
                input += "<option class='select' id='"+choices[i]+"' value='"+choices[i]+"'>"+choices[i]+"</option>";
                if (i == choices.length-1) {
                    input += "</select>";
                }
            }
            else if (type == "selectS") {
                // this one is a scrollable select
                if (i == 0) {
                    input += "<select class='select' size=3 id='answer"+idQ+"' name='answer'>";
                }
                input += "<option class='select' id='"+choices[i]+"' value='"+choices[i]+"'>"+choices[i]+"</option>";
                if (i == choices.length-1) {
                    input += "</select>";
                }
            }
            
        }
}
    document.getElementById("question"+idQ).innerHTML = 
    document.getElementById("question"+idQ).innerHTML+"<h2>"+name+"</h2><form class='question' method='post'>"+
        input+"<button id='verif"+idQ+"' onclick='verifQuestion("+idQ+")'>Verifier</button></form>";
    
}
function sliderChange(val) {
    document.getElementById('sliderVal').innerHTML = val;
    }

function verifQuestion(idQ){
    // from the question idQ we get the question and the answer in the list and then proceed to check if the answer entered is the right one
    // again the texts are in french for the same reason as before
    let rightAnswer = window.listQ[parseInt(idQ)-1].answer;
    let type = window.listQ[parseInt(idQ)-1].type;
    let valid=true;
    if (type == "radio") {
        if (document.querySelector('input[name="answer"]:checked')== null) {
            valid=false;
        }
        else{
        let answer = document.querySelector('input[name="answer"]:checked').value;
        if (answer == rightAnswer) {
            score++;
            document.getElementById("question"+idQ).innerHTML+="</br><p>✅Bonne réponse</p>";
        }
        else{
            document.getElementById("question"+idQ).innerHTML+="</br><p>❌Mauvaise réponse la bonne réponse était: "+rightAnswer+"</p>";
        }}
    }
    else if (type == "checkbox") {
        //for the checkbox, since there are multiple answers we need to loop and check if the exact answers are checked
        let answer = document.querySelectorAll('input[name="answer"]:checked');
        let answersList = [];
        for (let i = 0; i < answer.length; i++) {
            answersList.push(answer[i].value);
        }
        if (answersList.length == 0 ){valid=false;}
        else{
        let goodAns = true;
        //verifie que toutes les bonnes réponses sont cochées et que aucune case qui est cochée est dans les mauvaises réponses
        for (let i = 0; i < rightAnswer.length; i++) {
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
            document.getElementById("question"+idQ).innerHTML+="</br><p>✅Bonne réponse</p>";
        }
        else{
            document.getElementById("question"+idQ).innerHTML+="</br><p>❌Mauvaise réponse la bonne réponse était "+rightAnswer+"</p>";
        }}
    }
    // for all the other type the verification is the same
    else if (type == "text" || type == "url" || type == "date" || type == "slider" || type == "select" || type == "selectS" || type == "number") {
        let answer = document.getElementById("answer"+idQ).value;
        console.log(answer);
        // if the answer is empty we don't check it
        if (answer == "" ||answer=="--Choisissez une réponse--") {valid=false;}
        //if the url is not valid we don't check it
        
        else if (type=="url" && !answer.match(/^(https:\/\/www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)){
            valid=false;
            let url =true;
        }
        else if (answer == rightAnswer) {
            score++;
            document.getElementById("question"+idQ).innerHTML+="</br><p>✅Bonne réponse</p>";
        }
        else{
            document.getElementById("question"+idQ).innerHTML+="</br><p>❌Mauvaise réponse </br> La bonne réponse était: "+rightAnswer+"</p>";
        }
    }
    if (!valid && url) {
        alert("Veuillez verfiier la forme de l'informatin entrée");
        event.preventDefault();
    }
    else if(!valid){
        alert("Vous n'avez pas répondu à la question");
        event.preventDefault();
    }
    else{
    // we change the verif button to a next button
    let verif = document.getElementById("verif"+idQ);
    verif.innerHTML = "Suivant";
    //we change the event onclick to the function load 
    verif.setAttribute("onclick", "load('"+idQ+"','"+(parseInt(idQ)+1).toString()+"')");
    if (idQ == "10") {
        //if it's the end change it to an end button 
        verif.innerHTML = "Fin";
        verif.setAttribute("onclick", "load('10','end')");
    }
    progBar=document.getElementById("myProgress");
    progBar.style.width = (idQ/window.listQ.length)*100 + "%";
    progBar.innerHTML = (idQ/window.listQ.length)*100 + "%";
    //we always update the score here 
    updateScore(idQ);}
    
}


