$(document).ready(function () {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function updateThemeButton() {
        if ($("html").attr("data-bs-theme") === "dark") {
            $("#theme-toggle").text("☀️ Light");
        } else {
            $("#theme-toggle").text("🌙 Dark");
        }
    }

    $("#theme-toggle").click(function () {
        if ($("html").attr("data-bs-theme") === "dark") {
            $("html").removeAttr("data-bs-theme");
            localStorage.setItem("theme", "light");
        } else {
            $("html").attr("data-bs-theme", "dark");
            localStorage.setItem("theme", "dark");
        }

        updateThemeButton();
    });

    updateThemeButton();

    function getUser() {
        const savedUser = localStorage.getItem("user");

        if (savedUser === null) {
            return null;
        }

        return JSON.parse(savedUser);
    }

    function updateAuthUI() {
        const user = getUser();

        if (user) {
            $("#signin-link").parent().hide();
            $("#user-item").css("display", "flex");
            $("#user-greeting").text("Hi, " + user.name);
            $("#signin-form").hide();
            $("#signed-in-box").show();
            $("#profile-name").text(user.name);
            $("#profile-email").text(user.email);
            $("#job-form").show();
            $("#signin-required").hide();
        } else {
            $("#signin-link").parent().show();
            $("#user-item").hide();
            $("#signin-form").show();
            $("#signed-in-box").hide();
            $("#job-form").hide();
            $("#signin-required").show();
        }
    }

    function signOut() {
        localStorage.removeItem("user");
        updateAuthUI();

        if ($("#jobs-body").length) {
            renderTable();
        }
    }

    $("#signout-btn").click(signOut);
    $("#signout-page-btn").click(signOut);

    const jobs = [
        { id: 1, title: "Junior Frontend Developer", company: "NovaTech", city: "Astana", type: "Full-time", salary: "400 000 - 600 000 ₸", logo: "images/novatech.svg" },
        { id: 2, title: "Data Analyst Intern", company: "DataNomad", city: "Almaty", type: "Internship", salary: "200 000 ₸", logo: "images/datanomad.svg" },
        { id: 3, title: "Backend Developer (Java)", company: "Steppe Soft", city: "Remote", type: "Remote", salary: "700 000 - 1 000 000 ₸", logo: "images/steppesoft.svg" },
        { id: 4, title: "UI/UX Designer", company: "Altyn Design", city: "Almaty", type: "Full-time", salary: "450 000 - 650 000 ₸", logo: "images/altyndesign.svg" },
        { id: 5, title: "Logistics Coordinator", company: "QazLogistics", city: "Shymkent", type: "Full-time", salary: "350 000 ₸", logo: "images/qazlogistics.svg" },
        { id: 6, title: "Marketing Assistant", company: "EduSpark", city: "Astana", type: "Part-time", salary: "250 000 ₸", logo: "images/eduspark.svg" },
        { id: 7, title: "Junior Engineer", company: "GreenField Energy", city: "Shymkent", type: "Full-time", salary: "380 000 ₸", logo: "images/greenfield.svg" },
        { id: 8, title: "Medical Administrator", company: "MedLine Clinic", city: "Astana", type: "Part-time", salary: "300 000 ₸", logo: "images/medline.svg" }
    ];

    let nextId = 9;
    let currentCategory = "All";
    let editId = null;

    function renderCards() {
        const searchText = $("#job-search").val().trim().toLowerCase();

        const filtered = jobs.filter(function (job) {
            const text = (job.title + " " + job.company + " " + job.city).toLowerCase();
            const matchesSearch = text.includes(searchText);
            const matchesCategory = currentCategory === "All" || job.type === currentCategory;
            return matchesSearch && matchesCategory;
        });

        $("#job-cards").empty();

        filtered.forEach(function (job) {
            const card = $("<article>").addClass("job-card");
            card.append($("<span>").addClass("job-badge").text(job.type));
            card.append($("<img>").addClass("job-logo").attr({ src: job.logo, alt: job.company + " logo", loading: "lazy" }));
            card.append($("<h3>").addClass("job-title").text(job.title));
            card.append($("<p>").addClass("job-company").text(job.company));

            const info = $("<ul>").addClass("job-info");
            info.append($("<li>").text(job.city));
            info.append($("<li>").addClass("job-salary").text(job.salary));
            card.append(info);

            card.append($("<a>").addClass("btn btn-main btn-sm").attr("href", "contact.html").text("Apply now"));

            const column = $("<div>").addClass("col-12 col-md-6 col-lg-4").append(card);
            $("#job-cards").append(column);
        });

        if (filtered.length === 0) {
            $("#job-cards").append($("<p>").addClass("no-results").text("No vacancies found. Try another search."));
        }

        $("#result-count").text("Found vacancies: " + filtered.length);
    }

    function renderTable() {
        $("#jobs-body").empty();

        jobs.forEach(function (job) {
            const row = $("<tr>");
            row.append($("<td>").text(job.title));
            row.append($("<td>").text(job.company));
            row.append($("<td>").text(job.city));
            row.append($("<td>").text(job.type));
            row.append($("<td>").text(job.salary));

            if (getUser() === null) {
                row.append($("<td>").text("Sign in to edit"));
                $("#jobs-body").append(row);
                return;
            }

            const editBtn = $("<button>").attr("type", "button").addClass("btn btn-sm btn-outline-primary me-2").text("Edit");
            const deleteBtn = $("<button>").attr("type", "button").addClass("btn btn-sm btn-outline-danger").text("Delete");

            editBtn.click(function () {
                startEdit(job);
            });

            deleteBtn.click(function () {
                deleteJob(job);
            });

            row.append($("<td>").append(editBtn, deleteBtn));
            $("#jobs-body").append(row);
        });
    }

    function startEdit(job) {
        editId = job.id;
        $("#job-title").val(job.title);
        $("#job-company").val(job.company);
        $("#job-city").val(job.city);
        $("#job-type").val(job.type);
        $("#job-salary").val(job.salary);
        $("#form-heading").text("Edit vacancy");
        $("#save-btn").text("Save changes");
        $("#cancel-btn").show();
        $("#form-status").text("");
        $("#job-title").focus();
    }

    function resetForm() {
        editId = null;
        $("#job-title, #job-company, #job-city, #job-salary").val("");
        $("#job-type").val("Full-time");
        $("#form-heading").text("Add vacancy");
        $("#save-btn").text("Add vacancy");
        $("#cancel-btn").hide();
    }

    function deleteJob(job) {
        if (!confirm("Delete the vacancy \"" + job.title + "\"?")) {
            return;
        }

        const index = jobs.indexOf(job);
        jobs.splice(index, 1);

        if (editId === job.id) {
            resetForm();
        }

        showStatus("Vacancy deleted.", true);
        renderCards();
        renderTable();
    }

    function showStatus(message, isSuccess) {
        $("#form-status")
            .text(message)
            .removeClass("text-success text-danger")
            .addClass(isSuccess ? "text-success" : "text-danger");
    }

    if ($("#job-cards").length) {
        const params = new URLSearchParams(window.location.search);
        const keyword = params.get("keyword");

        if (keyword) {
            $("#job-search").val(keyword);
        }

        $("#job-search").on("input", function () {
            renderCards();
        });

        $(".filter-btn").click(function () {
            currentCategory = $(this).attr("data-category");
            $(".filter-btn").removeClass("active");
            $(this).addClass("active");
            renderCards();
        });

        $("#job-form").submit(function (event) {
            event.preventDefault();

            const title = $("#job-title").val().trim();
            const company = $("#job-company").val().trim();
            const city = $("#job-city").val().trim();
            const type = $("#job-type").val();
            const salary = $("#job-salary").val().trim();

            if (title === "" || company === "" || city === "" || salary === "") {
                showStatus("Please fill in all fields.", false);
                return;
            }

            if (editId === null) {
                jobs.push({
                    id: nextId,
                    title: title,
                    company: company,
                    city: city,
                    type: type,
                    salary: salary,
                    logo: "images/logo.svg"
                });
                nextId++;
                showStatus("Vacancy added.", true);
            } else {
                const job = jobs.find(function (item) {
                    return item.id === editId;
                });
                job.title = title;
                job.company = company;
                job.city = city;
                job.type = type;
                job.salary = salary;
                showStatus("Vacancy updated.", true);
            }

            resetForm();
            renderCards();
            renderTable();
        });

        $("#cancel-btn").click(function () {
            resetForm();
            $("#form-status").text("");
        });

        renderCards();
        renderTable();
    }

    if ($("#registration-form").length) {
        function setFeedback(input, feedback, isValid, message) {
            if (isValid) {
                input.removeClass("is-invalid").addClass("is-valid");
                feedback.removeClass("text-danger").addClass("text-success").text("✔ " + message);
            } else {
                input.removeClass("is-valid").addClass("is-invalid");
                feedback.removeClass("text-success").addClass("text-danger").text("✖ " + message);
            }
        }

        function checkName() {
            const name = $("#reg-name").val().trim();
            const isValid = name.length >= 2;
            setFeedback($("#reg-name"), $("#name-feedback"), isValid,
                isValid ? "Looks good!" : "Name is required (at least 2 characters).");
            return isValid;
        }

        function checkEmail() {
            const email = $("#reg-email").val().trim();
            const isValid = emailPattern.test(email);
            setFeedback($("#reg-email"), $("#email-feedback"), isValid,
                isValid ? "Looks good!" : "Please enter a valid email, for example name@mail.com.");
            return isValid;
        }

        function getStrength(password) {
            let score = 0;

            if (password.length >= 8) {
                score++;
            }
            if (/[0-9]/.test(password)) {
                score++;
            }
            if (/[A-Z]/.test(password)) {
                score++;
            }
            if (/[^A-Za-z0-9]/.test(password)) {
                score++;
            }

            return score;
        }

        function checkPassword() {
            const password = $("#reg-password").val();
            const score = getStrength(password);
            let text = "Weak";
            let width = "33%";
            let color = "bg-danger";

            if (score === 4) {
                text = "Strong";
                width = "100%";
                color = "bg-success";
            } else if (score >= 2) {
                text = "Medium";
                width = "66%";
                color = "bg-warning";
            }

            if (password === "") {
                text = "not entered";
                width = "0%";
            }

            $("#strength-bar")
                .css("width", width)
                .removeClass("bg-danger bg-warning bg-success")
                .addClass(color);
            $("#strength-text").text("Password strength: " + text);

            const isValid = password.length >= 8 && score >= 2;
            setFeedback($("#reg-password"), $("#password-feedback"), isValid,
                isValid ? "Password is OK." : "Use at least 8 characters with numbers or uppercase letters.");
            return isValid;
        }

        function checkConfirm() {
            const password = $("#reg-password").val();
            const confirmPassword = $("#reg-confirm").val();
            const isValid = confirmPassword !== "" && confirmPassword === password;
            setFeedback($("#reg-confirm"), $("#confirm-feedback"), isValid,
                isValid ? "Passwords match." : "Passwords do not match.");
            return isValid;
        }

        $("#reg-name").on("input", checkName);
        $("#reg-email").on("input", checkEmail);

        $("#reg-password").on("input", function () {
            checkPassword();

            if ($("#reg-confirm").val() !== "") {
                checkConfirm();
            }
        });

        $("#reg-confirm").on("input", checkConfirm);

        $("#registration-form").submit(function (event) {
            event.preventDefault();

            const nameOk = checkName();
            const emailOk = checkEmail();
            const passwordOk = checkPassword();
            const confirmOk = checkConfirm();

            if (nameOk && emailOk && passwordOk && confirmOk) {
                $("#reg-alert")
                    .removeClass("alert-danger")
                    .addClass("alert-success")
                    .text("Registration successful! Welcome to JobFinder.")
                    .fadeIn();

                $("#registration-form input").val("").removeClass("is-valid is-invalid");
                $("#name-feedback, #email-feedback, #password-feedback, #confirm-feedback").text("");
                $("#strength-bar").css("width", "0%");
                $("#strength-text").text("Password strength: not entered");
            } else {
                $("#reg-alert")
                    .removeClass("alert-success")
                    .addClass("alert-danger")
                    .text("Please fix the errors above before submitting.")
                    .fadeIn();
            }
        });
    }

    if ($("#lightbox").length) {
        const images = $(".gallery-img");
        let currentIndex = 0;

        function showImage(index) {
            const image = images.eq(index);
            $("#lightbox-img").attr("src", image.attr("src")).attr("alt", image.attr("alt"));
            $("#lightbox-caption").text(image.attr("data-caption") + " (" + (index + 1) + " / " + images.length + ")");
        }

        function changeImage(step) {
            currentIndex = currentIndex + step;

            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }

            if (currentIndex >= images.length) {
                currentIndex = 0;
            }

            $("#lightbox-img").fadeOut(200, function () {
                showImage(currentIndex);
                $("#lightbox-img").fadeIn(200);
            });
        }

        images.click(function () {
            currentIndex = images.index(this);
            showImage(currentIndex);
            $("#lightbox").fadeIn(300);
        });

        images.hover(
            function () {
                $(this).stop().animate({ opacity: 0.7 }, 200);
            },
            function () {
                $(this).stop().animate({ opacity: 1 }, 200);
            }
        );

        $("#lightbox-next").click(function () {
            changeImage(1);
        });

        $("#lightbox-prev").click(function () {
            changeImage(-1);
        });

        $("#lightbox-close").click(function () {
            $("#lightbox").fadeOut(300);
        });

        $(document).keydown(function (event) {
            if (!$("#lightbox").is(":visible")) {
                return;
            }

            if (event.key === "Escape") {
                $("#lightbox").fadeOut(300);
            } else if (event.key === "ArrowRight") {
                changeImage(1);
            } else if (event.key === "ArrowLeft") {
                changeImage(-1);
            }
        });
    }

    if ($("#signin-form").length) {
        function showSigninFeedback(input, feedback, isValid, message) {
            if (isValid) {
                input.removeClass("is-invalid").addClass("is-valid");
                feedback.removeClass("text-danger").text("");
            } else {
                input.removeClass("is-valid").addClass("is-invalid");
                feedback.addClass("text-danger").text(message);
            }
        }

        $("#signin-form").submit(function (event) {
            event.preventDefault();

            const name = $("#signin-name").val().trim();
            const email = $("#signin-email").val().trim();
            const password = $("#signin-password").val();

            const nameOk = name.length >= 2;
            const emailOk = emailPattern.test(email);
            const passwordOk = password.length >= 8;

            showSigninFeedback($("#signin-name"), $("#signin-name-feedback"), nameOk, "Name must have at least 2 characters.");
            showSigninFeedback($("#signin-email"), $("#signin-email-feedback"), emailOk, "Please enter a valid email.");
            showSigninFeedback($("#signin-password"), $("#signin-password-feedback"), passwordOk, "Password must have at least 8 characters.");

            if (!nameOk || !emailOk || !passwordOk) {
                return;
            }

            const user = {
                name: name,
                email: email
            };

            localStorage.setItem("user", JSON.stringify(user));
            $("#signin-form input").val("").removeClass("is-valid is-invalid");
            updateAuthUI();
        });
    }

    $(".faq-question").click(function () {
        const answer = $(this).next(".faq-answer");
        const icon = $(this).find(".faq-icon");

        answer.slideToggle(300, function () {
            if (answer.is(":visible")) {
                icon.text("−");
            } else {
                icon.text("+");
            }
        });
    });

    if ($("#api-jobs").length) {
        let apiJobs = [];
        let apiPage = 1;

        async function loadApiJobs() {
            $("#api-status").removeClass("text-danger").text("Loading vacancies...");
            $("#api-jobs").empty();
            $("#api-page").text("Page " + apiPage);
            $("#api-prev").prop("disabled", apiPage === 1);

            try {
                const response = await fetch("https://www.arbeitnow.com/api/job-board-api?page=" + apiPage);

                if (!response.ok) {
                    throw new Error("Server error: " + response.status);
                }

                const result = await response.json();
                apiJobs = result.data;
                renderApiJobs();
            } catch (error) {
                apiJobs = [];
                console.error(error);
                $("#api-status")
                    .addClass("text-danger")
                    .text("Could not load vacancies. Please check your internet connection and click Refresh.");
            }
        }

        function renderApiJobs() {
            const searchText = $("#api-search").val().trim().toLowerCase();
            const remoteOnly = $("#api-remote").is(":checked");

            const filtered = apiJobs.filter(function (job) {
                const tags = job.tags || [];
                const text = (job.title + " " + job.company_name + " " + job.location + " " + tags.join(" ")).toLowerCase();
                const matchesSearch = text.includes(searchText);
                const matchesRemote = !remoteOnly || job.remote === true;
                return matchesSearch && matchesRemote;
            });

            $("#api-jobs").empty();

            filtered.forEach(function (job) {
                const card = $("<article>").addClass("api-card");
                card.append($("<h3>").text(job.title));
                card.append($("<p>").addClass("mb-1").text(job.company_name));
                card.append($("<p>").addClass("mb-2").text(job.location));

                if (job.remote) {
                    card.append($("<span>").addClass("api-tag api-remote").text("Remote"));
                }

                const tags = job.tags || [];

                tags.slice(0, 3).forEach(function (tag) {
                    card.append($("<span>").addClass("api-tag").text(tag));
                });

                const date = new Date(job.created_at * 1000).toLocaleDateString();
                card.append($("<p>").addClass("small mt-2").text("Posted: " + date));
                card.append($("<a>").addClass("btn btn-main btn-sm").attr({ href: job.url, target: "_blank" }).text("View job"));

                const column = $("<div>").addClass("col-12 col-md-6 col-lg-4").append(card);
                $("#api-jobs").append(column);
            });

            if (apiJobs.length === 0) {
                $("#api-status").text("No vacancies on this page.");
            } else if (filtered.length === 0) {
                $("#api-status").text("No vacancies match your search.");
            } else {
                $("#api-status").text("Showing " + filtered.length + " of " + apiJobs.length + " vacancies.");
            }
        }

        $("#api-search").on("input", renderApiJobs);
        $("#api-remote").change(renderApiJobs);

        $("#api-refresh").click(function () {
            loadApiJobs();
        });

        $("#api-next").click(function () {
            apiPage++;
            loadApiJobs();
        });

        $("#api-prev").click(function () {
            if (apiPage > 1) {
                apiPage--;
                loadApiJobs();
            }
        });

        loadApiJobs();
    }

    updateAuthUI();
});
