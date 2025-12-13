// ContentView.js

class ContentView {
    
    show() {
        document.body.innerHTML = "";
        
        //target.style.marginTop = "50px";
        
        const app = document.createElement("div");
        app.id = "app-container";
        document.body.appendChild(app);
        
        // MENU
        const menuBar = document.createElement("div");
        menuBar.className = "menu-bar";
        app.appendChild(menuBar);
        
        // CONTENU DES VUES
        const content = document.createElement("div");
        content.id = "content";
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
        menuBar.appendChild(
            navigationButton(content, "Paramètres", SettingsView, content)
        );
        
        // Contenu par défaut
        content.innerHTML = `<h2 id="terminal-title">Bienvenue dans OpenCraft ✨</h2>`;
        content.style.marginTop = "60px";
    }
}

