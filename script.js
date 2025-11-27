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
        // Passa alla scena successiva
        cambiaScena('login-scene', 'smoke-scene');
    } else {
        // Mostra errore se le credenziali sono sbagliate
        errorMsg.textContent = "Ma allora sei proprio una lurida! Scrivi meglio porcodeddio!";

        // (Opzionale) Aggiunge un'animazione di 'scossa' al box se sbagliano
        const loginBox = document.querySelector('.cigarette-login-box');
        loginBox.style.animation = "shake 0.5s ease";
        setTimeout(() => { loginBox.style.animation = "none"; }, 500);
    }
}

function fumaSigaretta() {
    // 1. Avvia l'animazione della sigaretta che si consuma
    const container = document.querySelector('.vertical-cigarette-container');
    container.classList.add('smoking');

    // 2. Attendi la fine dell'animazione (4 secondi) prima dell'esplosione
    setTimeout(() => {
        // Passa alla scena finale (sfondo nero)
        cambiaScena('smoke-scene', 'explosion-scene');

        // Avvia l'animazione dell'esplosione CSS
        const explosion = document.getElementById('explosion-effect');
        explosion.classList.remove('explode-anim');
        void explosion.offsetWidth; // Trigger reflow per riavviare animazione
        explosion.classList.add('explode-anim');

        // Riproduci Musica
        const audio = document.getElementById('bg-music');
        audio.volume = 0.6;
        audio.play().catch(e => console.log("Errore riproduzione audio: " + e));

        // Mostra il contenuto finale dopo l'esplosione
        setTimeout(() => {
            document.querySelector('.content-reveal').classList.add('show-content');
        }, 1000);
    }, 4000); // Durata animazione fumo
}

// Funzione di utilità per gestire le scene
function cambiaScena(idDaNascondere, idDaMostrare) {
    document.getElementById(idDaNascondere).classList.remove('active');
    setTimeout(() => {
        document.getElementById(idDaMostrare).classList.add('active');
    }, 100);
}