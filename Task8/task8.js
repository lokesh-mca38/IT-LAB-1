$(function () {

    let books = [];

    $.ajax({
        url: "books.xml",
        method: "GET",
        dataType: "xml",
        success: function (data) {

            $(data).find("book").each(function () {

                let item = {
                    t: $(this).find("title").text(),
                    a: $(this).find("author").text(),
                    g: $(this).find("genre").text(),
                    p: Number($(this).find("price").text()),
                    d: $(this).find("publication_date").text()
                };

                books.push(item);
            });

            fillDropdowns(books);
            showData(books);
        }
    });

    function fillDropdowns(arr) {

        let gSet = new Set();
        let aSet = new Set();

        arr.forEach(b => {
            gSet.add(b.g);
            aSet.add(b.a);
        });

        gSet.forEach(x => {
            $("#genre").append("<option>" + x + "</option>");
        });

        aSet.forEach(x => {
            $("#author").append("<option>" + x + "</option>");
        });
    }

    function showData(arr) {

        let body = $("#table tbody");
        body.html("");

        arr.forEach(b => {

            body.append(
                "<tr>" +
                "<td>" + b.t + "</td>" +
                "<td>" + b.a + "</td>" +
                "<td>" + b.g + "</td>" +
                "<td>" + b.p + "</td>" +
                "<td>" + b.d + "</td>" +
                "</tr>"
            );

        });
    }

    $("#apply").click(function () {

        let gVal = $("#genre").val();
        let aVal = $("#author").val();
        let min = Number($("#min").val()) || 0;
        let max = Number($("#max").val()) || 999999;

        let result = books.filter(b => {

            let okGenre = (gVal === "All" || b.g === gVal);
            let okAuthor = (aVal === "All" || b.a === aVal);
            let okPrice = (b.p >= min && b.p <= max);

            return okGenre && okAuthor && okPrice;
        });

        showData(result);
    });

});