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
    // temps d'attente avant affichage (en millisecondes)
    const DELAI = 3000;
    
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("root").style.display = "block";
        
        const root = document.getElementById("root");
        new Main(root);
    }, DELAI);
});
