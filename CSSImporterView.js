// CSSImporterView.js

class CssImporterView {
    constructor(target) {
        this.target = target;
    }
    
    show() {
        this.render();
    }
    
    render() {
        this.target.innerHTML = "";
        
        const title = document.createElement("h1");
        title.textContent = "Importer un fichier CSS";
        this.target.appendChild(title);
        
        const inputFile = document.createElement("input");
        inputFile.className = "container";
        inputFile.type = "file";
        inputFile.accept = ".css";
        this.target.appendChild(inputFile);
        
        const info = document.createElement("p");
        info.textContent = "Sélectionnez un .css pour remplacer le style actuel.";
        this.target.appendChild(info);
        
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Réinitialiser le CSS par défaut";
        resetBtn.style.marginTop = "10px";
        this.target.appendChild(resetBtn);
        
        // Import d'un CSS personnalisé
        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = () => {
                const css = reader.result;
                localStorage.setItem("customCSS_content", css);
                
                const styleTag = document.getElementById("custom-css");
                styleTag.textContent = css;
            };
            reader.readAsText(file);
         });
        
        // Réinitialisation
        resetBtn.addEventListener("click", () => {
            const styleTag = document.getElementById("custom-css");
            styleTag.innerHTML = "";
            localStorage.removeItem("customCSS_content");
        });
        
        // Charger le CSS sauvegardé
        const savedCSS = localStorage.getItem("customCSS_content");
        if (savedCSS) {
            document.getElementById("custom-css").innerHTML = savedCSS;
        }
    }
}
