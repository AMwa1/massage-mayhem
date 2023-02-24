// Thank you to https://www.section.io/engineering-education/keyboard-events-in-javascript/ for the keyboard event.
document.addEventListener("keydown", (event) => 
{
    if (event.key == "Enter")
    {
        login();
    }
}, false);

function login()
{
    if (document.getElementById("usernameIn").value == "an" && document.getElementById("passwordIn").value == "mo")
    {
        document.getElementById("wrong").innerText = "Actually not wrong!";
        window.open("game.html");
    }
    else
    {
        document.getElementById("wrong").innerText = "Incorrect username or password.";
    }
}
