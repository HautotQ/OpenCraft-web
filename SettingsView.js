// SettingsView.js

class SettingsView {
    constructor(target) {
        this.target = target;
    }
    
    show() {
        this.target.innerHTML = "";
        this.target.style.marginTop = "50px";
        
        const title = document.createElement("h1");
        title.textContent = "Paramètres";
        this.target.appendChild(title);
        
        const navCSS = document.createElement("div");
        navCSS.className = "settings-button";
        navCSS.appendChild(
            navigationButton(this.target, "Modifier le CSS", CssImporterView, this.target)
        );
        
        this.target.appendChild(navCSS);
    }
    
}
