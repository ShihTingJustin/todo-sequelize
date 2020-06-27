// alert auto dismiss
window.setTimeout(function () {
  $(".alert").alert('close')
}, 3000);


const todoCard = document.querySelector('.todo-card')
todoCard.addEventListener('click', e => {
  if (e.target.classList.contains('todos')) {
    console.log(123)
  }
})