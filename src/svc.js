import { getRandomInt } from "./domain.js"
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

// Important Constants
const pigPicA = "../Images/piggieA.png";
const pigPicB = "../Images/piggieB.png";
const pigPicC = "../Images/piggieC.png";
const pigPicD = "../Images/piggieD.png";
const pigPicE = "../Images/piggieE.png";

const personalities = ["sassy", "shy", "angry", "scared", "chubby", "smart", "kind", "potato", "dumb", "sweet"]

const pigPics = [pigPicA, pigPicB, pigPicC, pigPicD, pigPicE]

// Important Variables:
var username;
var password;
var gold = 0;
export var piggies = [];
var numOfWaterBottles = 0;
var numOfFoodBowls = 0;

// Guinea Pig Class

export class GuineaPig {
    constructor(name, rarity, personality, image) {
        this.name = name;
        this.rarity = rarity;
        this.personality = personality;
        this.image = image;
    }
}

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Saving and storing user data

export function SaveData() {
    return new Promise((resolve, reject) => {
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
                body: JSON.stringify({ username, password, gold, numOfFoodBowls, numOfWaterBottles, piggies }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    resolve(data); // Resolve the promise on success
                })
                .catch(error => {
                    console.error('Error:', error);
                    reject(error); // Reject the promise on error
                });
        } else {
            console.log("No user logged in");
            reject("No user logged in"); // Reject the promise if no user is logged in
        }
    });
}


export function LoadData() {
    return new Promise((resolve, reject) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const _username = urlSearchParams.get('username');

        if (!_username) {
            // Reject the promise if username is not found
            reject("Username not found in the query string");
            return;
        }

        const url = `http://localhost:3000/fetchUserData?username=${_username}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(userData => {
                console.log('User data from server:', userData);
                // Update the important variables based on the loaded data
                username = userData.Username;
                password = userData.Password;
                if (userData.gold === null) {
                    gold = 0;
                }
                else {
                    gold = parseInt(userData.Gold, 10);
                }
                if (userData.numOfFoodBowls === null) {
                    numOfFoodBowls = 0;
                }
                else {
                    numOfFoodBowls = parseInt(userData.numOfFoodBowls, 10);
                }
                if (userData.numOfWaterBottles === null) {
                    numOfWaterBottles = 0;
                }
                else {
                    numOfWaterBottles = parseInt(userData.numOfWaterBottles, 10);
                }

                // Convert each pig object in the array to a GuineaPig instance
                if (userData.Piggies.length > 0) {
                    piggies = userData.Piggies.map(pig => new GuineaPig(pig.name, pig.rarity, pig.personality, pig.image));
                    console.log(`Username: ${username} Password: ${password} Gold: ${gold} Food: ${numOfFoodBowls} Water: ${numOfWaterBottles} Piggies: ${JSON.stringify(piggies)}`);
                    console.log(`Piggies array has: ${JSON.stringify(piggies)}`);
                }
                resolve(userData);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Reject the promise with the error
                reject(error);
            });
    });
}

export function ModifyGold(operation, quantity) {
    switch (operation) {
        case "add":
            gold += quantity;
            break;
        case "sub":
            gold -= quantity;
            break;
        case "set":
            gold = quantity;
            break;
        default:
            console.log(`ModifyGold cannot use operation: ${operation}`);
            break;
    }
    console.log("Gold: ", gold);
}

export function ModifyWater(operation, quantity) {
    switch (operation) {
        case "add":
            numOfWaterBottles += quantity;
            break;
        case "sub":
            numOfWaterBottles -= quantity;
            break;
        case "set":
            numOfWaterBottles = quantity;
            break;
        default:
            console.log(`ModifyWater cannot use operation: ${operation}`);
            break;
    }
    console.log("Water: ", numOfWaterBottles);
}

export function ModifyFood(operation, quantity) {
    switch (operation) {
        case "add":
            numOfFoodBowls += quantity;
            break;
        case "sub":
            numOfFoodBowls -= quantity;
            break;
        case "set":
            numOfFoodBowls = quantity;
            break;
        default:
            console.log(`ModifyFood cannot use operation: ${operation}`);
            break;
    }
    console.log("Water: ", numOfFoodBowls);
}

export function GetGoldAmmount() {
    return gold;
}

export function GetWaterAmmount() {
    return numOfWaterBottles;
}

export function GetFoodAmmount() {
    return numOfFoodBowls;
}

export function CreateNewPig(chosenName, rarePurchase) {
    const newName = chosenName;
    var _rarity = 1;
    if (rarePurchase) {
        _rarity = getRandomInt(6, 11);
    }
    else {
        _rarity = getRandomInt(1, 11);
    }
    const imageIndex = getRandomInt(0, 5);
    const _image = pigPics[imageIndex];
    const personalityIndex = getRandomInt(0, personalities.length);
    const _personality = personalities[personalityIndex];
    const guineaPig = new GuineaPig(newName, _rarity, _personality, _image);
    piggies.push(guineaPig);
    console.log("New guinea pig created: ", guineaPig);
}

export function GetPassword() {
    return password;
}