// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Terminal logic (only run if elements exist)
  const input = document.querySelector('.terminalInput');
  const output = document.querySelector('.output');
  const terminalBody = document.querySelector('.terminalBody');
  const closeBtn = document.getElementById('closeTerminal');
  const terminal = document.querySelector('.terminal');
  const openBtn = document.getElementById('openTerminal');

  // Use an absolute path to your actual CV file to avoid relative-path issues
  const CV_PATH = 'IustinBarbirCV-EthicalHacker.pdf';
  const CV_FILENAME = 'IustinBarbirCV-EthicalHacker.pdf';

  if (input && output && terminalBody) {
    const commands = {
      help: "Available commands: help, about, projects, contact, get cv, clear",
      about: "I'm Iustin, this is my portofolio",
      projects: "Check out my projects in the 'Projects' section above.",
      contact: "Email: iustin_barbir@yahoo.ro | LinkedIn: Iustin Barbir | do 'get cv' for my CV",
      clear: ""
    };

    let awaitingCVChoice = false;

    input.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      const raw = input.value;
      const command = raw.trim().toLowerCase();
      output.innerHTML += `<div><span class="promptUser">guest@site:</span> ~ $ ${raw}</div>`;
      input.value = '';

      if (awaitingCVChoice) {
        if (command === 't') {
          window.open(CV_PATH, '_blank');
          output.innerHTML += `<div>Opening CV in a new tab...</div>`;
        } else if (command === 'd') {
          const link = document.createElement('a');
          link.href = CV_PATH;
          link.download = CV_FILENAME;
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

      if (command === 'clear') {
        output.innerHTML = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
      }

      if (command === 'get cv') {
        output.innerHTML += `<div>Type "t" for opening in a tab or "d" for downloading</div>`;
        awaitingCVChoice = true;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
      }

      const response = commands[command] || `Command not found: ${command}. Type 'help' for a list of commands.`;
      output.innerHTML += `<div>${response}</div>`;
      terminalBody.scrollTop = terminalBody.scrollHeight;
    });
  }

  // Terminal open/close handlers (only if buttons exist)
  if (closeBtn && terminal && openBtn) {
    closeBtn.addEventListener('click', () => {
      terminal.style.display = 'none';
      openBtn.style.display = 'block';
    });

    openBtn.addEventListener('click', () => {
      terminal.style.display = 'block';
      openBtn.style.display = 'none';
      // focus input when user explicitly opens terminal (safe on mobile)
      if (input) input.focus();
    });
  }

  // Mobile hamburger / sidebar logic
  const mobileButton = document.getElementById('mobile-menu-button');
  const sidebar = document.getElementById('sidebar');

  if (mobileButton && sidebar) {
    // accessibility attributes
    mobileButton.setAttribute('role', 'button');
    mobileButton.setAttribute('aria-controls', 'sidebar');
    mobileButton.setAttribute('aria-expanded', 'false');

    mobileButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle('open');
      document.body.classList.toggle('sidebar-open', isOpen);
      mobileButton.setAttribute('aria-expanded', String(isOpen));
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.classList.contains('open')) return;
      if (!sidebar.contains(e.target) && e.target !== mobileButton) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        mobileButton.setAttribute('aria-expanded', 'false');
      }
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        mobileButton.setAttribute('aria-expanded', 'false');
      }
    });

    // close after clicking any sidebar link (mobile)
    sidebar.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
          document.body.classList.remove('sidebar-open');
          mobileButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Focus terminal input on load only for larger viewports (prevent mobile auto-zoom)
  if (input && terminal) {
    if (window.innerWidth > 768) {
      input.focus();
    }
  }
});