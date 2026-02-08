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
    constructor(labelText, storageKey = "coolModeEnabled") {
        this.labelText = labelText;
        this.storageKey = storageKey;
        this.input = null;
    }
    
    // Lire la valeur sauvegardée
    loadState() {
        const saved = localStorage.getItem(this.storageKey);
        return saved === "true"; // convertit string → bool
    }
    
    // Sauvegarder la valeur
    saveState(value) {
        localStorage.setItem(this.storageKey, value);
    }
    
    view() {
        const container = document.createElement("label");
        container.className = "check-box";
        container.textContent = this.labelText;
        
        this.input = document.createElement("input");
        this.input.type = "checkbox";
        
        // Charger l’état sauvegardé
        const savedState = this.loadState();
        
        this.input.checked = savedState;
        QuestionStore.coolModeEnabled = savedState;
        
        container.prepend(this.input);
        
        // Sauvegarder quand ça change
        this.input.addEventListener("change", () => {
            const value = this.input.checked;
            
            QuestionStore.coolModeEnabled = value;
            this.saveState(value);
            
            console.log("coolModeEnabled =", value);
        });
        
        return container;
    }
}
