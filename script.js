const input = document.querySelector(".terminalInput");
const output = document.querySelector(".output");
const terminalBody = document.querySelector(".terminalBody");

const commands = {
  help: "Available commands: help, about, projects, contact, get cv, clear",
  about: "I'm [Your Name], passionate about cybersecurity.",
  projects: "Check out my projects in the 'Projects' section above.",
  contact: "Email: your.email@example.com | LinkedIn: @username | do 'get cv' for my CV",
  clear: ""
};

let awaitingCVChoice = false;

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const command = input.value.trim().toLowerCase();
        output.innerHTML += `<div><span class="promptUser">guest@site:</span> ~ $ ${input.value}</div>`;
        input.value = "";

        if (awaitingCVChoice) {
            if (command === "t") {
                window.open("CV.pdf", "_blank");
                output.innerHTML += `<div>Opening CV in a new tab...</div>`;
            } else if (command === "d") {
                const link = document.createElement("a");
                link.href = "CV.pdf";
                link.download = "CV.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                output.innerHTML += `<div>Downloading CV...</div>`;
            } else {
                output.innerHTML += `<div>Invalid choice. Type "t" for tab or "d" for download.</div>`;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                return;
            }
            awaitingCVChoice = false;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            return;
        }

        if (command === "clear") {
            output.innerHTML = "";
            terminalBody.scrollTop = terminalBody.scrollHeight;
            return;
        }

        if (command === "get cv") {
            output.innerHTML += `<div>Type "t" for opening in a tab or "d" for downloading</div>`;
            awaitingCVChoice = true;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            return;
        }

        const response = commands[command] || `Command not found: ${command}. Type 'help' for a list of commands.`;
        output.innerHTML += `<div>${response}</div>`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

const closeBtn = document.getElementById("closeTerminal");
const terminal = document.querySelector(".terminal");
const openBtn = document.getElementById("openTerminal");

closeBtn.addEventListener("click", () => {
    terminal.style.display = "none";
    openBtn.style.display = "block";
});

openBtn.addEventListener("click", () => {
    terminal.style.display = "block";
    openBtn.style.display = "none";
});
