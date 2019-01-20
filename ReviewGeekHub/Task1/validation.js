const password = document.getElementById("password");

password.addEventListener("keyup", passwordValidate);

function passwordValidate(e) {
  const passwordPattern = /[!@#$%^&*(),.?":{}|<>]/;
  if (e.target.value.length > 6 && passwordPattern.test(e.target.value)) {
    password.classList.add("bg-success");
  } else {
    password.classList.remove("bg-success");
  }
}

function showError(container, errorMessage) {
  container.className = 'error';
  const message = document.createElement('small');
  message.className = "text-danger";
  message.innerHTML = errorMessage;
  container.appendChild(message);
}

function resetError(container) {
  container.className = '';
  if (container.lastChild.className === "text-danger") {
    container.removeChild(container.lastChild);
  }
}

function checkValidation(condition, errorMessage, container) {
  if (condition) {
    showError(container, errorMessage)
    return false
  }
  return true
}

function validate(form) {
  const elems = form.elements;
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  resetError(elems.email.parentNode);
  resetError(elems.password.parentNode);
  resetError(elems.password2.parentNode);

  return (checkValidation(!elems.email.value, 'Enter email', elems.email.parentNode) &&
    checkValidation(!emailPattern.test(elems.email.value), 'Invalid email', elems.email.parentNode) &&
    checkValidation(!elems.password.value, 'Enter password', elems.password.parentNode) &&
    checkValidation(elems.password.value.length <= 6, 'Password must be longer than 6 characters', elems.password.parentNode) &&
    checkValidation(elems.password.value !== elems.password2.value, 'Passwords do not match', elems.password2.parentNode)
  )
}