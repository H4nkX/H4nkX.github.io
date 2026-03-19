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
  .welcome-text h1 {
    font-size: 2rem;
  }

  .welcome-text p {
    font-size: 1rem;
  }
}
</style>

<div class="welcome-page">
  <div class="welcome-text">
    <h1><span style="font-weight: normal;">Welcome to</span><br>H4nk 的工业工程架构师手册</h1>
    <p>实践，总结，开源</p>
    <a href="about/" class="btn">开始探索</a>
  </div>
</div>
