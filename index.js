let cat = document.getElementById("cat");
let container = document.getElementById("background");
let background = document.getElementById("backgroundImg");
let width = background.getBoundingClientRect().width;
console.log(width);
let height = container.getBoundingClientRect().height;
let catCoords = cat.getBoundingClientRect();
let startBlock = document.getElementById("start");
let startButton = document.getElementById("startBtn");
let fishCountBlock = document.getElementById("fishCount");
let timeBlock = document.getElementById("time");
let endBlock = document.getElementsByClassName("end")[0];
let timeOverBlock = document.getElementsByClassName("timeOver")[0];
let resultBlock = document.getElementById("result");
let addedFish = document.getElementsByClassName("fishfall_anim");
let fishCount = 0;
let seconds = 60;
let time = seconds;
let timer;

function addKeypress(event) {
    let ar = "ArrowRight";
    let al = "ArrowLeft";
    let catLeftPos1 = parseFloat(getComputedStyle(cat).left);
    let catWidth = catCoords.width;

    if(event.code == ar) {
        cat.style.left = catLeftPos1 + 30 + "px";
        if((catLeftPos1 + catWidth) >= width) {
            cat.style.left = (width - catWidth) + "px";
        }
    }
    if(event.code == al) {
        cat.style.left = catLeftPos1 - 30 + "px";
        if(catLeftPos1 <= 2) {
            cat.style.left = 0;
        }
    }
}

document.body.addEventListener("keyup", addKeypress);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function addFish(path, id) {
    let fish = new Image();
    fish.src = path;
    fish.classList.add("fishfall_anim");
    fish.id = id;
    fish.style.left = getRandomIntInclusive(50, (width - 50)) + "px";
    container.append(fish);
    return fish;
}

function returnPoint(x, y) {
    let points = document.elementsFromPoint(x, y);
    let point = points.find((elem) => elem.id == "cat");
    return point;
}

let arr = [["images/02.png", "bad"], ["images/03.png", "fresh"]];

let randomFish = getRandomIntInclusive(0, arr.length - 1);
let [path, id] = arr[randomFish];

function fishfall(path, id, ms) {
    time = seconds;
    let fish = addFish(path, id);
    
    setInterval(() => {

        if(fishCount >= 0 ) {
        let fTop = parseFloat(getComputedStyle(fish).top);
        let fHeight = fish.offsetHeight;
    
        fish.style.top = fTop + 10 + "px";
    
        if(fTop >= (height - fHeight)) {
            let newRandomFish = getRandomIntInclusive(0, arr.length - 1);
            let [newPath, newId] = arr[newRandomFish];
            fish.remove();
           fish = addFish(newPath, newId);
        }
    }

        let fCoords = fish.getBoundingClientRect();
        let finalPoint = returnPoint(fCoords.x, fCoords.y);

        if(finalPoint) {
            let fId = fish.id;

            if(fId == "fresh") {
                fishCount += 1;
                fishCountBlock.textContent = fishCount;
            };

            if(fId == "bad") {
                fishCount -= 1;
                fishCountBlock.textContent = fishCount;
            };
            
            if(fishCount <= 0) {
                fishCountBlock.textContent = 0;
                timeBlock.textContent = 0;
                document.body.append(startBlock);
                endBlock.classList.remove("none");
                clearInterval(timer);
                fish.remove();
                addedFish.remove();
            }

            let newRandomFish = getRandomIntInclusive(0, arr.length - 1);
            let [newPath, newId] = arr[newRandomFish];
            fish.remove();
           fish = addFish(newPath, newId);
        }
        if(time == 0) {
            fishCountBlock.textContent = 0;
            document.body.append(startBlock);
            resultBlock.textContent = fishCount;
            timeOverBlock.classList.remove("none");
            clearInterval(timer);
            fish.remove();
            time = seconds;
        }
    }, ms);
}

function tick() {
        timer = setInterval(() => {
            time -= 1;
            timeBlock.textContent = `${time}s`;
        }, 1000);
        return timer;
}

function startGame(e) {
    e.target.parentElement.remove();
    fishCount = 0;
    time = seconds;
    tick();
    fishfall(path, id, 150);
}

startButton.addEventListener("click", startGame);