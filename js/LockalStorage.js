function isOnline(){
    return window.navigator.onLine;
}
function loadReview(){
    window.addEventListener('online',  SomeOnlFunc(false));
    window.addEventListener('offline',  SomeOflFunc(false));
}

function saveReview(){
    if(!isOnline()){
        window.addEventListener('offline',  SomeOflFunc(false));
        window.addEventListener('online',  SomeOnlFunc(false));
    }
    else{
        addResponse();
        document.getElementById("reviewer").value = "";
        document.getElementById("response").value = "";
    }
}

function loadNews(){
    window.addEventListener('online',  SomeOnlFunc(true));
    //window.addEventListener('ofline',  SomeOflFunc(true));
}
function saveNews(){
    if(!isOnline()){
        window.addEventListener('online',  SomeOnlFunc(true));
        window.addEventListener('ofline',  SomeOflFunc(true));
    }
    else{
        //addNews();
    }
    
}

function addNewsOnPage(rTitle, rShortText, rFullText, rImgPath){
    
    // Create new elements with attributes
    var NewsRow = document.createElement("div");
    NewsRow.setAttribute("class", 'row');
    // column
    var Col1 = document.createElement("div");
    Col1.setAttribute("class", "col-lg-4 col-md-4");
    //Col1.innerHTML = '<img class="img-circle" src="css/images/News1.jpg" alt="Generic placeholder image" width="140" height="140">';
    // Img
    var Img = document.createElement("img");
    Img.setAttribute("class", "img-circle");
    var path = rImgPath.split("\\")[2];
    Img.setAttribute("src", "css/images/" + path);
    Img.setAttribute("width", "140");
    Img.setAttribute("height", "140");
    // title
    var Title = document.createElement("h2");
    var ShortText = document.createElement("p");
    // Button "More"
    var But = document.createElement("p");
    But.innerHTML = '<a class="btn btn-default" href=# role="button">Більше »</a>';

    Title.innerHTML = rTitle;
    ShortText.innerHTML = rShortText;

    Col1.appendChild(Img);
    Col1.appendChild(Title);
    Col1.appendChild(ShortText);
    Col1.appendChild(But);
    NewsRow.appendChild(Col1);
    
    document.getElementById("News").insertBefore(NewsRow, document.getElementById("divider"));
    document.getElementById("News").insertBefore(document.createElement("hr"), NewsRow);   
}

function SomeOnlFunc(flag){
    if(isOnline()){
        if(flag == true)
        {
            for (i = 0; i < localStorage.length; i++) { 
                if(localStorage.getItem(localStorage.key(i)).includes("$STORED_NEWS$$$$")) {
                    var Title = (localStorage.getItem(localStorage.key(i)).split("$TitleText$$$$"))[0];
                    var ShortText = (localStorage.getItem(localStorage.key(i)).split("$TitleText$$$$"))[1].split("$ShortText$$$$")[0];
                    var FullText = (localStorage.getItem(localStorage.key(i)).split("$TitleText$$$$"))[1].split("$ShortText$$$$")[1].split("$FullText$$$$")[0];
                    var ImgPath = (localStorage.getItem(localStorage.key(i)).split("$TitleText$$$$"))[1].split("$ShortText$$$$")[1].split("$FullText$$$$")[1].split("$ImgPath$$$$$STORED_NEWS$$$$")[0];
                    addNewsOnPage(Title, ShortText, FullText, ImgPath);
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
        else{
            var reviewer = document.getElementById("reviewer");
            var response = document.getElementById("response");
        
            for (i = 0; i < localStorage.length; i++) { 
                if(localStorage.getItem(localStorage.key(i)).includes("$STORED_RESPONSE$$$$")) {
                    reviewer.value = (localStorage.getItem(localStorage.key(i)).split("$NAME$$$$"))[0];
                    response.value = (localStorage.getItem(localStorage.key(i)).split("$NAME$$$$"))[1].split("$RESPONSE$$$$$STORED_RESPONSE$$$$");
                    var date = new Date(localStorage.getItem(localStorage.key(i)));
                    var dateString = "";
                    dateString = date.getDate() + "." + date.getMonth() + "." + (date.getYear() + 1900)
                        + ", " + date.getHours() + ":" + date.getMinutes();
                    addResponse();
                    localStorage.removeItem(localStorage.key(i));
                }
            }
            reviewer.value = "";
            response.value = "";
        }
    }
}



function SomeOflFunc(flag){
    if(!isOnline()){
        if(flag==true){    
            var TitleText = document.getElementById("TitleText");
            var ShortText = document.getElementById("ShortText");
            var FullText = document.getElementById("FullText");
            var InputImg = document.getElementById("inputImg").value;
            //
            var storedString = "";
            storedString = storedString.concat(TitleText.value);
            storedString = storedString.concat("$TitleText$$$$");
            storedString = storedString.concat(ShortText.value);
            storedString = storedString.concat("$ShortText$$$$");
            storedString = storedString.concat(FullText.value);
            storedString = storedString.concat("$FullText$$$$");
            storedString = storedString.concat(InputImg);
            storedString = storedString.concat("$ImgPath$$$$");
            storedString = storedString.concat("$STORED_NEWS$$$$");

            var date = new Date();
            localStorage.setItem(date.toString(), storedString);
            //}
            TitleText.value = "";
            ShortText.value = "";
            FullText.value = "";
            InputImg.value = "";
        }
        else{
            var reviewer = document.getElementById("reviewer");
            var response = document.getElementById("response");
            if(response.value == "" || response.reviewer == ""){
                return
            }
            //
            var storedString = "";
            storedString = storedString.concat(reviewer.value);
            storedString = storedString.concat("$NAME$$$$");
            storedString = storedString.concat(response.value);
            storedString = storedString.concat("$RESPONSE$$$$");
            storedString = storedString.concat("$STORED_RESPONSE$$$$");

            var date = new Date();
            localStorage.setItem(date.toJSON(), storedString);
            //
            reviewer.value = "";
            response.value = "";
        }
    }
}