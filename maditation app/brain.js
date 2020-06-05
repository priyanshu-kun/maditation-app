const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    console.log(outline)
    const video = document.querySelector(".vid-container video");

    // sounds 
    const sounds = document.querySelectorAll(".app-videos");
    // console.log(sounds)

    // time display

    const timeDisplay = $(".time-display")


    // get outline length
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength)

    // fake duration

    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //pick a sound
    sounds.forEach(item => {
        // console.log(item)
        item.addEventListener("click", (e) => {
            // console.lo?g(item)
            song.src = item.dataset.sound;
            video.src = item.dataset.video;
            checkPlaying(song)
        })
    });


    // play sounds 
    play.addEventListener("click", () => {
        // song.play();
        checkPlaying(song)

    })

    // select duration
    // console.log()
    $(".duration-btns").on("click", function () {
        // console.log(this.dataset.item)
        duration = this.dataset.item;
        timeDisplay.html(`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}0`)
    })

    const checkPlaying = song => {
        //     // console.log(song)
        if (song.paused) {
            console.log("Hola")
            song.play();
            video.play();
            play.src = 'assets/svg/pause.svg'
        }
        else {
            song.pause();
            video.pause();
            play.src = 'assets/svg/play.svg'
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        // console.log(currentTime)
        // indicate how much time song going to run
        let elapsedTime = duration - currentTime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);

        // animate circle 
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // update time display

        timeDisplay.html(`${minutes}:${seconds}`)

        if (currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            play.src = 'assets/svg/play.svg';
            video.pause();
        }
    }

}


app();