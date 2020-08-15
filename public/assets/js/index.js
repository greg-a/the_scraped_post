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
        $("#close-btn-" + thisId).css("display", "initial");
        $("#note-btn-" + thisId).text("Save");
        $("#title-" + thisId).val("");
        $("#note-" + thisId).val("");
        $(".all-notes").removeClass("show");
        $(".btn-secondary").text("View All Notes");


    }
    else {
        $("#close-btn-" + thisId).css("display", "none");
        $("#note-btn-" + thisId).text("Create New Note");

    }

});

$(document).on("click", ".btn-secondary", function(event){
    var thisId = $(this).attr("data-id");
    var btnText = $(this).text();

    if (btnText === "View All Notes") {
        $(this).text("Close All Notes");
        $(".note-form").removeClass("show");
        $("#note-btn-" + thisId).text("Create New Note");
        $("#close-btn-" + thisId).css("display", "none");
    }
    else {
        $(this).text("View All Notes");
    }
})

$(document).on("click", ".delete-note", function(event) {
    var thisId = $(this).attr("data-id");

    $.ajax({
        type: "GET",
        url: "/delete/" + thisId,
        success: function(response) {
            $("#accordion-" + thisId).remove()
        }
    })
})