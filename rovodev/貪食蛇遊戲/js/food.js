/**
 * 食物類別
 */
class Food {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = GAME_CONFIG.GRID_SIZE;
        this.position = { x: 0, y: 0 };
        this.maxX = Math.floor(canvas.width / this.gridSize);
        this.maxY = Math.floor(canvas.height / this.gridSize);
        
        // 生成初始食物位置
        this.generateNewPosition();
    }

    /**
     * 生成新的食物位置
     * @param {Array} snakeBody - 蛇身體座標陣列，避免食物生成在蛇身上
     */
    generateNewPosition(snakeBody = []) {
        let newPosition;
        let attempts = 0;
        const maxAttempts = 100; // 防止無限循環

        do {
            newPosition = {
                x: getRandomInt(0, this.maxX - 1),
                y: getRandomInt(0, this.maxY - 1)
            };
            attempts++;
        } while (
            attempts < maxAttempts && 
            this.isPositionOccupied(newPosition, snakeBody)
        );

        this.position = newPosition;
    }

    /**
     * 檢查位置是否被蛇身佔據
     * @param {Object} position - 要檢查的位置 {x, y}
     * @param {Array} snakeBody - 蛇身體座標陣列
     * @returns {boolean} 位置是否被佔據
     */
    isPositionOccupied(position, snakeBody) {
        return snakeBody.some(segment => pointsEqual(segment, position));
    }

    /**
     * 檢查是否被蛇吃到
     * @param {Object} snakeHead - 蛇頭位置 {x, y}
     * @returns {boolean} 是否被吃到
     */
    isEaten(snakeHead) {
        return pointsEqual(this.position, snakeHead);
    }

    /**
     * 繪製食物
     */
    draw() {
        const x = this.position.x * this.gridSize;
        const y = this.position.y * this.gridSize;
        
        // 清除該區域
        this.ctx.clearRect(x, y, this.gridSize, this.gridSize);
        
        // 繪製食物 - 使用圓形
        this.ctx.fillStyle = COLORS.FOOD;
        this.ctx.beginPath();
        this.ctx.arc(
            x + this.gridSize / 2, 
            y + this.gridSize / 2, 
            this.gridSize / 2 - 2, 
            0, 
            2 * Math.PI
        );
        this.ctx.fill();
        
        // 添加高光效果
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.beginPath();
        this.ctx.arc(
            x + this.gridSize / 2 - 3, 
            y + this.gridSize / 2 - 3, 
            this.gridSize / 6, 
            0, 
            2 * Math.PI
        );
        this.ctx.fill();
    }

    /**
     * 獲取食物位置
     * @returns {Object} 食物位置 {x, y}
     */
    getPosition() {
        return { ...this.position };
    }

    /**
     * 重置食物位置
     * @param {Array} snakeBody - 蛇身體座標陣列
     */
    reset(snakeBody = []) {
        this.generateNewPosition(snakeBody);
    }
}

/**
 * 特殊食物類別 (可選功能)
 */
class SpecialFood extends Food {
    constructor(canvas, type = 'bonus') {
        super(canvas);
        this.type = type; // 'bonus', 'speed', 'slow'
        this.value = this.getValueByType();
        this.duration = 5000; // 特殊食物存在時間 (毫秒)
        this.createdTime = Date.now();
    }

    /**
     * 根據類型獲取分數值
     * @returns {number} 分數值
     */
    getValueByType() {
        switch (this.type) {
            case 'bonus':
                return GAME_CONFIG.FOOD_SCORE * 3;
            case 'speed':
                return GAME_CONFIG.FOOD_SCORE * 2;
            case 'slow':
                return GAME_CONFIG.FOOD_SCORE * 2;
            default:
                return GAME_CONFIG.FOOD_SCORE;
        }
    }

    /**
     * 檢查特殊食物是否過期
     * @returns {boolean} 是否過期
     */
    isExpired() {
        return Date.now() - this.createdTime > this.duration;
    }

    /**
     * 繪製特殊食物
     */
    draw() {
        const x = this.position.x * this.gridSize;
        const y = this.position.y * this.gridSize;
        
        // 根據類型使用不同顏色
        let color;
        switch (this.type) {
            case 'bonus':
                color = '#ffd700'; // 金色
                break;
            case 'speed':
                color = '#00ff00'; // 綠色
                break;
            case 'slow':
                color = '#0080ff'; // 藍色
                break;
            default:
                color = COLORS.FOOD;
        }
        
        // 繪製特殊食物 - 使用方形
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // 添加邊框
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // 添加閃爍效果
        const alpha = 0.5 + 0.5 * Math.sin(Date.now() * 0.01);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fillRect(x + 4, y + 4, this.gridSize - 8, this.gridSize - 8);
    }

    /**
     * 獲取特殊效果
     * @returns {Object} 特殊效果信息
     */
    getEffect() {
        return {
            type: this.type,
            value: this.value
        };
    }
}