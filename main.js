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
    const DELAI = 1500; // 1.5 sec, plus rapide

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("root").style.display = "block";

        const root = document.getElementById("root");
        new Main(root);
    }, DELAI);
});
