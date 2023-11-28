import {ToggleLoginBox} from "./ui.js";

ToggleLoginBox();

document.getElementById('logout-button').addEventListener('click', function () {
    window.location.href = 'menu.html';
});