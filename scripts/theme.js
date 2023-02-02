function setTheme() {
    document.documentElement.classList.toggle('dark')
    
    document.querySelector('#toggleTheme').textContent = newTheme;
}

document.querySelector('#toggleTheme').addEventListener('click', setTheme)