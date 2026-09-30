/* =========================================
   ANAS SOUNDTRACK
   MUSIC PLAYER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const audio = document.getElementById("audioPlayer");

    const playButton = document.getElementById("playButton");

    const previousButton = document.getElementById("previousButton");

    const nextButton = document.getElementById("nextSongButton");

    const volumeSlider = document.getElementById("volumeSlider");

    const progressFill = document.getElementById("progressFill");

    const progressBar = document.querySelector(".progress-bar");

    const currentTimeElement = document.getElementById("currentTime");

    const durationElement = document.getElementById("duration");

    const songTitle = document.getElementById("songTitle");

    const songArtist = document.getElementById("songArtist");

    const songAlbum = document.getElementById("songAlbum");

    const memoryText = document.getElementById("memoryText");

    const vinyl = document.querySelector(".vinyl");

    const playlistSongs = document.querySelectorAll(".playlist-song");

    const nextWorldButton = document.getElementById("nextWorldButton");


    /* =========================================
       SONG DATA
    ========================================= */

    const songs = [

        {
            title: "What Makes You Beautiful",
            artist: "One Direction",
            album: "Four",
            file: "../assets/music/What-Makes-You-Beautiful.mp3",
            memory:
                "الاغنيه الي كنت بتسمعها وانت صغير يا عم الحبيب😉✨."
        },

        {
            title: "Bulletproof Love",
            artist: " Pierce The Veil",
            album: "Selfish Machines",
            file: "../assets/music/bulletproof-love.mp3",
            memory:
                "ريبوستات التيك التوك فضحتك(انت مش متراقب ولا حاجه) 🙈."
        },

        {
            title: "Starlight",
            artist: "Muse ",
            album: " Black Holes and Revelations",
            file: "../assets/music/starlight.mp3",
            memory:
                "اغنيه انت مرشحهالي كانت توب التوب 🤯🔥."
        },

        {
            title: "Starry Eyes",
            artist: "Cigarettes After Sex",
            album: "Single Song",
            file: "../assets/music/Starry-Eyes.mp3",
            memory:
                "طلع زوقك رايق في الاغاني😭🎶."
        },

        {
            title: "Min Shaf Habibi",
            artist: "Jadal",
            album: "Single Song",
            file: "../assets/music/Min-shaf-habibi.mp3",
            memory:
            "زوقك حلو حتي في العربي كمااان❤️✨"
        }

    ];


    /* =========================================
       STATE
    ========================================= */

    let currentSongIndex = 0;

    let isPlaying = false;


    /* =========================================
       LOAD SONG
    ========================================= */

    function loadSong(index) {

        const song = songs[index];

        if (!song) return;

        currentSongIndex = index;

        songTitle.textContent = song.title;

        songArtist.textContent = song.artist;

        songAlbum.textContent = song.album;

        memoryText.textContent = song.memory;

        audio.src = song.file;

        audio.load();


        playlistSongs.forEach((item, itemIndex) => {

            item.classList.toggle(
                "active",
                itemIndex === index
            );

        });


        progressFill.style.width = "0%";

        currentTimeElement.textContent = "0:00";

        durationElement.textContent = "0:00";

    }


    /* =========================================
       PLAY
    ========================================= */

    function playSong() {

        if (!audio.src) {
            loadSong(currentSongIndex);
        }


        audio.play()
            .then(() => {

                isPlaying = true;

                playButton.textContent = "❚❚";

                vinyl.classList.add("playing");

            })
            .catch(() => {

                isPlaying = false;

            });

    }


    /* =========================================
       PAUSE
    ========================================= */

    function pauseSong() {

        audio.pause();

        isPlaying = false;

        playButton.textContent = "▶";

        vinyl.classList.remove("playing");

    }


    /* =========================================
       PLAY / PAUSE
    ========================================= */

    playButton.addEventListener("click", () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    });


    /* =========================================
       NEXT
    ========================================= */

    function nextSong() {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

        loadSong(currentSongIndex);

        playSong();

    }


    nextButton.addEventListener("click", nextSong);


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousSong() {

        currentSongIndex--;

        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }

        loadSong(currentSongIndex);

        playSong();

    }


    previousButton.addEventListener(
        "click",
        previousSong
    );


    /* =========================================
       PLAYLIST CLICK
    ========================================= */

    playlistSongs.forEach(songButton => {

        songButton.addEventListener("click", () => {

            const index = Number(
                songButton.dataset.index
            );

            loadSong(index);

            playSong();

        });

    });


    /* =========================================
       TIME UPDATE
    ========================================= */

    audio.addEventListener("timeupdate", () => {

        if (!audio.duration) return;


        const progress =
            (audio.currentTime / audio.duration) * 100;


        progressFill.style.width =
            `${progress}%`;


        currentTimeElement.textContent =
            formatTime(audio.currentTime);

    });


    /* =========================================
       DURATION
    ========================================= */

    audio.addEventListener("loadedmetadata", () => {

        durationElement.textContent =
            formatTime(audio.duration);

    });


    /* =========================================
       FORMAT TIME
    ========================================= */

    function formatTime(seconds) {

        if (!seconds || isNaN(seconds)) {
            return "0:00";
        }


        const minutes =
            Math.floor(seconds / 60);


        const remainingSeconds =
            Math.floor(seconds % 60);


        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;

    }


    /* =========================================
       CLICK PROGRESS BAR
    ========================================= */

    progressBar.addEventListener("click", event => {

        if (!audio.duration) return;


        const rect =
            progressBar.getBoundingClientRect();


        const clickPosition =
            event.clientX - rect.left;


        const percentage =
            clickPosition / rect.width;


        audio.currentTime =
            percentage * audio.duration;

    });


    /* =========================================
       VOLUME
    ========================================= */

    volumeSlider.addEventListener("input", () => {

        audio.volume =
            Number(volumeSlider.value);

    });


    audio.volume = 0.7;


    /* =========================================
       AUTO NEXT
    ========================================= */

    audio.addEventListener("ended", () => {

        nextSong();

    });


    /* =========================================
       KEYBOARD CONTROLS
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.code === "Space") {

            event.preventDefault();

            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }

        }


        if (event.code === "ArrowRight") {

            nextSong();

        }


        if (event.code === "ArrowLeft") {

            previousSong();

        }

    });


    /* =========================================
       NEXT WORLD
    ========================================= */

    nextWorldButton.addEventListener("click", () => {

        document.body.style.transition =
            "opacity 0.8s ease";

        document.body.style.opacity = "0";


        setTimeout(() => {

            window.location.href =
                "memories.html";

        }, 800);

    });


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadSong(0);

});