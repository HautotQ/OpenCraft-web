// ContentView.js

class ContentView {
    
    show() {
        document.body.innerHTML = "";
        
        const app = document.createElement("div");
        app.id = "app-container";
        app.style.position = "relative"; // nécessaire pour position absolute interne
        app.style.height = `${window.innerHeight}px`;
        document.body.appendChild(app);
        
        // MENU flottant
        const menuBar = document.createElement("div");
        menuBar.classList.add("menu-bar");
        menuBar.style.position = "absolute"; // flotte par-dessus le contenu
        menuBar.style.top = "0";
        menuBar.style.left = "0";
        menuBar.style.right = "0";
        menuBar.style.height = "50px"; // hauteur fixe
        menuBar.style.background = "#ddd";
        menuBar.style.padding = "10px";
        menuBar.style.display = "flex";
        menuBar.style.gap = "10px";
        menuBar.style.overflowX = "auto";
        menuBar.style.whiteSpace = "nowrap";
        menuBar.style.webkitOverflowScrolling = "touch";
        app.appendChild(menuBar);
        
        // CONTENU DES VUES
        const content = document.createElement("div");
        content.id = "content";
        content.style.position = "absolute"; // contenu sous la menuBar
        content.style.top = "0";
        content.style.left = "0";
        content.style.right = "0";
        content.style.bottom = "0";
        content.style.paddingTop = "50px"; // décalage pour laisser menuBar visible
        content.style.overflowY = "auto";
        app.appendChild(content);
        
        // Boutons
        const questionStore = new QuestionStore();
        menuBar.appendChild(
            navigationButton(content, "Ajouter une question", () => showView(AddQuestionView))
        );
        menuBar.appendChild(
            navigationButton(content, "Voir les questions", () => showView(ViewQuestionsView))
        );
        menuBar.appendChild(
            navigationButton(content, "Jouer les Questions", () => showView(PlayQuestionsView))
        );
        
        // Contenu par défaut
        content.innerHTML = "<h2>Bienvenue dans OpenCraft ✨</h2>";
    }
}
