function navigationButton(root, label, ViewClass, ...args) {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.onclick = () => new ViewClass(...args).show(root);
    return btn;
}

class HStack {
    constructor(options = {}) {
        // Crée le conteneur
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";
        this.container.style.alignItems = options.alignItems || "center"; // "flex-start", "center", "flex-end"
        this.container.style.justifyContent = options.justifyContent || "flex-start"; // "space-between", "center", etc.
        this.container.style.gap = options.spacing ? options.spacing + "px" : "0px"; // espacement entre éléments
    }
    
    // Ajouter un élément au HStack
    add(element) {
        if (element instanceof HTMLElement) {
            this.container.appendChild(element);
        } else {
            console.warn("HStack.add : l’élément doit être un HTMLElement");
        }
    }
    
    // Récupérer le conteneur pour l’insérer dans le DOM
    getElement() {
        return this.container;
    }
}

class ScrollView {
    constructor({ width = "100%", height = "300px", padding = "5px", gap = "5px" } = {}) {
        this.container = document.createElement("div");
        this.container.style.width = width;
        this.container.style.height = height;
        this.container.style.overflowY = "auto"; // scrolling vertical
        this.container.style.padding = padding;
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.gap = gap;
        this.container.style.border = "1px solid #ccc";
        this.container.style.borderRadius = "4px";
        this.container.style.backgroundColor = "#121212";
    }
    
    // Retourne l’élément HTML pour l’ajouter au DOM
    getElement() {
        return this.container;
    }
    
    // Ajoute un élément à la ScrollView
    add(element) {
        this.container.appendChild(element);
    }
    
    // Vide tous les éléments
    clear() {
        this.container.innerHTML = "";
    }
}
