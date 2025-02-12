class Typewriter {
    constructor(element) {
        this.element = element;
        this.texts = JSON.parse(element.getAttribute("data-texts")); // Récupère les textes
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.speed = 100; // Vitesse de frappe
        this.eraseSpeed = 50; // Vitesse d'effacement
        this.delay = 1500; // Pause avant effacement et écriture
        this.typeEffect();
    }

    typeEffect() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentText.substring(0, this.charIndex);

        let nextSpeed = this.isDeleting ? this.eraseSpeed : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            nextSpeed = this.delay; // Pause avant d'effacer
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length; // Passe au texte suivant
            nextSpeed = this.speed;
        }

        setTimeout(() => this.typeEffect(), nextSpeed);
    }
}

// Initialisation de l'effet sur tous les éléments ayant la classe "text"
document.querySelectorAll(".typing").forEach(el => new Typewriter(el));