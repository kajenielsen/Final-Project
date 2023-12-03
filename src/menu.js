import { ToggleLoginBox } from "./ui.js";
import { InitializeMenuDomainElements } from "./domain.js";
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

document.getElementById('createAccount').addEventListener('click', async function () {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Send a request to the server to create a new account
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Display success message

            // Call SaveData only after a successful account registration
            try {
                const saveDataResponse = await SaveData();
                // Code to execute on SaveData success
                console.log("SaveData successful:", saveDataResponse);
                window.location.href = 'menu.html';
                console.log("Redirecting...");
            } catch (saveDataError) {
                // Code to execute on SaveData error
                console.error("SaveData error:", saveDataError);
                // Handle the error or stop execution
            }
        } else {
            alert(`Error: ${data.error}`); // Display error message
        }
    } catch (error) {
        console.error('Error creating new account:', error);
    }
});


