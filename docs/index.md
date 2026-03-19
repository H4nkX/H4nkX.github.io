<style>
.welcome-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: #f0f8f0;
  border: 4px solid darkgreen;
}

.title-container {
  margin-bottom: 2rem;
  position: relative;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4a7c59;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.chinese-title {
  font-size: 2rem;
  color: #4a7c59;
  line-height: 1.2;
  margin-bottom: 3rem;
}

.eye-character {
  position: relative;
  width: 300px;
  height: 200px;
  margin-bottom: 3rem;
}

.big-eyes {
  display: flex;
  justify-content: center;
  align-items: center;
}

.eye {
  width: 180px;
  height: 160px;
  background-color: white;
  border-radius: 90px;
  border: 4px solid #333;
  position: relative;
  margin: 0 20px;
  overflow: hidden;
}

.pupil {
  width: 50px;
  height: 50px;
  background-color: #333;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.eyebrows {
  position: absolute;
  top: -30px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.eyebrow {
  width: 180px;
  height: 8px;
  background-color: #333;
  border-radius: 4px;
  position: relative;
  margin: 0 20px;
  transform: rotate(5deg);
}

.eyebrow.right {
  transform: rotate(-5deg);
}

.welcome-text {
  max-width: 800px;
}

.welcome-text h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4a7c59;
  font-weight: bold;
}

.welcome-text p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
}

.welcome-text .btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #4a7c59;
  color: white !important;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.welcome-text .btn:hover {
  background-color: #385e46;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .chinese-title {
    font-size: 1.5rem;
  }

  .eye-character {
    width: 300px;
    height: 250px;
  }

  .eye {
    width: 120px;
    height: 100px;
    margin: 0 15px;
  }

  .pupil {
    width: 35px;
    height: 35px;
  }

  .eyebrow {
    width: 120px;
    height: 6px;
    margin: 0 15px;
  }

  .arrow-text {
    position: static;
    margin-top: 2rem;
    justify-content: center;
  }

  .welcome-text h1 {
    font-size: 2rem;
  }

  .welcome-text p {
    font-size: 1rem;
  }
}
</style>

<div class="welcome-page">
  <div class="title-container">
    <h1 class="main-title">WANT TO EXCHANGE KNOWLEDGE<br>ABOUT INDUSTRIAL ENGINEERING ARCHITECTURE?</h1>
    <h2 class="chinese-title">想来一起交流工业工程架构师的知识吗？</h2>
  </div>
  <div class="eye-character">
    <div class="eyebrows">
      <div class="eyebrow left"></div>
      <div class="eyebrow right"></div>
    </div>
    <div class="big-eyes">
      <div class="eye">
        <div class="pupil"></div>
      </div>
      <div class="eye">
        <div class="pupil"></div>
      </div>
    </div>
  </div>
  <div class="welcome-text">
    <h1><span style="font-weight: normal;">Welcome to</span><br>H4nk 的工业工程架构师手册</h1>
    <p>实践，总结，开源</p>
    <a href="about/" class="btn">开始探索</a>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const eyes = document.querySelectorAll('.eye');
  const eyeCharacter = document.querySelector('.eye-character');

  document.addEventListener('mousemove', function(e) {
    const characterRect = eyeCharacter.getBoundingClientRect();
    const characterCenterX = characterRect.left + characterRect.width / 2;
    const characterCenterY = characterRect.top + characterRect.height / 2;

    const angle = Math.atan2(e.clientY - characterCenterY, e.clientX - characterCenterX);
    const distance = Math.min(Math.sqrt(Math.pow(e.clientX - characterCenterX, 2) + Math.pow(e.clientY - characterCenterY, 2)) / 5, 30);

    eyes.forEach(eye => {
      const pupil = eye.querySelector('.pupil');
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    });
  });
});
</script>
