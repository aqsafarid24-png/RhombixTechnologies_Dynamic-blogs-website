document.addEventListener("DOMContentLoaded", function () {

    const category =
        document.getElementById("dynamicCategory");

    const title =
        document.getElementById("dynamicTitle");

    const intro =
        document.getElementById("dynamicIntro");

    const date =
        document.getElementById("dynamicDate");

    const readTime =
        document.getElementById("dynamicReadTime");

    const image =
        document.getElementById("dynamicImage");

    const imageBox =
        document.getElementById("dynamicImageBox");

    const content =
        document.getElementById("dynamicContent");


    /* ================================
       GET ARTICLE ID
    ================================= */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const articleId =
        params.get("id");


    if (!articleId) {

        title.textContent =
            "Article not found.";

        return;

    }


    /* ================================
       GET SAVED ARTICLES
    ================================= */

    const savedArticles =
        localStorage.getItem(
            "inkverse_admin_articles"
        );


    if (!savedArticles) {

        title.textContent =
            "Article not found.";

        return;

    }


    let articles = [];


    try {

        articles =
            JSON.parse(savedArticles);

    } catch (error) {

        console.error(
            "Could not load article.",
            error
        );

        title.textContent =
            "Article could not be loaded.";

        return;

    }


    /* ================================
       FIND ARTICLE
    ================================= */

    const article =
        articles.find(function (item) {

            return String(item.id) ===
                String(articleId);

        });


    if (!article) {

        title.textContent =
            "Article not found.";

        return;

    }


    /* ================================
       DISPLAY ARTICLE
    ================================= */

    category.textContent =
        article.category || "General";


    title.textContent =
        article.title || "Untitled Article";


    intro.textContent =
        article.intro || "";


    date.textContent =
        article.date || "";


    readTime.textContent =
        article.readTime || "";


    /* ================================
       IMAGE
    ================================= */

    if (article.image) {

        image.src =
            article.image;

        image.alt =
            article.title || "Article image";

        image.style.display =
            "block";

    } else {

        image.style.display =
            "none";

        imageBox.style.display =
            "none";

    }


    /* ================================
       CONTENT
    ================================= */

    content.innerHTML = "";


    const paragraphs =
        (article.content || "")
            .split(/\n+/);


    paragraphs.forEach(function (paragraph) {

        const text =
            paragraph.trim();


        if (text === "") {
            return;
        }


        const p =
            document.createElement("p");


        p.textContent =
            text;


        content.appendChild(p);

    });


    document.title =
        "InkVerse | " + article.title;


    console.log(
        "Dynamic article loaded:",
        article.title
    );

});