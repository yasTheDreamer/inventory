$(document).ready(function () {
  const minus = $(".quantity__minus");
  const plus = $(".quantity__plus");
  const input = $(".quantity__input");
  minus.click(function (e) {
    e.preventDefault();
    var value = input.val();
    if (value > 1) {
      value--;
    }
    input.val(value);
  });

  plus.click(function (e) {
    e.preventDefault();
    var value = input.val();
    value++;
    input.val(value);
  });
});

$(document).ready(function () {
  const button = document.querySelector(".sell_button");

  const options = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sold: 0,
    }),
  };

  fetch(`http://127.0.0.1:8080/api/cart/new`, options)
    .then((response) => response.json())
    .then((data) => {
      button.id = data.id;
    })
    .catch((error) => {});
});

const populateSelect = (d) => {
  const products = document.getElementById("sell_product");
  const name = document.createElement("option");
  name.id = d.id;
  name.value = d.id;
  name.textContent = d.productName;

  products.appendChild(name);

  return products;
};

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
      populateCustomersList(d);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateCustomersList = (d) => {
  const customers = document.getElementById("sell_customer");
  const name = document.createElement("option");
  name.id = d.id;
  name.textContent = d.name;

  customers.appendChild(name);

  return customers;
};

const display_success_message = () => {
  const sale_success = document.getElementById("sale_success");
  sale_success.style.display = "flex";
};

const display_error_message = (text) => {
  const sale_failure = document.getElementById("sale_failure");
  sale_failure.style.display = "flex";
  sale_failure.textContent = text;
};

const undisplay_success_message = () => {
  const sale_success = document.getElementById("sale_success");
  sale_success.style.display = "none";
};

const undisplay_error_message = () => {
  const sale_failure = document.getElementById("sale_failure");
  sale_failure.style.display = "none";
};

const addToCart = () => {
  const option = document.getElementById("cash_or_credit");
  const customer =
    document.getElementById("sell_customer").selectedOptions[0].id;
  const product = document.getElementById("sell_product").selectedOptions[0].id;
  const quantity = document.getElementById("quantity");

  const customerName = document.getElementById("sell_customer");
  const productName = document.getElementById("sell_product");

  const customer_name = customerName.options[customerName.selectedIndex].text;
  const product_name = productName.options[productName.selectedIndex].text;

  const options = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId: parseInt(customer),
      productId: parseInt(product),
      saleDate: new Date(),
      quantity: quantity.value,
      saleAmount: 0,
      payment: option.value,
      cartId: document.querySelector(".sell_button").id,
    }),
  };

  fetch(`http://127.0.0.1:8080/api/sales/sell/${option.value}`, options).then(
    (response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      } else {
        const button = document.querySelector(".sell_button");

        const string = "http://127.0.0.1:8080/api/sales/cart";

        fetch(string, {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: {
              id: button.id,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            data.forEach((d) => {
              populateCart(d, customer_name, product_name);
            });
            return data;
          })
          .then((data) => {
            let total = document.getElementById("total_amount_cart");
            total.textContent = parseInt(0);
            data.forEach((d) => {
              total.textContent =
                parseInt(total.textContent) + parseInt(d.saleAmount);
            });
          })
          .catch((error) => {
            // Handle any errors that occur during the fetch request
            console.log("Error:", error);
          });
      }
    }
  );
};

const populateCart = (d, customerName, productName) => {
  const table = document.getElementById("products_table");
  const tr = document.createElement("tr");
  tr.classList.add("table-row");
  tr.style.backgroundColor = "#aaaaaa80";
  const customer = document.createElement("td");
  const product = document.createElement("td");
  const saleDate = document.createElement("td");
  const quantity = document.createElement("td");
  const saleAmount = document.createElement("td");
  const option = document.createElement("td");
  option.id = "option_id";

  customer.textContent = customerName;
  product.textContent = productName;
  saleDate.textContent = d.saleDate;
  quantity.textContent = d.quantity;
  saleAmount.textContent = d.saleAmount;
  option.textContent = d.payment;

  tr.id = d.id;

  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    if (row.id == tr.id) {
      return;
    }
  }

  tr.appendChild(customer);
  tr.appendChild(product);
  tr.appendChild(saleDate);
  tr.appendChild(quantity);
  tr.appendChild(option);
  tr.appendChild(saleAmount);

  table.appendChild(tr);

  return tr;
};

const validateSales = () => {
  const button = document.querySelector(".sell_button");
  const option = document.getElementById("option_id");

  fetch(
    `http://127.0.0.1:8080/api/sales/sell/${option.textContent}/${button.id}`,
    {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => alert("items have been sold"))
    .then(() => {
      location.reload();
    });
};
