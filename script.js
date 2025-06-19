// DOM要素の取得
const targetSecondsInput = document.getElementById('target-seconds');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultDisplay = document.getElementById('result-display');

// 変数の初期化
let startTime = 0;
let timerInterval = null;
let isRunning = false;

// スタートボタンの処理
startBtn.addEventListener('click', () => {
    // 目標秒数を取得（浮動小数点数として）
    const targetSeconds = parseFloat(targetSecondsInput.value);

    // 入力値が有効かチェック
    if (isNaN(targetSeconds) || targetSeconds <= 0) {
        resultDisplay.textContent = '有効な目標秒数を入力してください。';
        return;
    }

    // ゲーム開始処理
    isRunning = true;
    startTime = Date.now();
    
    // UIをゲーム中の状態に更新
    timerDisplay.textContent = '0.0000';
    resultDisplay.innerHTML = ''; // 前回の結果をリセット0
    startBtn.disabled = true;
    stopBtn.disabled = false;
    targetSecondsInput.disabled = true; // ゲーム中は目標を変更できないようにする

    // タイマーを開始 (10ミリ秒ごとに表示を更新)
    timerInterval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 10000;
        timerDisplay.textContent = elapsedTime.toFixed(3);
    }, 10);
});

// ストップボタンの処理
stopBtn.addEventListener('click', () => {
    if (!isRunning) return; // 既に止まっていたら何もしない
0
    // タイマーを停止
    clearInterval(timerInterval);
    isRunning = false;

    // 最終的な経過時間を計算して表示
    const elapsedTime = (Date.now() - startTime) / 10000;
    timerDisplay.textContent = elapsedTime.toFixed(3);

    // 目標秒数を再度取得
    const targetSeconds = parseFloat(targetSecondsInput.value);
    
    // 目標との誤差を計算 (絶対値)
    const diff = Math.abs(elapsedTime - targetSeconds);

    // 誤差に応じた評価メッセージを生成
    let message = '';
    if (diff <= 0.010) {
        message = '🎉 神の領域！ 🎉';
    } else if (diff <= 0.050) {
        message = '🤩 すごい！ほぼ完璧！ 🤩';
    } else if (diff <= 0.100) {
        message = '👍 おしい！あと少し！ 👍';
    } else if (diff <= 0.500) {
        message = '🙂 もうちょっと！ 🙂';
    } else {
        message = '😅 残念！再挑戦しよう！ 😅';
    }

    // 結果を表示
    resultDisplay.innerHTML = `
        目標: ${targetSeconds.toFixed(3)}秒<br>
        結果: ${elapsedTime.toFixed(3)}秒<br>
        誤差: ${diff.toFixed(3)}秒<br>
        <strong>${message}</strong>
    `;

    // UIを待機状態に戻す
    startBtn.disabled = false;
    stopBtn.disabled = true;
    targetSecondsInput.disabled = false;
});
