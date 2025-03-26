let products = []; // 전체 상품 데이터를 저장할 배열
let currentPage = 1; // 현재 페이지
const productsPerPage = 5; // 한 페이지당 상품 수
const productsContainer = document.getElementById('products-container');
const loadingIndicator = document.createElement('div');
loadingIndicator.textContent = 'Loading...';
loadingIndicator.style.textAlign = 'center';
loadingIndicator.style.fontSize = '18px';
loadingIndicator.style.margin = '20px 0';
loadingIndicator.style.display = 'none';
document.body.appendChild(loadingIndicator);

// 장바구니 변수 (상품 id별로 저장)
let cart = {};

// JSON 파일 경로
const jsonDataUrl = '../db.json'; 

// 데이터를 가져오는 함수
async function fetchProducts() {
  loadingIndicator.style.display = 'block'; // 로딩 표시 시작

  try {
    const response = await fetch(jsonDataUrl);  // JSON 데이터를 가져옴
    products = await response.json(); // JSON 데이터 배열에 저장
    displayProducts(); // 처음 5개의 상품을 화면에 표시
  } catch (error) {
    console.error('Error fetching data:', error);
    loadingIndicator.style.display = 'none'; // 에러 발생 시 로딩 표시 숨김
  }
}

// 화면에 상품을 표시하는 함수
function displayProducts() {
  const start = (currentPage - 1) * productsPerPage; // 페이지의 시작 인덱스
  const end = currentPage * productsPerPage; // 페이지의 끝 인덱스
  const currentProducts = products.slice(start, end); // 현재 페이지에 해당하는 상품 데이터

  // 상품을 화면에 렌더링
  currentProducts.forEach(product => {
    const productItem = document.createElement('li');
    productItem.classList.add('show');

    // 제품 이미지
    const productImage = document.createElement('img');
    productImage.src = `/imgs/${product.productImgFileName}`;
    productImage.alt = `${product.productName} 이미지`;

    // 제품 정보 div
    const productInfo = document.createElement('div');
    
    // 제품 이름
    const productName = document.createElement('h2');
    productName.textContent = `${product.productName}`;

    // 제품 가격
    const productPrice = document.createElement('p');
    productPrice.textContent = `${product.productPrice}원`;

    // 장바구니 버튼
    const addCartBtn = document.createElement('button');
    addCartBtn.id = `cart-${product.id}`;
    addCartBtn.classList.add('addCartBtn');
    addCartBtn.textContent = 'Cart';
    
    // 장바구니 버튼 클릭 시 동작
    addCartBtn.addEventListener('click', () => addToCart(product, addCartBtn));

    // 이미 장바구니에 담긴 상품은 버튼 색상 변경
    if (cart[product.id]) {
      addCartBtn.classList.add('disabled'); // 색상만 변경되고, 클릭은 가능
    }

    // 주문 버튼
    const orderBtn = document.createElement('button');
    orderBtn.id = `order-${product.id}`;
    orderBtn.classList.add('orderBtn');
    orderBtn.textContent = 'Order';

    // 구매하기 버튼 클릭 시 구매 페이지로 이동
    orderBtn.addEventListener('click', () => {
      window.location.href = `/buy.html?productId=${product.id}`; // 구매 페이지로 이동
    });

    // 제품 정보 div에 요소들 추가
    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(addCartBtn);
    productInfo.appendChild(orderBtn);

    // li 항목에 이미지와 제품 정보 추가
    productItem.appendChild(productImage);
    productItem.appendChild(productInfo);

    // 제품 리스트에 li 항목 추가
    productsContainer.appendChild(productItem);
  });

  loadingIndicator.style.display = 'none'; // 로딩 표시 숨김
}

// 장바구니에 상품을 추가하는 함수 (수정됨)
function addToCart(product, button) {
  // 장바구니에 해당 상품이 없다면
  if (!cart[product.id]) {
    cart[product.id] = product; // 해당 상품을 장바구니에 저장
    button.classList.add('disabled'); // 색상만 변경되고 클릭 가능
  }
}

// 무한 스크롤 기능
function handleScroll() {
  // 페이지 끝에 도달하면
  const bottomOfWindow = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;
  
  if (bottomOfWindow) {
    currentPage++;  // 페이지를 증가시키고
    displayProducts();  // 새로운 상품들을 표시
  }
}

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', handleScroll);

// 초기 데이터 로드
fetchProducts();
