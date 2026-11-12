
console.log("자기소개 페이지 JS 연결 완료");

const goalInput = document.querySelector("#goalInput");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalList = document.querySelector("#goalList");
const errorMessage = document.querySelector("#errorMessage");
const goalCount = document.querySelector("#goalCount");

let goalTotal = 0;

function updateGoalCount() {
  goalCount.textContent = `현재 목표 ${goalTotal}개`;
}

function addGoal() {
  const goalText = goalInput.value.trim();

  if (goalText === "") {
    errorMessage.textContent = "목표를 입력해주세요.";
    return;
  }

  errorMessage.textContent = "";

  const li = document.createElement("li");
  li.classList.add("goal-item");

  const span = document.createElement("span");
  span.textContent = goalText;
  span.classList.add("goal-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.classList.add("delete-btn");

  span.addEventListener("click", function () {
    span.classList.toggle("done");
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    goalTotal = goalTotal - 1;
    updateGoalCount();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  goalList.appendChild(li);

  goalTotal = goalTotal + 1;
  updateGoalCount();

  goalInput.value = "";
}

// 목표 추가 버튼 실행
addGoalBtn.addEventListener("click", addGoal);


// 비동기 실행 순서 확인
console.log("1. 첫 번째 명령 실행");

setTimeout(() => {
  console.log("2. 2초 뒤에 실행되는 명령!");
}, 2000);

console.log("3. 두 번째 명령 실행");


// 콜백 함수
const first = function (callback) {
  console.log("콜백 함수 안의 함수");
  callback();
};

const second = function () {
  console.log("콜백 함수");
};

first(second);


// Promise를 이용한 로그인 기능
class UserStorage {

  loginUser(id, password) {
    return new Promise((resolve, reject) => {

      setTimeout(() => {

        if ((id === 'eunchae' && password === '1234') ||
            (id === 'web' && password === '1234')) {

          resolve(id);

        } else {
          reject(new Error('user not found'));
        }

      }, 1000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {

      setTimeout(() => {

        if (user === 'eunchae') {
          resolve({ name: 'eunchae', role: 'admin' });

        } else {
          reject(new Error('no access'));
        }

      }, 1000);
    });
  }
}

const userStorage = new UserStorage();

const id = prompt('id를 입력하세요');
const password = prompt('password를 입력하세요');

userStorage
  .loginUser(id, password)
  .then(userStorage.getRoles)
  .then(user => alert(`${user.name}님은 ${user.role}입니다.`))
  .catch(console.log);


// async / await 비동기 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return '🍎';
}

async function getBanana() {
  await delay(1000);
  return '🍌';
}

async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();

  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);


// 방명록 기능

// 1. 제어할 태그들 전부 가져오기
const serverMsg = document.querySelector('#server-msg');
const myMsg = document.querySelector('#my-msg');
const nameInput = document.querySelector('#guest-name');
const msgInput = document.querySelector('#guest-msg');
const submitBtn = document.querySelector('#submit-btn');

// 2. 1.5초 뒤에 문자열 하나를 주는 함수
function getMessageData() {
  return new Promise(function(resolve) {

    setTimeout(function() {
      resolve("익명: 웹 기초 파이팅입니다!");
    }, 1500);

  });
}

// 3. 기다렸다가 화면 글자 바꾸기
async function initGuestbook() {

  const data = await getMessageData();

  serverMsg.textContent = data;
}

// 4. 버튼 눌러서 새 방명록 띄우기
let isFirst = true;

submitBtn.addEventListener('click', function() {

  const name = nameInput.value.trim();
  const msg = msgInput.value.trim();

  if (name === '' || msg === '') {
    alert("이름과 메시지를 모두 입력해주세요.");
    return;
  }

  const result = name + ": " + msg + "<br><br>";

  if (isFirst === true) {

    myMsg.innerHTML = result;
    isFirst = false;

  } else {

    myMsg.innerHTML = myMsg.innerHTML + result;

  }

  nameInput.value = '';
  msgInput.value = '';

});

// 5. 페이지가 열리면 함수 실행
initGuestbook();
