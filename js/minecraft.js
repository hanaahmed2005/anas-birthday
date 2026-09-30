const chestButton = document.getElementById("chestButton");
const questBox = document.getElementById("questBox");
const acceptQuest = document.getElementById("acceptQuest");

const finalMessage = document.getElementById("finalMessage");
const nextWorld = document.getElementById("nextWorld");


/* =========================
   CHEST
========================= */

chestButton.addEventListener("click", () => {

    chestButton.classList.add("open");

    setTimeout(() => {
        questBox.classList.add("show");
    }, 500);

});


/* =========================
   ACCEPT QUEST
========================= */

acceptQuest.addEventListener("click", () => {

    finalMessage.classList.add("show");

});


/* =========================
   NEXT WORLD
========================= */

nextWorld.addEventListener("click", () => {

    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "anime.html";

    }, 800);

});


/* =========================
   RANDOM GRASS PARTICLES
========================= */

function createParticle() {

    const particle = document.createElement("span");

    particle.innerHTML = "✦";

    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 70 + "%";
    particle.style.color = "rgba(255,255,255,.5)";
    particle.style.fontSize = Math.random() * 8 + 5 + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "6";

    document.body.appendChild(particle);

    particle.animate(
        [
            {
                opacity: 0,
                transform: "translateY(20px)"
            },
            {
                opacity: 1
            },
            {
                opacity: 0,
                transform: "translateY(-50px)"
            }
        ],
        {
            duration: 3000,
            easing: "ease-in-out"
        }
    );

    setTimeout(() => {
        particle.remove();
    }, 3000);
}


setInterval(createParticle, 900);