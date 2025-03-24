document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const allProducts = [
    { name: "포토카드", price: "10000원", img: "./imgs/photoCard-01.png" },
    { name: "손거울", price: "5000원", img: "./imgs/handMirror-02.png" },
    { name: "티셔츠", price: "15000원", img: "./imgs/tshirt-03.png" },
    { name: "로고 컵", price: "8000원", img: "./imgs/cup-04.png" },
    { name: "로고 가방", price: "20000원", img: "./imgs/bag-05.png" },
    { name: "로고 그릇", price: "9000원", img: "./imgs/bowl-06.png" },
    { name: "만두 노트북", price: "45000원", img: "./imgs/laptop-07.png" },
    { name: "만두 로션", price: "12000원", img: "./imgs/lotion-08.png" },
    { name: "로고 블랙 케이스", price: "4000원", img: "./imgs/colorCase-09.png" },
    { name: "로고 레드 케이스", price: "4000원", img: "./imgs/colorCase-10.png" },
    { name: "로고 그린 케이스", price: "4000원", img: "./imgs/colorCase-11.png" },
    { name: "로고 양말", price: "6000원", img: "./imgs/socks-12.png" },
    { name: "만두 로고 운동화", price: "30000원", img: "./imgs/sneakers-13.png" },
    { name: "찡그림 포토 케이스", price: "8000원", img: "./imgs/photoCase-14.png" },
    { name: "발라당 포토 케이스", price: "8500원", img: "./imgs/photoCase-15.png" },
    { name: "눈떙글 포토 케이스", price: "8500원", img: "./imgs/photoCase-16.png" },
    { name: "찡그림 로고 노트", price: "13000원", img: "./imgs/note-17.png" },
    { name: "발라당 로고 노트", price: "13000원", img: "./imgs/note-18.png" },
    { name: "[특별 한정]포토카드", price: "130000원", img: "./imgs/photoCard-19.png" }
  ];

  let cartItem = null; // 장바구니에 하나만 저장할 수 있도록 설정

  // 상품을 화면에 표시하는 함수
  function displayProducts(products) {
    products.forEach((product, index) => {
      const li = document.createElement("li");
      li.classList.add("show");

      li.innerHTML = `
        <img src="${product.img}" alt="Product Image" />
        <div>
          <h2>${product.name}</h2>
          <p>${product.price}</p>
          <button class="addCartBtn" data-index="${index}">Cart</button>
          <button class="orderBtn">Order</button>
        </div>
      `;
      productsContainer.appendChild(li);
    });

    // 장바구니 버튼 클릭 시 처리
    const cartButtons = document.querySelectorAll(".addCartBtn");
    cartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        addToCart(index);
      });
    });
  }

  // 장바구니에 상품을 추가하는 함수
  function addToCart(index) {
    if (cartItem) {
      alert("장바구니에는 하나의 상품만 담을 수 있습니다.");
      return; // 이미 장바구니에 상품이 있으면 더 이상 추가하지 않음
    }

    // 상품 정보를 가져와서 장바구니에 추가
    cartItem = allProducts[index];
    alert(`${cartItem.name}이 장바구니에 추가되었습니다.`);

    // 장바구니에 담은 상품의 버튼 비활성화
    const cartButtons = document.querySelectorAll(".addCartBtn");
    cartButtons.forEach((button) => {
      if (button.getAttribute("data-index") == index) {
        button.disabled = true;
      }
    });
  }

  // 처음 5개 제품을 로드
  displayProducts(allProducts.slice(0, 5));

  // 무한 스크롤 처리
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 5 && allProducts.length > 5) {
      displayProducts(allProducts.slice(5, 10)); // 추가 제품을 로드
    }
  });
});
</script>
