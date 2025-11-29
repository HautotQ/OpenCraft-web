// main.js

class Main {
    constructor(root) {
        this.root = root;
        this.show();
    }
    
    show() {
        // Affiche ta vue principale dans le bon conteneur
        new ContentView().show(this.root);
    }
}

// Lance Main
document.addEventListener("DOMContentLoaded", () => {
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
        }, 500); // correspond à la transition
    }, 1500); // délai minimum pour montrer le loader
});
