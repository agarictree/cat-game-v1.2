let cat = document.getElementById("cat");
let container = document.getElementById("background");
let width = container.getBoundingClientRect().width;
let height = container.getBoundingClientRect().height;
let catCoords = cat.getBoundingClientRect();
let startButton = document.getElementById("startBtn");

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

let arr = [["images/02.png", "bad"], ["images/03.png", "fresh"]];

let randomFish = getRandomIntInclusive(0, arr.length - 1);
let [path, id] = arr[randomFish];
console.log(path, id);

function fishfall(path, id) {
    let fish = addFish(path, id);
    setInterval(() => {
        let fTop = parseFloat(getComputedStyle(fish).top);
        let fHeight = fish.offsetHeight;
        // let fLeft = parseFloat(getComputedStyle(fish).left);
        let fCoords = fish.getBoundingClientRect();
       let points = document.elementsFromPoint(fCoords.x, fCoords.y);
       let point = points.find((elem) => elem.id == "cat");
    //    console.log(point);
        fish.style.top = fTop + 10 + "px";
        if(fTop >= (height - fHeight) || point) {
            let newRandomFish = getRandomIntInclusive(0, arr.length - 1);
            let [newPath, newId] = arr[newRandomFish];
            fish.remove();
           fish = addFish(newPath, newId);
        };
    }, 100);
}
function startGame(e) {
    e.target.parentElement.remove();
    fishfall(path, id);
}
startButton.addEventListener("click", startGame);