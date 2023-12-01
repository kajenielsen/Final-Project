import {ToggleLoginBox} from "./ui.js";
import {InitializeMenuDomainElements} from "./domain.js";
import { SaveData } from "./svc.js";

ToggleLoginBox();
InitializeMenuDomainElements();

document.getElementById('logout-button').addEventListener('click', async function () {
    try {
        const data = await SaveData();
        // Code to execute on SaveData success
        console.log("SaveData successful:", data);
        window.location.href = 'menu.html';
        console.log("Redirecting...");
    } catch (error) {
        // Code to execute on SaveData error
        console.error("SaveData error:", error);
        // Handle the error or stop execution
    }
    
});

