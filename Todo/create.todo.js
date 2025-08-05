const inputTodo = document.getElementById("inputTodo");
const createTodo = document.getElementById("createTodo");
//random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

createTodo.addEventListener("click", () => {
  const myTodo = {
    id: getRandomInt(1, 1000),
    name: inputTodo.value,
  };
  const currentTodoStr = localStorage.getItem("Todo");
  if (currentTodoStr) {
    const currentTodo = JSON.parse(currentTodoStr);
    currentTodo.push(myTodo);
    localStorage.setItem("Todo", JSON.stringify(currentTodo));
  } else {
    localStorage.setItem("Todo", JSON.stringify([myTodo]));
  }
  window.location.reload();
});
const loadTodo = () => {
  const todoListStr = localStorage.getItem("Todo");
  if (todoListStr) {
    const todoList = JSON.parse(todoListStr);

    const tbody = document.querySelector("#todoList tbody");
    if (todoList && todoList.length) {
      todoList.forEach((todo, index) => {
        tbody.innerHTML += `
            <tr>
          <td class="px-4 py-3 text-sm whitespace-nowrap text-gray-600">${todo.id}</td>
          <td class="px-4 py-3 text-sm whitespace-nowrap text-gray-600">${todo.name}</td>
          <td class="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
            <button data-id=${todo.id} class="deleteTodo rounded bg-red-500 p-1">Xóa</button>
          </td>
        </tr>
            `;
      });
    }
  }
};
loadTodo();
const deleteBtns = document.querySelectorAll(".deleteTodo");
console.log(deleteBtns);
if (deleteBtns) {
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      
      deleteTodo(id);
    });
  });
}

const deleteTodo = (id) => {
  const currentTodoStr = localStorage.getItem("Todo");
  if (currentTodoStr) {
    const currentTodo = JSON.parse(currentTodoStr);
    console.log(currentTodo, id);
    const newTodo = currentTodo.filter((todo, index) => 
      todo.id +'' !== id

    );
    console.log(newTodo, id);
    localStorage.setItem("Todo", JSON.stringify(newTodo));
    window.location.reload();
  }
};
