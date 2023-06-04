const options = {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

fetch("http://127.0.0.1:8080/api/orders/", options)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((d) => {
      populateTableRow(d);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateTableRow = (d) => {
  const table = document.getElementById("orders_table");
  const tr = document.createElement("tr");
  tr.classList.add("table-row");
  const product = document.createElement("td");
  const quantityLeft = document.createElement("td");
  const actions = document.createElement("td");
  const receive = document.createElement("button");
  receive.value = "receive";
  receive.textContent = "receive";
  receive.addEventListener("click", (e) => receiveOrder(e));

  product.textContent = d.productId.productName;
  product.id = d.productId.id;
  quantityLeft.textContent = d.quantity;
  tr.id = d.id;

  actions.appendChild(receive);
  tr.appendChild(product);
  tr.appendChild(quantityLeft);
  tr.appendChild(actions);
  table.appendChild(tr);
  return table;
};

const receiveOrder = (e) => {
  const orderId = e.target.parentNode.parentNode.id;

  const productId = getIdAfterClick(e);

  const expiryDate = prompt("Please enter a date (YYYY-MM-DD):");

  const formatedDate = createDateFromFormat(expiryDate);

  console.log(formatedDate);

  const options = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: productId,
      expiryDate: formatedDate,
    }),
  };

  fetch(`http://127.0.0.1:8080/api/orders/${orderId}`, options)
    .then((response) => location.reload())
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.log("Error:", error);
    });
};

const getIdAfterClick = (e) => {
  const buttonTd = e.target.parentNode;

  const quantity = buttonTd.previousElementSibling;
  const item_name = quantity.previousElementSibling;

  return item_name.id;
};

function createDateFromFormat(dateString) {
  let parts = dateString.split("-");
  let day = parseInt(parts[2], 10);
  let month = parseInt(parts[1], 10) - 1; // Month value starts from 0 (January is 0)
  let year = parseInt(parts[0], 10);

  return new Date(year, month, day);
}
