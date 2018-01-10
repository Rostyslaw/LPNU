
var condition = "online";
var useLocalStorage = false

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

window.addEventListener('online', function(e) {
  var condition = 'online'
  takeFromServer()
});

window.addEventListener('offline', function(e) {
  var condition = 'offline'
  takeFromStorage()
});
if (condition=='online') {
  takeFromServer()
}

function createNews(news) {
  console.log(news);
  var parentElem = document.getElementById("news-list");
  var element = document.createElement("div");
  element.id = 'news';
  element.innerHTML += "<div class='col-md-3'> " +
  "<img src='" + image + "' style='margin-top:20px' width='300' height='295'>" +
  "<h1><a href='#'>" + news.shortdescription + "</a></h1>" +
  " <p>" + news.longdescription + "</p>" +
  "</div>";
parentElem.appendChild(element);
}

function getNews() {
  var news = [];
  var news_item = localStorage.getItem('news');
  if (news_item !== null) {
    news = JSON.parse(news_item);
  }
  return news;
}

function getNewsFromDB() {
  var dbNews = [];
  var db_news_item = ''
  const dbName = "Storage";
  var open = indexedDB.open(dbName);
  open.onsuccess = function() {
    var db = open.result;
    var tx = db.transaction("News", "readwrite");
    var objectStore = tx.objectStore("News");
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        db_news_item = cursor.value
      } else {}
      if (db_news_item !== null && db_news_item !== '') {
        dbNews.push(db_news_item)
          console.log(dbNews);
          for (var i = 0; i < dbNews.length; i++) {
            createNews(dbNews[i]);
          }
      }
    }
  }
  return true
}

  function takeFromServer() {
    $.ajax({
        url: 'http://localhost:8080/api/news',
        type: "get",
        dataType: "json",

        success: function(data) {
            for (var i = 0; i < data.length; i++) {
              createNews(data[i]);
            }
        }
    });
  }

  function takeFromStorage() {
    if (useLocalStorage) {
      var news = getNews();
      if ((typeof news !== 'undefined') && (news.length > 0)) {
        for (var i = 0; i < news.length; i++) {
          createNews(news[i]);
        }
      }
      localStorage.removeItem('news')
    } else {
      getNewsFromDB();

      if(getNewsFromDB()){
      const dbName = "Storage";
      var open = indexedDB.open(dbName);
      open.onsuccess = function() {
        console.log('clear');
        var db = open.result;
        var tx = db.transaction("News", "readwrite");
        var objectStore = tx.objectStore("News");
        var objectStoreRequest = objectStore.clear();
      }
    }
    }
  }
/*window.addEventListener('load', function () {
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
}*/
