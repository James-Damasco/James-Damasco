document.addEventListener("DOMContentLoaded", () => {

    // --- 1. BOOT SEQUENCE ---
    const bootTexts = [
        "Initializing system...",
        "Loading kernel modules................ DONE",
        "Mounting virtual drives............... DONE",
        "Establishing secure connection........ DONE",
        "Bypassing firewall.................... SUCCESS",
        "Access granted."
    ];

    const bootTextEl = document.getElementById("boot-text");
    const bootProgress = document.getElementById("boot-progress");
    const bootScreen = document.getElementById("boot-screen");
    const mainContent = document.getElementById("main-content");

    let lineIndex = 0;

    function simulateBoot() {
        if (lineIndex < bootTexts.length) {
            bootTextEl.innerHTML += bootTexts[lineIndex] + "<br>";
            bootProgress.style.width = `${(lineIndex + 1) * 20}%`;
            lineIndex++;
            setTimeout(simulateBoot, Math.random() * 400 + 200); // Random delay for realism
        } else {
            setTimeout(() => {
                bootScreen.style.display = "none";
                mainContent.style.display = "block";
                initEffects(); // Start Matrix, Typed.js, AOS once loaded
            }, 800);
        }
    }

    // Start boot sequence
    simulateBoot();


    // --- 2. INITIALIZE EFFECTS AFTER BOOT ---
    function initEffects() {

        // A. Initialize AOS (Scroll Animations)
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });

        // B. Typed.js (Hero Typing Effect)
        new Typed('#typed-text', {
            strings: [
                "WebGL",
                "Frontend Developer",
                "UI/UX Developer",
                "Game Developmer",
                "Web Developer"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            cursorChar: '_'
        });

        // C. Matrix Rain Canvas
        initMatrixRain();
    }


    // --- 3. MATRIX RAIN EFFECT ---
    function initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = Array.from({ length: columns }).map(() => 1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Neon green text
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        setInterval(draw, 30);

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // --- 4. CUSTOM CURSOR ---
    const cursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));


    // --- 5. INTERACTIVE TERMINAL ---
    const cmdInput = document.getElementById('cmd-input');
    const terminalOutput = document.getElementById('terminal-output');

    const commands = {
        help: "Available commands: <br>- about: Learn about me<br>- skills: View tech stack<br>- projects: View my work<br>- contact: How to reach me<br>- clear: Clear terminal",
        about: "Executing >_ ABOUT.exe<br>I am a Senior Frontend Developer bridging code and UI/UX.",
        skills: "Fetching tech stack...<br>[HTML, CSS, JS, Python, Linux, Git, React, Vue, Three.js]",
        projects: "Accessing database...<br>Scroll up to the DATABASE_RECORDS section for full list.",
        contact: "Initiating comms link...<br>Use the form below or ping me at: hacker_dev@protonmail.com",
    };

    cmdInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const inputVal = this.value.trim().toLowerCase();

            // Print user input
            terminalOutput.innerHTML += `<br><span style="color:#fff;">$ ${inputVal}</span><br>`;

            // Handle command
            if (inputVal === 'clear') {
                terminalOutput.innerHTML = "";
            } else if (commands[inputVal]) {
                terminalOutput.innerHTML += `<span style="color:var(--neon-blue);">${commands[inputVal]}</span>`;
            } else if (inputVal !== "") {
                terminalOutput.innerHTML += `<span style="color:red;">Command not found: ${inputVal}. Type 'help' for options.</span>`;
            }

            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;

            // Clear input
            this.value = '';
        }
    });

    // Make clicking the terminal UI focus the input
    document.querySelector('.terminal-ui').addEventListener('click', () => {
        cmdInput.focus();
    });
});