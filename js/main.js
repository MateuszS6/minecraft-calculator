import {initConversionModule} from "./conversion.js";
import {initPathModule} from "./path.js";

initConversionModule();
initPathModule();

/* CURSOR */

const cursor = document.getElementById("cursor");
const cursorSize = 64;

document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    let transform = "rotate(0deg)";
    let offsetX = 0;
    let offsetY = 0;

    // Right
    if (x > window.innerWidth - cursorSize) {
        transform = "scaleX(-1)";
        offsetX = cursorSize;
    }

    // Bottom
    if (y > window.innerHeight - cursorSize) {
        transform = "scaleY(-1)"
        offsetY = cursorSize;
    }

    // Bottom right
    if (x > window.innerWidth - cursorSize && y > window.innerHeight - cursorSize) {
        transform = "scale(-1, -1)"
        offsetX = cursorSize;
        offsetY = cursorSize;
    }

    cursor.style.transform = transform;
    cursor.style.left = (x - offsetX) + "px";
    cursor.style.top = (y - offsetY) + "px";
});

document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
});