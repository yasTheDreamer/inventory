const addCustomer = () => {
  const item_name = document.getElementById("customer_name");
  const expiry_date = document.getElementById("mobile_numnber");
  const item_quantity = document.getElementById("customer_address");
  const company_name = document.getElementById("credit_taken");

  fetch("http://127.0.0.1:8080/api/customers/new", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item_name.value,
      tel: expiry_date.value,
      address: item_quantity.value,
      credit: company_name.value,
    }),
  }).then((response) =>
    response.status == 200
      ? location.reload()
      : console.log("status is not 200")
  );
};
