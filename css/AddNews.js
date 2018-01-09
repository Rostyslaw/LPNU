function addNews(){
    // Check entrance
    var flag = false;

    var Ntitle = document.getElementById("Ntitle");
    var TitleText = document.getElementById("TitleText");
    if(TitleText.value == ""){
        Ntitle.removeAttribute("class");
        Ntitle.setAttribute("class", 'form-group has-error has-feedback');
        flag = true;
    }
    else{
        Ntitle.removeAttribute("class");
        Ntitle.setAttribute("class", 'form-group has-success has-feedback');
    }
    var Nshort = document.getElementById("Nshort");
    var ShortText = document.getElementById("ShortText");
    if(ShortText.value == ""){
        Nshort.removeAttribute("class");
        Nshort.setAttribute("class", 'form-group has-error has-feedback');
        flag = true;
    }else{
        Nshort.removeAttribute("class");
        Nshort.setAttribute("class", 'form-group has-success has-feedback');
    }
    var Nfull = document.getElementById("Nfull");
    var FullText = document.getElementById("FullText");
    if(FullText.value == ""){
        Nfull.removeAttribute("class");
        Nfull.setAttribute("class", 'form-group has-error has-feedback');
        flag = true;
    }else{
        Nfull.removeAttribute("class");
        Nfull.setAttribute("class", 'form-group has-success has-feedback');
    }

    if(!flag)
    {
        saveNews();
        alert("Новина буде опублікована найближчим часом");
        TitleText.value = "";
        Ntitle.removeAttribute("class");
        Ntitle.setAttribute("class", 'form-group');
        ShortText.value = "";
        Nshort.removeAttribute("class");
        Nshort.setAttribute("class", 'form-group');
        FullText.value = "";
        Nfull.removeAttribute("class");
        Nfull.setAttribute("class", 'form-group');
    }
}