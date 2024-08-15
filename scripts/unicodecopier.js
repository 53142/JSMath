let input = document.getElementById("unicodeInput");
let output = document.getElementById("unicodeOutput");
let copyButton = document.getElementById("copyButton");

let outputUnicodeVisible = false;

input.addEventListener("input", function() {
    if (input.value == "") {
        output.innerHTML = "Enter a Unicode code point to display here. For example: 42";
        outputUnicodeVisible = false;
    } else {
        try {
            output.innerHTML = String.fromCodePoint(input.value);
            copyButton.innerHTML = "Copy to Clipboard";
            outputUnicodeVisible = true;
        } catch (e) {
            output.innerHTML = "Enter a Unicode code point to display here. For example: 42";
            outputUnicodeVisible = false;
        }
    }
});

copyButton.addEventListener("click", function() {
    if (outputUnicodeVisible) {
        navigator.clipboard.writeText(output.innerHTML);
        copyButton.innerHTML = "Copied!";
    }
});

document.getElementById("backButton").addEventListener('click', () => {
    window.location.href = "index.html";
});