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

        const playTitle = document.createElement("h2");
        playTitle.textContent = "Jouer les Questions";
        this.target.appendChild(playTitle);
        
        const checkCoolMode = new CheckBox("Mode Cool");
                
        this.target.appendChild(navCSS);
        this.target.appendChild(checkCoolMode.view());
    }
}
