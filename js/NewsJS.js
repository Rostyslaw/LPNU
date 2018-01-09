window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineNews();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

function isOnline() {
    return window.navigator.onLine;
}

function readOfflineNews() {
    if (useLocalStorage) {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            news = JSON.parse(localStorage.getItem('n' + k));
            var img = localStorage.getItem('i' + k);
            var parentElem = document.getElementById('news-list');
            var out = document.createElement('div');
            out.id = 'news';
            out.innerHTML =
                "<div class='col-md-3'> " +
                "<img src='" + img + "' style='margin-top:20px' width='300' height='295'>" +
                "<h1><a href='#'>" + news[0].name + "</a></h1>" +
                " <p>" + news[0].text + "</p>" +
                "</div>";
            parentElem.appendChild(out);
        }
      } else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                var parentElem = document.getElementById('news-list');
                var out = document.createElement('div');
                out.id = 'news';
                out.innerHTML =
                "<div class='col-md-3'> " +
                "<img src='" + cursor.value.img + "' style='margin-top:20px' width='300' height='295'>" +
                "<h1><a href='#'>" + cursor.value.name + "</a></h1>" +
                " <p>" + cursor.value.text + "</p>" +
                "</div>";
                var request = db.transaction(["news"], "readwrite").objectStore("news").delete(cursor.primaryKey);
                parentElem.appendChild(out);
            }

}
}
}
