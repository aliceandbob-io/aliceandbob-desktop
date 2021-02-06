import { Controller } from "stimulus";
import { decryptText } from '../js/crypto.js';
import { copy, showPass } from "../js/index.js";

export default class extends Controller {
  static targets = ["input", "output", "key", "passphrase", "initialState", "decryptButton", "error"];

  async decrypt() {
    // Initial display
    this.initialStateTarget.classList.add("d-none");
    this.inputTarget.classList.remove("border-danger");
    this.keyTarget.classList.remove("border-danger");
    this.passphraseTarget.classList.remove("border-danger");
    this.errorTarget.classList.add("d-none");

    // Get message and key
    const message = this.inputTarget.innerText;
    const key = this.keyTarget.innerText;
    const passphrase = this.passphraseTarget.value;

    // Validation form
    if (this.inputTarget.textContent == "") {
      this.inputTarget.classList.add("border-danger");
    }
    if (this.keyTarget.textContent == "") {
      this.keyTarget.classList.add("border-danger");
    }
    if (this.passphraseTarget.value == "") {
      this.passphraseTarget.classList.add("border-danger");
    }
    if (this.keyTarget.textContent == "" || this.inputTarget.textContent == "" || this.passphraseTarget.value == "") {
      return
    }

    // Button UX
    this.decryptButtonTarget.disabled = true;
    this.decryptButtonTarget.getElementsByClassName("material-icons")[0].classList.add("d-none");
    this.decryptButtonTarget.getElementsByClassName("spinner-border")[0].classList.remove("d-none");

    const decrypted = await decryptText(message, key, passphrase).catch((err) => { console.error(err); });

    if (decrypted) {
      this.outputTarget.innerText = decrypted;
      this.initialStateTarget.classList.remove("d-none");
      this.errorTarget.classList.add("d-none");
      $([document.documentElement, document.body]).animate({
        scrollTop: $(this.initialStateTarget).offset().top
      }, 1000);
    } else {
      this.errorTarget.classList.remove("d-none");
      $([document.documentElement, document.body]).animate({
        scrollTop: 0
      }, 1000);
    }

    // Go back to initial UX button
    this.decryptButtonTarget.disabled = false;
    this.decryptButtonTarget.getElementsByClassName("material-icons")[0].classList.remove("d-none");
    this.decryptButtonTarget.getElementsByClassName("spinner-border")[0].classList.add("d-none");
  }

  showPassphrase(e) {
    let el = this.passphraseTarget;
    showPass(el);
  }

  copyToClipboard(e) {
    let el = e.target;
    let text;

    text = this.outputTarget.innerText;
    copy(text, el);
  }
}
