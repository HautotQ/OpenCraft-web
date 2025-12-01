// ContentView.js

class ContentView {
    show() {
        document.body.innerHTML = "";

        const app = document.createElement("div");
        app.id = "app-container";
        app.style.position = "relative";
        app.style.height = `${window.innerHeight}px`;
        document.body.appendChild(app);

        // MENU flottant
        const menuBar = document.createElement("div");
        menuBar.classList.add("menu-bar");
        menuBar.style.position = "absolute";
        menuBar.style.top = "0";
        menuBar.style.left = "0";
        menuBar.style.right = "0";
        menuBar.style.height = "50px";
        menuBar.style.background = "#ddd";
        menuBar.style.padding = "10px";
        menuBar.style.display = "flex";
        menuBar.style.gap = "10px";
        menuBar.style.overflowX = "auto";
        menuBar.style.whiteSpace = "nowrap";
        menuBar.style.zIndex = "1000"; // toujours au-dessus
        //menuBar.style.webkitOverflowScrolling = "touch";
        app.appendChild(menuBar);

        // CONTENU DES VUES
        const content = document.createElement("div");
        content.id = "content";
        content.style.position = "absolute";
        content.style.top = "0";
        content.style.left = "0";
        content.style.right = "0";
        content.style.bottom = "0";
        content.style.paddingTop = "50px"; // correspond à la hauteur de menuBar
        content.style.overflowY = "auto";
        app.appendChild(content);

        // Boutons
        const questionStore = new QuestionStore();
        menuBar.appendChild(
            navigationButton(content, "Ajouter une question", AddQuestionView, questionStore)
        );
        menuBar.appendChild(
            navigationButton(content, "Voir les questions", ViewQuestionsView, questionStore)
        );
        menuBar.appendChild(
            navigationButton(content, "Jouer les Questions", PlayQuestionsView, questionStore)
        );

        // Contenu par défaut
        content.innerHTML = "<h2>Bienvenue dans OpenCraft ✨</h2>";
    }
}
