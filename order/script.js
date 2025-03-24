const orderItems = JSON.parse(sessionStorage.getItem("orderItem"));

function order() {
  if (!orderItems) return;

  const orderProductContainer = document.querySelector(
    ".order-product-container"
  );

  const div = document.createElement("div");
  div.innerHTML = `
    <img src="/imgs/${orderItems.productImgFileName}" alt="${orderItems.productName}" />
    <h3>${orderItems.productName}</h3>
    <p>${orderItems.productPrice}원</p>
    `;

  orderProductContainer.appendChild(div);
}

order();