// Alert.js

export class Alert {
    constructor(title, message) {
        this.show(title, message);
    }
    
    show(titleText, messageText) {
        // Fond modal
        this.modal = document.createElement("div");
        this.modal.className = "edit-modal";
        this.modal.style.position = "fixed";
        this.modal.style.top = "0";
        this.modal.style.left = "0";
        this.modal.style.width = "100%";
        this.modal.style.height = "100%";
        this.modal.style.background = "rgba(0,0,0,0.5)";
        this.modal.style.display = "flex";
        this.modal.style.justifyContent = "center";
        this.modal.style.alignItems = "center";
        this.modal.style.zIndex = "1000";
        
        // Conteneur
        const container = document.createElement("div");
        container.className = "edit-modal-container";
        container.style.background = "gray";
        container.style.padding = "20px";
        container.style.borderRadius = "8px";
        container.style.maxWidth = "400px";
        container.style.width = "80%";
        container.style.textAlign = "center";
        
        // Titre
        const title = document.createElement("h2");
        title.innerText = titleText;
        
        // Message
        const message = document.createElement("div");
        message.style.margin = "15px 0";
        message.innerText = messageText;
        
        // Bouton
        const button = document.createElement("button");
        button.innerText = "OK";
        button.style.padding = "8px 16px";
        button.onclick = () => this.close();
        
        container.appendChild(title);
        container.appendChild(message);
        container.appendChild(button);
        this.modal.appendChild(container);
        document.body.appendChild(this.modal);
    }
    
    close() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
            this.modal = null;
        }
    }
}
