// ViewQuestionsView.js

class ViewQuestionsView {
    constructor(questionStore) {
        this.store = questionStore;
    }
    
    show(target) {
        this.target = target;
        target.innerHTML = "";

        target.style.paddingTop = "15px";
        
        const div = document.createElement("div");
        
        const hstack = new HStack({ spacing: 10, justifyContent: "center" });
        
        const title = document.createElement("h2");
        title.innerText = "Gestion des Questions";
        div.appendChild(title);
        
        const importButton = document.createElement("button");
        importButton.innerText = "Importer";
        importButton.onclick = () => {
            this.importFile();
        };
        hstack.add(importButton);
        
        const exportButton = document.createElement("button");
        exportButton.innerText = "Exporter";
        exportButton.onclick = () => {
            this.exportFile();
        };
        hstack.add(exportButton);
        
        const clearBtn = document.createElement("button");
        clearBtn.innerText = "Tout supprimer";
        clearBtn.onclick = () => { 
            this.store.clear();
            this.renderList();
        };
        hstack.add(clearBtn);
        
        const filename = document.createElement("input");
        filename.className = "edit-textarea";
        filename.style.height = "30px";
        this.filenameInput = filename;
        
        
        this.listContainer = new ScrollView({ height: "300px" });
        div.appendChild(filename);
        div.appendChild(this.listContainer.getElement());
        
        this.store.subscribe(() => this.renderList());
                
        target.appendChild(hstack.getElement());
        target.appendChild(div);
        this.renderList();
    }
    
    importFile() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt,.clist,text/plain,*/*"; 
        
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            const extension = file.name.split('.').pop().toLowerCase();
            if (extension !== "txt" && extension !== "clist") {
                alert("Veuillez sélectionner un fichier .txt ou .clist");
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const lines = content.split(/\r?\n/).map(line => line.trim());
                
                for (let i = 0; i < lines.length; i++) {
                    const question = lines[i];
                    const answer = lines[i + 1];
                    if (question && answer) {
                        this.store.addQuestion({ query: question, answer: answer });
                        i++; // passer à la ligne suivante pour la réponse
                    }
                }
                this.filenameInput = file.name;
            };
            
            reader.readAsText(file);
        };
        
        input.click();
        this.store.saveQuestions();
    }
    
    exportFile() {
    const questions = this.store.questions;

    if (questions.length === 0) {
        alert("Aucune question à exporter.");
        return;
    }

    // Récupérer le nom saisi par l'utilisateur
    let filename = (this.filenameInput.value || "questions").trim();

    if (filename.length === 0) {
        filename = "questions";
    }

    // Ajouter l'extension automatiquement
    if (!filename.endsWith(".clist")) {
        filename += ".clist";
    }

    // Construire le contenu
    let content = "";

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        content += q.query + "\n";
        content += q.answer + "\n\n";
    }

    // 🔽 Nouvelle partie : téléchargement dans le navigateur
    const blob = new Blob([content], { type: "application/clist" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url); 
}
    
    renderList() {
        const el = this.listContainer.getElement();
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        const questions = this.store.questions;
        
        if (!this._menuListenerAdded) {
            document.addEventListener("click", () => {
                const menus = this.listContainer.getElement().querySelectorAll("div[menu]");
                menus.forEach(menu => menu.style.display = "none");
            });
            this._menuListenerAdded = true;
        }
        
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const container = document.createElement("div");
            container.style.border = "1px solid #ccc";
            container.style.padding = "8px";
            container.style.marginBottom = "6px";
            container.style.borderRadius = "4px";
            container.style.position = "relative";
            container.innerText = `Q: ${q.query}\nR: ${q.answer}`;
            
            const menu = document.createElement("div");
            menu.setAttribute("menu", "true");
            menu.style.position = "absolute";
            menu.style.top = "0";
            menu.style.right = "0";
            menu.style.backgroundColor = "#fff";
            menu.style.border = "1px solid #999";
            menu.style.padding = "5px";
            menu.style.display = "none";
            menu.style.zIndex = "10";
            menu.style.borderRadius = "4px";
            menu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
            
            // Bouton Modifier → ouvre EditQuestionView
            const modifyBtn = document.createElement("button");
            modifyBtn.innerText = "Modifier";
            modifyBtn.style.display = "block";
            modifyBtn.onclick = (e) => {
                e.stopPropagation();
                const index = this.store.questions.indexOf(q);
                if (index >= 0) {
                    const editView = new EditQuestionView(q.query, q.answer, (newQuery, newAnswer) => {
                        this.store.updateQuestionAt(index, newQuery, newAnswer);
                        this.renderList();
                    });
                    editView.show(this.target); // target principal pour afficher la modale
                }
                menu.style.display = "none";
            };
            menu.appendChild(modifyBtn);
            
            // Bouton Supprimer
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Supprimer";
            deleteBtn.style.display = "block";
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.store.deleteQuestion(q);
                menu.style.display = "none";
            };
            menu.appendChild(deleteBtn);
            
            container.appendChild(menu);
            
            // Remplacer ton addEventListener("click") par ceci :
            
            // Remplacer ton addEventListener("click") par ceci :
            
            container.addEventListener("click", (e) => {
                e.preventDefault();        // désactive le menu clic droit du navigateur
                e.stopPropagation();       // évite que le clic ferme le menu
                
                // fermer les autres menus
                const menus = this.listContainer.getElement().querySelectorAll("div[menu]");
                menus.forEach(m => {
                    if (m !== menu) m.style.display = "none";
                });
                
                // positionner le menu à l’endroit exact du clic
                menu.style.left = e.offsetX + "px";
                menu.style.top = e.offsetY + "px";
                
                // ouvrir / fermer
                menu.style.display = "block";
            });
            
            container.addEventListener("contextmenu", (e) => {
                e.preventDefault();        // désactive le menu clic droit du navigateur
                e.stopPropagation();       // évite que le clic ferme le menu
                
                // fermer les autres menus
                const menus = this.listContainer.getElement().querySelectorAll("div[menu]");
                menus.forEach(m => {
                    if (m !== menu) m.style.display = "none";
                });
                
                // positionner le menu à l’endroit exact du clic
                menu.style.left = e.offsetX + "px";
                menu.style.top = e.offsetY + "px";
                
                // ouvrir / fermer
                menu.style.display = "block";
            });
            
            this.listContainer.getElement().appendChild(container);
        }
    }
}
