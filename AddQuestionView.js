// AddQuestionView.js

class AddQuestionView {
    constructor(store) {
        this.store = store;
    }
    
    show(target) {
        target.innerHTML = ""; // on vide seulement le contenu, pas le menu
        
        target.style.marginTop = "50px";
        
        const div = document.createElement("div");
        
        const title = document.createElement("h2");
        title.innerText = "Ajouter une Question";
        div.appendChild(title);
        
        const q = document.createElement("input");
        q.className = "edit-textarea";
        q.placeholder = "Question";
        div.appendChild(q);
        
        const a = document.createElement("input");
        a.className = "edit-textarea";
        a.placeholder = "Réponse";
        div.appendChild(a);
        
        const add = document.createElement("button");
        add.innerText = "Ajouter";
        add.onclick = () => {
            if (q.value && a.value) {
                this.store.addQuestion({ query: q.value, answer: a.value });
                q.value = "";
                a.value = "";
            }
        };
        div.appendChild(add);
        
        target.appendChild(div);
    }
}
