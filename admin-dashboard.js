document.addEventListener("DOMContentLoaded", function () {

    const isLoggedIn =
        localStorage.getItem("inkverse_admin_logged_in");

    if (isLoggedIn !== "true") {
        window.location.href = "admin.html";
        return;
    }

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            localStorage.removeItem(
                "inkverse_admin_logged_in"
            );

            window.location.href = "admin.html";

        });

    }

    console.log("InkVerse Admin Dashboard loaded successfully.");

});