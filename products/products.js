
// JSON 데이터를 가져오는 함수
fetch('../db.json')
  .then(response => response.json())  // JSON 파일을 파싱
  .then(products => {
    const productsContainer = document.getElementById('products-container');

    // JSON 데이터로 각 제품을 순차적으로 li 태그로 추가
    products.forEach(product => {
      const productItem = document.createElement('li');
      productItem.classList.add('show');

      // 제품 이미지
      const productImage = document.createElement('img');
      productImage.src = `/imgs/${product.productImgFileName}`;
      productImage.alt = `${product.name} 이미지`;

      // 제품 정보 div
      const productInfo = document.createElement('div');
      
      // 제품 이름
      const productName = document.createElement('h2');
      productName.textContent = product.name;

      // 제품 가격
      const productPrice = document.createElement('p');
      productPrice.textContent = `${product.price}원`;

      // 장바구니 버튼
      const addCartBtn = document.createElement('button');
      addCartBtn.id = `cart-${product.id}`;
      addCartBtn.classList.add('addCartBtn');
      addCartBtn.textContent = 'Cart';

      // 주문 버튼
      const orderBtn = document.createElement('button');
      orderBtn.id = `order-${product.id}`;
      orderBtn.classList.add('orderBtn');
      orderBtn.textContent = 'Order';

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
  })
  .catch(error => console.error('Error loading the products:', error));
