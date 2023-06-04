const addOrder = () => {
  const product_id = document.getElementById("orders_list");
  const quantity = document.getElementById("quantity");

  console.log(quantity);

  fetch("http://127.0.0.1:8080/api/orders/new", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: parseInt(product_id.value),
      quantity: quantity.value,
    }),
  }).then((response) =>
    response.status == 200
      ? location.reload()
      : console.log("status is not 200")
  );
};
