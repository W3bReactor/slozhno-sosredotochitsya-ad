const themeButtons = document.querySelectorAll('[data-theme-btn]');

function getSystemTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
}

function setTheme(themeName) {
    localStorage.setItem('selected-theme', themeName);

    let actualTheme = themeName;
    if (themeName === 'auto') {
        actualTheme = getSystemTheme();
    }

    document.documentElement.setAttribute('data-theme', actualTheme);

    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme-btn') === themeName) {
            btn.classList.add('theme-btn--active');
        } else {
            btn.classList.remove('theme-btn--active');
        }
    });
}

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTheme = button.getAttribute('data-theme-btn');
        setTheme(targetTheme);
    });
});

const savedTheme = localStorage.getItem('selected-theme') || 'auto';
setTheme(savedTheme);

console.log(window.matchMedia('(prefers-color-scheme: dark)'))

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('selected-theme') === 'auto') {
        setTheme('auto');
    }
});
