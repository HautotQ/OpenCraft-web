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

// Lance Main après chargement
window.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    new Main(root);
});
