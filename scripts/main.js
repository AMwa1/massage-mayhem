/*
Hello and welcome to the joyous mess that is the Massage Mayhem code.
Writen by Andy M.
Created on October 20, 2022
Last updated: October 31, 2022 at 10:27 AM
*/

// HTML Elements
const MONEY_LABEL = document.getElementById("moneyHeader");
const STATUS_LABEL = document.getElementById("status");
const MUSCULAR_FINGER_BUTTON = document.getElementById("muscularFingerButton");
const ASSISTANT_BUTTON = document.getElementById("assistantButton");
const AMBI_BUTTON = document.getElementById("ambiButton");
const FRANCHISE_BUTTON = document.getElementById("franchiseButton");
const PUBLIC_OFFERING_BUTTON = document.getElementById("publicOffering")
const RELOCATE_BUTTON = document.getElementById("relocateButton");
const FIRE_SECURITY_BUTTON = document.getElementById("fireSecurity");
const STAT_MPC = document.getElementById("sMpc");
const STAT_MPS = document.getElementById("sMps");
const STAT_ROB = document.getElementById("sRob");
const STAT_MUSCULAR_FINGER = document.getElementById("sMusFinger");
const STAT_AMBI = document.getElementById("sAmbi");
const STAT_ASSISTANT = document.getElementById("sAssistant");
const STAT_FRANCHISE = document.getElementById("sFranchise");
const STAT_PUBLIC_OFFERING = document.getElementById("sPubOffering");
const STAT_RELOCATION = document.getElementById("sRelocation");
const STAT_SECURITY = document.getElementById("sSecurity");

// Variables.
let money = 0;
let moneyPerClick = 4;
let moneyPerSecond = 0;
let partToMassage; // Holds only 3 possible values: "up" "mid" "low" null
let moneyToRob = 0.5;
let robCountdown = 300000;
let muscularFingers = 0;
let muscularFingerCost = 100;
let assistants = 0;
let assistantCost = 400;
let ambidextrous = false;
let franchises = 0;
let franchiseCost = 5000;
let revoltCountdown = 300000;
let publicOffering = false;
let publicOfferingCountdown = 600000;
let powerStruggleCountdown = 30000;
let relocations = 0;
let security = 0;

// Constants.
const FAIL_MESSAGES = ["Ow! What was that?", "Jeez, where did you learn to do this?", "My fish can do better..."];
const UPPER_MESSAGES = ["My upper back is killing me...", "Can you do my upper back?", "Good gracious, the higher portion of my back is causing me quite some agony.\n Would you be so kind as to massage it my good fellow?"];
const MID_MESSAGES = ["The middle of my back... ow...", "Can you do my middle back please?", "AAAAAAAAAAAAAAAH!! MY MIDDLE!!! BACK!!! MASSAGE!! NOOOWWW!!!!"];
const LOW_MESSAGES = ["Lower.\nWhy are you still reading this?\nMASSAGE MY LOWER BACK!", "Can you do my lower back please?", "I don't have a creative way to ask you to do my lower back\n so just go and massage it."];

// Intervals
let updateID = setInterval(update, 20);
setInterval(choosePart, 7000);
setInterval(robberyTimer, 1000);
let mpsID =  setInterval(addMps, 1000);
setInterval(franchiseeRevolt, 1000);
let pubOfferingID = setInterval(publicOfferingTimer, 1000);
setInterval(corporatePowerStruggle, 1000);

// Update handler
function update()
{
    MONEY_LABEL.innerText = "$" + Math.round(money * 100) / 100;
    if (ambidextrous)
        STAT_MPC.innerText = "Money per Click: $" + (moneyPerClick * 2);
    else
        STAT_MPC.innerText = "Money per Click: $" + moneyPerClick;
    STAT_MPS.innerText = "Money per Second: $" + Math.round(moneyPerSecond * 100) / 100 + "\nNet Money per Second: $" + (Math.round((moneyPerSecond - (5 * security)) * 100) / 100);
    if (money >= muscularFingerCost && muscularFingers < 10)
        MUSCULAR_FINGER_BUTTON.disabled = false;
    else
        MUSCULAR_FINGER_BUTTON.disabled = true;
    if (money >= assistantCost)
        ASSISTANT_BUTTON.disabled = false;
    else
        ASSISTANT_BUTTON.disabled = true;
    if (money >= 1000 && ambidextrous == false)
        AMBI_BUTTON.disabled = false;
    if (money >= franchiseCost)
        FRANCHISE_BUTTON.disabled = false;
    else
        FRANCHISE_BUTTON.disabled = true;
    if (money >= 10000)
        RELOCATE_BUTTON.disabled = false;
    else
        RELOCATE_BUTTON.disabled = true;
    if (security > 0)
        FIRE_SECURITY_BUTTON.disabled = false;
    else
        FIRE_SECURITY_BUTTON.disabled = true;
    if (money <= -1000)
    {
        document.write("<h1>Game Over</h1>");
        clearInterval(updateID);
        clearInterval(mpsID);
    }
}

// Functions
function choosePart()
{
    let rand = Math.floor(Math.random() * 3) + 1;
    if (rand == 1)
    {
        partToMassage = "up";
        STATUS_LABEL.innerText = UPPER_MESSAGES[Math.floor(Math.random() * 3) + 0];
    }
    else if (rand == 2)
    {
        partToMassage = "mid";
        STATUS_LABEL.innerText = MID_MESSAGES[Math.floor(Math.random() * 3) + 0];
    }
    else if (rand == 3)
    {
        partToMassage = "low";
        STATUS_LABEL.innerText = LOW_MESSAGES[Math.floor(Math.random() * 3) + 0];
    }
}

function massage(partOfBack) // Should only recive 3 possible values: "up" "mid" "low"
{
    if (partOfBack == partToMassage)
    {
        powerStruggleCountdown = 30000;
        if (muscularFingers >= 5 && (Math.floor(Math.random() * 10) + 1) == 1)
        {
            money -= 100;
            STATUS_LABEL.innerText = "OOOOOWWW! THAT HURT! GIVE ME COMPENSATION! NOOOOW!\n(You lost $100)";
            partToMassage = null;
            update();
        }
        else
        {
            if (ambidextrous) {money += (moneyPerClick * 2);}
                else {money += moneyPerClick;}
            STATUS_LABEL.innerText = "No one is being massaged right now...";
            partToMassage = null;
            update();
        }
    }
    else
    {
        STATUS_LABEL.innerText = FAIL_MESSAGES[Math.floor(Math.random() * 3) + 0];
        partToMassage = null;
    }
}

function addMps()
{
    money += moneyPerSecond - (5 * security);
    update();
}

function robberyTimer()
{
    robCountdown -= 1000;
    STAT_ROB.innerText = "Chance to be robbed in " + (robCountdown / 1000) + " seconds.\nChance to be robbed: " + Math.round(((0.25 * Math.pow(0.8, relocations)) * 100) * 100) / 100 + "%\nMoney at risk: $" + Math.round((money * moneyToRob) * 100) / 100;
    if (robCountdown == 0)
    {
        if (Math.random() < (0.25 * Math.pow(0.2, relocations)) && money > 0)
        {
            money -= money * moneyToRob;
            alert("You've been robbed!");
        }
        robCountdown = 300000;
    }
}

function addMuscularFinger()
{
    money -= muscularFingerCost;
    muscularFingers++;
    moneyPerClick += 5;
    muscularFingerCost += Math.round((0.1 * muscularFingerCost) * 100) / 100;
    if (muscularFingers < 10)
        MUSCULAR_FINGER_BUTTON.innerText = "Extra Muscular Finger ($" + muscularFingerCost + ")";
    else
        MUSCULAR_FINGER_BUTTON.innerText = "Extra Muscular Finger (MAX AMOUNT OWNED)"
    if (muscularFingers < 5)
        STAT_MUSCULAR_FINGER.innerText = "Extra Muscular Fingers Owned: " + muscularFingers + "\nExtra Muscular Finger Boost per Click: $" + muscularFingers * 5 + "\nChance to injure client: 0%";
    else
        STAT_MUSCULAR_FINGER.innerText = "Extra Muscular Fingers Owned: " + muscularFingers + "\nExtra Muscular Finger Boost per Click: $" + muscularFingers * 5 + "\nChance to injure client: 10%";
    update();
}

function addAssistant()
{
    money -= assistantCost;
    assistants++;
    moneyPerSecond++;
    assistantCost += Math.round((0.15 * assistantCost) * 100) / 100;
    ASSISTANT_BUTTON.innerText = "Incredibly Attractive Assistant ($" + assistantCost + ")";
    STAT_ASSISTANT.innerText = "Assistants: " + assistants + "\nMoney per second from Assistants: $" + assistants;
    update();
}

function becomeAmbidextrous()
{
    money -= 1000;
    ambidextrous = true;
    AMBI_BUTTON.disabled = true;
    AMBI_BUTTON.innerText = "Ambidextrous (OWNED)";
    STAT_AMBI.innerText = "Ambidextrous: True";
    update();
}

function buyFranchise()
{
    money -= franchiseCost;
    moneyPerSecond += 200 * Math.pow(0.95, franchises);
    franchises++;
    franchiseCost += Math.round((0.1 * franchiseCost) * 100) / 100;
    FRANCHISE_BUTTON.innerText = "Franchise ($" + franchiseCost + ")";
    if (franchises > 8)
        STAT_FRANCHISE.innerText = "Franchises: " + franchises + "\nMoney per Second from Franchises: $" + (Math.round((moneyPerSecond - assistants) * 100) / 100) + "\nChance for Franchisee Revolt in " + (revoltCountdown / 1000) + " seconds.\nRevolt Chance: 15%";
    else
        STAT_FRANCHISE.innerText = "Franchises: " + franchises + "\nMoney per Second from Franchises: $" + (Math.round((moneyPerSecond - assistants) * 100) / 100) + "\nChance for Franchisee Revolt in: Not possible yet.\nRevolt Chance: 0%";
    update();
}

function franchiseeRevolt()
{
    if (franchises > 8)
    {
        revoltCountdown -= 1000;
        STAT_FRANCHISE.innerText = "Franchises: " + franchises + "\nMoney per Second from Franchises: $" + (Math.round((moneyPerSecond - assistants) * 100) / 100) + "\nChance for Franchisee Revolt in " + (revoltCountdown / 1000) + " seconds.\nRevolt Chance: 15%";
        if (revoltCountdown == 0)
        {
            revoltCountdown = 300000;
            if (Math.random() < 0.15)
            {
                let royalties = moneyPerSecond - assistants;
                let choice = confirm("There is a Franchisee Revolt. You have two options. Click OK to reduce the amount Franchises give by 10%, or click Cancel to lose half of your Franchises.")
                if (choice) // If the user clicked OK...
                {
                    for (let n = 0; n < franchises; n++)
                    {
                        royalties -= (200 * Math.pow(0.95, n)) * 0.1;
                    }
                    moneyPerSecond = royalties + assistants;
                }
                else // If the user clicked Cancel...
                {
                    franchises /= 2;
                    moneyPerSecond += 200 * Math.pow(0.95, franchises);
                }
                if (franchises > 8)
                    STAT_FRANCHISE.innerText = "Franchises: " + franchises + "\nMoney per Second from Franchises: $" + (Math.round((moneyPerSecond - assistants) * 100) / 100) + "\nChance for Franchisee Revolt in " + (revoltCountdown / 1000) + " seconds.\nRevolt Chance: 15%";
                else
                    STAT_FRANCHISE.innerText = "Franchises: " + franchises + "\nMoney per Second from Franchises: $" + (Math.round((moneyPerSecond - assistants) * 100) / 100) + "\nChance for Franchisee Revolt in " + (revoltCountdown / 1000) + " seconds.\nRevolt Chance: 0%";
            }
        }
    }
}

function publicOfferingTimer()
{
    publicOfferingCountdown -= 1000;
    PUBLIC_OFFERING_BUTTON.innerText = "Initial Public Offering (in " + (publicOfferingCountdown / 1000) + " seconds)";
    if (publicOfferingCountdown == 0)
    {
        clearInterval(pubOfferingID);
        PUBLIC_OFFERING_BUTTON.disabled = false;
    }
}

function makePublicOffering()
{
    publicOffering = true;
    money += 50000;
    PUBLIC_OFFERING_BUTTON.disabled = true;
    PUBLIC_OFFERING_BUTTON.innerText = "Initial Public Offering (ACTIVE)";
    STAT_PUBLIC_OFFERING.innerText = "Initial Public Offering: True\nCorporate Power Struggle in: " + (powerStruggleCountdown / 1000) + " seconds."
    update();
}

function corporatePowerStruggle()
{
    if (publicOffering == true)
    {
        powerStruggleCountdown -= 1000;
        STAT_PUBLIC_OFFERING.innerText = "Initial Public Offering: True\nCorporate Power Struggle in: " + (powerStruggleCountdown / 1000) + " seconds."
        if (powerStruggleCountdown == 0)
        {
            document.write("<h1>Game Over.</h1>");
            window.open("elon.html");
        }
    }
}

function relocate()
{
    money -= 10000;
    relocations++;
    STAT_RELOCATION.innerText = "Relocations: " + relocations;
}

function hireSecurity()
{
    security++;
    moneyToRob = 0.5 * Math.pow(0.5, security);
    STAT_SECURITY.innerText = "Security: " + security + "\nTotal cost per second: $" + (5 * security);
}

function fireSecurity()
{
    security--;
    moneyToRob = 0.5 * Math.pow(0.5, security);
    STAT_SECURITY.innerText = "Security: " + security + "\nTotal cost per second: $" + (5 * security);
}
