let cat = document.getElementById("cat");
let container = document.getElementById("background");
let width = container.getBoundingClientRect().width;
let height = container.getBoundingClientRect().height;
let catCoords = cat.getBoundingClientRect();
let startBlock = document.getElementById("start");
let startButton = document.getElementById("startBtn");
let fishCountBlock = document.getElementById("fishCount");
let timeBlock = document.getElementById("time");
let endBlock = document.getElementsByClassName("end")[0];
let fishCount = 0;
let time = 60;

function addKeypress(event) {
    let ar = "ArrowRight";
    let al = "ArrowLeft";
    let catLeftPos1 = parseFloat(getComputedStyle(cat).left);
    let catLeftPos2 = catCoords.left;
    let catWidth = catCoords.width;
    if(event.code == ar) {
        cat.style.left = catLeftPos1 + 30 + "px";
        if(catLeftPos2 >= width) {
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
console.log(path, id);

function fishfall(path, id) {

    let fish = addFish(path, id);

    setInterval(() => {

        if(fishCount >= 0) {
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
            
            if(fishCount < 0) {
                fishCountBlock.textContent = 0;
                document.body.append(startBlock);
                endBlock.classList.remove("none");
                fish.remove();
                fishfall = false;
            }

            let newRandomFish = getRandomIntInclusive(0, arr.length - 1);
            let [newPath, newId] = arr[newRandomFish];
            fish.remove();
           fish = addFish(newPath, newId);
        }
    console.log(fishCount);
    }, 100);
}


function startGame(e) {
    e.target.parentElement.remove();
    fishCount = 0;
    fishfall(path, id);
}
startButton.addEventListener("click", startGame);