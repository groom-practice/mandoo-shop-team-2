const userInfo = JSON.parse(localStorage.getItem('userInfo'));

if(!userInfo){
  alert(' 회원가입을 먼저 해주세요!');
  location.href = '../signUp/signUp.html'
}

let logInBtn = () => {
  let inputId = document.querySelector('#inputId').value;
  let inputPw = document.querySelector('#inputPw').value;
  if(inputId === '' || inputPw === ''){
    alert('아이디와 비밀번호 모두 입력해주세요.');
    return;
  }
  if(userInfo['userId'] !== inputId){
    alert('아이디가 일치하지 않습니다.');
    return;
  }
  if(userInfo['userPw'] !== inputPw){
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  alert('로그인 성공');
  localStorage.setItem('login' , true);
  location.href = '../index.html';
}
document.querySelector('.logInBtn').addEventListener('click',logInBtn)