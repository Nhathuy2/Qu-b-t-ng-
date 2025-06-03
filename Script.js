let currentStep = 0;

function nextStep() {
  const currentEl = document.getElementById(`step${currentStep}`);
  if (currentEl) {
    currentEl.classList.add("hidden");
    currentEl.classList.remove("visible");
  }

  currentStep++;
  const nextEl = document.getElementById(`step${currentStep}`);
  if (nextEl) {
    nextEl.classList.remove("hidden");
    nextEl.classList.add("visible");
  }
  runTypewriterEffect(currentStep);

  if (currentStep === 48) {
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
      backBtn.classList.add("hidden");
    }
  }
}

function openEnvelope() {
  const step0 = document.getElementById("step0");
  step0.classList.add("hidden");
  step0.classList.remove("visible");

  const stepPassword = document.getElementById("stepPassword");
  stepPassword.classList.remove("hidden");
  stepPassword.classList.add("visible");

  const backBtn = document.getElementById("backBtn");
  backBtn.classList.remove("hidden");
  backBtn.classList.add("visible");

  currentStep = -1;

  setTimeout(() => runTypewriterEffect("Password"), 300);
}

function runTypewriterEffect(stepIdentifier, speed = 80, lineDelay = 1000) {
  const container = document.getElementById(`step${stepIdentifier}`);
  if (!container) return;
  const elements = Array.from(container.querySelectorAll(".typewriter"));

  function typeOneByOne(index) {
    if (index >= elements.length) return;

    const el = elements[index];
    const text = el.getAttribute("data-text");
    if (!text) {
      typeOneByOne(index + 1);
      return;
    }
    el.textContent = "";
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        setTimeout(() => typeOneByOne(index + 1), lineDelay);
      }
    }

    typeChar();
  }

  typeOneByOne(0);
}

function showHint() {
  const hintEl = document.getElementById("passwordHint");
  const hintBtn = document.getElementById("hintBtn");
  const hintText = "Gợi ý: ❤️❤️Counting from the day we fell in love❤️❤️ 💌";

  hintBtn.style.display = "none";
  hintEl.style.display = "block";
  hintEl.textContent = "";

  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < hintText.length) {
      hintEl.textContent += hintText.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 40);

  setTimeout(() => {
    hintEl.style.opacity = 1;
  }, 100);
}

function checkPassword() {
  const correctPassword = "04062025";
  const userPassword = document.getElementById("passwordInput").value;
  const passwordError = document.getElementById("passwordError");

  if (userPassword === correctPassword) {
    const stepPassword = document.getElementById("stepPassword");
    stepPassword.classList.add("hidden");
    stepPassword.classList.remove("visible");

    const step1 = document.getElementById("step1");
    step1.classList.remove("hidden");
    step1.classList.add("visible");

    passwordError.style.display = "none";

    currentStep = 1;
    runTypewriterEffect(1);
  } else {
    passwordError.style.display = "block";
  }
}

document.getElementById("backBtn").onclick = () => {
  if (currentStep === -1) {
    const stepPassword = document.getElementById("stepPassword");
    stepPassword.classList.add("hidden");
    stepPassword.classList.remove("visible");

    const step0 = document.getElementById("step0");
    step0.classList.remove("hidden");
    step0.classList.add("visible");

    document.getElementById("backBtn").classList.add("hidden");
    document.getElementById("backBtn").classList.remove("visible");

    const finalBtn = document.getElementById("finalButton");
    if (finalBtn && finalBtn.classList.contains("visible")) {
      finalBtn.classList.remove("visible");
      finalBtn.classList.add("hidden");
    }

    currentStep = 0;
    return;
  }

  const currentEl = document.getElementById(`step${currentStep}`);
  if (currentEl) {
    currentEl.classList.add("hidden");
    currentEl.classList.remove("visible");
  }

  if (currentStep > 1) {
    currentStep--;
    const prevEl = document.getElementById(`step${currentStep}`);
    if (prevEl) {
      prevEl.classList.remove("hidden");
      prevEl.classList.add("visible");
      runTypewriterEffect(currentStep);
    }
  } else if (currentStep === 1) {
    const step0 = document.getElementById("step0");
    step0.classList.remove("hidden");
    step0.classList.add("visible");

    document.getElementById("backBtn").classList.add("hidden");
    document.getElementById("backBtn").classList.remove("visible");

    const finalBtn = document.getElementById("finalButton");
    if (finalBtn && finalBtn.classList.contains("visible")) {
      finalBtn.classList.remove("visible");
      finalBtn.classList.add("hidden");
    }

    currentStep = 0;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  // Ưu tiên xử lý trở về từ trang khác (dùng localStorage)
  const returnStep = localStorage.getItem("goToStep");
  if (returnStep) {
    const stepNum = parseInt(returnStep);
    localStorage.removeItem("goToStep"); // Xóa để không chạy lại lần sau

    // Ẩn tất cả step ban đầu
    const allSteps = document.querySelectorAll('[id^="step"]');
    allSteps.forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("visible");
    });

    const el = document.getElementById(`step${stepNum}`);
    if (el) {
      currentStep = stepNum;
      el.classList.remove("hidden");
      el.classList.add("visible");
      runTypewriterEffect(stepNum);
    }
    return; // Dừng tại đây, không chạy tiếp
  }

  // Nếu không có localStorage thì xử lý theo hash như cũ
  const hash = window.location.hash;

  const allSteps = document.querySelectorAll('[id^="step"]');
  allSteps.forEach((el) => {
    el.classList.add("hidden");
    el.classList.remove("visible");
  });

  if (hash.startsWith("#step")) {
    const stepNum = parseInt(hash.replace("#step", ""));
    if (!isNaN(stepNum)) {
      currentStep = stepNum;
      const el = document.getElementById(`step${stepNum}`);
      if (el) {
        el.classList.remove("hidden");
        el.classList.add("visible");
        runTypewriterEffect(stepNum);
      }
      return;
    }
  }

  // Mặc định hiển thị bước 0 nếu không có gì khác
  const step0 = document.getElementById("step0");
  if (step0) {
    step0.classList.remove("hidden");
    step0.classList.add("visible");
    runTypewriterEffect(0);
  }
});

 function togglePassword() {
    const input = document.getElementById("passwordInput");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }
  document.getElementById("passwordInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkPassword();
  }
});

function createHeartParticles(event, count) {
    const buttonRect = event.target.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width/2;
    const centerY = buttonRect.top + buttonRect.height/2;
    
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.classList.add('heart-particle');
      
      // Kích thước ngẫu nhiên
      const size = Math.random() * 20 + 10;
      heart.style.fontSize = `${size}px`;
      
      // Màu sắc ngẫu nhiên
      const colors = ['#ff0000', '#ff69b4', '#ff4500', '#ff1493'];
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      // Vị trí ban đầu
      heart.style.left = `${centerX}px`;
      heart.style.top = `${centerY}px`;
      heart.style.position = 'fixed';
      
      // Hướng bay ngẫu nhiên
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      heart.style.setProperty('--tx', `${tx}px`);
      heart.style.setProperty('--ty', `${ty}px`);
      
      document.body.appendChild(heart);
      
      // Tự động xóa sau khi animation kết thúc
      setTimeout(() => {
        heart.remove();
      }, 1000);
    }
  }
