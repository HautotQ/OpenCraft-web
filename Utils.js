function navigationButton(root, label, ViewClass, ...args) {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.onclick = () => new ViewClass(...args).show(root);
    return btn;
}

function saveCustomCSS(cssString) {
    localStorage.setItem("customCSS", cssString);
    applyCustomCSS(cssString);
}

function loadCustomCSS() {
    const css = localStorage.getItem("customCSS_content");
    if (!css) return;
    
    let styleTag = document.getElementById("custom-css");
    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "custom-css";
        document.head.appendChild(styleTag);
    }
    
    styleTag.textContent = css;
}

function applyCustomCSS(cssString) {
    let styleTag = document.getElementById("custom-css");
    
    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "custom-css";
        document.head.appendChild(styleTag);
    }
    
    styleTag.innerHTML = cssString;
}

function log(msg) {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers["console.log"]) {
        window.webkit.messageHandlers["console.log"].postMessage(msg);
    }
}

class HStack {
    constructor() {
        // Crée le conteneur
        this.container = document.createElement("div");
        this.container.className = "h-stack";
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
    constructor(height = null) {
        this.container = document.createElement("div");
        this.container.className = "scroll-view";
        
        // Hauteur fixe uniquement si fournie
        if (height) {
            this.container.style.height = height;
        }
        // sinon → hauteur automatique (CSS)
    }
    
    getElement() {
        return this.container;
    }
    
    add(element) {
        this.container.appendChild(element);
    }
    
    clear() {
        this.container.innerHTML = "";
    }
}

class CheckBox {
    constructor(labelText) {
        this.labelText = labelText;
        this.input = null;
    }
    
    view() {
        const container = document.createElement("label");
        container.className = "check-box";
        container.textContent = this.labelText;
        
        this.input = document.createElement("input");
        this.input.type = "checkbox";
        this.input.checked = QuestionStore.coolModeEnabled; // état initial
        container.prepend(this.input);
        
        // Met à jour la variable statique quand l'utilisateur clique
        this.input.addEventListener("change", () => {
            QuestionStore.coolModeEnabled = this.input.checked;
            console.log("coolModeEnabled =", QuestionStore.coolModeEnabled);
        });
        
        return container;
    }
}
