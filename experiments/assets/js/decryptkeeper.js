/* File: assets/script/decryptkeeper.js
 * Info: Hello, Ghouls and Boils! It's the Decrypt Keeper. I'm not at all like my brother! I do the opposite of what he does.
 * Use this library to give those baddies a real scream when they have to work to find a password.
 * (Also, Google "The Crypt Keeper" from Tales from the Crypt! It's a real SCREAM! AH HA HA HA!!!!)
 * Never keep your encryption stuff in the same place as your decryption stuff. It would be like leaving your keys in the door.
 */
const redacted = "";   // Used my password generator to produce a key

const garbage_in = document.querySelector("#input");
const crunch = document.querySelector("#crunch");
const garbage_out = document.querySelector("#output");

const paste = document.querySelector("#paste");
const copy  = document.querySelector("#copy");
const message = document.querySelector("#message");

crunch.disabled = true;   // TODO: Ignore this. This was for our demo pages.
copy.disabled = true;

/* Borrowed alot of this from https://stackoverflow.com/questions/72570359/cryptojs-javascript-aes-128-ecb-encrypt-decrypt
 * It needs tougher encryption
 */
function decrypt(input,key){
    key = CryptoJS.enc.Utf8.parse(key);
    let decrypted =  CryptoJS.AES.decrypt(
        {ciphertext: CryptoJS.enc.Hex.parse(input)}, 
        key, 
        {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });

    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

/**
 * @function decrypto Decrypt a hash into a string
 * @param {string} hash 
 * @returns {string}
 */
function decrypto(secret){
    //console.log("Decrypto");
    //console.log("Secret in");
    //console.log(secret);
    // Decryption stuff
    let str = decrypt(secret,redacted);

    //console.log("String out");
    //console.log(str);
    return str;
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
            console.log("String Copied!");
            message.innerHTML = "String Copied!";
            setTimeout(() => {
                message.innerHTML = "";
            }, 1000);
        }, (err) => {
            console.log("Error copying String");
            console.log(err);
        });
});

garbage_in.addEventListener("keyup",(ev) => {
    ev.preventDefault();
    let len = ev.target.value.length;
    crunch.disabled = (len === 0);      // Enable the crunch button if the length of garbage_in is greater than zero
    if(len > 0 && ev.keyCode === 13){   // If the length is greater that zero and we press enter, run our encryption method
        garbage_out.innerText = decrypto(ev.target.value);
        copy.disabled = (garbage_out.innerText.length === 0);
    }
});

crunch.addEventListener("click",(ev) => {
    ev.preventDefault();
    garbage_out.innerText = decrypto(garbage_in.value);
    copy.disabled = (garbage_out.innerText.length === 0);
});
