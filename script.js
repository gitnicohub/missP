function effettuaLogin() {
    // Prende i valori inseriti dall'utente
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');

    // Credenziali corrette
    const validUser = "paolapixburrobelviso";
    const validPass = "seni_rigogliosi_incredibili";

    // Verifica se username e password coincidono esattamente
    if (user === validUser && pass === validPass) {
        // Pulisce eventuali messaggi di errore
        errorMsg.textContent = "";
        // Passa alla SCENA INTRO invece che direttamente al gioco
        console.log("Login successful. Transitioning to intro scene.");
        cambiaScena('login-scene', 'intro-scene');
    } else {
        // Mostra errore se le credenziali sono sbagliate
        errorMsg.textContent = "Ma allora sei proprio una lurida! Scrivi meglio porcodeddio!";

        // Riproduci suono errore
        const errorSound = document.getElementById('error-sound');
        if (errorSound) {
            errorSound.currentTime = 0;
            errorSound.play().catch(e => console.log("Audio error play failed: ", e));
        }

        // (Opzionale) Aggiunge un'animazione di 'scossa' al box se sbagliano
        const loginBox = document.querySelector('.cigarette-login-box');
        loginBox.style.animation = "shake 0.5s ease";
        setTimeout(() => { loginBox.style.animation = "none"; }, 500);
    }
}

/* --- LOGICA MINIGIOCO --- */
let playerX = 50; // Percentuale Left
let playerY = 80; // Percentuale Top
let gameActive = false;
const speed = 2; // Velocità movimento

function startFromIntro() {
    // Passa dalla INTRO al GIOCO
    cambiaScena('intro-scene', 'game-scene');

    // Inizializza il gioco
    initGame();
}

function initGame() {
    gameActive = true;
    playerX = 50; playerY = 80;
    updatePlayerPos();

    // Event Listeners per tastiera
    window.addEventListener('keydown', handleKeyInput);

    // Event Listeners per pulsanti mobile
    const btnUp = document.getElementById('btn-up');
    const btnDown = document.getElementById('btn-down');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    if (btnUp) btnUp.onclick = () => movePlayer(0, -speed);
    if (btnDown) btnDown.onclick = () => movePlayer(0, speed);
    if (btnLeft) btnLeft.onclick = () => movePlayer(-speed, 0);
    if (btnRight) btnRight.onclick = () => movePlayer(speed, 0);

    // UI Dialogo
    document.getElementById('close-dialog-btn').onclick = closeDialog;
    document.getElementById('submit-word-btn').onclick = checkSecretWord;
}

function handleKeyInput(e) {
    if (!gameActive) return;

    switch (e.key) {
        case 'ArrowUp': movePlayer(0, -speed); break;
        case 'ArrowDown': movePlayer(0, speed); break;
        case 'ArrowLeft': movePlayer(-speed, 0); break;
        case 'ArrowRight': movePlayer(speed, 0); break;
    }
}

function movePlayer(dx, dy) {
    if (!gameActive) return;

    let newX = playerX + dx;
    let newY = playerY + dy;

    // Limiti mappa (0-100%)
    if (newX < 0) newX = 0;
    if (newX > 95) newX = 95;
    if (newY < 0) newY = 0;
    if (newY > 95) newY = 95;

    // Collisione con Edificio
    // Zona Porta (ingresso): X tra 40 e 60, Y < 50
    if (newX > 40 && newX < 60 && newY < 50) {
        showDoorDialog();
        return;
    }

    // Zona Indizio (Left 20%, Top 70%)
    if (Math.abs(newX - 20) < 10 && Math.abs(newY - 70) < 10) {
        showHintDialog();
    }

    playerX = newX;
    playerY = newY;
    updatePlayerPos();
}

function updatePlayerPos() {
    const player = document.getElementById('player');
    if (player) {
        player.style.left = playerX + '%';
        player.style.top = playerY + '%';
    }
}

/* --- GESTIONE DIALOGHI --- */
function showDialog(text, showInput = false) {
    const ui = document.getElementById('game-dialog');
    const dialogText = document.getElementById('dialog-text');
    const secretInput = document.getElementById('secret-word-input');
    const submitBtn = document.getElementById('submit-word-btn');
    const closeBtn = document.getElementById('close-dialog-btn');

    ui.classList.add('active');
    dialogText.textContent = text;

    if (showInput) {
        secretInput.style.display = 'block';
        submitBtn.style.display = 'inline-block';
        closeBtn.style.display = 'none';
        // Assicura che esista un contenitore per il messaggio di errore
        const errorId = 'secret-error-msg';
        let errorElem = document.getElementById(errorId);
        if (!errorElem) {
            errorElem = document.createElement('div');
            errorElem.id = errorId;
            errorElem.style.color = '#f66';
            errorElem.style.marginTop = '8px';
            if (secretInput && secretInput.parentNode) secretInput.parentNode.insertBefore(errorElem, secretInput.nextSibling);
        }
        errorElem.textContent = '';
        secretInput.focus();
    } else {
        secretInput.style.display = 'none';
        submitBtn.style.display = 'none';
        closeBtn.style.display = 'inline-block';
    }
    gameActive = false;
}

function closeDialog() {
    document.getElementById('game-dialog').classList.remove('active');
    gameActive = true;
}

function showHintDialog() {
    showDialog("Hai trovato un bigliettino: 'La parola preferita inizia con S...'");
}

function showDoorDialog() {
    showDialog("La porta è chiusa. Una voce dice: 'Qual è la tua parola preferita?'", true);
}

function checkSecretWord() {
    const secretInput = document.getElementById('secret-word-input');
    const word = secretInput.value.trim().toLowerCase();

    if (word === 'stantuffo') {
        document.getElementById('game-dialog').classList.remove('active');
        alert("La porta si apre con un gemito...");

        // Nuova sequenza: Esplosione -> Splash -> Cambio Scena
        triggerPhallicExplosion();

        gameActive = false;
    } else {
        // Mostra messaggio di errore all'interno del dialog e permette di riprovare
        const errorId = 'secret-error-msg';
        let errorElem = document.getElementById(errorId);
        if (!errorElem) {
            errorElem = document.createElement('div');
            errorElem.id = errorId;
            errorElem.style.color = '#f66';
            errorElem.style.marginTop = '8px';
            if (secretInput && secretInput.parentNode) secretInput.parentNode.insertBefore(errorElem, secretInput.nextSibling);
        }
        errorElem.textContent = 'Parola sbagliata — riprova.';

        // pulisce input e riporta il focus per il retry
        secretInput.value = '';
        secretInput.focus();

        // piccolo feedback visivo (usa la stessa animation "shake" se definita nel CSS)
        secretInput.style.animation = 'shake 0.35s ease';
        setTimeout(() => { secretInput.style.animation = 'none'; }, 350);
    }
}

function fumaSigaretta() {
    const container = document.querySelector('.vertical-cigarette-container');
    container.classList.add('smoking');

    setTimeout(() => {
        cambiaScena('smoke-scene', 'explosion-scene');

        const explosion = document.getElementById('explosion-effect');
        explosion.classList.remove('explode-anim');
        void explosion.offsetWidth;
        explosion.classList.add('explode-anim');

        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = 0.6;
            audio.play().catch(e => console.log("Errore riproduzione audio: " + e));
        }

        setTimeout(() => {
            document.querySelector('.content-reveal').classList.add('show-content');
        }, 1000);
    }, 4000);
}

function cambiaScena(idDaNascondere, idDaMostrare) {
    const elNascondere = document.getElementById(idDaNascondere);
    const elMostrare = document.getElementById(idDaMostrare);

    if (elNascondere) elNascondere.classList.remove('active');
    setTimeout(() => {
        if (elMostrare) elMostrare.classList.add('active');
    }, 100);
}

function triggerPhallicExplosion() {
    const building = document.querySelector('.phallic-building');
    const overlay = document.getElementById('splash-overlay');

    // 1. Avvia ZOOM (avvicinamento veloce)
    if (building) {
        building.classList.add('building-zoom');
    }

    // 2. Dopo breve ritardo (500ms), ESPLODI
    setTimeout(() => {
        if (building) {
            building.classList.add('building-exploding');
        }

        // 3. 600ms dopo l'inizio esplosione, SPLASH
        setTimeout(() => {
            if (overlay) {
                overlay.style.display = 'block';
                overlay.innerHTML = ''; // Pulisce precedenti

                // Genera tante gocce
                const dropCount = 400;
                for (let i = 0; i < dropCount; i++) {
                    const drop = document.createElement('div');
                    drop.classList.add('splash-drop');

                    // Posizione casuale
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;

                    // Dimensione casuale
                    const size = 10 + Math.random() * 60; // 10px - 70px

                    drop.style.left = left + '%';
                    drop.style.top = top + '%';
                    drop.style.width = size + 'px';
                    drop.style.height = size + 'px';

                    // Ritardo casuale per effetto "pioggia/schizzo" progressivo
                    drop.style.animationDelay = (Math.random() * 0.3) + 's';

                    overlay.appendChild(drop);
                }
            }

            // 4. Attendi fine splash e cambia scena
            setTimeout(() => {
                // Pulisce effetto
                if (overlay) {
                    overlay.style.display = 'none';
                    overlay.innerHTML = '';
                }
                if (building) {
                    // Rimuovi classi per reset
                    building.classList.remove('building-zoom');
                    building.classList.remove('building-exploding');
                }

                // Cambia scena
                cambiaScena('game-scene', 'smoke-scene');
            }, 4000); // 4 sec di splash

        }, 600); // Ritardo per picco esplosione

    }, 500); // 500ms di Zoom
}