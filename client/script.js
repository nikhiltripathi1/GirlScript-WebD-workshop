var list = document.getElementById("list-container");

function addEvent() {
  var close = document.querySelectorAll(".btn");
  close.forEach((button) => {
    button.addEventListener("click", () => {
      deleteData(button.id);
    });
  });
}

function createList(data) {
  list.innerHTML = "";
  for (let i = 0; i < data.length; ++i) {
    var div = document.createElement("div");
    var p = document.createElement("p");
    var button = document.createElement("div");

    button.innerHTML = "\u00D7";
    button.setAttribute("class", "btn");
    button.setAttribute("id", data[i].id);

    p.innerHTML = data[i].item;

    div.appendChild(p);
    div.appendChild(button);
    div.setAttribute("class", "list-item");
    list.appendChild(div);
  }
  addEvent();
}

function getData() {
  fetch("http://localhost:5000/data")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.length == 0) {
        list.innerHTML = "No item in the list";
      } else {
        createList(data);
      }
      console.log(data);
    });
}

function postData() {
  const input = document.getElementById("item");
  fetch("http://localhost:5000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: input.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getData();
      console.log(data);
    });
  return false;
}
function deleteData(id) {
  fetch("http://localhost:5000/data/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getData();
      console.log(data);
    });
}
getData();
