// 전역 변수
let id = 0;

// todo 배열
let todos = [
    {
        id: 0,
        contents: "To Do 1",
        isDone: true,
    },
    {
        id: 1,
        contents: "To Do 2",
        isDone: false,
    },
    {
        id: 2,
        contents: "To Do 3",
        isDone: false,
    },
]

const todoContainer = document.getElementById('todo-container');

todoContainer.addEventListener('change', (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;

  const todoDiv = event.target.closest('.todo-task');
  const id = Number(todoDiv.dataset.id);

  const todo = todos.find(data => data.id === id);
  todo.isDone = event.target.checked;

  // todo 리렌더링
  renderTodos(todos);
});

function renderTodos(arr) { // 현재 todo를 모두 렌더링
    const todoContainer = document.getElementById('todo-container');

    const undoneTodo = arr.filter(todo => !todo.isDone);
    const doneTodo = arr.filter(todo => todo.isDone);

    // undoneTodo와 doneTodo를 합친 배열
    const todoArr = [ ...undoneTodo, ...doneTodo ];

    const todoHTML = todoArr.map((todo) => `
        <div class="todo-task" data-id="${todo.id}">
          <span>${todo.contents}</span>
          <input 
            type="checkbox"
            class="todo-checkbox"
            ${todo.isDone ? 'checked' : ''}
          />
        </div>
        `
    ).join('');

    todoContainer.innerHTML = todoHTML;

}

function searchTodo(event) {    
    // 1. 검색어 입력 값을 받아와서
    const searchValue = document.getElementById('search-value').value;

    // 2. todo의 contents에 해당 내용이 포함된 것들만
    // 대문자 & 소문자로도 검색 가능
    const filteredTodos = [...todos].filter((todo) => 
        todo.contents.includes(searchValue.toLowerCase()) ||
        todo.contents.includes(searchValue.toUpperCase())
    );

    // TODO: 엔터 시 검색 가능 추가
    // if(event.target.keycode == 13){
    //     console.log("엔터");
    // }
        
    if (filteredTodos.length == 0){ // 검색된 todo가 0개일 때
        const todoContainer = document.getElementById('todo-container');

        const noResultDiv = document.createElement('div');
        renderTodos([]); // 빈 배열 전달
        noResultDiv.className = 'no-result-text';
        noResultDiv.textContent = "검색 결과가 없습니다.";

        todoContainer.appendChild(noResultDiv);
    } else {
        // 3. 리렌더링
        renderTodos(filteredTodos);
    }


}

function addTodo(){ // 내용 작성된 todo를 추가
    
    if (document.getElementById('input-value').value.trim() == ""){
        showAlertMessage();
        document.getElementById('input-value').focus();
    } else {
        // 1. 작성한 내용의 객체를 todos 배열에 추가
        todos.push({
            id: todos.length,  // TODO: 추가 확인 필요
            contents: document.getElementById('input-value').value,
            isDone: false
        });
        
        // todos에 반영 후 렌더링
        renderTodos(todos);

        // 추가 완료됐으면 input 값 초기화
        document.getElementById('input-value').value = "";
        showSuccessText();
        
    }
}


// 완료 메시지 띄우기
function showSuccessText(){
    let existingBlankMessage = document.getElementById('blank-text');
    let existingSuccessMessage = document.getElementById('success-text');
    if (!existingSuccessMessage){
        const mainContainer = document.getElementById('main-container');
    
        const successDiv = document.createElement('div');
        successDiv.textContent = "추가가 완료되었습니다! 🎉";
        successDiv.className = "success-text";
        successDiv.id = 'success-text';
    
        mainContainer.appendChild(successDiv);

        if(existingBlankMessage) {
            existingBlankMessage.style.display = 'none';
        }
    } 

    // TODO: 완료 메시지는 최대 한 개까지 가능
}

// 빈 내용 입력 시 메시지 추가
function showAlertMessage() {
    let existingBlankMessage = document.getElementById('blank-text');

    if (!existingBlankMessage) {
        const mainContainer = document.getElementById('main-container');
    
        const alertBlankDiv = document.createElement('div');
        alertBlankDiv.textContent = "내용을 입력해 주세요.";
        alertBlankDiv.className = "blank-text";
        alertBlankDiv.id = "blank-text";
    
        mainContainer.appendChild(alertBlankDiv);
    }

    // TODO: 빈칸 알림 메시지는 최대 한 개까지 가능
    // TODO: 무조건 완료 메시지보다 위에 있어야 함
}

function inputTodo(){ // todo의 내용을 입력하는 함수

}


