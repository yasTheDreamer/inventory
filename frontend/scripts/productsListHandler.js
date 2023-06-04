fetch("http://127.0.0.1:8080/api/products/", {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((d) => {
      populateSelect(d);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateSelect = (d) => {
  const orders_list = document.getElementById("orders_list");
  const name = document.createElement("option");
  name.id = d.id;
  name.value = d.id;
  name.textContent = d.productName;

  orders_list.appendChild(name);

  return orders_list;
};
