// Alert.js

class Alert {
    constructor(title, message, onOk = null, onCancel = null) {
        this.show(title, message, onOk, onCancel);
    }
    
    show(titleText, messageText, onOk, onCancel) {
        this.modal = document.createElement("div");
        this.modal.className = "alert";
        
        const container = document.createElement("div");
        container.className = "alert-container";
        
        const title = document.createElement("h2");
        title.innerText = titleText;
        
        const message = document.createElement("div");
        message.className = "alert-message";
        message.innerText = messageText;
        
        // OK
        const okBtn = document.createElement("button");
        okBtn.innerText = "OK";
        okBtn.className = "alert-btn";
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
            cancelBtn.className = "alert-btn";
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
