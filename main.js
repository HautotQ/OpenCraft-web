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

    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("root").style.display = "block";
        new Main(document.getElementById("root"));
    }, 3000);
});
