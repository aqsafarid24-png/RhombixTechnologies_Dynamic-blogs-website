document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("adminLoginForm");
    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");
    const togglePassword = document.getElementById("togglePassword");
    const loginMessage = document.getElementById("loginMessage");

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "inkverse123";


    /* Show / Hide Password */

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

            }

        });

    }


    /* Login */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            loginMessage.textContent = "";
            loginMessage.className = "login-message";


            /* Empty fields */

            if (username === "" || password === "") {

                loginMessage.textContent =
                    "Please enter your username and password.";

                loginMessage.classList.add("error");

                return;
            }


            /* Correct Login */

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                localStorage.setItem(
                    "inkverse_admin_logged_in",
                    "true"
                );

                loginMessage.textContent =
                    "Login successful!";

                loginMessage.classList.add("success");


                setTimeout(function () {

                    window.location.href =
                        "admin-dashboard.html";

                }, 700);

            }


            /* Wrong Login */

            else {

                loginMessage.textContent =
                    "Incorrect username or password.";

                loginMessage.classList.add("error");

            }

        });

    }


    console.log("InkVerse Admin Login loaded successfully.");

});