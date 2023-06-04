const addProduct = () => {
  const item_name = document.getElementById("item_name");
  const expiry_date = document.getElementById("expiry_date");
  const item_quantity = document.getElementById("item_quantity");
  const company_name = document.getElementById("company_name");
  const purchase_price = document.getElementById("purchase_price");
  const selling_price = document.getElementById("selling_price");

  fetch("http://127.0.0.1:8080/api/products/new", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: item_name.value,
      companyName: company_name.value,
      expiryDate: expiry_date.value,
      quantity: item_quantity.value,
      purchasePrice: purchase_price.value,
      sellingPrice: selling_price.value,
    }),
  }).then((response) =>
    response.status == 200
      ? location.reload()
      : console.log("status is not 200")
  );
};
