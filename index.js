const days = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];

// todo 배열
let todos = [
  {
    id: 0,
    contents: "To Do 1",
    isDone: true,
  },
  {
    id: 1,
    contents: "To Do 2 To Do 2 To Do 2 To Do 2 To Do 2 To Do 2 ",
    isDone: false,
  },
  {
    id: 2,
    contents: "To Do 3",
    isDone: false,
  },
];


// todo 완료(체크)할 때마다 리렌더링하는 로직
const todoContainer = document.getElementById("todo-container");

todoContainer.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;

  const todoDiv = event.target.closest(".todo-task");
  const id = Number(todoDiv.dataset.id); // todoDiv.dataset.id는 타입이 string

  const todo = todos.find((data) => data.id === id);
  todo.isDone = event.target.checked;

  // todo 리렌더링
  renderTodos(todos);
});


// todo 수정 시
const todoItem = document.get


function setDate() {
  // 자동으로 오늘 날짜 설정
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();
  day = days[day];

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  today = year + ". " + month + ". " + date + " " + day;

  document.getElementById("date").innerHTML = today;
}

function renderTodos(arr) {
  setDate();

  // 현재 todo를 모두 렌더링
  const todoContainer = document.getElementById("todo-container");

  const undoneTodo = arr.filter((todo) => !todo.isDone);
  const doneTodo = arr.filter((todo) => todo.isDone);

  // undoneTodo와 doneTodo를 합친 배열
  const todoArr = [...undoneTodo, ...doneTodo];

  const todoHTML = todoArr
    .map(
      (todo) => `
        <div class="todo-task" data-id="${todo.id}">
          <div style="width:80%; gap:10px; display:inline-flex; line-height: 1;">  
            <input
              type="checkbox"
              class="todo-checkbox"
              ${todo.isDone ? "checked" : ""}
            />
            <input class="todo-inputbox" value="${todo.contents}" disabled />
          </div>
          <div style="display:flex; gap:12px; align-items:center;">
            <button type="button" class="edit-button" onclick="editTodo(event)">수정</button>
            <img onclick="deleteTodo(event)" src="./images/delete-icon.png" class="delete-icon">
          </div>
        </div>
        `,
    )
    .join("");

  todoContainer.innerHTML = todoHTML;
}


function searchTodo(event) {
  // 1. 검색어 입력 값을 받아와서
  const searchValue = document.getElementById("search-value").value;

  // 2. todo의 contents에 해당 내용이 포함된 것들만
  // 대문자 & 소문자로도 검색 가능
  const filteredTodos = [...todos].filter(
    (todo) =>
      todo.contents.includes(searchValue.toLowerCase()) ||
      todo.contents.includes(searchValue.toUpperCase()),
  );

  // TODO: 엔터 시 검색 가능 추가
  // if(event.target.keycode == 13){
  //     console.log("엔터");
  // }

  if (filteredTodos.length == 0) {
    // 검색된 todo가 0개일 때
    const todoContainer = document.getElementById("todo-container");

    const noResultDiv = document.createElement("div");
    renderTodos([]); // 빈 배열 전달
    noResultDiv.className = "no-result-text";
    noResultDiv.textContent = "검색 결과가 없습니다.";

    todoContainer.appendChild(noResultDiv);
  } else {
    // 3. 리렌더링
    renderTodos(filteredTodos);
  }
}

function addTodo() {
  // 내용 작성된 todo를 추가

  if (document.getElementById("input-value").value.trim() == "") {
    showAlertMessage();
    document.getElementById("input-value").focus();
  } else {
    // 1. 작성한 내용의 객체를 todos 배열에 추가
    todos.push({
      id: todos.length, // TODO: 추가 확인 필요
      contents: document.getElementById("input-value").value,
      isDone: false,
    });

    // todos에 반영 후 렌더링
    renderTodos(todos);

    // 추가 완료됐으면 input 값 초기화
    document.getElementById("input-value").value = "";
    showSuccessText();

    // 완료 메시지는 2초 후에 사라짐
    setTimeout(() => {
      let SuccessMessage = document.getElementById("success-text");
      SuccessMessage.style.display = "none";
    }, 2000);
  }
}

function editTodo(event) {
  const todoInput = event.target.closest('div').parentNode.getElementsByClassName('todo-inputbox')[0];
  const todoId = event.target.closest('div').parentNode.dataset.id;

  // 수정 중일 때 = editing-button
  // 수정 중이 아닐 때 = edit-button
  if (event.target.className == "edit-button"){
    event.target.className = "editing-button";
    todoInput.disabled = false;
    todoInput.focus();
  } else {
    event.target.className = "edit-button";
    // todos 배열에서 해당 ID를 가진 contents의 내용 수정
    todos[todoId].contents = todoInput.value;
    todoInput.disabled = true;
  }
}

function deleteTodo(event) {
  // todo를 삭제
  // 1. 선택한 해당 todo의 id 값을 받아와야 함
  const todoId = event.target.closest("div").dataset.id;

  // 2. todos 배열에서 해당 id 값을 갖고 있는 요소를 splice(인덱스,1)를 통해 삭제
  const getIndex = todos.findIndex((todo) => todo.id == todoId);
  todos.splice(getIndex, 1);

  // 3. 삭제가 완료되면 renderTodos(todos)를 통해 다시 렌더링
  renderTodos(todos);
}

// 완료 메시지 띄우기
function showSuccessText() {
  let BlankWarningMessage = document.getElementById("blank-text");
  let SuccessMessage = document.getElementById("success-text");

  if (!SuccessMessage) {
    const mainContainer = document.getElementById("main-container");

    const successDiv = document.createElement("div");
    successDiv.textContent = "추가가 완료되었습니다! 🎉";
    successDiv.className = "success-text";
    successDiv.id = "success-text";

    mainContainer.appendChild(successDiv);

    if (BlankWarningMessage) {
      BlankWarningMessage.style.display = "none";
    }
  } else if (BlankWarningMessage && !SuccessMessage) {
    BlankWarningMessage.style.display = "none";
    const mainContainer = document.getElementById("main-container");

    const successDiv = document.createElement("div");
    successDiv.textContent = "추가가 완료되었습니다! 🎉";
    successDiv.className = "success-text";
    successDiv.id = "success-text";

    mainContainer.appendChild(successDiv);

    // 완료 메시지는 2초 후에 사라짐
    setTimeout(() => {
      let SuccessMessage = document.getElementById("success-text");
      SuccessMessage.style.display = "none";
    }, 2000);
  }

  // TODO: 완료 메시지는 최대 한 개까지 가능
}

// 빈 내용 입력 시 메시지 추가
function showAlertMessage() {
  let BlankWarningMessage = document.getElementById("blank-text");
  let SuccessMessage = document.getElementById("success-text");

  if (!BlankWarningMessage) {
    const mainContainer = document.getElementById("main-container");

    const alertBlankDiv = document.createElement("div");
    alertBlankDiv.textContent = "내용을 입력해 주세요.";
    alertBlankDiv.className = "blank-text";
    alertBlankDiv.id = "blank-text";

    mainContainer.appendChild(alertBlankDiv);
  } else if (SuccessMessage) {
    const mainContainer = document.getElementById("main-container");

    const alertBlankDiv = document.createElement("div");
    alertBlankDiv.textContent = "내용을 입력해 주세요.";
    alertBlankDiv.className = "blank-text";
    alertBlankDiv.id = "blank-text";

    mainContainer.appendChild(alertBlankDiv);
    SuccessMessage.style.display = "none";
  }

  // TODO: 빈칸 경고 메시지는 최대 한 개까지 가능
  // TODO: 무조건 완료 메시지보다 위에 있어야 함
}

function inputTodo() {
  // todo의 내용을 입력하는 함수
}
