const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#passConfirm");
const errorMsg = document.querySelector(".formLayout .errorMsg");

function passInvalid () {
    passwordInput.classList.add("error");
    passwordConfirmInput.classList.add("error");
    errorMsg.style.visibility = "visible";
}
passInvalid();