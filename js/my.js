
 var newsButton = document.getElementById('sendArticle')
 var articleField = document.getElementById('article')
 var title = document.getElementById('title')

 newsButton.addEventListener('click', function() {
     var articleFieldValue = articleField.value;
     var titleFieldValue = title.value;

     if(articleFieldValue.length == 0 || titleFieldValue.length == 0){
       window.alert('Будьласка заповніть усі поля');
     }
     else{
       window.alert('Новину опубліковано');
       articleField.value = ''
       title.value = ''
     }
  });



/* var adminpanels = document.createElement('div');
        adminpanels.classList.add('feedback');

        var article = document.createElement('h2');
        article.innerHTML = articleFieldValue

        var titles = document.createElement('p');
        titles.innerText =  titleFieldValue

        adminpanels.appendChild(article);
        adminpanels.appendChild(titles);
        document.getElementById('newsWrap').appendChild(adminpanels);
        articleField.value = ''
        title.value = ''
        */