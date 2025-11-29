// main.js

class Main {
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
    const root = document.getElementById("root");
    new Main(root);
});
