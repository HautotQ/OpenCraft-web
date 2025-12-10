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

class HStack {
    constructor(options = {}) {
        // Crée le conteneur
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.style.flexDirection = "row";
        this.container.style.overflowX = "scroll";
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
    constructor({ width = "100%", height = null, padding = "5px", gap = "5px", itemHeight = 50 } = {}) {
        this.itemHeight = itemHeight;
        
        this.container = document.createElement("div");
        this.container.style.width = width;
        this.container.style.padding = padding;
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.gap = gap;
        this.container.style.borderRadius = "4px";
        this.container.style.backgroundColor = "#121212";
        
        // Si une hauteur fixe est fournie → on la garde
        // Sinon → on calcule automatiquement
        if (height) {
            this.container.style.height = height;
        } else {
            this.updateHeight();
        }
    }
    
    getElement() {
        return this.container;
    }
    
    add(element) {
        this.container.appendChild(element);
        this.updateHeight();
    }
    
    clear() {
        this.container.innerHTML = "";
        this.updateHeight();
    }
    
    // 🔥 Calcul dynamique
    updateHeight() {
        const count = this.container.children.length;
        const newHeight = count * this.itemHeight;
        this.container.style.height = `${newHeight}px`;
    }
}
