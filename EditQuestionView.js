// EditQuestionView.js
export class EditQuestionView {
    constructor(query, answer, onSave) {
        this.query = query;
        this.answer = answer;
        this.onSave = onSave; 
        this.modal = null;
    }
    
    show(target) {
        
        // Fond opaque
        this.modal = document.createElement("div");
        this.modal.className = "edit-modal";
        
        // Conteneur
        const container = document.createElement("div");
        container.className = "edit-modal-container";
        
        // Titre
        const title = document.createElement("h3");
        title.innerText = "Modifier la question";
        container.appendChild(title);
        
        // Champ question
        const queryInput = document.createElement("textarea");
        queryInput.className = "edit-textarea";   // ← CORRECTION
        queryInput.setAttribute("autocorrect", "off");
        queryInput.setAttribute("autocomplete", "off");
        queryInput.setAttribute("autocapitalize", "off");
        queryInput.setAttribute("spellcheck", "false");
        queryInput.style.fontSize = "15px";
        queryInput.value = this.query;
        container.appendChild(queryInput);
        
        // Champ réponse
        const answerInput = document.createElement("textarea");
        answerInput.className = "edit-textarea";  // ← CORRECTION
        answerInput.setAttribute("autocorrect", "off");
        answerInput.setAttribute("autocomplete", "off");
        answerInput.setAttribute("autocapitalize", "off");
        answerInput.setAttribute("spellcheck", "false");
        answerInput.style.fontSize = "15px";
        answerInput.value = this.answer;
        container.appendChild(answerInput);
        
        // Boutons
        const btnContainer = document.createElement("div");
        btnContainer.className = "edit-modal-buttons";
        
        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Annuler";
        cancelBtn.onclick = () => this.close();
        btnContainer.appendChild(cancelBtn);
        
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Enregistrer";
        saveBtn.onclick = () => {
            const newQuery = queryInput.value.trim();
            const newAnswer = answerInput.value.trim();
            if (newQuery && newAnswer) {
                this.onSave(newQuery, newAnswer);
                this.close();
            } else {
                alert("La question et la réponse ne peuvent pas être vides.");
            }
        };
        btnContainer.appendChild(saveBtn);
        
        container.appendChild(btnContainer);
        this.modal.appendChild(container);
        
        // Fermer en cliquant en dehors
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) this.close();
        });
        
        target.appendChild(this.modal);
    }
    
    close() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
            this.modal = null;
        }
    }
}
