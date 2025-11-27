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
        // Passa alla scena del GIOCO (invece che fumo)
        cambiaScena('login-scene', 'game-scene');
        initGame(); // Avvia il gioco
    } else {
        // Mostra errore se le credenziali sono sbagliate
        errorMsg.textContent = "Ma allora sei proprio una lurida! Scrivi meglio porcodeddio!";

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

    if (word.startsWith('s')) {
        document.getElementById('game-dialog').classList.remove('active');
        alert("La porta si apre con un gemito...");
        cambiaScena('game-scene', 'smoke-scene');
        gameActive = false;
        // fumaSigaretta() removed; waits for user click
    } else {
        alert("La porta rimane chiusa. La voce ride: 'Sbagliato!'");
        secretInput.value = '';
        closeDialog();
        playerY += 10; // Sposta indietro
        updatePlayerPos();
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