// AddQuestionView.js

class AddQuestionView {
    constructor(store) {
        this.store = store;
    }
    
    show(target) {
        target.innerHTML = ""; // on vide seulement le contenu, pas le menu
        
        const div = document.createElement("div");
        
        const title = document.createElement("h2");
        title.innerText = "Ajouter une Question";
        div.appendChild(title);
        
        const q = document.createElement("input");
        q.className = "edit-textarea";
        q.autocorrect = "off";
        q.autocomplete = "off";
        q.style.fontSize = "30px";
        q.placeholder = "Question";
        q.style.display = "block";
        q.style.marginBottom = "10px";
        div.appendChild(q);
        
        const a = document.createElement("input");
        a.className = "edit-textarea";
        a.autocorrect = "off";
        a.autocomplete = "off";
        a.style.fontSize = "30px";
        a.placeholder = "Réponse";
        a.style.display = "block";
        div.appendChild(a);
        
        const add = document.createElement("button");
        add.innerText = "Ajouter";
        add.onclick = () => {
            if (q.value && a.value) {
                this.store.addQuestion({ query: q.value, answer: a.value });
                q.value = "";
                a.value = "";
                alert("Ajouté !");
            }
        };
        div.appendChild(add);
        
        target.appendChild(div);
    }
}
