document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       LOGIN CHECK
    ================================= */

    const isLoggedIn =
        localStorage.getItem("inkverse_admin_logged_in");

    if (isLoggedIn !== "true") {
        window.location.href = "admin.html";
        return;
    }


    /* ================================
       LOGOUT
    ================================= */

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


    /* ================================
       ELEMENTS
    ================================= */

    const articleForm =
        document.getElementById("articleForm");

    const articleTitle =
        document.getElementById("articleTitle");

    const articleCategory =
        document.getElementById("articleCategory");

    const articleReadTime =
        document.getElementById("articleReadTime");

    const articleIntro =
        document.getElementById("articleIntro");

    const articleContent =
        document.getElementById("articleContent");

    const articleImage =
        document.getElementById("articleImage");

    const articleMessage =
        document.getElementById("articleMessage");

    const savedArticlesList =
        document.getElementById("savedArticlesList");

    const articleTotal =
        document.getElementById("articleTotal");

    const editingArticleId =
        document.getElementById("editingArticleId");

    const cancelEditBtn =
        document.getElementById("cancelEditBtn");

    const articleSubmitBtn =
        document.getElementById("articleSubmitBtn");


    /* ================================
       GET ARTICLES
    ================================= */

    function getArticles() {

        const saved =
            localStorage.getItem(
                "inkverse_admin_articles"
            );

        if (!saved) {
            return [];
        }

        try {

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "Could not load articles.",
                error
            );

            return [];

        }

    }


    /* ================================
       SAVE ARTICLES
    ================================= */

    function saveArticles(articles) {

        localStorage.setItem(
            "inkverse_admin_articles",
            JSON.stringify(articles)
        );

    }


    /* ================================
       ESCAPE HTML
    ================================= */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent =
            text || "";

        return div.innerHTML;

    }


    /* ================================
       READ IMAGE
    ================================= */

    function readImage(file) {

        return new Promise(function (resolve, reject) {

            if (!file) {

                resolve("");

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function () {

                resolve(reader.result);

            };


            reader.onerror = function () {

                reject(
                    new Error(
                        "Image could not be read."
                    )
                );

            };


            reader.readAsDataURL(file);

        });

    }


    /* ================================
       RESET EDIT MODE
    ================================= */

    function resetEditMode() {

        if (editingArticleId) {
            editingArticleId.value = "";
        }


        if (articleSubmitBtn) {

            articleSubmitBtn.innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Article';

        }


        if (cancelEditBtn) {

            cancelEditBtn.style.display =
                "none";

        }


        if (articleForm) {

            articleForm.reset();

        }


        if (articleMessage) {

            articleMessage.textContent =
                "";

            articleMessage.className =
                "article-form-message";

        }

    }


    /* ================================
       START EDIT MODE
    ================================= */

    function startEdit(articleId) {

        const articles =
            getArticles();


        const article =
            articles.find(function (item) {

                return String(item.id) ===
                    String(articleId);

            });


        if (!article) {

            alert("Article not found.");

            return;

        }


        /* Fill form */

        articleTitle.value =
            article.title || "";

        articleCategory.value =
            article.category || "";

        articleReadTime.value =
            article.readTime || "";

        articleIntro.value =
            article.intro || "";

        articleContent.value =
            article.content || "";


        /*
            File input cannot be filled
            automatically by the browser.

            Existing image will be kept
            unless a new image is selected.
        */


        if (editingArticleId) {

            editingArticleId.value =
                article.id;

        }


        if (articleSubmitBtn) {

            articleSubmitBtn.innerHTML =
                '<i class="fa-solid fa-check"></i> Update Article';

        }


        if (cancelEditBtn) {

            cancelEditBtn.style.display =
                "inline-flex";

        }


        if (articleMessage) {

            articleMessage.textContent =
                "You are editing this article. Make your changes and click Update Article.";

            articleMessage.className =
                "article-form-message";

        }


        /* Scroll to editor */

        if (articleForm) {

            articleForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* ================================
       DISPLAY SAVED ARTICLES
    ================================= */

    function displayArticles() {

        if (!savedArticlesList) {
            return;
        }


        const articles =
            getArticles();


        savedArticlesList.innerHTML =
            "";


        /* Total */

        if (articleTotal) {

            articleTotal.textContent =
                articles.length +
                (
                    articles.length === 1
                        ? " Article"
                        : " Articles"
                );

        }


        /* No articles */

        if (articles.length === 0) {

            savedArticlesList.innerHTML = `
                <div class="no-saved-articles">
                    <i class="fa-regular fa-file-lines"></i>
                    <p>No articles added yet.</p>
                </div>
            `;

            return;

        }


        /* Create article cards */

        articles.forEach(function (article) {

            const card =
                document.createElement("div");

            card.className =
                "saved-article-card";


            const image =
                article.image
                    ? `
                        <img
                            src="${article.image}"
                            alt="${escapeHTML(article.title)}"
                        >
                    `
                    : `
                        <div class="saved-article-no-image">
                            <i class="fa-regular fa-image"></i>
                        </div>
                    `;


            card.innerHTML = `

                <div class="saved-article-image">
                    ${image}
                </div>

                <div class="saved-article-info">

                    <span class="saved-article-category">
                        ${escapeHTML(article.category)}
                    </span>

                    <h3>
                        ${escapeHTML(article.title)}
                    </h3>

                    <p>
                        ${escapeHTML(article.intro)}
                    </p>

                    <div class="saved-article-meta">

                        <span>
                            ${escapeHTML(article.readTime)}
                        </span>

                        <span>
                            ${escapeHTML(article.date)}
                        </span>

                    </div>

                    <div class="saved-article-actions">

                        <button
                            type="button"
                            class="edit-article-btn"
                            data-id="${article.id}"
                        >
                            <i class="fa-solid fa-pen"></i>
                            Edit
                        </button>

                        <button
                            type="button"
                            class="delete-article-btn"
                            data-id="${article.id}"
                        >
                            <i class="fa-solid fa-trash"></i>
                            Delete
                        </button>

                    </div>

                </div>
            `;


            savedArticlesList.appendChild(card);

        });


        /* ================================
           EDIT BUTTONS
        ================================= */

        const editButtons =
            document.querySelectorAll(
                ".edit-article-btn"
            );


        editButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const articleId =
                        button.getAttribute("data-id");

                    startEdit(articleId);

                }
            );

        });


        /* ================================
           DELETE BUTTONS
        ================================= */

        const deleteButtons =
            document.querySelectorAll(
                ".delete-article-btn"
            );


        deleteButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const articleId =
                        button.getAttribute("data-id");


                    const confirmed =
                        confirm(
                            "Are you sure you want to delete this article?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    let articles =
                        getArticles();


                    articles =
                        articles.filter(
                            function (article) {

                                return String(article.id) !==
                                    String(articleId);

                            }
                        );


                    saveArticles(articles);


                    /*
                        If deleted article was
                        currently being edited,
                        exit edit mode.
                    */

                    if (
                        editingArticleId &&
                        String(editingArticleId.value) ===
                        String(articleId)
                    ) {

                        resetEditMode();

                    }


                    displayArticles();


                    if (articleMessage) {

                        articleMessage.textContent =
                            "Article deleted successfully.";

                        articleMessage.className =
                            "article-form-message success";

                    }

                }
            );

        });

    }


    /* ================================
       CANCEL EDIT
    ================================= */

    if (cancelEditBtn) {

        cancelEditBtn.addEventListener(
            "click",
            function () {

                resetEditMode();

            }
        );

    }


    /* ================================
       FORM SUBMIT
    ================================= */

    if (articleForm) {

        articleForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const title =
                    articleTitle.value.trim();

                const category =
                    articleCategory.value;

                const readTime =
                    articleReadTime.value.trim();

                const intro =
                    articleIntro.value.trim();

                const content =
                    articleContent.value.trim();

                const imageFile =
                    articleImage.files[0];

                const currentEditingId =
                    editingArticleId
                        ? editingArticleId.value
                        : "";


                /* ================================
                   VALIDATION
                ================================= */

                if (
                    title === "" ||
                    category === "" ||
                    readTime === "" ||
                    intro === "" ||
                    content === ""
                ) {

                    articleMessage.textContent =
                        "Please fill in all required fields.";

                    articleMessage.className =
                        "article-form-message error";

                    return;

                }


                /* ================================
                   IMAGE SIZE
                ================================= */

                if (
                    imageFile &&
                    imageFile.size >
                    2 * 1024 * 1024
                ) {

                    articleMessage.textContent =
                        "Image size must be less than 2 MB.";

                    articleMessage.className =
                        "article-form-message error";

                    return;

                }


                try {

                    articleMessage.textContent =
                        currentEditingId
                            ? "Updating article..."
                            : "Saving article...";

                    articleMessage.className =
                        "article-form-message";


                    const articles =
                        getArticles();


                    /* ================================
                       EDIT EXISTING ARTICLE
                    ================================= */

                    if (currentEditingId !== "") {

                        const articleIndex =
                            articles.findIndex(
                                function (article) {

                                    return String(article.id) ===
                                        String(currentEditingId);

                                }
                            );


                        if (articleIndex === -1) {

                            articleMessage.textContent =
                                "Article could not be found.";

                            articleMessage.className =
                                "article-form-message error";

                            return;

                        }


                        const oldArticle =
                            articles[articleIndex];


                        let imageData =
                            oldArticle.image || "";


                        /*
                            Only replace image if
                            user selects a new one.
                        */

                        if (imageFile) {

                            imageData =
                                await readImage(
                                    imageFile
                                );

                        }


                        articles[articleIndex] = {

                            ...oldArticle,

                            title: title,

                            category: category,

                            readTime: readTime,

                            intro: intro,

                            content: content,

                            image: imageData,

                            date:
                                new Date().toLocaleDateString(),

                            updatedAt:
                                new Date().toISOString()

                        };


                        saveArticles(articles);


                        resetEditMode();


                        displayArticles();


                        if (articleMessage) {

                            articleMessage.textContent =
                                "Article updated successfully.";

                            articleMessage.className =
                                "article-form-message success";

                        }


                        return;

                    }


                    /* ================================
                       ADD NEW ARTICLE
                    ================================= */

                    const imageData =
                        await readImage(imageFile);


                    const newArticle = {

                        id: Date.now(),

                        title: title,

                        category: category,

                        readTime: readTime,

                        intro: intro,

                        content: content,

                        image: imageData,

                        date:
                            new Date().toLocaleDateString(),

                        createdAt:
                            new Date().toISOString()

                    };


                    articles.push(newArticle);


                    saveArticles(articles);


                    articleForm.reset();


                    if (editingArticleId) {
                        editingArticleId.value = "";
                    }


                    if (cancelEditBtn) {

                        cancelEditBtn.style.display =
                            "none";

                    }


                    if (articleSubmitBtn) {

                        articleSubmitBtn.innerHTML =
                            '<i class="fa-solid fa-plus"></i> Add Article';

                    }


                    articleMessage.textContent =
                        "Article added successfully!";

                    articleMessage.className =
                        "article-form-message success";


                    displayArticles();


                } catch (error) {

                    console.error(
                        "Article save error:",
                        error
                    );


                    articleMessage.textContent =
                        "Something went wrong while saving the article.";

                    articleMessage.className =
                        "article-form-message error";

                }

            }
        );

    }


    /* ================================
       LOAD ARTICLES
    ================================= */

    displayArticles();


    console.log(
        "InkVerse Manage Articles loaded successfully."
    );

});