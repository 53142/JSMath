let section = document.getElementsByClassName("section-text");


for (var i = 0; i < section.length; i++) {
    let sectionId = section[i]
    sectionId.addEventListener("click", function() {
        window.location.href = sectionId.getAttribute("id") + ".html";
    });
}