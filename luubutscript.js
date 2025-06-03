// === Cấu hình thời gian ===
const typingSpeed = 80; // ms mỗi chữ
const pauseAfterParagraph = 2000; // ms sau mỗi đoạn xuống dòng

const intro = "Kính gửi cô gái của những ngày cuối cấp...😘";
const text = `Vậy là chỉ còn vài ngày nữa thôi, e sẽ chính thức rời xa những tháng năm cấp 3 – khép lại một chương thanh xuân tươi đẹp để bắt đầu viết tiếp giấc mơ đại học. 🎓✨
A biết e đang rất háo hức, cũng có đôi chút lo lắng - lo sợ 😌, và trong sâu thẳm – là cả một bầu trời tiếc nuối. 🌧️

Tiếc những ngày tháng học trò ngây ngô, tiếc những buổi học nhóm, những cơn buồn ngủ bất chợt trong lớp 😴, tiếc cả tiếng cười 😂 và ánh mắt quen thuộc của những người đã cùng e lớn lên suốt ba năm. Hay thậm chí nói rộng hơn là suốt 18 năm đèn sách.

Tuy rằng a không phải là một phần của ba năm ấy – nhưng may mắn thay, a được bước vào đời e vào những năm tháng cuối cùng của tuổi học sinh và đúng lúc mùa chia tay đang đến gần. 🍃💫

Có thể a không cùng e dự những buổi chào cờ buồn ngủ hay học thêm Toán, Văn, Lý với cả lớp, nhưng a đã thấy e cố gắng 💪, e áp lực 😔, e buồn 😢, em vui 😄 và cả những lần e khóc 😭 – tất cả – và a biết, mình yêu một cô gái mạnh mẽ, giàu cảm xúc và đầy khát vọng. ❤️

Sắp tới, em sẽ bước vào một thế giới hoàn toàn mới – rộng lớn - tự do hơn 🌍, nhưng cũng đầy rẫy những thử thách đang chờ e phía trước. ⛰️

A không thể hứa sẽ giúp e vượt qua mọi thứ, nhưng a có thể hứa sẽ luôn là người đứng phía sau, lắng nghe 👂, chia sẻ 🤝, và đi cùng e đến hết cuộc đời này 👫.

A mong rằng dù cuộc sống sinh viên có bận rộn thế nào, e vẫn sẽ giữ được nụ cười vô tư như những ngày cấp 3 😊 – vì nụ cười ấy là điều khiến a rung động đầu tiên. 💘

Mong rằng trong tim e, vẫn luôn có một góc nhỏ dành cho a – người đã cùng em đi qua những ngày cuối cấp nhiều cảm xúc nhất. 🧡

Cảm ơn e – vì đã để a trở thành một phần trong câu chuyện cuối cấp của e. 📖

Từ giờ trở đi, mình không chỉ nói lời “chúc em thi tốt”, mà sẽ cùng nhau nói “cố lên, chúng ta cùng trưởng thành nhé.” 🌱

Tốt nghiệp không phải là kết thúc – mà là điểm xuất phát cho một hành trình mới. 🛤️

Và anh hy vọng… mình sẽ không chỉ đứng chờ em ở vạch đích, mà sẽ được bước bên em – từng bước. 👣

A sẽ luôn cầu cho e những điều may mắn - tốt đẹp nhất của thế giới này 🌈 và hãy chắc chắn 1 điều này rằng "E sẽ chắc chắn đậu NV1 ( trường - ngành mà e mong muốn nhấtt )"
`;

const container = document.getElementById("typewriterText");
const nextBtn = document.getElementById("nextBtn");
const introContainer = document.getElementById("introLine");

const introText = "Kính gửi cô gái của những ngày cuối cấp,\n";
let introIndex = 0;
let index = 0;

function typeIntro() {
  if (introIndex < introText.length) {
    const char = introText.charAt(introIndex);
    if (char === '\n') {
      introContainer.innerHTML += "<br>";
    } else {
      introContainer.innerHTML += char;
    }
    introIndex++;
    setTimeout(typeIntro, typingSpeed);
  } else {
    setTimeout(typeWriter, 300); // Bắt đầu đoạn chính sau intro
  }
}

function typeWriter() {
  if (index < text.length) {
    const char = text.charAt(index);

    if (char === '\n') {
      container.innerHTML += "<br>";
      index++;

      if (text.charAt(index) === '\n') {
        index++;
        setTimeout(typeWriter, pauseAfterParagraph);
      } else {
        setTimeout(typeWriter, typingSpeed);
      }
    } else {
      container.innerHTML += char;
      index++;
      setTimeout(typeWriter, typingSpeed);
    }
  } else {  
    nextBtn.classList.remove("hidden");
    startFallingHearts(); // 💖 Gọi hiệu ứng trái tim sau khi kết thúc
  }
}
function startFallingHearts() {
      const interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 10 + 20 + "px";
        heart.style.position = "fixed";
        heart.style.top = "-10px";
        heart.style.zIndex = 9999;
        heart.style.animation = "fall 4s linear forwards";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
      }, 300);
      setTimeout(() => clearInterval(interval), 10000);
    }
typeIntro(); // 🚀 Khởi động từ dòng "Kính gửi..."

