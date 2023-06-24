                         /*********GLOBAL INDEX VARIABLE FOR TRACKING CURRENT SONG*********/
let index = 1;
                       /*********CREATING AUDIO ELEMENT*********/
let audioElement = new Audio('1.mp3');
                       /************SELECTING ALL THE REQUIRED HTML ELEMENTS**********/
let masterPlay = document.getElementById("masterplay");
let ProgressBar = document.getElementById("ProgressBar");
let gif = document.getElementById("gif");
let songBarName = document.getElementById("songBarName");
let volume = document.querySelector("#volume i");
let volumeBar = document.querySelector("#volume .volumeControl");

                            /*********STORING DETAILS OF THE SONGS*********/
let songs = [{
    songName: "The Voice Key",
    filePath: "1.mp3",
    coverPath: "1.jpg",
    time: "03:50"
  },
  {
    songName: "Arrow Rock",
    filePath: "2.mp3",
    coverPath: "2.jpg",
    time: "02:33"
  },
  {
    songName: "Beaumont Themes",
    filePath: "3.mp3",
    coverPath: "3.jpg",
    time: "04:33"
  },
  {
    songName: "Wicked Fingers",
    filePath: "4.mp3",
    coverPath: "4.jpg",
    time: "04:27"
  },
  {
    songName: "On The Mountain",
    filePath: "5.mp3",
    coverPath: "5.jpg",
    time: "03:28"
  },
  {
    songName: "Remembering You",
    filePath: "6.mp3",
    coverPath: "6.jpg",
    time: "03:07"
  },
]

                   /*********INITIALISE FOR FIRST SONG AFTER LOADING OF WEBSITE*********/
songBarName.innerText = songs[0].songName;
audioElement.volume = 0.5;

                       /*********FUNCTION FOR PLAYING A SONG WHEN CLICKED ON SONG FROM SONG LIST*********/

function songPlay(ind) {
  index = parseInt(ind);
  songBarName.innerText = songs[index - 1].songName;
  audioElement.src = index + ".mp3";
  audioElement.currentTime = 0;
  audioElement.play();
}

                    /*********FILING DETAILS OF SONGS AND ADDING EVENTLISTENER FOR ALL THE SONGS*********/
for (var i = 0; i < 6; i++) {
  document.querySelectorAll(".songItem img")[i].src = songs[i].coverPath;
  document.querySelectorAll(".songItem .songName")[i].innerText = songs[i].songName;
  document.querySelectorAll(".songItem .songTime")[i].innerText = songs[i].time;


  document.querySelectorAll(".songItem i")[i].addEventListener("click", (e) => {

    if (audioElement.paused || audioElement.currentTime <= 0) songPlay(e.target.id);
    else {
      audioElement.pause();
      if (e.target.id != index) {
        songPlay(e.target.id);
      }
    }
  })
}


                /*********EVENT LISTENER WHEN BOTTOM PLAY IS CLICKED*********/

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) audioElement.play();
  else audioElement.pause();
})


                      /*********EVENT LISTENER WHEN AUDIO TIME CHANGES i.e. is playing*********/

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  document.querySelector(".bottom .runningTime").innerText = (Math.floor(audioElement.currentTime / 60)).toString().padStart(2, '0') + ":" + (Math.floor(audioElement.currentTime) % 60).toString().padStart(2, '0') + " / " + songs[index - 1].time;
  ProgressBar.value = progress;
})

                             /*********EVENT LISTENER FOR CHANGE IN SEEKBAR*********/
ProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (ProgressBar.value * audioElement.duration) / 100;
})


                    /*********EVENT LISTENER WHEN AUDIO IS PLAYED*********/


audioElement.addEventListener("play", () => {
                     /*********REMOVE ALL PAUSE ICONS AND INSERT PLAY ICONS*********/
  for (var j = 0; j < 6; j++) {
    document.querySelectorAll(".songItem i")[j].classList.remove("fa-pause");
    document.querySelectorAll(".songItem i")[j].classList.add("fa-play");
  }
                          /*********FOR THE SONG WHICH IS PLAYED*********/
  document.getElementById(index).classList.remove("fa-play");
  document.getElementById(index).classList.add("fa-pause");
                          /*********FOR BOTTOM PLAY/PAUSE BUTTON*********/
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  gif.style.opacity = 1;
})


                   /*********EVENT LISTENER WHEN BOTTOM PAUSE IS CLICKED*********/

audioElement.addEventListener("pause", () => {
  /*********REMOVE ALL PLAY ICONS AND INSERT PAUSE ICONS*********/
  for (var j = 0; j < 6; j++) {
    document.querySelectorAll(".songItem i")[j].classList.remove("fa-pause");
    document.querySelectorAll(".songItem i")[j].classList.add("fa-play");
  }
  masterPlay.classList.remove("fa-pause");
  masterPlay.classList.add("fa-play");
  gif.style.opacity = 0;
})


                             /*********EVEENT LISTENER WHEN AUDIO HAS ENDED i.e for autoplay********/

audioElement.addEventListener("ended", () => {
  setTimeout(() => {
    if (audioElement.paused) {
      if (index == 4) {
        index = 1;
      } else {
        index++;
      }

      audioElement.pause();
      songBarName.innerText = songs[index - 1].songName;
      audioElement.src = index + ".mp3";
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }, 5000);

})
                            /*********EVENT LISTENER FOR PLAYING NEXT SONG*********/

document.getElementById("next").addEventListener("click", () => {
                 /*********FOR CYCLIC PLAYING OF SONGS**********/
  if (index == 6) {
    index = 1;
  } else {
    index++;
  }

  audioElement.pause();
  songBarName.innerText = songs[index - 1].songName;
  audioElement.src = index + ".mp3";
  audioElement.currentTime = 0;
  audioElement.play();

})
                            /*********EVENT LISTENER FOR PLAYING PREV SONG*********/

document.getElementById("previous").addEventListener("click", () => {
  if (index == 1) {
    index = 6;
  } else {
    index--;
  }

  audioElement.pause();
  songBarName.innerText = songs[index - 1].songName;
  audioElement.src = index + ".mp3";
  audioElement.currentTime = 0;
  audioElement.play();

})

                      /*********EVENT LISTENER FOR VOLUME i.e.  volume up/down*********/
volume.addEventListener("click", () => {
  volume.style.opacity = 0.5;
  setTimeout(() => {
    volume.style.opacity = 1;
    volumeBar.classList.toggle("volumeBarVisibility");
  }, 100);

})

                    /*********EVENT LISTENER FOR CHANGE IN VOLUME BAR*********/
volumeBar.addEventListener("change", () => {
  audioElement.volume = volumeBar.value / 100;
  if (audioElement.volume === 0) {
    document.querySelector("#volume i").classList.remove("fa-volume-high");
    document.querySelector("#volume i").classList.add("fa-volume-xmark");
  } else {
    document.querySelector("#volume i").classList.remove("fa-volume-xmark");
    document.querySelector("#volume i").classList.add("fa-volume-high");
  }
})

                  /*********EVENT LISTENER FOR BUTTON CLICK (MEDIA QUERY SMALL SCREEN)*********/
document.getElementById("btn").addEventListener("click",()=>{
  document.querySelector(".dropdown").classList.toggle("open");
})
