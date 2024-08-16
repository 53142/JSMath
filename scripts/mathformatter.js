let autoformat = true;

document.getElementById("autoformat").addEventListener("change", function() {
    if (document.getElementById("autoformat").value == "True") {
        autoformat = true;
    } else {
        autoformat = false;
    }
});

document.getElementById("mathinput").addEventListener("input", function() {
    var math = document.getElementById("mathinput").value;
    const default_output = "Enter your math expressions below to display here. For example:\n$$a^2+b^2=c^2$$";
    
    // Check if beginning of math expression and end of math expression contains $$, if not, add them
    if (math !== "" && math !== "\\" && math !== null && autoformat) {
        if (math.substring(0, 2) !== "$$") {
            math = "$$" + math;
        }
        if (math.substring(math.length - 2) !== "$$") {
            math = math + "$$";
        }
    }

    // Show default output
    if (math == "" || math === null) {
        math = default_output;
    }

    document.getElementById("mathoutput").innerHTML = math;
    MathJax.typeset();
});

document.getElementById("backButton").addEventListener('click', () => {
    window.location.href = "index.html";
});