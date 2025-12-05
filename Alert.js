// Alert.js

class Alert {
    constructor(title, message, onOk = null, onCancel = null) {
        this.show(title, message, onOk, onCancel);
    }
    
    show(titleText, messageText, onOk, onCancel) {
        this.modal = document.createElement("div");
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
        
        const container = document.createElement("div");
        container.style.background = "gray";
        container.style.padding = "20px";
        container.style.borderRadius = "8px";
        container.style.maxWidth = "400px";
        container.style.width = "80%";
        container.style.textAlign = "center";
        
        const title = document.createElement("h2");
        title.innerText = titleText;
        
        const message = document.createElement("div");
        message.style.margin = "15px 0";
        message.innerText = messageText;
        
        // OK
        const okBtn = document.createElement("button");
        okBtn.innerText = "OK";
        okBtn.style.padding = "8px 16px";
        okBtn.onclick = () => {
            this.close();
            if (onOk) onOk();
        };
        
        container.appendChild(title);
        container.appendChild(message);
        container.appendChild(okBtn);
        
        // ANNULER (optionnel)
        if (onCancel) {
            const cancelBtn = document.createElement("button");
            cancelBtn.innerText = "Annuler";
            cancelBtn.style.padding = "8px 16px";
            cancelBtn.style.marginLeft = "10px";
            cancelBtn.onclick = () => {
                this.close();
                onCancel();
            };
            container.appendChild(cancelBtn);
        }
        
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
