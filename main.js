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
    const DELAI = 1500; // 1,5s minimum

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";

        const root = document.getElementById("root");
        root.style.opacity = 1;

        new Main(root);
    }, DELAI);
});
