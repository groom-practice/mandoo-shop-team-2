const isLogIn = localStorage.getItem('login');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const main = document.querySelector('.home');
const welcomeSpan = document.querySelector('#welcomeSpan');

if (isLogIn) {
  welcomeSpan.innerHTML = `안녕하세요. ${userInfo['userName']}님!`;
  document.querySelector('.loginBtn').style.display = 'none';

  const headerLogInBtn = document.querySelector('.headerLogInBtn');
  headerLogInBtn.innerHTML = 'LogOut';
  headerLogInBtn.href = ''
  headerLogInBtn.classList.add('logOutBtn');
  headerLogInBtn.addEventListener('click', () => {
    localStorage.removeItem('login');
    location.reload();
  })
} 