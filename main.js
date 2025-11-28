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
window.addEventListener("load", () => {
    const DELAI = 3000; // délai avant d'afficher l'app

    setTimeout(() => {
        // retire le loader
        document.getElementById("loader").style.display = "none";

        // montre la zone racine
        const root = document.getElementById("root");
        root.style.display = "block";

        // démarre l'application
        new Main(root);

    }, DELAI);
});
