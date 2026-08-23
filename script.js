document.querySelector(".addTab").onclick = function() {

    const name = prompt("Name your new list:");

    if (!name || name.trim() === "") {
        return;
    }

    const newTab = document.createElement("button");

newTab.textContent = name.trim() + "  ×";

newTab.onclick = function(event) {

    if (event.target === newTab) {
        alert("You clicked " + name.trim());
    }
};

    document.getElementById("tabs").insertBefore(
        newTab,
        document.querySelector(".addTab")
    );
};
