class Typewriter {
  constructor(element) {
    this.element = element;
    this.texts = JSON.parse(element.getAttribute('data-texts'));
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.speed = 90;
    this.eraseSpeed = 45;
    this.delay = 1800;
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
      nextSpeed = this.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      nextSpeed = this.speed;
    }

    setTimeout(() => this.typeEffect(), nextSpeed);
  }
}

document.querySelectorAll('.typing').forEach(el => new Typewriter(el));
