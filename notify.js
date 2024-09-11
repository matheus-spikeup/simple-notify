const audioNotify = document.createElement("audio");
audioNotify.id = "audioNotify";
audioNotify.style.display = "none";
audioNotify.src = "https://matheus-spikeup.github.io/simple-notify/assets/sounds/notify.mp3"; // Caminho padrão do áudio
document.body.appendChild(audioNotify);

const notifyContainer = document.createElement("div");
notifyContainer.id = "notification-container";
document.body.appendChild(notifyContainer);

const max_notifications = 3; // Define o número máximo de notificações visíveis ao mesmo tempo

function playNotificationSound(type) {
    const audioPaths = {
        error: "https://matheus-spikeup.github.io/simple-notify/assets/sounds/notify.mp3",
        success: "https://matheus-spikeup.github.io/simple-notify/assets/sounds/notify.mp3",
        warning: "https://matheus-spikeup.github.io/simple-notify/assets/sounds/notify.mp3",
        // Outros tipos de notificação
    };

    if (!audioPaths.hasOwnProperty(type)) {
        console.error("Tipo de notificação inválido: ", type);
        return;
    }

    if (!audioNotify.paused) {
        audioNotify.pause();
        audioNotify.currentTime = 0;
    }

    audioNotify.src = audioPaths[type];
    audioNotify.onloadeddata = () => {
        audioNotify.play().catch(error => {
            console.error("Erro ao reproduzir o áudio: ", error);
        });
    };
}

function showNotification(type, message) {
    if (notifyContainer.children.length >= max_notifications) {
        notifyContainer.removeChild(notifyContainer.firstChild);
    }

    const notifyDiv = document.createElement("div");
    notifyDiv.classList.add("notify");
    notifyDiv.addEventListener("click", hideNotification);

    const notifyIconDiv = document.createElement("div");
    notifyIconDiv.classList.add("notify-icon");

    // Mapeamento de ícones para diferentes tipos de notificação
    const iconPaths = {
        error: "https://matheus-spikeup.github.io/simple-notify/assets/images/error.png",
        success: "https://matheus-spikeup.github.io/simple-notify/assets/images/success.png",
        info: "https://matheus-spikeup.github.io/simple-notify/assets/images/info.png",
        // Outros tipos de ícones
    };

    const iconImg = document.createElement("img");
    iconImg.src = iconPaths[type] || "https://matheus-spikeup.github.io/simple-notify/assets/images/default-icon.png"; // Define um ícone padrão caso o tipo seja desconhecido
    iconImg.alt = `${type} Icon`;

    const notifyContentsDiv = document.createElement("div");
    notifyContentsDiv.classList.add("notify-contents");
    const notifyText = document.createElement("p");
    notifyText.textContent = message;

    const progressBarDiv = document.createElement("div");
    progressBarDiv.classList.add("progress-bar");
    const progressBarInnerDiv = document.createElement("div");
    progressBarInnerDiv.classList.add("bar");

    notifyIconDiv.appendChild(iconImg);
    notifyContentsDiv.appendChild(notifyText);
    progressBarDiv.appendChild(progressBarInnerDiv);

    notifyDiv.appendChild(notifyIconDiv);
    notifyDiv.appendChild(notifyContentsDiv);
    notifyDiv.appendChild(progressBarDiv);

    notifyContainer.appendChild(notifyDiv);

    setTimeout(function () {
        progressBarInnerDiv.classList.add('increase-width');
    }, 0);

    setTimeout(function () {
        hideNotification();
    }, 5000);

    playNotificationSound(type);

    function hideNotification() {
        notifyDiv.classList.add('exit');
        setTimeout(function () {
            notifyDiv.remove();
        }, 1000);
    }
}
