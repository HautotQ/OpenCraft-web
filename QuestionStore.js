// QuestionStore.js
export class QuestionStore {
    constructor() {
        this.STORAGE_KEY = "opencraft-questions";
        
        this.questions = [];
        this.subscribers = [];
        
        this.loadQuestions(); // constructeur Java → même logique
    }
    
    clear() {
        this.questions = [];
        this.saveQuestions();
        this.notify();
    }
    
    // ——————————————————————————————————————
    // NOTIFIER LES ABONNÉS
    // ——————————————————————————————————————
    notify() {
        const copy = [...this.questions];
        this.subscribers.forEach(cb => cb(copy));
    }
    
    // ——————————————————————————————————————
    // SAUVEGARDE
    // ——————————————————————————————————————
    saveQuestions() {
        const formatted = this.questions.map(q => ({
            query: q.query,
            answer: q.answer
        }));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formatted));
    }
    
    // ——————————————————————————————————————
    // CHARGEMENT
    // ——————————————————————————————————————
    loadQuestions() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return;
        
        try {
            const parsed = JSON.parse(data);
            this.questions = parsed.map(q => ({
                query: q.query,
                answer: q.answer
            }));
            this.notify();
        } catch (e) {
            console.error("Erreur parsing questions:", e);
        }
    }
    
    // ——————————————————————————————————————
    // API PUBLIQUE (équivalent DAO)
    // ——————————————————————————————————————
    addQuestion(questionObj) {
        this.questions.push(questionObj);
        this.saveQuestions();
        this.notify();
    }
    
    deleteQuestion(questionObj) {
        const index = this.questions.indexOf(questionObj);
        if (index >= 0) {
            this.questions.splice(index, 1);
            this.saveQuestions();
            this.notify();
        }
    }
    
    updateQuestion(questionObj) {
        const index = this.questions.indexOf(questionObj);
        if (index >= 0) {
            this.questions[index] = questionObj;
            this.saveQuestions();
            this.notify();
        }
    }
    
    getObservableQuestions() {
        return [...this.questions];
    }
    
    subscribe(callback) {
        this.subscribers.push(callback);
        callback([...this.questions]); // push initial
    }
    updateQuestionAt(index, newQuery, newAnswer) {
        if (index >= 0 && index < this.questions.length) {
            this.questions[index].query = newQuery;
            this.questions[index].answer = newAnswer;
            this.saveQuestions();
            this.notify();
        }
    }
}
