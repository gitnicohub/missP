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
    // 1. Passa alla scena finale (sfondo nero)
    cambiaScena('smoke-scene', 'explosion-scene');
    
    // 2. Avvia l'animazione dell'esplosione CSS
    const explosion = document.getElementById('explosion-effect');
    explosion.classList.remove('explode-anim');
    void explosion.offsetWidth; // Trigger reflow per riavviare animazione
    explosion.classList.add('explode-anim');

    // 3. Riproduci Musica
    const audio = document.getElementById('bg-music');
    audio.volume = 0.6;
    audio.play().catch(e => console.log("Errore riproduzione audio: " + e));

    // 4. Mostra il contenuto finale dopo l'esplosione
    setTimeout(() => {
        document.querySelector('.content-reveal').classList.add('show-content');
    }, 1000);
}

// Funzione di utilità per gestire le scene
function cambiaScena(idDaNascondere, idDaMostrare) {
    document.getElementById(idDaNascondere).classList.remove('active');
    setTimeout(() => {
        document.getElementById(idDaMostrare).classList.add('active');
    }, 100);
}