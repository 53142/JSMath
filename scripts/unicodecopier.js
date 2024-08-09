let input = document.getElementById("unicodeInput");
let output = document.getElementById("unicodeOutput");

input.addEventListener("input", function() {
    try {
        output.innerHTML = String.fromCodePoint(input.value);
    } catch (e) {
        output.innerHTML = "Enter a Unicode code point to display here. For example: 42";
    }
});