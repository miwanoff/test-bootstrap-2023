var d = document,
itemBox = d.querySelectorAll(".item_box"), // блок каждого товара
cartCont = d.getElementById("cart_content"); // блок вывода данных корзины
// Функция кроссбраузерная установка обработчика событий
function addEvent(elem, type, handler) {
if (elem.addEventListener) {
  elem.addEventListener(type, handler, false);
} else {
  elem.attachEvent("on" + type, function() {
    handler.call(elem);
  });
}
return false;
}
// Получаем данные из LocalStorage
function getCartData() {
return JSON.parse(localStorage.getItem("cart"));
}
// Записываем данные в LocalStorage
function setCartData(o) {
localStorage.setItem("cart", JSON.stringify(o));
return false;
}
// Добавляем товар в корзину

function count() {
var count = 0;
if (getCartData()) {
  var cartData = getCartData();
  console.log(cartData);
  for (var items in cartData) {
    //console.log(cartData[items][1]+" "+ cartData[items][2]);
    count += cartData[items][2];
  }
}
return count;
}

function addItem(plus) {
if (getCartData()) {
  var cartData = getCartData();
  var item = plus.getAttribute("data-id");
  //console.log(cartData[item][2]);
  cartData[item][2] = Number(cartData[item][2]) + 1;
  console.log(cartData[item][2]);

  setCartData(cartData);
  cartCont.innerHTML = basketGenerate();
}
}

function removeItem(plus) {
if (getCartData()) {
  var cartData = getCartData();
  var item = plus.getAttribute("data-id");
  //console.log(cartData[item][2]);
  cartData[item][2] = Number(cartData[item][2]) - 1;
  console.log(cartData[item][2]);
  if (cartData[item][2] == 0) delete cartData[item];

  setCartData(cartData);
  cartCont.innerHTML = basketGenerate();
}
}

function sum() {
var sum = 0;
if (getCartData()) {
  var cartData = getCartData();
  console.log(cartData);
  for (var items in cartData) {
    //console.log(cartData[items][1]+" "+ cartData[items][2]);
    sum += cartData[items][1] * cartData[items][2];
    console.log(sum);
  }
}
return sum;
}

function addToCart(e) {
this.disabled = true; // блокируем кнопку на время операции с корзиной
var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
  parentBox = this.parentNode.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
  itemId = this.getAttribute("data-id"), // ID товара
  itemTitle = parentBox.querySelector(".item_title").innerHTML, // название товара
  itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
if (cartData.hasOwnProperty(itemId)) {
  // если такой товар уже в корзине, то добавляем +1 к его количеству
  cartData[itemId][2] += 1;
} else {
  // если товара в корзине еще нет, то добавляем в объект
  cartData[itemId] = [itemTitle, itemPrice, 1];
}
// Обновляем данные в LocalStorage
if (!setCartData(cartData)) {
  this.disabled = false; // разблокируем кнопку после обновления LS
  cartCont.innerHTML = "Товар добавлен в корзину.";
  setTimeout(function() {
    cartCont.innerHTML = "В корзине товаров: " + count();
  }, 1000);
}
return false;
}
// Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
for (var i = 0; i < itemBox.length; i++) {
addEvent(itemBox[i].querySelector(".add_item"), "click", addToCart);
}

function basketGenerate() {
var cartData = getCartData(), // вытаскиваем все данные корзины
  totalItems = "";
console.log(JSON.stringify(cartData));
// если что-то в корзине уже есть, начинаем формировать данные для вывода
if (cartData !== null) {
  totalItems =
    '<table class="shopping_list table-hover"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th>Добавить товар</th><th>Удалить товар</th></tr>';
  for (var items in cartData) {
    totalItems += "<tr>";
    for (var i = 0; i < cartData[items].length; i++) {
      totalItems += "<td>" + cartData[items][i] + "</td>";
    }
    totalItems +=
      "<td>" +
      '<span class="plus glyphicon glyphicon-plus" data-id="' +
      items +
      '" onclick="addItem(this)"></span>' +
      "</td>";

    totalItems +=
      "<td>" +
      '<span class="minus glyphicon glyphicon-minus" data-id="' +
      items +
      '" onclick="removeItem(this)"></span>' +
      "</td>";

    totalItems += "</tr>";
  }
  totalItems +=
    "<tr>" +
    "<td>" +
    "Сумма" +
    "</td>" +
    "<td>" +
    sum() +
    "</td>" +
    "<td>" +
    count() +
    "</td>" +
    "<td></td><td></td></tr>";
  totalItems += "<table>";
  return totalItems;
} else {
  // если в корзине пусто, то сигнализируем об этом
  return "В корзине товаров: " + count();
}
}

// Открываем корзину со списком добавленных товаров
function openCart(e) {
cartCont.innerHTML = basketGenerate();
return false;
}

/* Открыть корзину */
addEvent(d.getElementById("checkout"), "click", openCart);
/* Очистить корзину */
addEvent(d.getElementById("clear_cart"), "click", function(e) {
localStorage.removeItem("cart");
cartCont.innerHTML = "Корзина очишена.";
});
sum();