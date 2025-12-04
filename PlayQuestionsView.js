// PlayQuestionsView.js
class PlayQuestionsView {
    constructor(questionStore, onEndView) {
        this.isActive = false;
        this.questionStore = questionStore;
        this.onEndView = onEndView;
        
        this.remainingQuestions = [];
        this.incorrectQuestions = [];
        this.incorrectQuestionSet = new Set();
        this.shouldReaskIncorrectQuestion = false;
        this.allQuestionsAnsweredOnce = false;
        this.score = 0;
    }
    
    show(root) {
        this.isActive = true;
        this.root = root;
        this.initUI();
        this.loadQuestions();

        this.unsubscribe = this.questionStore.subscribe((u) => this.onStoreUpdated(u));
    }

    hide() {
        this.isActive = false;
        if (this.unsubscribe) {
            this.unsubscribe(); // suppression du listener
            this.unsubscribe = null;
        }
    }
    
    onStoreUpdated(updatedQuestions) {
        if (!this.isActive) return;
        // Synchroniser les questions
        const currentQuery = this.currentQuestion?.query;
        
        this.remainingQuestions = updatedQuestions.filter(q => q.query !== currentQuery);
        
        // Si la question courante a été supprimée, prendre la première restante
        if (!this.currentQuestion || !updatedQuestions.includes(this.currentQuestion)) {
            this.currentQuestion = this.remainingQuestions.shift() || null;
        }
        
        // Réinitialiser l'UI si plus de questions
        if (!this.currentQuestion) {
            this.allQuestionsAnsweredOnce = true;
        }
        
        this.updateUI();
    }
    
    loadQuestions() {
        this.remainingQuestions = [...this.questionStore.getObservableQuestions()];
        this.shuffleQuestions();
        this.currentQuestion = this.remainingQuestions[0] || null;
        this.askNextQuestion(); // va mettre à jour labels et progress
    }
    
    shuffleQuestions() {
        const arr = this.remainingQuestions;

        for (let i = arr.length - 1; i > 0; i--) {
            // Nombre aléatoire vraiment uniforme et plus imprévisible
            const randomValues = new Uint32Array(1);
            crypto.getRandomValues(randomValues);
            const j = randomValues[0] % (i + 1);

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    initUI() {
        this.root.innerHTML = "";

        this.root.style.marginTop = "50px";
        
        if (this.questionStore.getObservableQuestions().length === 0) {
            const label = document.createElement("div");
            label.innerText = "Pas de questions enregistrées...";
            this.root.appendChild(label);
            return;
        }
        
        // Labels et champs
        this.remainingLabel = document.createElement("div");
        this.progressLabel = document.createElement("div");
        this.progressBar = document.createElement("progress");
        this.progressBar.style.background = "#111";
        this.progressBar.max = 1;
        this.progressBar.value = 0;
        
        this.questionLabel = document.createElement("div");
        this.questionLabel.style.fontWeight = "bold";
        this.questionLabel.style.fontSize = "18px";
        this.questionLabel.style.margin = "10px 0";
        
        this.answerField = document.createElement("input");
        this.answerField.className = "edit-textarea";
        this.answerField.setAttribute("autocorrect", "off");
        this.answerField.setAttribute("autocomplete", "off");
        this.answerField.setAttribute("autocapitalize", "off");
        this.answerField.setAttribute("spellcheck", "false");
        this.answerField.style.fontSize = "30px";
        this.answerField.type = "text";
        this.answerField.placeholder = "Réponse";
        this.answerField.style.width = "100%";
        this.answerField.style.marginBottom = "10px";
        
        this.checkButton = document.createElement("button");
        this.checkButton.innerText = "Vérifier la réponse";
        this.checkButton.onclick = () => this.checkAnswer();
        
        // Ajout à la racine
        this.root.appendChild(this.remainingLabel);
        this.root.appendChild(this.progressLabel);
        this.root.appendChild(this.progressBar);
        this.root.appendChild(this.questionLabel);
        this.root.appendChild(this.answerField);
        this.root.appendChild(this.checkButton);
        
        this.updateUI();
    }
    
    updateUI() {
        const total = this.questionStore.getObservableQuestions().length;
        
        // CAS 1 : plus aucune question dans le store → message
        if (total === 0) {
            this.root.innerHTML = "";
            const label = document.createElement("div");
            label.innerText = "Pas de questions enregistrées...";
            this.root.appendChild(label);
            return;
        }
        
        // CAS 2 : il y a des questions, mais toutes ont été posées → fin du test
        if (this.allQuestionsAnsweredOnce) {
            this.showEndView();
            return;
        }
        
        // CAS NORMAL : une question à afficher
        if (this.currentQuestion) {
            this.questionLabel.innerText = this.currentQuestion.query;
            this.remainingLabel.innerText =
            "Questions restantes : " + this.remainingQuestions.length;
            
            const progress = (total - this.remainingQuestions.length) / total;
            this.progressBar.value = progress;
            this.progressLabel.innerText = "Progression : " + Math.floor(progress * 100) + "%";
        }
        
        setTimeout(() => {
            if (this.answerField) this.answerField.focus();
        }, 0);
    }
    
    askNextQuestion() {
        if (this.shouldReaskIncorrectQuestion) {
            this.shouldReaskIncorrectQuestion = false;
            if (this.incorrectQuestions.length > 0) {
                this.remainingQuestions.push(...this.incorrectQuestions);
                this.incorrectQuestions = [];
                this.shuffleQuestions();
            }
        }
        
        if (this.remainingQuestions.length === 0) {
            this.allQuestionsAnsweredOnce = true;
            this.updateUI();
            return;
        }
        
        this.currentQuestion = this.remainingQuestions.shift();
        this.showingAnswer = false;
        this.userAnswer = "";
        this.answerField.value = "";
        this.updateUI();
    }
    
    checkAnswer() {
        this.userAnswer = this.answerField.value.trim().toLowerCase();
        const correctAnswer = this.currentQuestion.answer.trim().toLowerCase();
        
        if (this.userAnswer === "") {
            new Alert("Réponse manquante", `La réponse correcte était :\n${this.currentQuestion.answer}`);
            this.markIncorrect();
        } else if (this.userAnswer === correctAnswer || this.isApproximatelyEqual(this.userAnswer, correctAnswer)) {
            if (!this.incorrectQuestionSet.has(this.currentQuestion)) this.score++;
            this.askNextQuestion();
        } else {
            new Alert("Mauvaise réponse", `La bonne réponse était :\n${this.currentQuestion.answer}`);
            this.markIncorrect();
        }
    }
    
    markIncorrect() {
        this.incorrectQuestions.push(this.currentQuestion);
        this.incorrectQuestionSet.add(this.currentQuestion);
        this.shouldReaskIncorrectQuestion = true;
        this.answerField.value = "";
    }
    
    showAlert(title, message) {
        alert(title + "\n\n" + message);
    }
    
    showEndView() {
        this.isActive = false;
        this.root.innerHTML = "";          // 💥 vider l'écran
        new EndView().show(this.root);     // 💥 passer le root !
        this.hide();
    }
    
    isApproximatelyEqual(a, b) {
        const d = this.levenshteinDistance(a, b);
        const max = Math.floor(b.length * 0.2); // tolère 20 % d’erreurs
        return d <= max;
    }
    
    levenshteinDistance(a, b) {
        const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
        
        for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
        
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        return matrix[a.length][b.length];
    }
}
