# Guida: Come testare il sito sul tuo smartphone

Segui questi passaggi per visualizzare il tuo sito sul telefono mentre ci lavori dal computer.

## 1. Connessione Wi-Fi
Assicurati che **il tuo computer e il tuo smartphone siano connessi alla stessa rete Wi-Fi**. Se il PC è via cavo e il telefono in Wi-Fi, di solito funziona lo stesso, purché siano collegati allo stesso router.

## 2. Trova il tuo Indirizzo IP Locale
Devi sapere l'indirizzo del tuo computer nella rete di casa.
1. Apri il terminale (PowerShell o Prompt dei comandi).
2. Scrivi questo comando e premi Invio:
   ```powershell
   ipconfig
   ```
3. Cerca la riga che dice **Indirizzo IPv4** (o *IPv4 Address*).
   *   Sarà un numero simile a `192.168.1.37` o `192.168.0.15`.
   *   **Segnati questo numero.**

## 3. Avvia un Server Locale
Il modo più semplice, visto che hai Python installato, è usare questo comando.
1. Nel terminale, assicurati di essere dentro la cartella del tuo progetto (dove c'è `index.html`).
2. Scrivi questo comando e premi Invio:
   ```powershell
   python -m http.server 8000
   ```
3. Se Windows ti chiede il permesso (Firewall), clicca su **Consenti accesso** (o *Allow access*).
   *   *Nota: Il terminale sembrerà "bloccarsi". È normale! Significa che il server è attivo. Non chiudere la finestra.*

## 4. Apri il sito sul Telefono
1. Prendi il tuo smartphone.
2. Apri il browser (Chrome, Safari, ecc.).
3. Nella barra degli indirizzi scrivi:
   `http://` + `IL_TUO_IP` + `:8000`
   
   Esempio pratico (se il tuo IP è 192.168.1.37):
   **http://192.168.1.37:8000**

## Risoluzione Problemi
*   **Non carica la pagina?**
    *   Controlla di aver scritto `:8000` alla fine.
    *   Disattiva momentaneamente il Firewall di Windows per provare.
*   **Come spengo il server?**
    *   Torna sul terminale del computer e premi `CTRL + C` per fermarlo.
