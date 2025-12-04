// main.js

class Main {
    constructor(root) {
        this.root = root; // le conteneur principal
        loadCustomCSS();
        this.show();
    }
    
    show() {
        loadCustomCSS();
        new ContentView().show();
    }
}

// Lance Main

window.addEventListener("DOMContentLoaded", () => {
    loadCustomCSS();
    const root = document.getElementById("root");
    new Main(root);
});
