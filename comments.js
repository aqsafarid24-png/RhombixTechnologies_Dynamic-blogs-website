document.addEventListener("DOMContentLoaded", function () {

    const commentName = document.getElementById("commentName");
    const commentText = document.getElementById("commentText");
    const postComment = document.getElementById("postComment");
    const commentsList = document.getElementById("commentsList");

    if (!commentName || !commentText || !postComment || !commentsList) {
        return;
    }

    const pageKey = window.location.search || "?id=1";
    const storageKey = "inkverse_comments_" + pageKey;

    function getComments() {

        const savedComments =
            localStorage.getItem(storageKey);

        if (!savedComments) {
            return [];
        }

        try {
            return JSON.parse(savedComments);
        } catch (error) {
            return [];
        }
    }


    function saveComments(comments) {

        localStorage.setItem(
            storageKey,
            JSON.stringify(comments)
        );
    }


    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    function showComments() {

        const comments = getComments();

        commentsList.innerHTML = "";


        if (comments.length === 0) {

            commentsList.innerHTML =
                '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';

            return;
        }


        comments.forEach(function (comment, index) {

            const commentItem =
                document.createElement("div");

            commentItem.className =
                "comment-item";


            const firstLetter =
                comment.name.charAt(0).toUpperCase();


            commentItem.innerHTML =

                '<div class="comment-header">' +

                    '<div class="comment-avatar">' +
                        escapeHTML(firstLetter) +
                    '</div>' +

                    '<div>' +

                        '<div class="comment-author">' +
                            escapeHTML(comment.name) +
                        '</div>' +

                        '<div class="comment-date">' +
                            escapeHTML(comment.date) +
                        '</div>' +

                    '</div>' +

                '</div>' +

                '<div class="comment-text">' +
                    escapeHTML(comment.text) +
                '</div>' +

                '<button class="delete-comment" data-index="' +
                    index +
                    '">' +
                    'Delete' +
                '</button>';


            commentsList.appendChild(commentItem);
        });


        const deleteButtons =
            commentsList.querySelectorAll(".delete-comment");


        deleteButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(
                        button.getAttribute("data-index")
                    );


                const comments =
                    getComments();


                comments.splice(index, 1);

                saveComments(comments);

                showComments();
            });
        });
    }


    postComment.addEventListener("click", function () {

        const name =
            commentName.value.trim();

        const text =
            commentText.value.trim();


        if (name === "") {

            alert("Please enter your name.");

            commentName.focus();

            return;
        }


        if (text === "") {

            alert("Please write your comment.");

            commentText.focus();

            return;
        }


        const comments =
            getComments();


        comments.push({

            name: name,

            text: text,

            date: new Date().toLocaleDateString()

        });


        saveComments(comments);


        commentName.value = "";

        commentText.value = "";


        showComments();

    });


    showComments();


    console.log(
        "Comments system loaded successfully."
    );

});