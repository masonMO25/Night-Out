/* File: assets/script/encryptkeeper.js
 * Info: Hello, Boils and Ghouls! It's the Encrypt Keeper.
 * Use this library to give those baddies a real scream when they have to work to find a password.
 * (Also, Google "The Crypt Keeper" from Tales from the Crypt! It's a real SCREAM! AH HA HA HA!!!!)
 * Note: Hashing is not the same as encrypting. We will need to do both.
 */
const redacted = "";   // Used my password generator to produce a key

const garbage_in = document.querySelector("#input");
const crunch = document.querySelector("#crunch");
const garbage_out = document.querySelector("#output");

const paste = document.querySelector("#paste");
const copy  = document.querySelector("#copy");
const message = document.querySelector("#message");


crunch.disabled = true;
copy.disabled = true;

/* Borrowed alot of this from https://stackoverflow.com/questions/72570359/cryptojs-javascript-aes-128-ecb-encrypt-decrypt
 * It needs tougher encryption
 */
function encrypt(input,key){
    let text        = CryptoJS.enc.Utf8.parse(input);
    let secret_key  = CryptoJS.enc.Utf8.parse(key);
    let encrypted   = CryptoJS.AES.encrypt(text,secret_key,{mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding});
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return encrypted;
}

/**
 * @function encrypto Convert a string to a hash
 * @param {script} str string to encrypt 
 * @returns {string} A hash output
 */
function encrypto(str){
    //console.log("Encrypto");
    //console.log("String in");
    //console.log(str);
    // Encryption stuff
    let enc = encrypt(str,redacted);

    //console.log("Secret out");
    //console.log(enc);
    return enc;
}

paste.addEventListener("click", (ev) => {
    navigator.clipboard.readText().then((text) => {
        garbage_in.value = text;
        crunch.disabled = false; //(garbage_in.value.length === 0);
    }).catch((err) => console.log(err));
});

copy.addEventListener("click",(ev) => {
    navigator.clipboard.writeText(garbage_out.innerText).then(
        (text) => {
            console.log("Secret Copied!");
            message.innerHTML = "Secret Copied!";
            setTimeout(() => {
                message.innerHTML = "";
            }, 1000);
        }, (err) => {
            console.log("Error copying hash");
            console.log(err);
        });
});

garbage_in.addEventListener("keyup",(ev) => {
    ev.preventDefault();
    let len = ev.target.value.length;
    crunch.disabled = (len === 0);      // Enable the crunch button if the length of garbage_in is greater than zero
    if(len > 0 && ev.keyCode === 13){   // If the length is greater that zero and we press enter, run our encryption method
        garbage_out.innerText = encrypto(ev.target.value);
        copy.disabled = (garbage_out.innerText.length === 0);
    }
});

crunch.addEventListener("click",(ev) => {
    ev.preventDefault();
    garbage_out.innerText = encrypto(garbage_in.value);
    copy.disabled = (garbage_out.innerText.length === 0);
});
