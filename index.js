let cat = document.getElementById("cat");
let container = cat.parentElement;
function addKeypress(event) {
    let ar = "ArrowRight";
    let al = "ArrowLeft";
    let width = container.getBoundingClientRect().width;
    let catLeftPos1 = parseFloat(getComputedStyle(cat).left);
    let catLeftPos2 = cat.getBoundingClientRect().left;
    let catRightPos = parseFloat(getComputedStyle(cat).right);
    let catWidth = cat.getBoundingClientRect().width;
    console.log(catLeftPos1);
    console.log(catLeftPos2);
    console.log(width);
    if(event.code == ar) {
        cat.style.left = catLeftPos1 + 30 + "px";
        if(catLeftPos2 >= width) {
            console.log("danger");
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