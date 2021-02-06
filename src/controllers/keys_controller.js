import { Controller } from "stimulus";
import { generateKey } from '../js/crypto.js';
import { download, copy, showPass } from "../js/index.js";

export default class extends Controller {
  static targets = ["emailParams", "passphraseParams", "privateKey", "publicKey", "initialState", "generateButton", "error"];

  async generate(e) {
    // Initial display
    e.preventDefault();
    this.initialStateTarget.classList.add("d-none");
    this.emailParamsTarget.classList.remove("border-danger");
    this.passphraseParamsTarget.classList.remove("border-danger");
    this.errorTarget.classList.add("d-none");

    // Validation form
    if (this.emailParamsTarget.value == "") {
      this.emailParamsTarget.classList.add("border-danger");
    }
    if (this.passphraseParamsTarget.value == "") {
      this.passphraseParamsTarget.classList.add("border-danger");
    }
    if (this.emailParamsTarget.value == "" || this.passphraseParamsTarget.value == "") {
      return
    }

    // UX button
    this.generateButtonTarget.disabled = true;
    this.generateButtonTarget.getElementsByClassName("material-icons")[0].classList.add("d-none");
    this.generateButtonTarget.getElementsByClassName("spinner-border")[0].classList.remove("d-none");

    // Params
    const emailParams = this.emailParamsTarget.value;
    const passphraseParams = this.passphraseParamsTarget.value;

    const key = await generateKey(emailParams, passphraseParams).catch((err) => { console.error(err); });

    if (key) {
      this.privateKeyTarget.innerText = key.privateKeyArmored;
      this.publicKeyTarget.innerText = key.publicKeyArmored;
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
    this.generateButtonTarget.disabled = false;
    this.generateButtonTarget.getElementsByClassName("material-icons")[0].classList.remove("d-none");
    this.generateButtonTarget.getElementsByClassName("spinner-border")[0].classList.add("d-none");
  }

  showPassphrase(e) {
    let el = this.passphraseParamsTarget;
    showPass(el);
  }

  copyToClipboard(e) {
    let el = e.target;
    let text;

    if (el.classList.contains("public-key")) {
      text = this.publicKeyTarget.innerText;
    } else if (el.classList.contains("private-key")) {
      text = this.privateKeyTarget.innerText;
    } else {
      this.errorTarget.classList.remove("d-none");
      $([document.documentElement, document.body]).animate({
        scrollTop: 0
      }, 1000);
      return
    }

    copy(text, el);
  }

  downloadKey(e) {
    e.preventDefault();
    let type = e.currentTarget.dataset.type;
    if (type == "public") {
      const text = this.publicKeyTarget.innerText;
      download(text, "txt", "A&B - Public Key");
    } else if (type == "private") {
      const text = this.privateKeyTarget.innerText;
      download(text, "txt", "A&B - Private Key");
    } else {
      download("Let's hope you didn't have any bad intention by doing so ;)", "txt", "Well try");
      this.errorTarget.classList.remove("d-none");
      $([document.documentElement, document.body]).animate({
        scrollTop: 0
      }, 1000);
    }

  }
}
