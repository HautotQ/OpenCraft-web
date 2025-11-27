// ContentView.js

class ContentView {
    
    show() {
        document.body.innerHTML = "";
        
        const app = document.createElement("div");
        app.id = "app-container";
        app.style.display = "flex";
        app.style.flexDirection = "column";
        app.style.height = "100vh";
        document.body.appendChild(app);
        
        // MENU
        const menuBar = document.createElement("div");
        menuBar.classList.add("menu-bar");
        menuBar.style.background = "#ddd";
        menuBar.style.padding = "10px";
        menuBar.style.display = "flex";
        menuBar.style.gap = "10px";
        app.appendChild(menuBar);
        
        // CONTENU DES VUES
        const content = document.createElement("div");
        content.id = "content";
        content.style.flex = "1";
        content.style.padding = "20px";
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
