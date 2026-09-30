/* =====================================================
   ANAS — MEMORIES + PERSONAL LETTER
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       MUSIC
    ================================================= */

    const audio = document.getElementById("memoryAudio");
    const musicToggle = document.getElementById("musicToggle");

    let musicStarted = false;

    if (audio) {

        audio.volume = 1;
        audio.loop = true;

        function startMusic() {

            audio.play()
                .then(() => {

                    musicStarted = true;

                    if (musicToggle) {
                        musicToggle.classList.add("playing");
                        musicToggle.textContent = "♫";
                    }

                })
                .catch(() => {
                    // Browser blocked autoplay.
                    // User interaction will start it.
                });

        }


        /* Try autoplay */

        startMusic();


        /* Browser fallback */

        const userInteraction = () => {

            if (!musicStarted) {
                startMusic();
            }

        };

        document.addEventListener(
            "click",
            userInteraction,
            { once: true }
        );

        document.addEventListener(
            "touchstart",
            userInteraction,
            { once: true }
        );

        document.addEventListener(
            "keydown",
            userInteraction,
            { once: true }
        );


        /* Music button */

        if (musicToggle) {

            musicToggle.addEventListener("click", (event) => {

                event.stopPropagation();

                if (audio.paused) {

                    audio.play()
                        .then(() => {

                            musicStarted = true;

                            musicToggle.classList.add("playing");

                            musicToggle.textContent = "♫";

                        });

                } else {

                    audio.pause();

                    musicToggle.classList.remove("playing");

                    musicToggle.textContent = "♪";

                }

            });

        }

    }



    /* =================================================
       PHOTO REVEAL
    ================================================= */

    const photos = document.querySelectorAll(".old-photo");

    const photoObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    photoObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    photos.forEach((photo, index) => {

        photo.style.transitionDelay =
            `${index * 120}ms`;

        photoObserver.observe(photo);

    });



    /* =====================================================
   MEMORY PHOTO SLIDESHOW
===================================================== */

const memoryCards =
    document.querySelectorAll(".photo-slider");


memoryCards.forEach(function (card) {

    const images =
        card.querySelectorAll("img");


    if (images.length <= 1) {
        return;
    }


    let currentIndex = 0;


    /* =================================================
       INITIAL IMAGE
    ================================================= */

    images.forEach(function (image, index) {

        image.classList.remove("active");

        if (index === 0) {

            image.classList.add("active");

        }

    });


    /* =================================================
       DOTS
    ================================================= */

    const dotsContainer =
        card.querySelector(".slider-dots");


    let dots = [];


    if (dotsContainer) {

        dotsContainer.innerHTML = "";


        images.forEach(function (_, index) {

            const dot =
                document.createElement("span");


            if (index === 0) {

                dot.classList.add("active");

            }


            dotsContainer.appendChild(dot);

            dots.push(dot);

        });

    }


    /* =================================================
       CHANGE IMAGE
    ================================================= */

    function changeMemoryImage() {

        /* Hide current image */

        images[currentIndex]
            .classList.remove("active");


        /* Move to next image */

        currentIndex++;


        /* Back to first image */

        if (currentIndex >= images.length) {

            currentIndex = 0;

        }


        /* Show next image */

        images[currentIndex]
            .classList.add("active");


        /* Update dots */

        if (dots.length > 0) {

            dots.forEach(function (dot) {

                dot.classList.remove("active");

            });


            dots[currentIndex]
                .classList.add("active");

        }

    }


    /* =================================================
       START SLIDESHOW
    ================================================= */

    setInterval(

        changeMemoryImage,

        2500

    );

});


    /* =================================================
       TIMELINE REVEAL
    ================================================= */

    const timelineCards =
        document.querySelectorAll(".timeline-card");

    const timelineObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        timelineObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    timelineCards.forEach((card) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(30px)";

        card.style.transition =
            "opacity .8s ease, transform .8s ease";

        timelineObserver.observe(card);

    });



    /* =================================================
       LETTER TYPING
    ================================================= */

    const typedLetter =
        document.getElementById("typedLetter");


    /* الرسالة نفسها */

    const letterText = `I don't really know where to start.

Maybe with all the random memories, our stupid jokes, the chats that made absolutely no sense, and all those little moments between us that somehow became important without us even realizing it.

From June 2025 to October 2026... wow.
A year and a half together. That's actually a long time.

Two birthdays came and went.
So many different versions of you.

So many things happened, and somehow, it all started with Attack on Titan!!

From all the anime and shows we watched together, to a streak that lasted for a whole year, waking up for lectures, working together, joking around, laughing, and sometimes getting on each other's nerves...

You being annoying, of course. We all know you're the annoying one. 😂

All of these became memories.
And I know there are still so many more waiting for us.

Honestly, I'm really happy that I got to know you this year.

You became one of the closest people to me.
You shared so many happy moments with me, encouraged me, helped me, and were there for me in so many ways.

And I'm genuinely grateful for all the beautiful moments and memories we've made together.

I hope you always stay happy.
I hope you keep smiling and keep succeeding in life.

I hope you meet good people who make life feel a little lighter, and hopefully, they're all as fun and easygoing as you are.

I hope you achieve everything you once thought was impossible, and make even more memories and have even more crazy adventures that you'll still be talking about years from now.

So here's to you.

To little Anas in those old pictures.

To the Anas you are today, the one we all hope stays in our lives.

And to every new version of you in the future, which I'm sure will always be even better.

Keep being Anoos, the anime king. 👑

Keep making beautiful memories.

And honestly, you deserve every good thing this world has to offer.

Happy birthday, my favorite friend. 🥳❤️`;


    let letterStarted = false;


    function typeLetter() {

        if (letterStarted || !typedLetter) return;

        letterStarted = true;

        let index = 0;

        const speed = 28;


        const cursor =
            document.createElement("span");

        cursor.className = "typing-cursor";


        typedLetter.appendChild(cursor);


        function typeNextCharacter() {

            if (index >= letterText.length) {

                cursor.remove();

                return;

            }


            const character =
                letterText.charAt(index);


            cursor.before(
                document.createTextNode(character)
            );


            index++;


            let delay = speed;


            /* Slightly longer pause after punctuation */

            if (
                character === "." ||
                character === "!" ||
                character === "?"
            ) {

                delay = 180;

            }


            if (character === "\n") {

                delay = 100;

            }


            setTimeout(
                typeNextCharacter,
                delay
            );

        }


        typeNextCharacter();

    }



    /* =================================================
       START LETTER WHEN VISIBLE
    ================================================= */

    const letterSection =
        document.querySelector(".letter-section");


    if (letterSection) {

        const letterObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            entry.intersectionRatio > 0.2
                        ) {

                            setTimeout(
                                typeLetter,
                                500
                            );

                            letterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );


        letterObserver.observe(letterSection);

    }



    /* =================================================
       FILM FRAMES
    ================================================= */

    const filmFrames =
        document.querySelectorAll(".film-frame");


    const filmObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        filmObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    filmFrames.forEach((frame, index) => {

        frame.style.opacity = "0";

        frame.style.transform =
            "translateY(30px)";

        frame.style.transition =
            `opacity .7s ease ${index * 120}ms,
             transform .7s ease ${index * 120}ms`;

        filmObserver.observe(frame);

    });



    /* ================================================= 
   FINAL BUTTON 
===================================================== */

const nextPageButton = 
    document.getElementById("nextPageButton"); 


if (nextPageButton) { 

    nextPageButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        document.body.style.transition =
            "opacity 0.9s ease";

        document.body.style.opacity =
            "0";

        setTimeout(function () {

            window.location.href =
                "final.html";

        }, 900);

    });

}


    /* =================================================
       SMALL PARALLAX EFFECT
    ================================================= */

    const hero =
        document.querySelector(".memory-hero");


    window.addEventListener(
        "scroll",
        () => {

            if (!hero) return;

            const scrollY =
                window.scrollY;


            if (scrollY < window.innerHeight) {

                hero.style.transform =
                    `translateY(${scrollY * 0.08}px)`;

                hero.style.opacity =
                    `${1 - scrollY / 900}`;

            }

        },
        {
            passive: true
        }
    );


});