const cartContainerUl = document.querySelector('.cart-container ul');
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];   // 로컬스토리지 배열명 임의로 지정, 추 후 수정 필요

// 1. 장바구니 목록 띄우기
function renderCartItems() {
  // 장바구니에 담긴 상품이 없을때
  if (!cartItems) {
    cartContainerUl.innerHTML = "장바구니에 담긴 상품이 없습니다.";
    return;
  }
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" id="${item.productName}" /><label for="${item.productName}">${item.productName}</label>`;
    cartContainerUl.appendChild(li);
  });
}
renderCartItems();