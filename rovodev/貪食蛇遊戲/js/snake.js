/**
 * 貪食蛇類別
 */
class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = GAME_CONFIG.GRID_SIZE;
        this.maxX = Math.floor(canvas.width / this.gridSize);
        this.maxY = Math.floor(canvas.height / this.gridSize);
        
        // 初始化蛇的狀態
        this.reset();
    }

    /**
     * 重置蛇到初始狀態
     */
    reset() {
        // 蛇身體 - 從頭到尾的座標陣列
        this.body = [
            { x: Math.floor(this.maxX / 2), y: Math.floor(this.maxY / 2) },
            { x: Math.floor(this.maxX / 2) - 1, y: Math.floor(this.maxY / 2) },
            { x: Math.floor(this.maxX / 2) - 2, y: Math.floor(this.maxY / 2) }
        ];
        
        // 移動方向
        this.direction = DIRECTIONS.RIGHT;
        this.nextDirection = DIRECTIONS.RIGHT;
        
        // 成長標記
        this.shouldGrow = false;
    }

    /**
     * 設置移動方向
     * @param {Object} newDirection - 新方向 {x, y}
     */
    setDirection(newDirection) {
        // 防止反向移動
        if (this.isOppositeDirection(newDirection)) {
            return;
        }
        
        this.nextDirection = newDirection;
    }

    /**
     * 檢查是否為相反方向
     * @param {Object} newDirection - 要檢查的方向
     * @returns {boolean} 是否為相反方向
     */
    isOppositeDirection(newDirection) {
        return (
            this.direction.x === -newDirection.x && 
            this.direction.y === -newDirection.y
        );
    }

    /**
     * 移動蛇
     */
    move() {
        // 更新方向
        this.direction = this.nextDirection;
        
        // 計算新的頭部位置
        const head = this.getHead();
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };
        
        // 添加新頭部
        this.body.unshift(newHead);
        
        // 如果不需要成長，移除尾部
        if (!this.shouldGrow) {
            this.body.pop();
        } else {
            this.shouldGrow = false;
        }
    }

    /**
     * 讓蛇成長
     */
    grow() {
        this.shouldGrow = true;
    }

    /**
     * 獲取蛇頭位置
     * @returns {Object} 蛇頭位置 {x, y}
     */
    getHead() {
        return this.body[0];
    }

    /**
     * 獲取蛇身體
     * @returns {Array} 蛇身體座標陣列
     */
    getBody() {
        return [...this.body];
    }

    /**
     * 檢查是否撞到牆壁
     * @returns {boolean} 是否撞牆
     */
    checkWallCollision() {
        const head = this.getHead();
        return (
            head.x < 0 || 
            head.x >= this.maxX || 
            head.y < 0 || 
            head.y >= this.maxY
        );
    }

    /**
     * 檢查是否撞到自己
     * @returns {boolean} 是否撞到自己
     */
    checkSelfCollision() {
        const head = this.getHead();
        // 檢查頭部是否與身體其他部分重疊
        return this.body.slice(1).some(segment => pointsEqual(head, segment));
    }

    /**
     * 檢查是否發生碰撞
     * @returns {boolean} 是否碰撞
     */
    checkCollision() {
        return this.checkWallCollision() || this.checkSelfCollision();
    }

    /**
     * 繪製蛇
     */
    draw() {
        this.body.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            if (index === 0) {
                // 繪製蛇頭
                this.drawHead(x, y);
            } else {
                // 繪製蛇身
                this.drawBody(x, y, index);
            }
        });
    }

    /**
     * 繪製蛇頭
     * @param {number} x - X座標
     * @param {number} y - Y座標
     */
    drawHead(x, y) {
        // 蛇頭主體
        this.ctx.fillStyle = COLORS.SNAKE_HEAD;
        this.ctx.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
        
        // 蛇頭邊框
        this.ctx.strokeStyle = '#16a34a';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
        
        // 繪製眼睛
        this.drawEyes(x, y);
    }

    /**
     * 繪製蛇眼睛
     * @param {number} x - X座標
     * @param {number} y - Y座標
     */
    drawEyes(x, y) {
        const eyeSize = 3;
        const eyeOffset = 5;
        
        this.ctx.fillStyle = '#000000';
        
        // 根據方向調整眼睛位置
        if (this.direction === DIRECTIONS.RIGHT) {
            // 向右
            this.ctx.fillRect(x + this.gridSize - eyeOffset, y + eyeOffset, eyeSize, eyeSize);
            this.ctx.fillRect(x + this.gridSize - eyeOffset, y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
        } else if (this.direction === DIRECTIONS.LEFT) {
            // 向左
            this.ctx.fillRect(x + eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
            this.ctx.fillRect(x + eyeOffset - eyeSize, y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
        } else if (this.direction === DIRECTIONS.UP) {
            // 向上
            this.ctx.fillRect(x + eyeOffset, y + eyeOffset - eyeSize, eyeSize, eyeSize);
            this.ctx.fillRect(x + this.gridSize - eyeOffset - eyeSize, y + eyeOffset - eyeSize, eyeSize, eyeSize);
        } else if (this.direction === DIRECTIONS.DOWN) {
            // 向下
            this.ctx.fillRect(x + eyeOffset, y + this.gridSize - eyeOffset, eyeSize, eyeSize);
            this.ctx.fillRect(x + this.gridSize - eyeOffset - eyeSize, y + this.gridSize - eyeOffset, eyeSize, eyeSize);
        }
    }

    /**
     * 繪製蛇身
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @param {number} index - 身體段落索引
     */
    drawBody(x, y, index) {
        // 蛇身漸變效果
        const alpha = 1 - (index * 0.1);
        const adjustedAlpha = Math.max(alpha, 0.3);
        
        // 蛇身主體
        this.ctx.fillStyle = COLORS.SNAKE_BODY;
        this.ctx.globalAlpha = adjustedAlpha;
        this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // 蛇身邊框
        this.ctx.strokeStyle = '#15803d';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // 重置透明度
        this.ctx.globalAlpha = 1;
    }

    /**
     * 獲取蛇的長度
     * @returns {number} 蛇的長度
     */
    getLength() {
        return this.body.length;
    }

    /**
     * 獲取蛇的分數（基於長度）
     * @returns {number} 基於長度的分數
     */
    getLengthScore() {
        return (this.body.length - 3) * GAME_CONFIG.FOOD_SCORE;
    }
}