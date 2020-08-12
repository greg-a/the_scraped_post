$(document).on("click", ".note-btn", function (event) {
    var thisId = $(this).attr("data-id");
    var status = $(this).attr("aria-expanded");

    if ($(this).text() === "Save") {
        var noteT = $("#title-" + thisId).val();
        var noteN = $("#note-" + thisId).val();

        if (noteT && noteN) {
            $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    title: noteT,
                    note: noteN
                }
            })
                .then(function (data) {
                    console.log(data);

                });
            $(".alert-" + thisId).css("display", "none");
        }
        else {
           $(".alert-" + thisId).css("display", "initial");
           return
        }
    }
    else if ($(this).text() === "Notes") {
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            .then(function (data) {
                console.log(data);

                if (data.note) {
                    $("#title-" + thisId).val(data.note.title);
                    $("#note-" + thisId).val(data.note.note);
                }
            });
    }

    if (status === "true") {
        $("#close-btn-" + thisId).css("display", "initial")
        $("#note-btn-" + thisId).text("Save")

    }
    else {
        $("#close-btn-" + thisId).css("display", "none")
        $("#note-btn-" + thisId).text("Notes");
        $(".alert-" + thisId).css("display", "none");

    }

});