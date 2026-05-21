let currentCard = 0;
let score = 0;
let timeLeft = 60;
let gameTimer = null;
let trashInterval = null;
let trashIdCounter = 0;

function showSection(sectionId) {
  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item');
  
  pages.forEach(page => page.classList.remove('active'));
  navItems.forEach(item => item.classList.remove('active'));
  
  document.getElementById(sectionId).classList.add('active');
  
  const activeNav = document.querySelector(`.nav-item[onclick="showSection('${sectionId}')"]`);
  if (activeNav) {
    activeNav.classList.add('active');
  }
  
  if (sectionId === 'game') {
    initGame();
  }
}

function prevCard() {
  const cards = document.querySelectorAll('.card');
  currentCard = (currentCard - 1 + cards.length) % cards.length;
  updateCardIndicator();
  scrollToCard(currentCard);
}

function nextCard() {
  const cards = document.querySelectorAll('.card');
  currentCard = (currentCard + 1) % cards.length;
  updateCardIndicator();
  scrollToCard(currentCard);
}

function updateCardIndicator() {
  const indicator = document.getElementById('card-indicator');
  indicator.textContent = `${currentCard + 1} / ${document.querySelectorAll('.card').length}`;
}

function scrollToCard(index) {
  const cardsContainer = document.querySelector('.knowledge-cards');
  const cardWidth = 280 + 20;
  cardsContainer.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
}

function showCreatureDetail(index) {
  const creature = creaturesData[index];
  const modal = document.getElementById('creatureModal');
  
  document.getElementById('modalImage').src = creature.image;
  document.getElementById('modalName').textContent = creature.name;
  document.getElementById('modalScientific').textContent = creature.scientificName;
  document.getElementById('modalDescription').textContent = creature.description;
  
  const statusElement = document.getElementById('modalStatus');
  statusElement.textContent = getStatusText(creature.status);
  statusElement.className = `status ${creature.status}`;
  
  modal.classList.add('show');
}

function getStatusText(status) {
  const statusMap = {
    'endangered': '濒危',
    'vulnerable': '易危',
    'least-concern': '无危'
  };
  return statusMap[status] || status;
}

function closeCreatureModal() {
  document.getElementById('creatureModal').classList.remove('show');
}

function initGame() {
  const gameArea = document.getElementById('gameArea');
  const gameOver = document.getElementById('gameOver');
  
  score = 0;
  timeLeft = 60;
  
  document.getElementById('score').textContent = score;
  document.getElementById('time').textContent = timeLeft;
  
  gameOver.style.display = 'none';
  
  const existingTrash = document.querySelectorAll('.trash-item');
  existingTrash.forEach(trash => trash.remove());
  
  if (gameTimer) clearInterval(gameTimer);
  if (trashInterval) clearInterval(trashInterval);
  
  gameTimer = setInterval(updateTimer, 1000);
  
  setTimeout(() => {
    trashInterval = setInterval(spawnTrash, 800);
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnTrash(), i * 200);
    }
  }, 100);
}

function updateTimer() {
  timeLeft--;
  document.getElementById('time').textContent = timeLeft;
  
  if (timeLeft <= 0) {
    endGame();
  }
}

function spawnTrash() {
  const gameArea = document.getElementById('gameArea');
  
  const width = gameArea.offsetWidth || window.innerWidth;
  const height = gameArea.offsetHeight || window.innerHeight;
  
  if (!width || !height) {
    console.warn('Game area not properly sized, retrying...');
    setTimeout(spawnTrash, 100);
    return;
  }
  
  const trashType = trashTypes[Math.floor(Math.random() * trashTypes.length)];
  const trash = document.createElement('div');
  trash.className = 'trash-item';
  trash.textContent = trashType.emoji;
  trash.dataset.points = trashType.points;
  trash.dataset.id = ++trashIdCounter;
  
  const padding = 50;
  const maxX = Math.max(width - padding * 2, 100);
  const maxY = Math.max(height - padding * 150, 100);
  
  trash.style.left = `${padding + Math.random() * maxX}px`;
  trash.style.top = `${padding + Math.random() * maxY}px`;
  trash.style.animationDelay = `${Math.random() * 3}s`;
  trash.style.position = 'absolute';
  trash.style.zIndex = '10';
  trash.style.fontSize = '36px';
  
  trash.addEventListener('click', () => collectTrash(trash));
  
  gameArea.appendChild(trash);
  console.log('Trash spawned:', trash.textContent, trash.style.left, trash.style.top);
}

function collectTrash(trash) {
  const points = parseInt(trash.dataset.points);
  score += points;
  document.getElementById('score').textContent = score;
  
  createParticles(trash);
  
  trash.remove();
}

function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const gameArea = document.getElementById('gameArea');
  
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.className = 'trash-particle';
    particle.textContent = '✨';
    particle.style.left = `${rect.left}px`;
    particle.style.top = `${rect.top}px`;
    
    gameArea.appendChild(particle);
    
    setTimeout(() => particle.remove(), 500);
  }
}

function endGame() {
  clearInterval(gameTimer);
  clearInterval(trashInterval);
  
  document.getElementById('finalScore').textContent = score;
  document.getElementById('gameOver').style.display = 'block';
  
  const trashItems = document.querySelectorAll('.trash-item');
  trashItems.forEach(trash => trash.remove());
}

function restartGame() {
  initGame();
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('creature-modal')) {
      closeCreatureModal();
    }
  });
  
  document.querySelector('.knowledge-cards').addEventListener('scroll', (e) => {
    const container = e.target;
    const cardWidth = 280 + 20;
    currentCard = Math.round(container.scrollLeft / cardWidth);
    updateCardIndicator();
  });
});