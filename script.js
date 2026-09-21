document.addEventListener("DOMContentLoaded", function () {

    const searchToggle = document.getElementById("searchToggle");
    const searchPanel = document.getElementById("searchPanel");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const articlesGrid = document.querySelector(".articles-grid");
    const categories = document.querySelectorAll(".category-item");


    /* ================================
       SEARCH PANEL
    ================================= */

    if (searchToggle) {
        searchToggle.addEventListener("click", function () {
            searchPanel.classList.add("show");

            if (searchInput) {
                searchInput.focus();
            }
        });
    }


    if (closeSearch) {
        closeSearch.addEventListener("click", function () {
            searchPanel.classList.remove("show");

            if (searchInput) {
                searchInput.value = "";
            }

            showAllArticles();
        });
    }


    /* ================================
       GET ADMIN ARTICLES
    ================================= */

    function getAdminArticles() {

        const saved =
            localStorage.getItem("inkverse_admin_articles");

        if (!saved) {
            return [];
        }

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Could not read admin articles:", error);
            return [];
        }
    }


    /* ================================
       CREATE ADMIN ARTICLE CARD
    ================================= */

    function displayAdminArticles() {

        if (!articlesGrid) {
            return;
        }

        const adminArticles = getAdminArticles();

        adminArticles.forEach(function (article) {

            const card = document.createElement("article");

            card.className =
                "article-card admin-added-article";

            card.setAttribute(
                "data-category",
                article.category || ""
            );

            card.setAttribute(
                "data-admin-id",
                article.id
            );


            /* IMAGE */

            const imageBox =
                document.createElement("div");

            imageBox.className = "article-image";


            const image =
                document.createElement("img");

            if (article.image) {
                image.src = article.image;
            }

            image.alt = article.title || "Article image";

            image.style.width = "100%";
            image.style.height = "100%";
            image.style.objectFit = "cover";
            image.style.display = "block";


            imageBox.appendChild(image);


            /* BOOKMARK */

            const bookmark =
                document.createElement("button");

            bookmark.className = "bookmark-btn";
            bookmark.type = "button";
            bookmark.setAttribute(
                "aria-label",
                "Bookmark article"
            );

            bookmark.innerHTML =
                '<i class="fa-regular fa-bookmark"></i>';


            imageBox.appendChild(bookmark);


            /* CONTENT */

            const content =
                document.createElement("div");

            content.className = "article-content";


            const category =
                document.createElement("span");

            category.className = "article-category";

            category.textContent =
                article.category || "General";


            const title =
                document.createElement("h3");

            title.textContent =
                article.title || "Untitled Article";


            const description =
                document.createElement("p");

            description.textContent =
                article.intro || "";


            const meta =
                document.createElement("div");

            meta.className = "article-meta";


            const readTime =
                document.createElement("span");

            readTime.textContent =
                article.readTime || "5 min read";


            const date =
                document.createElement("span");

            date.textContent =
                article.date || "";


            meta.appendChild(readTime);
            meta.appendChild(date);


            content.appendChild(category);
            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(meta);


            card.appendChild(imageBox);
            card.appendChild(content);


            articlesGrid.appendChild(card);

        });
    }


    /* Show admin articles */

    displayAdminArticles();


    /* ================================
       ALL ARTICLES
    ================================= */

    function getAllArticles() {
        return document.querySelectorAll(".article-card");
    }


    /* ================================
       SEARCH
    ================================= */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const articles =
                getAllArticles();


            articles.forEach(function (article) {

                const titleElement =
                    article.querySelector("h3");

                const descriptionElement =
                    article.querySelector("p");

                const category =
                    article.getAttribute(
                        "data-category"
                    ) || "";


                const title =
                    titleElement
                        ? titleElement.textContent.toLowerCase()
                        : "";


                const description =
                    descriptionElement
                        ? descriptionElement.textContent.toLowerCase()
                        : "";


                if (
                    title.includes(searchText) ||
                    description.includes(searchText) ||
                    category.toLowerCase().includes(searchText)
                ) {
                    article.style.display = "";
                } else {
                    article.style.display = "none";
                }

            });

        });
    }


    /* ================================
       CATEGORY FILTER
    ================================= */

    categories.forEach(function (category) {

        category.addEventListener("click", function (event) {

            event.preventDefault();


            const selectedCategory =
                category.getAttribute("data-category");


            categories.forEach(function (item) {
                item.classList.remove("selected");
            });


            category.classList.add("selected");


            if (searchInput) {
                searchInput.value = "";
            }


            const articles =
                getAllArticles();


            articles.forEach(function (article) {

                const articleCategory =
                    article.getAttribute(
                        "data-category"
                    );


                if (
                    articleCategory === selectedCategory
                ) {
                    article.style.display = "";
                } else {
                    article.style.display = "none";
                }

            });


            const featuredSection =
                document.getElementById("featured");


            if (featuredSection) {

                featuredSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* ================================
       SHOW ALL ARTICLES
    ================================= */

    function showAllArticles() {

        const articles =
            getAllArticles();


        articles.forEach(function (article) {
            article.style.display = "";
        });


        categories.forEach(function (category) {
            category.classList.remove("selected");
        });
    }
/* ================================
   SAVED ARTICLES
================================ */

const SAVED_ARTICLES_KEY =
    "inkverse_saved_articles";


function getSavedArticles() {

    const saved =
        localStorage.getItem(
            SAVED_ARTICLES_KEY
        );

    if (!saved) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        return [];
    }
}


function saveSavedArticles(savedArticles) {

    localStorage.setItem(
        SAVED_ARTICLES_KEY,
        JSON.stringify(savedArticles)
    );

}


function getArticleSaveId(articleCard) {

    const adminId =
        articleCard.getAttribute("data-admin-id");

    if (adminId) {
        return "admin-" + adminId;
    }


    const originalArticles =
        document.querySelectorAll(
            ".article-card:not(.admin-added-article)"
        );


    let originalId = 0;


    originalArticles.forEach(function (article, index) {

        if (article === articleCard) {
            originalId = index + 1;
        }

    });


    if (originalId > 0) {
        return "original-" + originalId;
    }


    return "";

}


function getArticleURL(articleCard, saveId) {

    const adminId =
        articleCard.getAttribute("data-admin-id");


    if (adminId) {

        return "dynamic-article.html?id=" +
            adminId;

    }


    const originalArticles =
        document.querySelectorAll(
            ".article-card:not(.admin-added-article)"
        );


    let originalId = 0;


    originalArticles.forEach(function (article, index) {

        if (article === articleCard) {
            originalId = index + 1;
        }

    });


    if (originalId > 0) {

        return "article.html?id=" +
            originalId;

    }


    return "";

}


function updateBookmarkIcon(button, isSaved) {

    const icon =
        button.querySelector("i");

    if (!icon) {
        return;
    }


    if (isSaved) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        button.setAttribute(
            "aria-label",
            "Remove from saved articles"
        );

        button.setAttribute(
            "title",
            "Remove from saved articles"
        );

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        button.setAttribute(
            "aria-label",
            "Save article"
        );

        button.setAttribute(
            "title",
            "Save article"
        );

    }

}


const bookmarkButtons =
    document.querySelectorAll(".bookmark-btn");


bookmarkButtons.forEach(function (button) {

    const articleCard =
        button.closest(".article-card");


    if (!articleCard) {
        return;
    }


    const articleSaveId =
        getArticleSaveId(articleCard);


    if (!articleSaveId) {
        return;
    }


    /* Restore saved state */

    const savedArticles =
        getSavedArticles();


    const savedObject =
        savedArticles.find(function (item) {

            if (typeof item === "string") {
                return item === articleSaveId;
            }

            return item.id === articleSaveId;

        });


    updateBookmarkIcon(
        button,
        !!savedObject
    );


    /* Bookmark click */

    button.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            let savedArticles =
                getSavedArticles();


            const existingIndex =
                savedArticles.findIndex(
                    function (item) {

                        if (typeof item === "string") {
                            return item === articleSaveId;
                        }

                        return item.id === articleSaveId;

                    }
                );


            /* UNSAVE */

            if (existingIndex !== -1) {

                savedArticles.splice(
                    existingIndex,
                    1
                );


                updateBookmarkIcon(
                    button,
                    false
                );

            }

            /* SAVE */

            else {

                const titleElement =
                    articleCard.querySelector("h3");

                const descriptionElement =
                    articleCard.querySelector("p");

                const categoryElement =
                    articleCard.querySelector(
                        ".article-category"
                    );

                const metaElements =
                    articleCard.querySelectorAll(
                        ".article-meta span"
                    );

                const imageElement =
                    articleCard.querySelector(
                        ".article-image img"
                    );


                const savedArticle = {

                    id: articleSaveId,

                    title:
                        titleElement
                            ? titleElement.textContent
                            : "Untitled Article",

                    category:
                        categoryElement
                            ? categoryElement.textContent
                            : "General",

                    intro:
                        descriptionElement
                            ? descriptionElement.textContent
                            : "",

                    readTime:
                        metaElements[0]
                            ? metaElements[0].textContent
                            : "",

                    date:
                        metaElements[1]
                            ? metaElements[1].textContent
                            : "",

                    image:
                        imageElement
                            ? imageElement.src
                            : "",

                    url:
                        getArticleURL(
                            articleCard,
                            articleSaveId
                        )

                };


                savedArticles.push(
                    savedArticle
                );


                updateBookmarkIcon(
                    button,
                    true
                );

            }


            saveSavedArticles(
                savedArticles
            );


            console.log(
                "Saved Articles:",
                savedArticles
            );

        }
    );

});

    /* ================================
       ORIGINAL 6 ARTICLES
       KEEP THEIR EXISTING SYSTEM
    ================================= */

    const originalArticles =
        document.querySelectorAll(
            ".article-card:not(.admin-added-article)"
        );


    originalArticles.forEach(function (article, index) {

        article.style.cursor = "pointer";


        article.addEventListener("click", function () {

            const articleId = index + 1;

            window.location.href =
                "article.html?id=" + articleId;

        });

    });


    /* ================================
       ADMIN ARTICLES
       OPEN DYNAMIC ARTICLE PAGE
    ================================= */

    const adminArticles =
        document.querySelectorAll(
            ".admin-added-article"
        );


    adminArticles.forEach(function (article) {

        article.style.cursor = "pointer";


        article.addEventListener("click", function () {

            const adminId =
                article.getAttribute("data-admin-id");


            if (!adminId) {
                return;
            }


            window.location.href =
                "dynamic-article.html?id=" + adminId;

        });

    });


    console.log(
        "InkVerse Home loaded successfully."
    );

    console.log(
        "Original articles:",
        originalArticles.length
    );

    console.log(
        "Admin articles:",
        adminArticles.length
    );

});

/* ================================
   LATEST ARTICLES NAVIGATION
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const latestLink = document.querySelector(".latest-link");

    if (latestLink) {

        latestLink.addEventListener("click", function (event) {

            event.preventDefault();

            window.location.href = "latest-articles.html";

        });

    }

});