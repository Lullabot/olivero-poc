(function() {
    var closeBtn = document.getElementsByClassName("close");
    var i;

    for (i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener("click", function() {
            this.parentElement.style.display = 'none';
        });
    }
})();
