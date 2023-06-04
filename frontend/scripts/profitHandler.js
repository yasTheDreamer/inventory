const options = {
  mode: "cors",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

fetch("http://127.0.0.1:8080/api/sales/profit", options)
  .then((response) => (response.status === 200 ? response.json() : []))
  .then((data) => {
    populateProfitPage(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.log("Error:", error);
  });

const populateProfitPage = (data) => {
  const profit_row = document.getElementById("profit_row");
  const daily = document.createElement("td");
  const monthly = document.createElement("td");
  const yearly = document.createElement("td");

  daily.textContent = data.daily;
  monthly.textContent = data.monthly;
  yearly.textContent = data.yearly;

  profit_row.appendChild(daily);
  profit_row.appendChild(monthly);
  profit_row.appendChild(yearly);
};
