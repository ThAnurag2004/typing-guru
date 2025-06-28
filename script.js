window.addEventListener('keydown', (e) => {
    const key = e.code;
    const button = document.getElementById(key);
    if (button) {
        button.style.backgroundColor = "yellow";
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.code;
    const button = document.getElementById(key);
    if (button) {
        button.style.backgroundColor = "white";
    }
});
