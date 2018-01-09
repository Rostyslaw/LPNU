var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addNews() {
	var name = document.getElementById('newsHeader').value;
	var text = document.getElementById('newsText').value;
	var newsPic	= document.getElementById('news-img').value;

		if( name == "" || newsPic == ""	|| text == ""){
				alert("Заповніть всі поля!");
				return;
			}
		if (isOnline()) {
			document.getElementById('newsHeader').value = '';
			document.getElementById('newsText').value = '';
			target.src = '../images/Random-turtle.jpg'
			alert('Новина додана');
		} else{
        if (useLocalStorage) {
    			imgData = target.src;
    			i++;
    			var list = [];
    				 list.push({"name": (name),"text": (text)});
    			localStorage.setItem('n' + i, JSON.stringify(list));
    			localStorage.setItem('i' + i, (imgData));
    			document.getElementById('newsHeader').value = '';
    			document.getElementById('newsText').value = '';
    			target.src = '../images/Random-turtle.jpg'
      }
      else{
        var transaction = db.transaction(["news"], "readwrite");
          var store = transaction.objectStore("news");
          var news1 = {
              name: document.getElementById('newsHeader').value,
              text: document.getElementById('newsText').value,
              img: target.src
      };
      store.add(news1);
    }
    document.getElementById('newsHeader').value = '';
    document.getElementById('newsText').value = '';

}
}

function showImage(src, target) {
    var fr = new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function (e) {
        target.src = this.result;
    };
    src.addEventListener("change", function () {
        // fill fr with image data
        fr.readAsDataURL(src.files[0]);
    });
}
