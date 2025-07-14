// 工具函數集合

/**
 * 生成指定範圍內的隨機整數
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 隨機整數
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 檢查兩個點是否相同
 * @param {Object} point1 - 第一個點 {x, y}
 * @param {Object} point2 - 第二個點 {x, y}
 * @returns {boolean} 是否相同
 */
function pointsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
}

/**
 * 本地存儲管理
 */
const Storage = {
    /**
     * 獲取最高分
     * @returns {number} 最高分
     */
    getHighScore() {
        return parseInt(localStorage.getItem('snakeHighScore') || '0');
    },

    /**
     * 設置最高分
     * @param {number} score - 分數
     */
    setHighScore(score) {
        localStorage.setItem('snakeHighScore', score.toString());
    },

    /**
     * 檢查是否為新紀錄
     * @param {number} score - 當前分數
     * @returns {boolean} 是否為新紀錄
     */
    isNewRecord(score) {
        return score > this.getHighScore();
    }
};

/**
 * 遊戲常數
 */
const GAME_CONFIG = {
    GRID_SIZE: 20,           // 網格大小
    CANVAS_WIDTH: 400,       // 畫布寬度
    CANVAS_HEIGHT: 400,      // 畫布高度
    INITIAL_SPEED: 150,      // 初始速度 (毫秒)
    FOOD_SCORE: 10,          // 食物分數
    SPEED_INCREASE: 5,       // 每次加速減少的毫秒數
    MIN_SPEED: 80            // 最小速度限制
};

/**
 * 遊戲方向常數
 */
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

/**
 * 遊戲狀態常數
 */
const GAME_STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'game_over'
};

/**
 * 顏色配置
 */
const COLORS = {
    SNAKE_HEAD: '#4ade80',
    SNAKE_BODY: '#22c55e',
    FOOD: '#ef4444',
    BACKGROUND: '#2d3748',
    GRID: '#4a5568'
};

/**
 * 防抖函數
 * @param {Function} func - 要防抖的函數
 * @param {number} wait - 等待時間
 * @returns {Function} 防抖後的函數
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 格式化分數顯示
 * @param {number} score - 分數
 * @returns {string} 格式化後的分數
 */
function formatScore(score) {
    return score.toString().padStart(4, '0');
}

/**
 * 格式化時間顯示
 * @param {number} totalSeconds - 總秒數
 * @returns {string} 格式化後的時間 (MM:SS)
 */
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

/**
 * 檢查是否為移動設備
 * @returns {boolean} 是否為移動設備
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 顯示移動控制按鈕
 */
function showMobileControls() {
    if (isMobileDevice()) {
        const mobileControls = document.querySelector('.mobile-controls');
        if (mobileControls) {
            mobileControls.style.display = 'block';
        }
    }
}

/**
 * 音效播放器 (預留接口)
 */
const SoundManager = {
    /**
     * 播放音效
     * @param {string} soundName - 音效名稱
     */
    play(soundName) {
        // 預留音效播放功能
        // 可以在這裡添加音效播放邏輯
        console.log(`Playing sound: ${soundName}`);
    },

    /**
     * 停止所有音效
     */
    stopAll() {
        // 預留停止音效功能
        console.log('Stopping all sounds');
    }
};

/**
 * 遊戲統計
 */
const GameStats = {
    gamesPlayed: 0,
    totalScore: 0,
    
    /**
     * 記錄遊戲結束
     * @param {number} score - 本次遊戲分數
     */
    recordGame(score) {
        this.gamesPlayed++;
        this.totalScore += score;
    },
    
    /**
     * 獲取平均分數
     * @returns {number} 平均分數
     */
    getAverageScore() {
        return this.gamesPlayed > 0 ? Math.round(this.totalScore / this.gamesPlayed) : 0;
    }
};