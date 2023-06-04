const options = {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

fetch("http://127.0.0.1:8080/api/products/low", options)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((d) => {
      populateExpandedRow(d);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateExpandedRow = (d) => {
  const table = document.getElementById("products_table");
  const tr = document.createElement("tr");
  tr.classList.add("table-row");
  tr.style.backgroundColor = "#aaaaaa80";
  const name = document.createElement("td");
  const expiryDate = document.createElement("td");
  const quantityLeft = document.createElement("td");
  const companyName = document.createElement("td");
  const purchasePrice = document.createElement("td");
  const sellingPrice = document.createElement("td");
  const actions = document.createElement("td");
  const edit_button = document.createElement("button");
  edit_button.textContent = "Edit";
  edit_button.name = "edit";
  edit_button.addEventListener("click", (e) => handleEditClick(e));

  actions.appendChild(edit_button);
  name.textContent = d.productName;
  expiryDate.textContent = new Date(d.expiryDate).toLocaleDateString();
  quantityLeft.textContent = d.quantity;
  companyName.textContent = d.companyName;
  purchasePrice.textContent = d.purchasePrice;
  sellingPrice.textContent = d.sellingPrice;

  tr.id = d.id;
  tr.appendChild(name);
  tr.appendChild(expiryDate);
  tr.appendChild(quantityLeft);
  tr.appendChild(companyName);
  tr.appendChild(purchasePrice);
  tr.appendChild(sellingPrice);
  tr.appendChild(actions);

  table.appendChild(tr);

  return tr;
};

const addClickListener = (row) => {
  row.addEventListener("click", () => {
    row.nextElementSibling.classList.toggle("expanded-row");
    row.nextElementSibling.classList.toggle("element_center");
  });
};

const handleEditClick = (e) => {
  const editButtontd = e.target.parentNode;

  const validateButton = document.createElement("button");
  validateButton.textContent = "Validate";
  validateButton.name = "validate";

  validateButton.addEventListener("click", (e) => editData(e));
  editButtontd.appendChild(validateButton);

  const data = getDataAfterClick(e);

  data.sellingPrice.contentEditable = true;
  data.purchasePrice.contentEditable = true;
  data.companyName.contentEditable = true;
  data.quantity.contentEditable = true;
  data.expiryDate.contentEditable = true;
  data.name.contentEditable = true;
};

const editData = (e) => {
  const data = getDataAfterClick(e);

  const id = data.name.parentNode.id;
  const name = data.name.textContent;
  const expiryDate = data.expiryDate.textContent;
  const quantity = data.quantity.textContent;
  const companyName = data.companyName.textContent;
  const purchasePrice = data.purchasePrice.textContent;
  const sellingPrice = data.sellingPrice.textContent;

  const formatedDate = createDateFromFormat(expiryDate);

  if (
    checkDataValidity({
      id,
      name,
      expiryDate,
      quantity,
      companyName,
      purchasePrice,
      sellingPrice,
    })
  )
    fetch(`http://127.0.0.1:8080/api/products/${id}`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: name,
        expiryDate: formatedDate,
        quantity: quantity,
        companyName: companyName,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
      }),
    }).then((response) => location.reload());
  else {
    alert("data is not valid");
  }
};

const getDataAfterClick = (e) => {
  const buttonTd = e.target.parentNode;

  const sellingPrice = buttonTd.previousElementSibling;
  const purchasePrice = sellingPrice.previousElementSibling;
  const companyName = purchasePrice.previousElementSibling;
  const quantity = companyName.previousElementSibling;
  const expiryDate = quantity.previousElementSibling;
  const name = expiryDate.previousElementSibling;

  return {
    name,
    expiryDate,
    quantity,
    companyName,
    purchasePrice,
    sellingPrice,
  };
};

const checkDataValidity = (data) => {
  if (
    data.id !== "" &&
    data.name !== "" &&
    data.expiryDate !== "" &&
    data.quantity != "" &&
    data.companyName !== "" &&
    data.purchasePrice !== "" &&
    data.sellingPrice !== ""
  ) {
    return true;
  }

  return false;
};

function createDateFromFormat(dateString) {
  let parts = dateString.split("/");
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1; // Month value starts from 0 (January is 0)
  let year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}
