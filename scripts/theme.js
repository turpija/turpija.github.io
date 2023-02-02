function setTheme() {
    document.documentElement.classList.toggle('dark')

    if (document.documentElement.classList.value === "dark") {
        document.querySelector('#toggleTheme').innerHTML = "Light";
    } else {
        document.querySelector('#toggleTheme').innerHTML = "Dark";
    }
}

document.querySelector('#toggleTheme').addEventListener('click', setTheme)