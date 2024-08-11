let input = document.getElementById("unicodeInput");
let output = document.getElementById("unicodeOutput");

input.addEventListener("input", function() {
    if (input.value == "") {
        output.innerHTML = "Enter a Unicode code point to display here. For example: 42";
    } else {
        try {
            output.innerHTML = String.fromCodePoint(input.value);
        } catch (e) {
            output.innerHTML = "Enter a Unicode code point to display here. For example: 42";
        }
    }
});