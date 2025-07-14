/**
 * 貪食蛇遊戲主控制器
 */
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 遊戲對象
        this.snake = new Snake(this.canvas);
        this.food = new Food(this.canvas);
        
        // 遊戲狀態
        this.gameState = GAME_STATES.MENU;
        this.score = 0;
        this.highScore = Storage.getHighScore();
        this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
        this.lastMoveTime = 0;
        this.animationId = null;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        
        // DOM 元素
        this.initializeElements();
        
        // 事件監聽器
        this.setupEventListeners();
        
        // 初始化顯示
        this.updateDisplay();
        this.drawGame();
        
        // 顯示移動控制（如果是移動設備）
        showMobileControls();
    }

    /**
     * 初始化 DOM 元素引用
     */
    initializeElements() {
        this.elements = {
            overlay: document.getElementById('game-overlay'),
            overlayTitle: document.getElementById('overlay-title'),
            overlayMessage: document.getElementById('overlay-message'),
            startBtn: document.getElementById('start-btn'),
            restartBtn: document.getElementById('restart-btn'),
            menuBtn: document.getElementById('menu-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            currentScore: document.getElementById('current-score'),
            highScore: document.getElementById('high-score'),
            gameTime: document.getElementById('game-time')
        };
    }

    /**
     * 設置事件監聽器
     */
    setupEventListeners() {
        // 鍵盤控制
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // 按鈕事件
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        this.elements.menuBtn.addEventListener('click', () => this.backToMenu());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        
        // 移動設備觸控控制
        this.setupMobileControls();
        
        // 防止頁面滾動（移動設備）
        document.addEventListener('touchmove', (e) => {
            if (this.gameState === GAME_STATES.PLAYING) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    /**
     * 設置移動設備控制
     */
    setupMobileControls() {
        const mobileButtons = document.querySelectorAll('.mobile-btn');
        mobileButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const direction = button.dataset.direction;
                this.handleDirectionInput(direction);
            });
            
            // 觸控反饋
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * 處理鍵盤輸入
     * @param {KeyboardEvent} event - 鍵盤事件
     */
    handleKeyPress(event) {
        // 防止默認行為
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.handleDirectionInput('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.handleDirectionInput('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.handleDirectionInput('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.handleDirectionInput('right');
                break;
            case ' ':
                this.handleSpaceKey();
                break;
            case 'Enter':
                this.handleEnterKey();
                break;
        }
    }

    /**
     * 處理方向輸入
     * @param {string} direction - 方向字符串
     */
    handleDirectionInput(direction) {
        if (this.gameState !== GAME_STATES.PLAYING) return;

        switch (direction) {
            case 'up':
                this.snake.setDirection(DIRECTIONS.UP);
                break;
            case 'down':
                this.snake.setDirection(DIRECTIONS.DOWN);
                break;
            case 'left':
                this.snake.setDirection(DIRECTIONS.LEFT);
                break;
            case 'right':
                this.snake.setDirection(DIRECTIONS.RIGHT);
                break;
        }
    }

    /**
     * 處理空白鍵
     */
    handleSpaceKey() {
        if (this.gameState === GAME_STATES.PLAYING) {
            this.pauseGame();
        } else if (this.gameState === GAME_STATES.PAUSED) {
            this.resumeGame();
        }
    }

    /**
     * 處理 Enter 鍵
     */
    handleEnterKey() {
        if (this.gameState === GAME_STATES.MENU || this.gameState === GAME_STATES.GAME_OVER) {
            this.startGame();
        }
    }

    /**
     * 開始遊戲
     */
    startGame() {
        this.resetGame();
        this.gameState = GAME_STATES.PLAYING;
        this.elements.pauseBtn.disabled = false;
        this.hideOverlay();
        this.startTimer();
        this.gameLoop();
        SoundManager.play('start');
    }

    /**
     * 重新開始遊戲
     */
    restartGame() {
        this.startGame();
    }

    backToMenu() {
        this.gameState = GAME_STATES.MENU;
        this.resetGame();
        this.showOverlay('準備開始遊戲', '使用方向鍵或WASD控制蛇的移動');
        this.drawGame();
    }

    /**
     * 暫停遊戲
     */
    pauseGame() {
        if (this.gameState === GAME_STATES.PLAYING) {
            this.gameState = GAME_STATES.PAUSED;
            this.stopTimer();
            this.showOverlay('遊戲暫停', '按空白鍵或點擊繼續按鈕恢復遊戲', false, true);
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }

    /**
     * 恢復遊戲
     */
    resumeGame() {
        if (this.gameState === GAME_STATES.PAUSED) {
            this.gameState = GAME_STATES.PLAYING;
            this.hideOverlay();
            this.startTimer();
            this.gameLoop();
        }
    }

    /**
     * 切換暫停狀態
     */
    togglePause() {
        if (this.gameState === GAME_STATES.PLAYING) {
            this.pauseGame();
        } else if (this.gameState === GAME_STATES.PAUSED) {
            this.resumeGame();
        }
    }

    /**
     * 遊戲結束
     */
    gameOver() {
        this.gameState = GAME_STATES.GAME_OVER;
        this.elements.pauseBtn.disabled = true;
        this.stopTimer();
        
        // 記錄統計
        GameStats.recordGame(this.score);
        
        // 檢查是否創造新紀錄
        let message = `最終分數: ${this.score}`;
        if (Storage.isNewRecord(this.score)) {
            Storage.setHighScore(this.score);
            this.highScore = this.score;
            message += '\n🎉 恭喜！創造新紀錄！';
            SoundManager.play('newRecord');
        } else {
            SoundManager.play('gameOver');
        }
        
        this.showOverlay('遊戲結束', message, true, false);
        this.updateDisplay();
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    /**
     * 重置遊戲
     */
    resetGame() {
        this.snake.reset();
        this.food.reset(this.snake.getBody());
        this.score = 0;
        this.gameSpeed = GAME_CONFIG.INITIAL_SPEED;
        this.lastMoveTime = 0;
        this.elapsedTime = 0;
        this.stopTimer();
        this.updateDisplay();
    }

    /**
     * 遊戲主循環
     */
    gameLoop() {
        if (this.gameState !== GAME_STATES.PLAYING) return;

        const currentTime = Date.now();
        
        if (currentTime - this.lastMoveTime >= this.gameSpeed) {
            this.update();
            this.lastMoveTime = currentTime;
        }
        
        this.drawGame();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * 更新遊戲邏輯
     */
    update() {
        // 移動蛇
        this.snake.move();
        
        // 檢查碰撞
        if (this.snake.checkCollision()) {
            this.gameOver();
            return;
        }
        
        // 檢查是否吃到食物
        if (this.food.isEaten(this.snake.getHead())) {
            this.eatFood();
        }
    }

    /**
     * 處理吃到食物
     */
    eatFood() {
        // 蛇成長
        this.snake.grow();
        
        // 增加分數
        this.score += GAME_CONFIG.FOOD_SCORE;
        
        // 增加速度
        this.increaseSpeed();
        
        // 生成新食物
        this.food.generateNewPosition(this.snake.getBody());
        
        // 更新顯示
        this.updateDisplay();
        
        // 播放音效
        SoundManager.play('eat');
    }

    /**
     * 增加遊戲速度
     */
    increaseSpeed() {
        if (this.gameSpeed > GAME_CONFIG.MIN_SPEED) {
            this.gameSpeed = Math.max(
                this.gameSpeed - GAME_CONFIG.SPEED_INCREASE,
                GAME_CONFIG.MIN_SPEED
            );
        }
    }

    /**
     * 繪製遊戲
     */
    drawGame() {
        // 清除畫布
        this.clearCanvas();
        
        // 繪製網格（可選）
        // this.drawGrid();
        
        // 繪製食物
        this.food.draw();
        
        // 繪製蛇
        this.snake.draw();
    }

    /**
     * 清除畫布
     */
    clearCanvas() {
        this.ctx.fillStyle = COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 繪製網格（調試用）
     */
    drawGrid() {
        this.ctx.strokeStyle = COLORS.GRID;
        this.ctx.lineWidth = 0.5;
        
        // 垂直線
        for (let x = 0; x <= this.canvas.width; x += GAME_CONFIG.GRID_SIZE) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // 水平線
        for (let y = 0; y <= this.canvas.height; y += GAME_CONFIG.GRID_SIZE) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    /**
     * 更新顯示
     */
    updateDisplay() {
        this.elements.currentScore.textContent = formatScore(this.score);
        this.elements.highScore.textContent = formatScore(this.highScore);
        this.elements.gameTime.textContent = formatTime(this.elapsedTime);
    }

    /**
     * 開始計時器
     */
    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.startTime = Date.now() - (this.elapsedTime * 1000);
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateDisplay();
        }, 1000);
    }

    /**
     * 停止計時器
     */
    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }

    /**
     * 顯示覆蓋層
     * @param {string} title - 標題
     * @param {string} message - 訊息
     * @param {boolean} showRestart - 是否顯示重新開始按鈕
     * @param {boolean} showResume - 是否顯示繼續按鈕
     */
    showOverlay(title, message, showRestart = false, showResume = false) {
        this.elements.overlayTitle.textContent = title;
        this.elements.overlayMessage.textContent = message;

        this.elements.startBtn.style.display = (showRestart || showResume) ? 'none' : 'inline-block';
        this.elements.restartBtn.style.display = showRestart ? 'inline-block' : 'none';
        this.elements.menuBtn.style.display = showRestart ? 'inline-block' : 'none';

        if (showResume) {
            this.elements.startBtn.textContent = '繼續遊戲';
            this.elements.startBtn.onclick = () => this.resumeGame();
            this.elements.startBtn.style.display = 'inline-block';
        } else {
            this.elements.startBtn.textContent = '開始遊戲';
            this.elements.startBtn.onclick = () => this.startGame();
        }

        this.elements.overlay.style.display = 'flex';
    }

    /**
     * 隱藏覆蓋層
     */
    hideOverlay() {
        this.elements.overlay.style.display = 'none';
    }
}

// 當頁面載入完成時初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    const game = new SnakeGame();
    
    // 將遊戲實例掛載到全局，方便調試
    window.snakeGame = game;
});