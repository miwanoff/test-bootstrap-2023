function loadBooks() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "books.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let books = JSON.parse(xhttp.responseText);
      insertBooks(books);
    }
  };
}

function insertBooks(books) {
  var str = `<div class="wrap">`;
  for (var i = 0; i < books.length; i++) {
    str +=
      `<div class="bookWrap col-sm-4 col-xs-12">` +
      `<div class="panel panel-default text-center">` +
      `<div class="panel-heading">`;
    str += `<h3>${books[i].name}</h3></div>`;
    str += `<div class="image"><img src="${books[i].imageCover}" /></div>`;

    str += `<p>${books[i].author}</p>`;
    str += `</div></div>`;
  }
  str += `</div>`;
  document.getElementById("books").innerHTML = str;
}
