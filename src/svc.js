const wordList = [ // These are the words for Wordle
    "Above", "Acute", "Alive", "Alone", "Angry", "Aware", "Awful", "Basic", "Black", "Blind", "Brave", "Brief", "Broad", "Brown",
    "Cheap", "Chief", "Civil", "Clean", "Clear", "Close", "Crazy", "Daily", "Dirty", "Early", "Empty", "Equal", "Exact", "Extra",
    "Faint", "False", "Fifth", "Final", "First", "Fresh", "Front", "Funny", "Giant", "Grand", "Great", "Green", "Gross", "Happy",
    "Harsh", "Heavy", "Human", "Ideal", "Inner", "Joint", "Large", "Legal", "Level", "Light", "Local", "Loose", "Lucky", "Magic",
    "Major", "Minor", "Moral", "Naked", "Nasty", "Naval", "Other", "Outer", "Plain", "Prime", "Prior", "Proud", "Quick", "Quiet",
    "Rapid", "Ready", "Right", "Roman", "Rough", "Round", "Royal", "Rural", "Sharp", "Sheer", "Short", "Silly", "Sixth", "Small",
    "Smart", "Solid", "Sorry", "Spare", "Steep", "Still", "Super", "Sweet", "Thick", "Third", "Tight", "Total", "Tough", "Upper",
    "Upset", "Urban", "Usual", "Vague", "Valid", "Vital", "White", "Whole", "Wrong", "Young", "Abuse", "Adult", "Agent", "Anger",
    "Apple", "Award", "Basis", "Beach", "Birth", "Block", "Blood", "Board", "Brain", "Bread", "Break", "Brown", "Buyer", "Cause",
    "Chain", "Chair", "Chest", "Chief", "Child", "China", "Claim", "Class", "Clock", "Coach", "Coast", "Court", "Cover", "Cream",
    "Crime", "Cross", "Crowd", "Crown", "Cycle", "Dance", "Death", "Depth", "Doubt", "Draft", "Drama", "Dream", "Dress", "Drink",
    "Drive", "Earth", "Enemy", "Entry", "Error", "Event", "Faith", "Fault", "Field", "Fight", "Final", "Floor", "Focus", "Force",
    "Frame", "Frank", "Front", "Fruit", "Glass", "Grant", "Grass", "Green", "Group", "Guide", "Heart", "Henry", "Horse", "Hotel",
    "House", "Image", "Index", "Input", "Issue", "Japan", "Jones", "Judge", "Knife", "Laura", "Layer", "Level", "Lewis", "Light",
    "Limit", "Lunch", "Major", "March", "Match", "Metal", "Model", "Money", "Month", "Motor", "Mouth", "Music", "Night", "Noise",
    "North", "Novel", "Nurse", "Offer", "Order", "Other", "Owner", "Panel", "Paper", "Party", "Peace", "Peter", "Phase", "Phone",
    "Piece", "Pilot", "Pitch", "Place", "Plane", "Plant", "Plate", "Point", "Pound", "Power", "Press", "Price", "Pride", "Prize",
    "Proof", "Queen", "Radio", "Range", "Ratio", "Reply", "Right", "River", "Round", "Route", "Rugby", "Scale", "Scene", "Scope",
    "Score", "Sense", "Shape", "Share", "Sheep", "Sheet", "Shift", "Shirt", "Shock", "Sight", "Simon", "Skill", "Sleep", "Smile",
    "Smith", "Smoke", "Sound", "South", "Space", "Speed", "Spite", "Sport", "Squad", "Staff", "Stage", "Start", "State", "Steam",
    "Steel", "Stock", "Stone", "Store", "Study", "Stuff", "Style", "Sugar", "Table", "Taste", "Terry", "Theme", "Thing", "Title",
    "Total", "Touch", "Tower", "Track", "Trade", "Train", "Trend", "Trial", "Trust", "Truth", "Uncle", "Union", "Unity", "Value",
    "Video", "Visit", "Voice", "Waste", "Watch", "Water", "While", "White", "Whole", "Woman", "World", "Youth", "There", "Where",
    "Which", "Whose", "Whoso", "Yours", "Yours", "Alter", "Apply", "Argue", "Arise", "Avoid", "Begin", "Blame", "Break",
    "Bring", "Build", "Burst", "Carry", "Catch", "Cause", "Check", "Claim", "Clean", "Clear", "Climb", "Close", "Count",
    "Cover", "Cross", "Dance", "Doubt", "Drink", "Drive", "Enjoy", "Enter", "Exist", "Fight", "Focus", "Force", "Guess",
    "Imply", "Issue", "Judge", "Laugh", "Learn", "Leave", "Limit", "Marry", "Match", "Occur", "Offer", "Order", "Phone",
    "Place", "Point", "Press", "Prove", "Raise", "Reach", "Refer", "Relax", "Serve", "Shall", "Share", "Shift", "Shoot",
    "Sleep", "Solve", "Sound", "Speak", "Spend", "Split", "Stand", "Start", "State", "Stick", "Study", "Teach", "Thank",
    "Think", "Throw", "Touch", "Train", "Treat", "Trust", "Visit", "Voice", "Waste", "Watch", "Worry", "Would", "Write",
    "Afore", "After", "Since", "Until", "Where", "While", "Aback", "Abaft", "Aboon", "About", "Above", "Accel", "Adown",
    "Afoot", "Afore", "Afoul", "After", "Again", "Agape", "Agogo", "Agone", "Ahead", "Ahull", "Alife", "Alike", "Aloft",
    "Alone", "Along", "Aloof", "Aloud", "Amiss", "Amply", "Apace", "Apart", "Aptly", "Arear", "Aside", "Askew", "Awful", "Badly",
    "Bally", "Below", "Canny", "Cheap", "Clean", "Clear", "Coyly", "Daily", "Dimly", "Dirty", "Ditto", "Dryly", "Dully", "Early",
    "Extra", "False", "Fatly", "Feyly", "First", "Fitly", "Forte", "Forth", "Fresh", "Fully", "Funny", "Gaily", "Gayly", "Godly",
    "Great", "Haply", "Heavy", "Hella", "Hence", "Hotly", "Icily", "Infra", "Jildi", "Jolly", "Laxly", "Lento", "Light", "Lowly",
    "Madly", "Maybe", "Never", "Newly", "Nobly", "Oddly", "Often", "Other", "Ought", "Party", "Piano", "Plain", "Plonk", "Plumb",
    "Prior", "Queer", "Quick", "Quite", "Ramen", "Rapid", "Redly", "Right", "Rough", "Round", "Sadly", "Secus", "Selly", "Sharp",
    "Sheer", "Shily", "Short", "Shyly", "Silly", "Since", "Sleek", "Slyly", "Small", "So-So", "Sound", "Spang", "Stark", "Still",
    "Stone", "Stour", "Super", "Tally", "Tanto", "There", "Thick", "Tight", "Today", "Tomoz", "Truly", "Twice", "Under", "Utter",
    "Verry", "Wanly", "Wetly", "Where", "Wrong", "Wryly", "Abaft", "Aboon", "About", "Above", "Adown", "Afore", "After", "Along",
    "Among", "Below", "Circa", "Cross", "Minus", "Neath", "Round", "Since", "Under", "Until", "Aargh", "Adios", "Alack",
    "Aloha", "Basta", "Begad", "Bless", "Bravo", "Damme", "Frick", "Golly", "Gratz", "Hallo", "Havoc", "Hella", "Howay",
    "Howdy", "Hullo", "Huzza", "Jesus", "Kapow", "Loose", "Lordy", "Marry", "Plonk", "Skoal", "Sniff", "Sooey", "Thiam",
    "Thwap", "Viola", "Vivat", "Wacko", "Wahey", "Wilma", "Wirra", "Woops", "Wowie", "Yecch", "Yeeha", "Yeesh", "Yowch", "Zowie"
]

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Saving and storing user data

export function SaveData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const username = urlSearchParams.get('username');
    const password = urlSearchParams.get('password');

    if (username !== null && password !== null) {
        // Send a request to the server to save data
        fetch('http://localhost:3000/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
    else {
        console.log("No user logged in");
    }
}

export function LoadData(username) {
    const url = `http://localhost:3000/fetchUserData?username=${username}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(userData => {
            console.log('User data from server:', userData);
            // Do something with the fetched data
            return userData;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle errors as needed
        });
}
