const cartContainerUl = document.querySelector('.cart-container');
if (!cartContainerUl) {
  console.error("cartContainerUl 요소를 찾을 수 없습니다. 선택자를 확인하세요.");
}

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];   // 로컬스토리지 배열명 임의로 지정, 추 후 수정 필요

// 1. 장바구니 목록 띄우기
function renderCartItems() {
  // 장바구니에 담긴 상품이 없을때
  if (cartItems.length === 0) {
    cartContainerUl.innerHTML = "장바구니에 담긴 상품이 없습니다.";
    return;
  }
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="${item.productName}" />
      <label for="${item.productName}">${item.productName}</label>
    `;
    cartContainerUl.appendChild(li);
  });
}
renderCartItems();
console.log('cartItems', cartItems);

const deleteButton = document.querySelector(".delete-button"); // 선택 삭제 버튼

// 2. 선택한 상품 삭제 기능
deleteButton.addEventListener("click", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const checkboxes = document.querySelectorAll(".cart-container input[type='checkbox']:checked");
  const checkedIds = Array.from(checkboxes).map((checkbox) => checkbox.id);
  const updatedCart = cartItems.filter((item) => !checkedIds.includes(item.productName));

  // 장바구니 목록이 비었을 경우
  if (updatedCart.length === 0) {
    localStorage.removeItem("cartItems");
    cartContainerUl.innerHTML = "장바구니에 담긴 상품이 없습니다.";
    return;
  }

  localStorage.setItem("cartItems", JSON.stringify(updatedCart));  // 로컬스토리지에 업데이트된 장바구니 목록 저장

  cartContainerUl.innerHTML = "";  // 기존 목록 초기화 후 다시 렌더링
  updatedCart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML =
      `
        <input type="checkbox" id="${item.productName}" />
        <label for="${item.productName}">${item.productName}</label>
      `;
    cartContainerUl.appendChild(li);
  });
});

const deleteAllBtn = document.querySelector(".delete-all-button"); // 전체 삭제 버튼 

// 3. 장바구니 전체 삭제 기능
deleteAllBtn?.addEventListener("click", () => {
  cartItems.length = 0; 
  renderCartItems();
});