const options = {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

fetch("http://127.0.0.1:8080/api/customers/", options)
  .then((response) => (response.status === 200 ? response.json() : []))
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
  const table = document.getElementById("customers_table");

  const tr = document.createElement("tr");
  tr.classList.add("table-row");
  tr.style.backgroundColor = "#aaaaaa80";
  const name = document.createElement("td");
  const phoneNumber = document.createElement("td");
  const address = document.createElement("td");
  const credit = document.createElement("td");
  const actions = document.createElement("td");
  const edit_button = document.createElement("button");
  edit_button.textContent = "Edit";
  edit_button.name = "edit";
  edit_button.addEventListener("click", (e) => handleEditClick(e));

  const payButton = document.createElement("button");
  payButton.textContent = "Pay";
  payButton.name = "pay";
  payButton.addEventListener("click", (e) => payCredit(e));

  actions.appendChild(edit_button);
  actions.appendChild(payButton);
  name.textContent = d.name;
  phoneNumber.textContent = d.tel;
  address.textContent = d.address;
  credit.textContent = d.credit;

  tr.id = d.id;
  tr.appendChild(name);
  tr.appendChild(credit);
  tr.appendChild(phoneNumber);
  tr.appendChild(address);
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

  data.name.contentEditable = true;
  data.phoneNumber.contentEditable = true;
  data.address.contentEditable = true;
};

const editData = (e) => {
  const data = getDataAfterClick(e);

  const id = data.name.parentNode.id;
  const name = data.name.textContent;
  const phoneNumber = data.phoneNumber.textContent;
  const address = data.address.textContent;
  const credit = data.credit.textContent;

  if (
    checkDataValidity({
      id,
      name,
      phoneNumber,
      address,
      credit,
    })
  )
    fetch(`http://127.0.0.1:8080/api/customers/${id}`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        tel: phoneNumber,
        address: address,
        credit: credit,
      }),
    }).then((response) => location.reload());
  else {
    alert("data is not valid");
  }
};

const getDataAfterClick = (e) => {
  const buttonTd = e.target.parentNode;
  const address = buttonTd.previousElementSibling;
  const phoneNumber = address.previousElementSibling;
  const credit = phoneNumber.previousElementSibling;
  const name = credit.previousElementSibling;

  return {
    name,
    phoneNumber,
    address,
    credit,
  };
};

const checkDataValidity = (data) => {
  if (
    data.id !== "" &&
    data.name !== "" &&
    data.phoneNumber !== "" &&
    data.address != "" &&
    data.credit !== ""
  ) {
    return true;
  }

  return false;
};

const payCredit = (e) => {
  const data = getDataAfterClick(e);

  const id = data.name.parentNode.id;

  fetch(`http://127.0.0.1:8080/api/customers/${id}/pay`, options).then(
    (response) => location.reload()
  );
};
