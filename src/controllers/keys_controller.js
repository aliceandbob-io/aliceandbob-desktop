import { Controller } from "stimulus";
import { generateMyKeys } from '../js/crypto.js';
import { download, copy, showPass } from "../js/index.js";

export default class extends Controller {
  static targets = ["emailParams", "passphraseParams", "curveParams", "privateKey", "publicKey", "initialState", "generateButton", "error"];

  async generate(e) {
    // Initial display
    e.preventDefault();
    this.initialStateTarget.classList.add("d-none");
    this.emailParamsTarget.classList.remove("border-danger");
    this.passphraseParamsTarget.classList.remove("border-danger");
    this.curveParamsTarget.classList.remove("border-danger");
    this.errorTarget.classList.add("d-none");

    // Validation form
    if (this.emailParamsTarget.value == "") {
      this.emailParamsTarget.classList.add("border-danger");
    }
    if (this.passphraseParamsTarget.value == "") {
      this.passphraseParamsTarget.classList.add("border-danger");
    }
    if (this.curveParamsTarget.value == "") {
      this.curveParamsTarget.classList.add("border-danger");
    }
    if (this.emailParamsTarget.value == "" || this.passphraseParamsTarget.value == "" || this.curveParamsTarget.value == "") {
      return
    }

    // UX button
    this.generateButtonTarget.disabled = true;
    this.generateButtonTarget.getElementsByClassName("material-icons")[0].classList.add("d-none");
    this.generateButtonTarget.getElementsByClassName("spinner-border")[0].classList.remove("d-none");

    // Params
    const emailParams = this.emailParamsTarget.value;
    const passphraseParams = this.passphraseParamsTarget.value;
    const curveParams = this.curveParamsTarget.value;

    const key = await generateMyKeys(emailParams, passphraseParams, curveParams).catch((err) => { console.error(err); });

    if (key) {
      this.privateKeyTarget.innerText = key.privateKey;
      this.publicKeyTarget.innerText = key.publicKey;
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
    let format = e.currentTarget.dataset.format;
    if (type == "public") {
      const text = this.publicKeyTarget.innerText;
      if (format == "asc") {
        download(text, "text/asc", "aliceandbob.io - Public Key.asc");
      } else {
        download(text, "text/txt", "aliceandbob.io - Public Key.txt");
      }
    } else if (type == "private") {
      const text = this.privateKeyTarget.innerText;
      if (format == "asc") {
        download(text, "text/asc", "aliceandbob.io - Private Key.asc");
      } else {
        download(text, "text/txt", "aliceandbob.io - Private Key.txt");
      }
    } else {
      download("Let's hope you didn't have any bad intention by doing so ;)", "txt", "Well tried");
      this.errorTarget.classList.remove("d-none");
      $([document.documentElement, document.body]).animate({
        scrollTop: 0
      }, 1000);
    }
  }
}
