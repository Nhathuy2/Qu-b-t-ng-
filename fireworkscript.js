// Pháo hoa
const canvas = document.getElementById("fireworks-container");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colors = ["#ff5050", "#ffd700", "#66ccff", "#cc66ff"];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    const dx = Math.cos(p.angle) * p.speed;
    const dy = Math.sin(p.angle) * p.speed;
    p.x += dx;
    p.y += dy;
    p.alpha -= 0.01;
    if (p.alpha <= 0) particles.splice(i, 1);
    else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

setInterval(createFirework, 800);
animateFireworks();

// Hiệu ứng hiện từng phần & tự động phát nhạc
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("anniversaryTitle").style.display = "block";
  }, 2000);

  setTimeout(() => {
    document.querySelectorAll(".anniversaryText").forEach(el => {
      el.style.display = "block";
    });

    // Phát nhạc từ 1:10.5 đến 1:53.1
    const music = document.getElementById("bgMusic");
    music.currentTime = 70.5;

    const tryPlay = () => {
      music.play().then(() => {
        // Khi nhạc chạy, theo dõi thời gian
        music.ontimeupdate = () => {
          if (music.currentTime >= 113.1) {
            music.pause();
            music.ontimeupdate = null;

            // Nhạc kết thúc => hiện nút trái tim
            document.getElementById("heartButton").style.display = "block";
          }
        };
      }).catch(err => {
        console.warn("Trình duyệt chặn phát tự động, chờ tương tác...");
        document.body.addEventListener("click", () => {
          tryPlay();
        }, { once: true });
      });
    };

    tryPlay();
  }, 4000);

  //  Xóa đoạn hiện trái tim sau 6s 
  // setTimeout(() => {
  //   document.getElementById("heartButton").style.display = "block";
  // }, 6000);
});

// Nút trái tim
function goToNext() {
  localStorage.setItem("goToStep", "48");
  window.location.href = "index.html";
}
window.goToNext = goToNext;
