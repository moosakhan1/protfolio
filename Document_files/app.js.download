// var arr = [
//     { songName: "Jale 2", url: "./song/Arjan Vailly Ne (3).mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/jale.jpg?raw=true" },
//     { songName: "Pehle Bhi main", url: "./song/Jale 2.mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/animal.jpg?raw=true" },
//     { songName: "Ram siya ram", url: "./song/Pehle Bhi Main.mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/ram.jpg?raw=true" },
//     { songName: "Arjan Valley", url: "./song/Ram Siya Ram.mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/animal.jpg?raw=true" }
// ]
// var allSongs = document.querySelector("#all-songs")
// var poster = document.querySelector("#left")

// var play = document.querySelector("#play")
// var backward = document.querySelector("#backward")
// var forward = document.querySelector("#forward")



// var audio = new Audio()

// var selectedSong = 0

// function mainFunction() {
//     var clutter = ""

//     arr.forEach(function (elem, index) {
//         clutter += `<div class="song-card" id=${index}>
//     <div class="part1">
//         <img src=${elem.img} alt="">
//         <h2>${elem.songName}</h2>
//     </div>
//     <h6>3:56</h6>
// </div>`
//     })
//     allSongs.innerHTML = clutter

//     audio.src = arr[selectedSong].url
//     poster.style.backgroundImage = `url(${arr[selectedSong].img})`
// }
// mainFunction()

// allSongs.addEventListener("click", function (dets) {
//     selectedSong = dets.target.id
//     mainFunction()
//     play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
//     flag = 1
//     audio.play()
// })

// var flag = 0

// play.addEventListener("click", function () {
//     if (flag == 0) {
//         play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
//         mainFunction()
//         audio.play()
//         flag = 1
//     } else {
//         play.innerHTML = `<i class="ri-play-mini-fill"></i>`
//         mainFunction()
//         audio.pause()
//         flag = 0
//     }
// })

// forward.addEventListener("click", function () {
//     if (selectedSong < arr.length - 1) {
//         selectedSong++
//         mainFunction()
//         audio.play()
//     }else{
//         forward.style.opacity = 0.4
//     }
// })


// backward.addEventListener("click", function () {
//     if (selectedSong > 0) {
//         selectedSong--
//         mainFunction()
//         audio.play()
//     }else{
//         backward.style.opacity = 0.4
//     }
// })



















var arr = [
        { songName: "Jale 2", url: "./song/Arjan Vailly Ne (3).mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/jale.jpg?raw=true" },
        { songName: "Pehle Bhi main", url: "./song/Jale 2.mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/animal.jpg?raw=true" },
        { songName: "Ram siya ram", url: "./song/Pehle Bhi Main.mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/ram.jpg?raw=true" },
        { songName: "Arjan Valley", url: "./song/Ram Siya Ram.mp3", img: "https://github.com/asynchronousJavascriptor/level2/blob/main/youtubemusic/images/animal.jpg?raw=true" }
]

var allSongs =  document.querySelector("#all-songs")
var poster =  document.querySelector("#left")

var play = document.querySelector("#play")
var backward = document.querySelector("#backward")
var forward = document.querySelector("#forward")

var audio = new Audio();

var selectedSong = 0
function mainFunction() {
    var clutter = "";
arr.forEach(function (obj , index) {

    clutter +=`<div class="song-card" id=${index}>
        <div class="part1">
            <img src=${obj.img} alt="">
            <h2>${obj.songName}</h2>
        </div>
        <h6>3:56</h6>
    </div>`
   allSongs.innerHTML = clutter


   audio.src = arr[selectedSong].url
    poster.style.backgroundImage = `url(${arr[selectedSong].img})`
});    
}
mainFunction();


allSongs.addEventListener("click", function(dets){
    selectedSong = dets.target.id
    mainFunction();
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1
    audio.play();
})

var flag = 0

play.addEventListener("click", function(){
    if (flag == 0) {
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
        mainFunction();
        audio.play();
        flag = 1
    } else {
        play.innerHTML = `<i class="ri-play-mini-fill"></i>`
        mainFunction();
        audio.pause
        flag = 0
    }
})

forward.addEventListener("click", function(){
    if(selectedSong < arr.length -1){
        selectedSong++
        mainFunction();
        audio.play();
    }else{
        backward.style.opacity = 0.4
    }
})
backward.addEventListener("click", function(){
    if(selectedSong > 0){
        selectedSong--
        mainFunction();
        audio.play();
    }else{
        backward.style.opacity = 0.4
    }
})