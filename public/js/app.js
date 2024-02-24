let speedHistory = [];
let audio = document.getElementById("audio");
let audioPlayed = false;
let firstSpeed = null;
let maxSpeed = 0;

function calculateSpeed(acceleration) {
    return Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2) * 3.6;
}

function adjustPlaybackRate(currentSpeed) {
    if (currentSpeed >= 100 && currentSpeed <= 130) {
        let rate = 1 + (currentSpeed - 100) * (1 / 30);
        audio.playbackRate = rate;
    } else if (currentSpeed < 100) {
        audio.playbackRate = 1;
    }
}

function updateSpeed(event) {
    const acceleration = event.accelerationIncludingGravity;
    const speed = calculateSpeed(acceleration);

    if (firstSpeed === null) {
        firstSpeed = speed;
    }

    const adjustedSpeed = Math.max(0, speed - firstSpeed);

    speedHistory.push(adjustedSpeed);
    if (speedHistory.length > 10) {
        speedHistory.shift();
    }

    maxSpeed = Math.max(...speedHistory);

    document.getElementById("currentSpeed").textContent = adjustedSpeed.toFixed(2);
    document.getElementById("maxSpeed").textContent = maxSpeed.toFixed(2);

    adjustPlaybackRate(adjustedSpeed);

    if (adjustedSpeed >= 100 && !audioPlayed) {
        playMusic();
        audioPlayed = true;
    }
}

function playMusic() {
    audio.play();
}

function stopMusic() {
    navigator.vibrate([10, 5, 10, 2, 50]);
    audio.pause();
    audio.currentTime = 0;
    audioPlayed = false;
}

function clearCacheAndCookies() {
    if (caches) {
        caches.keys().then(function (cacheNames) {
            cacheNames.forEach(function (cacheName) {
                caches.delete(cacheName).then(r => console.log("Cache deleted"));
            });
        });
    }

    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", updateSpeed);
} else {
    alert("Désolé, votre appareil ne supporte pas l'accéléromètre.");
}

setInterval(() => {
    maxSpeed = Math.max(...speedHistory);
    document.getElementById("maxSpeed").textContent = maxSpeed.toFixed(2);
}, 10000);
