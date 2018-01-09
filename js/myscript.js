//просто скриптик - просто
window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineComments();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addComments() {
    if ($('#name').val() === "" || $('#text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }
    if (isOnline()) {
        var date = new Date;
        var author = document.getElementById('name').value;
        var text = document.getElementById('text').value;
        var parentElem = document.getElementById('reviews-list');
        var out = document.createElement('div');
        out.innerHTML =
            "<div class='container card'><br>" +
            "   <h2>" + author + "</h2>" +
            "   <span>" + date + "</span>" +
            "   <p> <br>" + text + "</p></div>";
        parentElem.appendChild(out);
        document.getElementById('form').reset();
    } else {
            var date = new Date;
            var author = document.getElementById('name').value;
            var text = document.getElementById('text').value;
            i++;
            var list = [];
            list.push({"name": author, "text": text, "date": date});
            localStorage.setItem('r' + i, JSON.stringify(list));
        document.getElementById('form').reset();
    }
}

function readOfflineComments() {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            review = JSON.parse(localStorage.getItem('r' + k));
            var parentElem = document.getElementById('reviews-list');
            var out = document.createElement('div');
            out.id = 'review';
            out.innerHTML =
                "<div class='container card'><br>" +
                "   <span class='review-author'>" + review[0].name + "</span>" +
                "   <span class='review-date'>" + review[0].date + "</span>" +
                "   <p><br>" + review[0].text + "</p><br></div>";
            parentElem.appendChild(out);
            localStorage.removeItem(k);
        }
}




/*var button = document.getElementById('feedbackButton')
var feedbackField = document.getElementById('feedback')
var feedbackName = document.getElementById('feedbackName')

button.addEventListener('click', function() {
    var feedbackFieldValue = feedbackField.value;
    var feedbackNameValue = feedbackName.value;

    if(feedbackFieldValue.length == 0){
      window.alert('Будьласка введіть імя');
    }
    else{
      if(feedbackNameValue.length == 0){
        window.alert('Будьласка введіть текст');
      }
      else{
        var feedback = document.createElement('div');
        feedback.classList.add('feedback');

        var author =  document.createElement('h2');
        author.innerHTML = feedbackNameValue

        var feedbackText = document.createElement('p');
        feedbackText.innerText = feedbackFieldValue

        var date = document.createElement('span');
        date.innerText = new Date().toDateString();

        feedback.appendChild(author);
        feedback.appendChild(date);
        feedback.appendChild(feedbackText);
        document.getElementById('feedbacksWrap').appendChild(feedback);

        feedbackField.value = ''
        feedbackName.value = ''
      }
    }
 });*/
