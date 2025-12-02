// AddQuestionView.js

class AddQuestionView {
    constructor(store) {
        this.store = store;
    }
    
    show(target) {
        target.innerHTML = ""; // on vide seulement le contenu, pas le menu

        target.style.marginTop = "0px";
        target.style.marginTop = "120px";
        
        const div = document.createElement("div");
        
        const title = document.createElement("h2");
        title.innerText = "Ajouter une Question";
        div.appendChild(title);
        
        const q = document.createElement("input");
        q.type = "text";
        q.className = "edit-textarea";
        q.setAttribute("autocorrect", "off");
        q.setAttribute("autocomplete", "off");
        q.setAttribute("autocapitalize", "off");
        q.setAttribute("spellcheck", "false");
        q.style.fontSize = "30px";
        q.placeholder = "Question";
        q.style.display = "block";
        q.style.marginBottom = "10px";
        div.appendChild(q);

        const a = document.createElement("input");
        a.type = "text";
        a.className = "edit-textarea";
        a.setAttribute("autocorrect", "off");
        a.setAttribute("autocomplete", "off");
        a.setAttribute("autocapitalize", "off");
        a.setAttribute("spellcheck", "false");
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
            }
        };
        div.appendChild(add);
        
        target.appendChild(div);
    }
}
