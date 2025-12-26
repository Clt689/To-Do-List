// 전역 변수
let id = 0;


// todo 배열
const todos = [
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

  // ⭐ 핵심
  renderTodos();
});

function renderTodos() { // 현재 todo를 모두 렌더링
    const todoContainer = document.getElementById('todo-container');

    const undoneTodo = todos.filter(todo => !todo.isDone);
    const doneTodo = todos.filter(todo => todo.isDone);

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

function addTodo(){ // 내용 작성된 todo를 추가
    // 입력된 게 없으면 alert해줘야 함

}



function inputTodo(){ // todo의 내용을 입력하는 함수

}

function sortTodo(){ // 완료된 Todo는 제일 밑으로
    // 1. checkbox들의 checked인 애들은 제일 밑으로
    // 2. todo 재정렬

}

