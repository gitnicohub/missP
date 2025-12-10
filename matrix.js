const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// --- CONFIGURAZIONE ---
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lista dei file presenti in assets/matrix
const imageFiles = [
  'cartoon.png',
  'cigarette-ends.png',
  'cigarette.png',
  'death (1).png',
  'no-smoking (1).png',
  'no-smoking (2).png',
  'no-smoking.png',
  'penis (1).png',
  'penis (2).png',
  'penis (3).png',
  'penis.png'
];

// Caricamento immagini
const images = [];
let imagesLoaded = 0;

imageFiles.forEach(file => {
  const img = new Image();
  img.src = 'assets/matrix/' + file;
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === imageFiles.length) {
      initMatrix();
      animate(0);
    }
  };
  images.push(img);
});

// --- STATO DEL SISTEMA ---
const drops = [];
const fontSize = 50; // Dimensione base icone
const columns = Math.ceil(canvas.width / fontSize);

class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = images[Math.floor(Math.random() * images.length)];
    this.speed = 3 + Math.random() * 4; // Velocità aumentata (era 2-5)
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.15; // Rotazione più veloce
    this.sizeScale = 0.6 + Math.random() * 0.7; // Variazione grandezza leggermente più ampia
  }

  draw() {
    const size = fontSize * this.sizeScale;

    ctx.save();
    ctx.translate(this.x + size / 2, this.y + size / 2);
    ctx.rotate(this.rotation);

    ctx.drawImage(this.image, -size / 2, -size / 2, size, size);

    ctx.restore();
  }

  update() {
    this.y += this.speed;
    this.rotation += this.rotationSpeed;

    // Reset
    if (this.y > canvas.height + 50) {
      this.y = -50 - Math.random() * 200;
      this.x = Math.floor(Math.random() * columns) * fontSize;
      this.image = images[Math.floor(Math.random() * images.length)];
      this.speed = 3 + Math.random() * 4;
    }
  }
}

function initMatrix() {
  drops.length = 0;
  // AUMENTIAMO LA DENSITÀ A LIVELLI MASSIMI
  // Prima era 2.5x -> 5x
  // Ora ne facciamo 10x!
  const density = 10;

  for (let i = 0; i < columns * density; i++) {
    const x = Math.floor(Math.random() * columns) * fontSize;
    // Sparpagliamo su un'area verticale molto più ampia per evitare "muri" di icone tutte insieme
    const y = Math.random() * -canvas.height * 2;
    drops.push(new Drop(x, y));
  }
}

// --- LOOP ANIMAZIONE ---
let lastTime = 0;
const fps = 30; // FPS fluido
const nextFrameTime = 1000 / fps;

function animate(currentTime) {
  requestAnimationFrame(animate);

  const deltaTime = currentTime - lastTime;
  if (deltaTime < nextFrameTime) return;

  lastTime = currentTime - (deltaTime % nextFrameTime);

  // Sfondo semi-trasparente per scia
  ctx.fillStyle = 'rgba(44, 44, 44, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drops.forEach(drop => {
    drop.draw();
    drop.update();
  });
}

// Ridimensionamento finestra
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initMatrix();
});
