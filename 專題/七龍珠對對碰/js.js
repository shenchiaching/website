// 聲音控制
class AudioController {
    constructor() {
        this.bgMusic = new Audio('./MS/七龍珠超音樂.mp3');
        this.flipSound = new Audio('./MS/翻牌.wav');
        this.matchSound = new Audio('./MS/答對.wav');
        this.victorySound = new Audio('./MS/過關.mp3');
        this.gameOverSound = new Audio('./MS/失敗.mp3');

        // 音量控制
        this.bgMusic.volume = 0.1;
        this.flipSound.volume = 0.1;
        this.matchSound.volume = 0.1;
        this.victorySound.volume = 0.1;
        this.gameOverSound.volume = 0.1;

        // 重複播放
        this.bgMusic.loop = true;
    }
    // 針對每個功能的相對音效
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}


// 卡牌基礎設定
class MIX {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    // 開始遊戲後的設定 步數 總時間 無翻牌 一樣卡牌歸零 翻牌延遲
    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;

        // 執行倒數計時 開始音樂 洗牌 延遲時間0.5秒
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    // 每次倒數-1秒 時間到0就會觸發遊戲結束
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    // 遊戲結束後出現文字 遊戲結束和點擊後繼續重新開始文字
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    // 遊戲通關後出現文字 遊戲通關和點擊後繼續重新開始文字
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

    // 蓋牌刪除所有文字和吻合的卡片
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    // 翻起卡片時執行 音樂 步數增加 翻起來的卡片等於總卡片數量 將跳出文字
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            // 翻起執行checkForCardMatch
            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    // 檢查牌是否有一樣 並執行相同或不相同
    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    // 當卡牌相同時
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    // 當卡牌不相同時
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    // 隨機洗牌
    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray = cardsArray.map((card, index) => {
            card.style.order = index;
        });
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    // 可以翻牌的數量+上延遲讓同時可翻牌數量減少
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

// 準備好了觸發 函數準備

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {

    ready()
}


function ready() {
    // 點擊空白處開始的文字
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    // 重新排列產生卡片
    let cards = Array.from(document.getElementsByClassName('card'));
    // 計時240秒
    let game = new MIX(240, cards);
    // 點擊空白處移除掉文字後開始遊戲
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    // 點擊卡片後翻面
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}