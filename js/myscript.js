// feedback script
var button = document.getElementById('feedbackButton')
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
 });

 