/* =========================================
   BARÇA PLAYER EXPERIENCE
   ANAS #21
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("barcaIntro");
    const progress = document.getElementById("loadingProgress");
    const percent = document.getElementById("loadingPercent");

    let loading = 0;


    /* =========================================
       INTRO LOADING
    ========================================= */

    const loadingInterval = setInterval(() => {

        loading += Math.floor(Math.random() * 5) + 2;

        if (loading >= 100) {
            loading = 100;

            clearInterval(loadingInterval);

            progress.style.width = "100%";
            percent.textContent = "100%";

            setTimeout(() => {
                intro.classList.add("hide");

                startStatsAnimation();

            }, 500);
        }

        progress.style.width = `${loading}%`;
        percent.textContent = `${loading}%`;

    }, 80);


    /* =========================================
       PLAYER STATS ANIMATION
    ========================================= */

    function startStatsAnimation() {

        const statBars = document.querySelectorAll(".stat-fill");

        statBars.forEach((bar, index) => {

            const value = bar.dataset.value;

            setTimeout(() => {

                bar.style.width = `${value}%`;

            }, index * 180);

        });

    }


    /* =========================================
       DNA TRAITS
    ========================================= */

    const cards = document.querySelectorAll(".dna-card");

    const overlay = document.getElementById("unlockOverlay");

    const popupTitle = document.getElementById("popupTitle");

    const popupText = document.getElementById("popupText");

    const popupIcon = document.getElementById("popupIcon");

    const closePopup = document.getElementById("closePopup");

    let unlockedCount = 0;


    const traitData = {

        PASSION: {
            icon: "★",
            text: "PASSION LEVEL: MAXIMUM. BARÇA DNA DETECTED."
        },

        ENERGY: {
            icon: "⚡",
            text: "ENERGY LEVEL: 99%. NO SUBSTITUTE FOUND."
        },

        LOYALTY: {
            icon: "♥",
            text: "LOYALTY LEVEL: LEGENDARY. NEVER BENCHED."
        },

        AMBITION: {
            icon: "▲",
            text: "AMBITION LEVEL: UNLIMITED. ALWAYS MOVING FORWARD."
        }

    };


    cards.forEach(card => {

    card.addEventListener("click", () => {

        if (card.classList.contains("unlocked")) {
            return;
        }

        const trait = card.dataset.trait;
        const data = traitData[trait];

        if (!data) return;

        card.classList.add("unlocked");

        unlockedCount++;

        popupTitle.textContent = trait;
        popupText.textContent = data.text;
        popupIcon.textContent = data.icon;

        overlay.classList.add("show");

    });

    });


    /* =========================================
       CLOSE POPUP
    ========================================= */

    closePopup.addEventListener("click", () => {

        overlay.classList.remove("show");

    });


    overlay.addEventListener("click", event => {

        if (event.target === overlay) {

            overlay.classList.remove("show");

        }

    });


    /* =========================================
       KEYBOARD ESC
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            overlay.classList.remove("show");

        }

    });


    /* =========================================
       NEXT WORLD
    ========================================= */

    const nextButton = document.getElementById("nextButton");

    nextButton.addEventListener("click", () => {

        document.body.style.transition = "opacity .8s ease";

        document.body.style.opacity = "0";

        setTimeout(() => {

            window.location.href = "music.html";

        }, 800);

    });


});



