let index=1;
let audioElement=new Audio('songs/1.mp3' );
//audioElement.play();
let masterPlay=document.getElementById("masterplay");
let ProgressBar=document.getElementById("ProgressBar");
let gif=document.getElementById("gif");
//let songItems=Array.from(document.getElementByClassName("songItem"));

let songBarName=document.getElementById("songBarName");
let volume=document.querySelector("#volume i");
let volumeBar=document.querySelector("#volume .volumeControl");
audioElement.volume=0.5;
let songs=[
  {songName:"Tune_1", filePath:"songs/1.mp3",coverPath:"images/covers/1.jpg",time:"03:50"},
  {songName:"Tune_2", filePath:"songs/2.mp3",coverPath:"images/covers/2.jpg",time:"02:33"},
  {songName:"Tune_3", filePath:"songs/3.mp3",coverPath:"images/covers/3.jpg",time:"04:33"},
  {songName:"Tune_4", filePath:"songs/4.mp3",coverPath:"images/covers/4.jpg",time:"04:27"},
]
songBarName.innerText=songs[0].songName;

function songPlay(ind){
  index=parseInt(ind);
  songBarName.innerText=songs[index-1].songName;
  audioElement.src="songs/"+index+".mp3";
  audioElement.currentTime=0;
  audioElement.play();
}

/*EventListener for song list*/
/*for(var i=0;i<4;i++) console.log(document.querySelectorAll(".songItem .timestamp")[i].innerText);*/
for(var i=0;i<4;i++){

  document.querySelectorAll(".songItem img")[i].src=songs[i].coverPath;
  document.querySelectorAll(".songItem .songName")[i].innerText=songs[i].songName;
  document.querySelectorAll(".songItem .songTime")[i].innerText=songs[i].time;
/*console.log(document.querySelectorAll(".songItem")[i]);*/

  document.querySelectorAll(".songItem i")[i].addEventListener("click",(e)=>{

  /*  for(var j=0;j<4;j++){
      document.querySelectorAll(".songItem i")[j].classList.remove("fa-pause");
      document.querySelectorAll(".songItem i")[j].classList.add("fa-play");
    }
*/

    if(audioElement.paused || audioElement.currentTime<=0){
      /*e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");*/
      songPlay(e.target.id);
    /*  index=parseInt(e.target.id);
      songBarName.innerText=songs[index-1].songName;
      audioElement.src="songs/"+index+".mp3";
      audioElement.currentTime=0;
      audioElement.play();*/
      /*masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      gif.style.opacity=1;*/
    }
    else{
      audioElement.pause();
      if(e.target.id!=index){
        songPlay(e.target.id);
        /*index=parseInt(e.target.id);
        songBarName.innerText=songs[index-1].songName;
        audioElement.src="songs/"+index+".mp3";
        audioElement.currentTime=0;
        audioElement.play();*/
      }
      /*e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      masterPlay.classList.remove("fa-pause");
      masterPlay.classList.add("fa-play");
      gif.style.opacity=0;*/
    }

  })
}




masterPlay.addEventListener("click",()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    /*masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity=1;*/
  }
  else{
    audioElement.pause();
    /*masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity=0;*/
  }

})




  audioElement.addEventListener("timeupdate",()=>{
  let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);

   document.querySelector(".bottom .runningTime").innerText=(Math.floor(audioElement.currentTime/60)).toString().padStart(2,'0')+":"+(Math.floor(audioElement.currentTime)%60).toString().padStart(2,'0')+" / "+songs[index-1].time;
  ProgressBar.value=progress;
})

ProgressBar.addEventListener("change",()=>{
  
  audioElement.currentTime=(ProgressBar.value*audioElement.duration)/100;
})






audioElement.addEventListener("play",()=>{
  for(var j=0;j<4;j++){
    document.querySelectorAll(".songItem i")[j].classList.remove("fa-pause");
    document.querySelectorAll(".songItem i")[j].classList.add("fa-play");
  }
  document.getElementById(index).classList.remove("fa-play");
  document.getElementById(index).classList.add("fa-pause");
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  gif.style.opacity=1;
})

audioElement.addEventListener("pause",()=>{
  for(var j=0;j<4;j++){
    document.querySelectorAll(".songItem i")[j].classList.remove("fa-pause");
    document.querySelectorAll(".songItem i")[j].classList.add("fa-play");
  }
  masterPlay.classList.remove("fa-pause");
  masterPlay.classList.add("fa-play");
  gif.style.opacity=0;
})



audioElement.addEventListener("ended",()=>{
  setTimeout(() => {
    if(audioElement.paused){
    if(index==4){
      index=1;
    }
    else{
      index++;
    }

    audioElement.pause();
    songBarName.innerText=songs[index-1].songName;
    audioElement.src="songs/"+index+".mp3";
    audioElement.currentTime=0;
    audioElement.play();
  }
}, 5000);

})


document.getElementById("next").addEventListener("click",()=>{
  if(index==4){
    index=1;
  }
  else{
    index++;
  }

  audioElement.pause();
songBarName.innerText=songs[index-1].songName;
  audioElement.src="songs/"+index+".mp3";
  audioElement.currentTime=0;
  audioElement.play();
  /*masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");*/
})


document.getElementById("previous").addEventListener("click",()=>{
  if(index==1){
    index=4;
  }
  else{
    index--;
  }

  audioElement.pause();
  songBarName.innerText=songs[index-1].songName;
  audioElement.src="songs/"+index+".mp3";
  audioElement.currentTime=0;
  audioElement.play();
  /*masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");*/
})


volume.addEventListener("click",()=>{
  volumeBar.classList.toggle("volumeBarVisibility");
})

volumeBar.addEventListener("change",()=>{
  audioElement.volume=volumeBar.value/100;
  if(audioElement.volume===0){
    document.querySelector("#volume i").classList.remove("fa-volume-high");
    document.querySelector("#volume i").classList.add("fa-volume-xmark");
  }
  else{
    document.querySelector("#volume i").classList.remove("fa-volume-xmark");
    document.querySelector("#volume i").classList.add("fa-volume-high");
  }
})
