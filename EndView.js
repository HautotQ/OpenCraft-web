// EndView.js

class EndView {
    
    show(root) {
        root.innerHTML = "";

        root.style.marginTop = "60px";
        
        const container = document.createElement("div");
        
        const title = document.createElement("h2");
        title.innerText = "Félicitations !";
        container.appendChild(title);
        
        const text = document.createElement("h4");
        text.innerText = "Vous pouvez rejouer à tout moment en recliquant sur Jouer les Questions.";
        container.appendChild(text);
        
        root.appendChild(container);
    }
}
