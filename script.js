class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 作業時間（秒）
        this.breakTime = 5 * 60; // 休憩時間（秒）
        this.isWorking = true; // 作業中フラグ
        this.isRunning = false; // タイマー実行中フラグ
        this.intervalId = null;
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('startButton');
        this.stopButton = document.getElementById('stopButton');
        this.resetButton = document.getElementById('resetButton');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
        this.corgi = document.querySelector('.corgi');
        this.corgiContainer = document.querySelector('.corgi-container');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => this.reset());
        
        this.workTimeInput.addEventListener('change', () => {
            this.workTime = parseInt(this.workTimeInput.value) * 60;
            if (!this.isRunning) {
                this.updateTimerDisplay();
            }
        });
        
        this.breakTimeInput.addEventListener('change', () => {
            this.breakTime = parseInt(this.breakTimeInput.value) * 60;
            if (!this.isRunning && !this.isWorking) {
                this.updateTimerDisplay();
            }
        });
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.workTime / 60);
        const seconds = this.workTime % 60;
        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
        this.resetButton.disabled = true;
        
        // コーギーの初期位置を設定
        this.corgi.style.right = '0';
        
        // コーギーの移動アニメーションを開始
        this.corgi.style.transition = `right ${this.workTime}ms linear`;
        this.corgi.style.right = `${this.corgiContainer.offsetWidth - 50}px`;
        
        this.intervalId = setInterval(() => {
            if (this.workTime <= 0) {
                this.isWorking = !this.isWorking;
                this.workTime = this.isWorking ? this.workTimeInput.value * 60 : this.breakTimeInput.value * 60;
                this.updateTimerDisplay();
                
                // タイマーが終了したときにコーギーをリセット
                this.corgi.style.removeProperty('transition');
                this.corgi.style.right = '0';
            } else {
                this.workTime--;
                this.updateTimerDisplay();
            }
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;
        
        clearInterval(this.intervalId);
        this.isRunning = false;
        
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        this.resetButton.disabled = false;
    }

    reset() {
        this.stop();
        this.workTime = parseInt(this.workTimeInput.value) * 60;
        this.isWorking = true;
        this.updateTimerDisplay();
    }
}

// インスタンスの作成
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
