// alert auto dismiss
window.setTimeout(function () {
  $(".alert").alert('close')
}, 3000);


function checkBeforeDelete () {
  return window.confirm(`Are you sure you want to delete this todo? You can't undo this action.`)
}

function checkBeforeAllDone () {
  return window.confirm('Do you want to get all todos done?')
}

function checkBeforeTrash () {
  return window.confirm('Do you want to move all todos to trash?')
}