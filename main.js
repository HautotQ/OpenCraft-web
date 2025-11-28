// main.js

class Main {
    constructor(root) {
        this.root = root; // le conteneur principal
        this.show();
    }
    
    show() {
        new ContentView().show();
    }
}

// Lance Main

window.addEventListener("load", () => {
    // cacher le loader
    document.getElementById("loader").style.display = "none";
    
    // afficher le contenu principal
    document.getElementById("root").style.display = "block";
    
    // démarrer ton app
    const root = document.getElementById("root");
    new Main(root);
});
