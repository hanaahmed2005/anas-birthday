/* =========================================
   ANAS — INTRO
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const scenes = document.querySelectorAll(".scene");
    const progressBar = document.getElementById("progressBar");
    const hint = document.getElementById("hint");
    const enterButton = document.getElementById("enterButton");

    let currentScene = 0;
    let isTransitioning = false;

    /*
        Time for each scene.
        The first scene stays slightly longer
        so the opening feels cinematic.
    */

    const sceneTimes = [
    4500,  // ANAS / 21
    5000,  // I MADE YOU SOMETHING
    5500,  // I wanted to make you a place...
    5500,  // I collected little pieces...
    5000,  // THIS ISN'T JUST A WEBSITE
    5500,  // A place where every step...
    6000,  // HAPPY BIRTHDAY, ANAS
    0      // آخر Scene - مستني الضغط
];


    /* =========================================
       UPDATE PROGRESS
       ========================================= */

    function updateProgress() {

        const progress =
            (currentScene / (scenes.length - 1)) * 100;

        progressBar.style.width = `${progress}%`;
    }


    /* =========================================
       SHOW SCENE
       ========================================= */

    function showScene(index) {

        if (index < 0 || index >= scenes.length) {
            return;
        }

        scenes.forEach(scene => {
            scene.classList.remove("active");
        });

        scenes[index].classList.add("active");

        currentScene = index;

        updateProgress();

        if (currentScene === scenes.length - 1) {

            hint.textContent = "READY?";

        } else {

            hint.textContent = "CLICK TO CONTINUE";
        }
    }


    /* =========================================
       NEXT SCENE
       ========================================= */

    function nextScene() {

        if (isTransitioning) {
            return;
        }

        if (currentScene >= scenes.length - 1) {
            return;
        }

        isTransitioning = true;

        showScene(currentScene + 1);

        setTimeout(() => {
            isTransitioning = false;
        }, 700);
    }


    /* =========================================
       CLICK TO CONTINUE
       ========================================= */

    document.addEventListener("click", event => {

        /*
            Don't trigger next scene when
            clicking the ENTER button.
        */

        if (event.target.closest("#enterButton")) {
            return;
        }

        nextScene();
    });


    /* =========================================
       KEYBOARD
       ========================================= */

    document.addEventListener("keydown", event => {

        if (
            event.code === "Space" ||
            event.code === "ArrowRight" ||
            event.code === "Enter"
        ) {

            event.preventDefault();

            nextScene();
        }

        if (event.code === "ArrowLeft") {

            event.preventDefault();

            if (currentScene > 0) {
                showScene(currentScene - 1);
            }
        }
    });


    /* =========================================
       AUTO TRANSITION
       ========================================= */

    function startAutoScene() {

        const time = sceneTimes[currentScene];

        if (!time) {
            return;
        }

        setTimeout(() => {

            /*
                Only move automatically if
                the user hasn't already moved.
            */

            if (currentScene < scenes.length - 1) {

                nextScene();

                startAutoScene();
            }

        }, time);
    }


    /* =========================================
       ENTER THE WORLD
       ========================================= */

    enterButton.addEventListener("click", event => {

        event.stopPropagation();

        enterButton.disabled = true;

        enterButton.innerHTML = `
            ENTERING...
        `;

        document.body.style.transition =
            "opacity 1.2s ease";

        document.body.style.opacity = "0";

        setTimeout(() => {

            /*
                First real page.
            */

            window.location.href = "index.html";

        }, 1200);

    });


    /* =========================================
       START
       ========================================= */

    updateProgress();

    startAutoScene();

});