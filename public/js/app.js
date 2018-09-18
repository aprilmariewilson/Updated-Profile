
var aside = $(".aside");
PerfectScrollbar = ('perfect-scrollbar');

function showDiv() {
    switch (event.target.id) {

        case "about":
            aside.empty();
            aside.load("/about");
            break;

        case "resume":
            aside.empty();
            aside.load("/resume");
            break;

        case "works":
            aside.empty();
            aside.load("/works");
            break;

        case "contact":
            aside.empty();
            aside.load("/contact");
          
    }
}


$("document").ready(function () {

// mouseover
// var bee = document.getElementById("bee");
// document.addEventListener("mousemove", getMouse); 


// bee.style.position = "absolute"; //css		
// var beepos = {x:0, y:0};

// setInterval(followMouse, 50);

// var mouse = {x:0, y:0}; //mouse.x, mouse.y

// var dir = "right";
// function getMouse(e){
//     mouse.x = e.pageX -125;
//     mouse.y = e.pageY -85;
// //Checking directional change
// if(mouse.x > beepos.x){
//   dir = "right";
// } else {
//   dir = "left";
// }
// }

// function followMouse(){
//     //1. find distance X , distance Y
//     var distX = mouse.x - beepos.x;
//     var distY = mouse.y - beepos.y;
//     //Easing motion
// //Progressive reduction of distance 
//     beepos.x += distX/5;
//     beepos.y += distY/2;
    
//     bee.style.left = beepos.x + "px";
//     bee.style.top = beepos.y + "px";


// //Apply css class 
// if (dir == "right"){
//   bee.setAttribute("class", "right");
// } else {
//   bee.setAttribute("class", "left");        
// }
    
// }
    // scroll bar
    var width = $(window).width();	

    if(width > 300) {
        $('.card-inner .card-wrap').slimScroll({
            height: '637px', 
            color: '#D1CB7A',
            distance: '2px',
            railVisible: true,
            railColor: '#626262',
            railOpacity: 0.3,
            wheelStep: 10,
            allowPageScroll: false,
            disableFadeOut: false     
        });
    }

    // contact page js

    $(".submit").on("click", function (event) {
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


}); //page load