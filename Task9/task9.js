$(function () {

    var formConfig = {
        heading: "Registration Form",
        fields: [
            { type: "text", label: "Name", id: "name" },
            { type: "email", label: "Email", id: "email" },
            { type: "password", label: "Password", id: "password" },
            {
                type: "select",
                label: "Country",
                id: "country",
                options: ["Select", "India", "USA"]
            }
        ]
    };

    var form = $("<form></form>");
    form.append("<h2>" + formConfig.heading + "</h2>");

    $.each(formConfig.fields, function (i, field) {

        var label = $("<label>").text(field.label);
        form.append(label);

        if (field.type === "select") {

            var dropdown = $("<select>").attr("id", field.id);

            $.each(field.options, function (j, opt) {
                dropdown.append("<option value='" + opt + "'>" + opt + "</option>");
            });

            form.append(dropdown);

        } else {

            var input = $("<input>")
                .attr("type", field.type)
                .attr("id", field.id);

            form.append(input);
        }

        form.append("<div class='error' id='" + field.id + "Err'></div>");
    });

    var stateBlock = $("<div class='hide' id='stateBlock'>" +
        "<label>State</label>" +
        "<select id='state'>" +
        "<option value=''>Select</option>" +
        "<option>California</option>" +
        "<option>Texas</option>" +
        "</select>" +
        "<div class='error' id='stateErr'></div>" +
        "</div>");

    form.append(stateBlock);
    form.append("<button type='submit'>Register</button>");

    $("#formArea").append(form);

    $("#country").on("change", function () {
        if ($(this).val() === "USA") {
            $("#stateBlock").removeClass("hide");
        } else {
            $("#stateBlock").addClass("hide");
        }
    });

    form.on("submit", function (e) {

        e.preventDefault();
        $(".error").text("");

        var ok = true;

        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var pass = $("#password").val();
        var country = $("#country").val();

        if (name === "") {
            $("#nameErr").text("Please enter your name");
            ok = false;
        }

        var emailCheck = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailCheck)) {
            $("#emailErr").text("Invalid email format");
            ok = false;
        }

        if (pass.length < 6) {
            $("#passwordErr").text("Password must be at least 6 characters");
            ok = false;
        }

        if (country === "Select") {
            $("#countryErr").text("Please select country");
            ok = false;
        }

        if (country === "USA" && $("#state").val() === "") {
            $("#stateErr").text("Please select state");
            ok = false;
        }

        if (ok) {
            alert("Form submitted successfully!");
        }

    });

});