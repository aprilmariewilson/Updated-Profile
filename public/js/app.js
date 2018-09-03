
var container = $("#mnsry_container"),
    filterButton = $(".button"),
    loadingMessage = $("#loading_msg");
aside = $(".aside");
params = {
    itemSelector: ".item",
    filtersGroupSelector: ".filters"
};
PerfectScrollbar = ('perfect-scrollbar');

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


$("document").ready(function () {

    // scroll bar
    var width = $(window).width();	
    if(width > 1024) {
        $('.card-inner .card-wrap').slimScroll({
            height: '625px'
        });
    };
    if((width < 1024) & $('#home-card').length) { 
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top - 76 <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
				}
			});
		});
	}

    // contact page js

    $("#submit").on("click", function (event) {
        event.preventDefault();

        //create new user
        var userData = {
            "name": $("#exampleInputName").val().trim(),
            "email": $("#exampleInputEmail1").val().trim(),
            "phoneNumber": $("#exampleInputPhoneNumber1").val().trim(),
            "message": $("#exampleTextarea").val().trim(),
        };
        $.post("/api/users", userData)
            .then(function () {
                $(".form-control").val('');
                event.preventDefault();
                jQuery.noConflict();
                $('#myModal').modal('show').fadeIn('slow');
            });

    });

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