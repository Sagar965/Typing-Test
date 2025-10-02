// static/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const textToTypeElement = document.getElementById('text-to-type');
    const userInputElement = document.getElementById('user-input');
    const timerDisplay = document.getElementById('timer-display');
    const resultsElement = document.getElementById('results');
    const finalWpmElement = document.getElementById('final-wpm');
    const finalAccuracyElement = document.getElementById('final-accuracy');
    const resetButton = document.getElementById('reset-btn');
    const configBar = document.getElementById('config-bar');
    const testArea = document.getElementById('test-area');

    let timer;
    let timeLeft = 30;
    let testActive = false;
    let sourceText = '';
    let config = {
        punctuation: false,
        numbers: false,
        casing: 'lowercase', // Add this line
        mode: 'time',
        count: 30
    };

    const startNewTest = async () => {
        clearInterval(timer);
        testActive = false;
        
        resultsElement.style.display = 'none';
        testArea.style.display = 'block';
        userInputElement.value = '';
        userInputElement.disabled = true;
        textToTypeElement.scrollTop = 0; // Reset scroll position
        
        textToTypeElement.innerHTML = 'Loading...';
        
        const query = new URLSearchParams(config).toString();
        const response = await fetch(`/api/get_text?${query}`);
        const data = await response.json();
        sourceText = data.text;
        
        textToTypeElement.innerHTML = '';
        sourceText.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            textToTypeElement.appendChild(charSpan);
        });
        
        textToTypeElement.querySelector('span').classList.add('cursor');
        updateTimerDisplay();
        userInputElement.disabled = false;
        userInputElement.focus();
    };

    const updateTimerDisplay = () => {
        if (config.mode === 'time') {
            timeLeft = config.count;
            timerDisplay.textContent = timeLeft;
        } else {
            timeLeft = 0;
            timerDisplay.textContent = 'words';
        }
    };

    const startTimer = () => {
        if (!testActive) {
            testActive = true;
            if (config.mode === 'time') {
                timer = setInterval(() => {
                    timeLeft--;
                    timerDisplay.textContent = timeLeft;
                    if (timeLeft <= 0) endTest();
                }, 1000);
            } else {
                timeLeft = 0;
                timer = setInterval(() => { timeLeft++; }, 1000);
            }
        }
    };
    
    const handleTyping = () => {
        if (!testActive) startTimer();
        
        const userChars = userInputElement.value.split('');
        const sourceChars = textToTypeElement.querySelectorAll('span');
        
        sourceChars.forEach(span => span.classList.remove('cursor'));

        sourceChars.forEach((charSpan, index) => {
            const userChar = userChars[index];
            if (userChar == null) {
                charSpan.className = 'untyped';
            } else if (userChar === charSpan.innerText) {
                charSpan.className = 'correct';
            } else {
                charSpan.className = 'incorrect';
            }
        });
        
        if (userChars.length < sourceChars.length) {
            sourceChars[userChars.length].classList.add('cursor');
        }

        scrollToCursor();

        if (config.mode === 'words' && userChars.length >= sourceText.length) {
            endTest();
        }
    };
    
    const scrollToCursor = () => {
        const cursor = textToTypeElement.querySelector('.cursor');
        if (cursor) {
            const boxRect = textToTypeElement.getBoundingClientRect();
            const cursorRect = cursor.getBoundingClientRect();
            if (cursorRect.top > (boxRect.top + boxRect.height / 2)) {
                textToTypeElement.scrollTop += cursor.offsetHeight;
            }
        }
    };
    
    const endTest = () => {
        clearInterval(timer);
        testActive = false;
        userInputElement.disabled = true;
        testArea.style.display = 'none';

        const typedChars = userInputElement.value.length;
        const correctChars = Array.from(textToTypeElement.querySelectorAll('.correct')).length;

        const accuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 0;
        const timeElapsed = config.mode === 'time' ? config.count : timeLeft;
        const wpm = timeElapsed > 0 ? (correctChars / 5) / (timeElapsed / 60) : 0;

        finalWpmElement.textContent = Math.round(wpm);
        finalAccuracyElement.textContent = Math.round(accuracy);
        resultsElement.style.display = 'block';

        if (document.body.dataset.isAuthenticated === 'true') {
            fetch('/api/save_result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wpm: Math.round(wpm), accuracy: Math.round(accuracy) })
            });
        }
    };

    configBar.addEventListener('click', (e) => {
        if (e.target.matches('.btn-config')) {
            const key = e.target.dataset.config;
            const value = e.target.dataset.value;
            
            if (key === 'punctuation' || key === 'numbers') {
                config[key] = !config[key];
                e.target.classList.toggle('active');
            } else {
                config[key] = value;
                e.target.parentElement.querySelectorAll('.btn-config').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
            startNewTest();
        }
    });

    userInputElement.addEventListener('input', handleTyping);
    resetButton.addEventListener('click', startNewTest);

    startNewTest();
});