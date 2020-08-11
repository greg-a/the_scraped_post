$(document).on("click", ".note-btn", function (event) {
    var thisId = $(this).attr("data-id");
    var status = $(this).attr("aria-expanded");

    if (status === "true") {
        var closeBtn = $("<button>").attr("class", "btn btn-primary note-btn btn-danger").attr("type", "button").attr("data-toggle", "collapse").attr("data-target", ".multi-collaps" + thisId).attr("aria-controls", "multiCollapseExample1-" + thisId + " multiCollapseExample2-" + thisId).attr("aria-expanded", "true").text("Close")

        $("#close-" + thisId).append(closeBtn)
        $(this).text("Save")

    }
    else {
        $("#close-" + thisId).empty();
        $(this).text("Notes");


        // $.ajax({
        //     method: "POST",
        //     url: "/articles" + thisId,
        //     data: {
        //         title: $("#title-" + thisId).val(),
        //         body: $("#note-" + thisId).val()
        //     }
        // })
        // .then(function(data){
        //     console.log(data);

        // })
    }
})