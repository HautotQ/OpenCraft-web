// main.js

export class Main {
    constructor(root) {
        this.root = root;
        this.show();
    }

    show() {
        new ContentView().show(this.root);
    }
}

// Auto-lancement si script principal
window.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    const root = document.getElementById("root");

    setTimeout(() => {
        loader.style.transition = "opacity 0.5s";
        loader.style.opacity = 0;

        setTimeout(() => {
            loader.style.display = "none";
            root.style.display = "block";
            root.style.opacity = 0;
            root.style.transition = "opacity 0.5s";
            root.style.opacity = 1;

            new Main(root);
        }, 500);
    }, 1500);
});
