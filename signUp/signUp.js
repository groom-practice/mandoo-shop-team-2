//sign up btn
let signUpBtn = () => {
  const userId = document.querySelector('#userId');
  const userPw = document.querySelector('#userPw');
  const userName = document.querySelector('#userName');
  let userInfo = {};

  if(userId.value === '' || userPw.value === '' || userName.value === '') {
    alert('ID, Password, 이름 모두 입력해주세요.');
    return;
  }

  if(userId.value.length < 6) {
    alert('ID는 6글자 이상 입력해주세요.');
    return;
  }
  
  if(userPw.value.length < 8) {
    alert('비밀번호는 8글자 이상 입력해주세요.');
    return;
  }
  userInfo['userId'] = userId.value;
  userInfo['userPw'] = userPw.value;
  userInfo['userName'] = userName.value;
  alert('회원가입이 완료되었습니다.')
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  location.href = '../login/login.html'
}

document.querySelector('.signBtn').addEventListener('click',signUpBtn)