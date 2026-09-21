document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // ARTICLE DATA
    // ========================================

    const articles = {

        1: {
            category: "TECHNOLOGY",
            title: "The Future of Technology: What Comes Next?",
            intro: "Discover the ideas, innovations and emerging technologies shaping the digital world and changing the way we live, work and create.",
            date: "Sep 13, 2026",
            readTime: "5 min read",
            author: "InkVerse Editorial",
            role: "Technology & Innovation",
            imageClass: "image-one",
            imageText: "Exploring Tomorrow's Technology",

            content: `
                <p class="article-lead">
                    Technology is evolving faster than ever. From artificial
                    intelligence to smarter devices, the digital world
                    continues to transform how people communicate, learn,
                    work and experience everyday life.
                </p>

                <h2>A New Digital Era</h2>

                <p>
                    Every generation experiences technological change,
                    but today's pace of innovation is different. New tools
                    and platforms can move from an idea to something used
                    by millions of people in a remarkably short time.
                </p>

                <p>
                    Artificial intelligence, cloud computing, automation
                    and connected devices are becoming important parts of
                    modern digital experiences.
                </p>

                <h2>The Rise of Artificial Intelligence</h2>

                <p>
                    Artificial intelligence is one of the biggest forces
                    influencing the future of technology. AI can help people
                    analyze information, automate repetitive tasks and
                    explore new creative ideas.
                </p>

                <blockquote>
                    “The best technology does not simply make life more
                    complicated. It makes possibilities bigger.”
                </blockquote>

                <h2>What Comes Next?</h2>

                <p>
                    The future of technology is not just about smarter
                    machines. It is about how people use technology to
                    create better experiences and solve meaningful problems.
                </p>
            `
        },


        2: {
            category: "DESIGN",
            title: "Designing Digital Experiences People Love",
            intro: "Simple principles that can transform ordinary interfaces into memorable digital experiences.",
            date: "Sep 12, 2026",
            readTime: "6 min read",
            author: "InkVerse Editorial",
            role: "Design & Creativity",
            imageClass: "image-two",
            imageText: "Designing Experiences That Matter",

            content: `
                <p class="article-lead">
                    Great design is not simply about making something look
                    beautiful. It is about creating experiences that feel
                    natural, useful and enjoyable.
                </p>

                <h2>Design Starts With People</h2>

                <p>
                    Every successful digital experience begins by
                    understanding the people who will use it. Their goals,
                    expectations and frustrations should guide design
                    decisions.
                </p>

                <p>
                    A clean interface helps users understand where they are,
                    what they can do and what they should do next.
                </p>

                <h2>The Power of Simplicity</h2>

                <p>
                    Too many buttons, colors and elements can make an
                    interface confusing. Good design removes unnecessary
                    complexity and keeps attention on what matters.
                </p>

                <blockquote>
                    “Good design feels simple because the complexity has
                    already been solved.”
                </blockquote>

                <h2>Creating Memorable Experiences</h2>

                <p>
                    Typography, spacing, motion, imagery and visual hierarchy
                    all work together to create a consistent experience.
                    When these details are thoughtfully combined, users
                    remember the product.
                </p>
            `
        },


        3: {
            category: "LIFESTYLE",
            title: "Building a Life That Feels Like Yours",
            intro: "Small habits, meaningful choices and the mindset behind intentional living.",
            date: "Sep 10, 2026",
            readTime: "4 min read",
            author: "InkVerse Editorial",
            role: "Lifestyle & Wellbeing",
            imageClass: "image-three",
            imageText: "Creating a Life With Intention",

            content: `
                <p class="article-lead">
                    A meaningful life does not have to look perfect.
                    Sometimes it is simply about making choices that feel
                    right for you.
                </p>

                <h2>Start With Small Changes</h2>

                <p>
                    Big changes often begin with small habits. Reading a few
                    pages, taking a short walk or creating time for yourself
                    can slowly make a meaningful difference.
                </p>

                <h2>Stop Comparing Your Journey</h2>

                <p>
                    Everyone has a different timeline. Comparing your
                    progress with someone else's can make you overlook the
                    progress you have already made.
                </p>

                <blockquote>
                    “A good life is not the loudest one. It is the one that
                    feels meaningful to you.”
                </blockquote>

                <h2>Choose What Matters</h2>

                <p>
                    Intentional living is about giving your attention to
                    people, activities and goals that genuinely matter to
                    you.
                </p>
            `
        },


        4: {
            category: "PRODUCTIVITY",
            title: "Work Smarter Without Burning Out",
            intro: "Practical strategies for focusing on what actually matters in a busy digital world.",
            date: "Sep 08, 2026",
            readTime: "7 min read",
            author: "InkVerse Editorial",
            role: "Productivity & Growth",
            imageClass: "image-four",
            imageText: "Focus on What Matters",

            content: `
                <p class="article-lead">
                    Being busy does not always mean being productive.
                    Real productivity comes from using your time and energy
                    intentionally.
                </p>

                <h2>Prioritize Your Important Work</h2>

                <p>
                    Start each day by identifying the tasks that genuinely
                    matter. Completing important work before less valuable
                    tasks can create a stronger sense of progress.
                </p>

                <h2>Protect Your Focus</h2>

                <p>
                    Notifications, social media and constant multitasking
                    can quickly break concentration. Creating focused periods
                    without distractions can improve the quality of your work.
                </p>

                <blockquote>
                    “Productivity is not doing more. It is making room for
                    what matters.”
                </blockquote>

                <h2>Rest Is Part of Productivity</h2>

                <p>
                    Breaks and proper rest are not wasted time. They help
                    your mind recover and make it easier to return to your
                    work with better focus.
                </p>
            `
        },


        5: {
            category: "CAREER",
            title: "Building Skills That Shape Your Career",
            intro: "A practical guide to learning valuable skills and growing with confidence.",
            date: "Sep 06, 2026",
            readTime: "6 min read",
            author: "InkVerse Editorial",
            role: "Career & Learning",
            imageClass: "image-five",
            imageText: "Skills That Build Your Future",

            content: `
                <p class="article-lead">
                    A strong career is rarely built overnight. It grows
                    through consistent learning, practical experience and
                    the willingness to keep improving.
                </p>

                <h2>Learn With Purpose</h2>

                <p>
                    Instead of trying to learn everything, focus on skills
                    connected to the direction you want your career to take.
                    This makes learning more focused and useful.
                </p>

                <h2>Practice What You Learn</h2>

                <p>
                    Practical projects can turn theoretical knowledge into
                    real experience. Even small projects can help build
                    confidence and demonstrate your abilities.
                </p>

                <blockquote>
                    “Your skills grow when learning becomes something you do,
                    not something you only plan.”
                </blockquote>

                <h2>Keep Growing</h2>

                <p>
                    Industries continue to change, so continuous learning
                    can become one of the most valuable habits throughout
                    your career.
                </p>
            `
        },


        6: {
            category: "AI & INNOVATION",
            title: "How AI Is Changing the Way We Create",
            intro: "Exploring how artificial intelligence is opening new possibilities for creativity and innovation.",
            date: "Sep 04, 2026",
            readTime: "8 min read",
            author: "InkVerse Editorial",
            role: "AI & Innovation",
            imageClass: "image-six",
            imageText: "Creativity Meets Artificial Intelligence",

            content: `
                <p class="article-lead">
                    Artificial intelligence is becoming a powerful creative
                    tool. From generating ideas to helping creators explore
                    new possibilities, AI is changing the creative process.
                </p>

                <h2>AI as a Creative Partner</h2>

                <p>
                    AI tools can help creators brainstorm, organize ideas
                    and experiment with different possibilities. The human
                    creator still provides direction, judgment and purpose.
                </p>

                <h2>Faster Ideas, More Experiments</h2>

                <p>
                    One major advantage of AI is the ability to explore
                    multiple ideas quickly. This can give creators more
                    opportunities to test and improve their concepts.
                </p>

                <blockquote>
                    “Technology becomes powerful when it expands what people
                    imagine they can create.”
                </blockquote>

                <h2>The Human Element</h2>

                <p>
                    Creativity is still deeply connected to human experience.
                    AI can assist the process, but meaning, emotion and
                    personal perspective remain important parts of creative
                    work.
                </p>
            `
        }

    };


    // ========================================
    // GET ARTICLE ID FROM URL
    // ========================================

    const urlParams = new URLSearchParams(window.location.search);

    const articleId = urlParams.get("id") || "1";

    const article = articles[articleId];


    // ========================================
    // CHECK ARTICLE
    // ========================================

    if (!article) {

        document.title = "Article Not Found | InkVerse";

        return;

    }


    // ========================================
    // UPDATE PAGE
    // ========================================

    document.title =
        article.title + " | InkVerse";


    const categoryElement =
        document.querySelector(".article-detail-category");

    const titleElement =
        document.querySelector(".article-detail h1");

    const introElement =
        document.querySelector(".article-detail-intro");

    const dateElement =
        document.querySelector(".article-meta-right span:first-child");

    const readTimeElement =
        document.querySelector(".article-meta-right span:last-child");

    const authorName =
        document.querySelector(".author-info strong");

    const authorRole =
        document.querySelector(".author-info span");

    const heroImage =
        document.querySelector(".article-detail-image");

    const imageText =
        document.querySelector(".article-image-overlay span");

    const articleBody =
        document.querySelector(".article-body");


    // ========================================
    // INSERT DATA
    // ========================================

    categoryElement.textContent =
        article.category;

    titleElement.textContent =
        article.title;

    introElement.textContent =
        article.intro;

    dateElement.innerHTML =
        '<i class="fa-regular fa-calendar"></i> ' +
        article.date;

    readTimeElement.innerHTML =
        '<i class="fa-regular fa-clock"></i> ' +
        article.readTime;

    authorName.textContent =
        article.author;

    authorRole.textContent =
        article.role;

    imageText.textContent =
        article.imageText;

    articleBody.innerHTML =
        article.content;


    // ========================================
    // CHANGE HERO IMAGE CLASS
    // ========================================

    heroImage.classList.remove(
        "image-one",
        "image-two",
        "image-three",
        "image-four",
        "image-five",
        "image-six"
    );

    heroImage.classList.add(
        article.imageClass
    );


    console.log(
        "Loaded article:",
        article.title
    );

});