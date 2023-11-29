export function InitializeMenuDomainElements() { // Wasn't sure what to name this.
    document.addEventListener('DOMContentLoaded', function () {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        console.log(`Domain has username and password as ${username} and ${password}.`);
        // Wordle and Farm link click events
        document.querySelector('.wordlebutton').addEventListener('click', function () {
            if (username !== null && password !== null) {
                event.preventDefault();
                redirectToPage(`wordle.html?username=${username}&password=${password}`);
                console.log("Redirecting...");
            }
            else {
                event.preventDefault();
                redirectToPage('menu.html');
                window.alert("You must log in to access Wordle.");
            }
        });
        document.querySelector('.farmbutton').addEventListener('click', function () {
            if (username !== null && password !== null) {
                event.preventDefault();
                redirectToPage(`farm.html?username=${username}&password=${password}`);
                console.log("Redirecting...");
            }
            else {
                event.preventDefault();
                redirectToPage('menu.html');
                window.alert("You must log in to access Farm.");
            }
        });
    });
}

export function InitializeWordleDomainElements() {
    document.querySelector('.returntohome').addEventListener('click', function () {
        event.preventDefault();
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        redirectToPage(`menu.html?username=${username}&password=${password}`);
        console.log("Redirecting...");
    });
}

export function InitializeFarmDomainElements() {
    document.querySelector('.returntohome').addEventListener('click', function () {
        event.preventDefault();
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        redirectToPage(`menu.html?username=${username}&password=${password}`);
        console.log("Redirecting...");
    });
}

function redirectToPage(url) {
    window.location.href = url;
}