import {ToggleLoginBox} from "./ui.js";
import {InitializeMenuDomainElements} from "./domain.js";

ToggleLoginBox();
InitializeMenuDomainElements();

document.getElementById('logout-button').addEventListener('click', function () {
    window.location.href = 'menu.html';
});