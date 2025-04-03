CustomerApp = document.getElementById("app-customer");
SalesRepApp = document.getElementById("app-sales-rep");
CustomerButton = document.getElementById("customer-button");
SalesButton = document.getElementById("sales-button");
BackButton = document.getElementById("back-button");

function show(app) {
    if (app === "back") {
        CustomerApp.classList.add("hidden");
        SalesRepApp.classList.add("hidden");
        CustomerButton.classList.remove("hide");
        SalesButton.classList.remove("hide");
        BackButton.classList.add("hide");
    } else {
        CustomerApp.classList.add("hidden");
        SalesRepApp.classList.add("hidden");
        CustomerButton.classList.add("hide");
        SalesButton.classList.add("hide");
        BackButton.classList.remove("hide");

        document.getElementById(app).classList.remove("hidden");
    }
}