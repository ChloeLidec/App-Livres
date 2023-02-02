function rate(){
    var rating = document.getElementsByName('rating');
    console.log(rating);
    var val = 0;
    var book_id= document.getElementById('idbook').textContent;
    for(var i = 0; i < rating.length; i++){
        if(rating[i].checked){
            val = rating[i].value;
        }
    };
    var html = document.getElementById('ratediv').innerHTML;
    var htmlArray = html.split('<');
    var newArray = [];
    for (var i = 0; i < htmlArray.length; i++) {
        if (htmlArray[i].startsWith('form')) {
            newArray[i] = "form id=\"rate\" method=\"POST\" action=\"/rate/book/"+book_id+"/"+val+"\">";
        }
        else if(!htmlArray[i].startsWith('\n')){
            newArray[i] = htmlArray[i];
        }
    };
    var newHtml = newArray.join('<');
    document.getElementById('ratediv').innerHTML = newHtml;
    var ratingHTML = document.getElementById('rating').innerHTML;
    var ratingHTMLArray = ratingHTML.split('<');
    var newRatingArray = [];
    var cpt = 5;
    for(var i = 0; i < ratingHTMLArray.length; i++){
        if(ratingHTMLArray[i].startsWith('input')){
            if (cpt == val){
                newRatingArray[i] = "input type=\"radio\" name=\"rating\" value=\""+cpt+"\" id=\""+cpt+"\" onclick=\"rate()\" checked=\"\">";
            }
            else{
                newRatingArray[i] = "input type=\"radio\" name=\"rating\" value=\""+cpt+"\" id=\""+cpt+"\" onclick=\"rate()\">";
            }
            cpt--;
        }
        else if(ratingHTMLArray[i].startsWith('label')){
                newRatingArray[i] = "label for=\""+cpt+"\">☆";
        }
        else {
            newRatingArray[i] = ratingHTMLArray[i];
            if (newRatingArray[i] == undefined){
                newRatingArray[i] = "\n";
            }
        }
    };
    var newRatingHTML = newRatingArray.join('<');
    document.getElementById('rating').innerHTML = newRatingHTML;
}