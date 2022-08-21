// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
        this.el = el;
        this.current = el.innerText;
        console.log(el);
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = newText.length;
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="ghost">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.el.innerHTML = "";
            const ex = document.querySelector("#completetext");
            ex.innerHTML += output;
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
    "The largest Machine Learning and IoT event to COMPETE- CONNECT - GAIN. <br><br>",

   "COMPETE as a team in our Machine Learning Competition to empower your practical", "and technical skills in the most required field all over the world!<br><br>",

   "CONNECT with companies, market calibers and professionals in our free", "beneficial summit taking place on the 26th of March.<br><br>",

   "GAIN both experience and win the prize."
];

const el = document.querySelector("#text");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
    if (counter > phrases.length) return;
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1100);
    });
    counter = counter + 1;
};

next();
//
const cards = document.querySelectorAll(".defult");

function inView(card) {
    const pos = card.getBoundingClientRect();
    if (
        pos.top >= 0 &&
        pos.left >= 0 &&
        pos.bottom <= window.innerHeight &&
        pos.right <= window.innerWidth
    ) return true
}

window.addEventListener("scroll", () => {
    for (var i = 0; i < cards.length; i++) {
        if (inView(cards[i]) == true) {
            cards[i].classList.add("active")
        }
    }
})

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activee", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " activee";
}