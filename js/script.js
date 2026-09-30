const correctCode = "01102005";

const codeBoxes = document.querySelectorAll(".code-box");

const opening = document.getElementById("opening");

const confirmButton = document.getElementById("confirmButton");

const wrongMessage = document.getElementById("wrongMessage");

const successMessage = document.getElementById("successMessage");

const leviArea = document.getElementById("leviArea");

const leviCaption = document.querySelector(".levi-caption");

const birthdayPage = document.getElementById("birthdayPage");

const musicButton = document.getElementById("musicButton");


/* =====================================
   CODE INPUT
===================================== */

codeBoxes.forEach((box, index) => {

    box.addEventListener("input", () => {

        // numbers only
        box.value = box.value.replace(/\D/g, "");

        // move to next box
        if (box.value && index < codeBoxes.length - 1) {

            codeBoxes[index + 1].focus();

        }

        // automatically check when all 8 numbers are entered
        if (index === codeBoxes.length - 1 && box.value) {

            checkCode();

        }

    });


    /* Backspace */

    box.addEventListener("keydown", (event) => {

        if (
            event.key === "Backspace" &&
            !box.value &&
            index > 0
        ) {

            codeBoxes[index - 1].focus();

        }

    });


    /* Paste full code */

    box.addEventListener("paste", (event) => {

        event.preventDefault();

        const pastedCode =
            event.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, 8);

        pastedCode.split("").forEach((number, i) => {

            if (codeBoxes[i]) {

                codeBoxes[i].value = number;

            }

        });

        if (pastedCode.length === 8) {

            checkCode();

        }

    });

});


/* =====================================
   GET CODE
===================================== */

function getEnteredCode() {

    return Array.from(codeBoxes)
        .map(box => box.value)
        .join("");

}


/* =====================================
   CLEAR CODE
===================================== */

function clearCode() {

    codeBoxes.forEach(box => {

        box.value = "";

    });

    codeBoxes[0].focus();

}


/* =====================================
   WRONG CODE
===================================== */

function wrongCode() {

    opening.classList.remove("success");

    opening.classList.remove("wrong");

    // restart animation
    void opening.offsetWidth;

    opening.classList.add("wrong");

    leviArea.classList.remove("angry");

    void leviArea.offsetWidth;

    leviArea.classList.add("angry");

    leviCaption.textContent = "OY! OY! OY!";

    wrongMessage.style.opacity = "1";

    setTimeout(() => {

        opening.classList.remove("wrong");

        leviCaption.textContent = "...Hurry up.";

        wrongMessage.style.opacity = "0";

        clearCode();

    }, 1800);

}


/* =====================================
   CORRECT CODE
===================================== */

function correctCodeEntered() {

    opening.classList.remove("wrong");

    opening.classList.add("success");

    successMessage.style.opacity = "1";

    leviCaption.textContent = "Tch... finally.";

    // Wait before opening birthday page

    setTimeout(() => {

        birthdayPage.classList.add("show");

    }, 1500);

}


/* =====================================
   CHECK CODE
===================================== */

function checkCode() {

    const enteredCode = getEnteredCode();

    if (enteredCode.length !== 8) {

        return;

    }

    if (enteredCode === correctCode) {

        correctCodeEntered();

    } else {

        wrongCode();

    }

}


/* =====================================
   BUTTON
===================================== */

confirmButton.addEventListener("click", () => {

    checkCode();

});


/* =====================================
   ENTER KEY
===================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        checkCode();

    }

});


/* =====================================
   MUSIC BUTTON
===================================== */

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    musicPlaying = !musicPlaying;

    if (musicPlaying) {

        musicButton.querySelector("span").textContent = "♫";

        musicButton.querySelector("label").textContent = "ON";

    } else {

        musicButton.querySelector("span").textContent = "♫";

        musicButton.querySelector("label").textContent = "Music";

    }

});


/* =====================================
   NEXT MISSION
===================================== */

function continueBirthday() {

    alert("The next mission is waiting, soldier. 🪽");

}