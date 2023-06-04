const options = {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

fetch("http://127.0.0.1:8080/api/products/", options)
  .then((response) => response.json())
  .then((data) => {
    populateStockCount(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateStockCount = (d) => {
  const stock_count = document.getElementById("stock_count");
  stock_count.textContent = d.length;
};

fetch("http://127.0.0.1:8080/api/products/out", options)
  .then((response) => response.json())
  .then((data) => {
    populateOutOfStockCount(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateOutOfStockCount = (data) => {
  const outofstock_count = document.getElementById("outstock_count");
  outofstock_count.textContent = data.length;
};

fetch("http://127.0.0.1:8080/api/products/low", options)
  .then((response) => response.json())
  .then((data) => {
    populateLowStockCount(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateLowStockCount = (data) => {
  const outofstock_count = document.getElementById("lowstock_count");
  outofstock_count.textContent = data.length;
};

fetch("http://127.0.0.1:8080/api/orders/", options)
  .then((response) => response.json())
  .then((data) => {
    populateOrdersCount(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateOrdersCount = (data) => {
  const outofstock_count = document.getElementById("orders_count");
  outofstock_count.textContent = data.length;
};

fetch("http://127.0.0.1:8080/api/products/expired", options)
  .then((response) => response.json())
  .then((data) => {
    populateExpiredCount(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateExpiredCount = (data) => {
  const outofstock_count = document.getElementById("expired_count");
  outofstock_count.textContent = data.length;
};

fetch("http://127.0.0.1:8080/api/products/expireSoon", options)
  .then((response) => response.json())
  .then((data) => {
    populateExpireSoonCount(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateExpireSoonCount = (data) => {
  const outofstock_count = document.getElementById("expireSoon_count");
  outofstock_count.textContent = data.length;
};
