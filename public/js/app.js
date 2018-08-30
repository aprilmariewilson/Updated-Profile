
var container = $("#mnsry_container"),
    filterButton = $(".button"),
    loadingMessage = $("#loading_msg");
aside = $(".aside");
params = {
    itemSelector: ".item",
    filtersGroupSelector: ".filters"
};

function showDiv() {
    switch (event.target.id) {

        case "about":
            aside.empty();
            aside.load("http://localhost:8000/about");
            break;

        case "resume":
            aside.empty();
            aside.load("http://localhost:8000/resume");
            break;

        case "works":
            aside.empty();
            aside.load("http://localhost:8000/works");
            break;

        case "contact":
            aside.empty();
            aside.load("http://localhost:8000/contact");
    }
};
$("#submit").on ("click",function(event){
event.preventDefault();

//create new user
var userData = {
            "name": $("#exampleInputName").val().trim(),
            "email": $("#exampleInputEmail1").val().trim(),
            "phoneNumber": $("#exampleInputPhoneNumber1").val().trim(),
            "message": $("#exampleTextarea").val().trim(),
        };
        $.post("/api/users", userData)
                .then(function (results) {
                    console.log(results);
                    $(".form-control").val('');
                    $('#myModal').modal({
                        keyboard: false
                      })
                });
       
});

$("document").ready(function () {

    // works page animation

    container.multipleFilterMasonry(params);
    // Show articles with fadein                                                                                                                                                                                                                                                                                                                                                                                                            vj
    container.find("article").animate(
        {
            opacity: 1
        },
        1200
    );

    loadingMessage.fadeOut();
    // Change the filtering button(label) status
    filterButton.find("input").change(function () {

        $(this)
            .parent()
            .toggleClass("active");
    });


}); //page load