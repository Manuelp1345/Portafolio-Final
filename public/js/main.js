$(document).ready(function() {
    if ($("body,html").scrollTop != 0) {
        $("body,html").animate({
            scrollTop: 0
        }, 1000, 'swing');

    }

    let port = $("#port").offset().top,
        skills = $("#skilss").offset().top,
        contacto = $("#contacto").offset().top;


    $("#portafolio").on("click", (e) => {
        e.preventDefault()
        $("body,html").animate({
            scrollTop: port - 130
        }, 1000, 'swing');
    })
    $("#skill").on("click", (e) => {
        e.preventDefault()
        $("body,html").animate({
            scrollTop: skills - 50
        }, 1000, 'swing');
    })
    $("#contact").on("click", (e) => {
        e.preventDefault()
        $("body,html").animate({
            scrollTop: contacto - 80
        }, 1000, 'swing');
    })
    $("#inicio").on("click", (e) => {
        e.preventDefault()
        $("body,html").animate({
            scrollTop: 0
        }, 1000, 'swing');
    })

    window.onresize = () => {
        port = $("#port").offset().top,
            skills = $("#skilss").offset().top,
            contacto = $("#contacto").offset().top;

    }



    tippy('#html', {
        content: 'HTML5',
        arrow: true,
        animation: 'fade',
        inertia: true,
        placement: 'right',
    });
    tippy('#CSS', {
        content: 'CSS',
        arrow: true,
        animation: 'fade',
        inertia: true,
        placement: 'right',
    });
    tippy('#JavaScript', {
        content: 'JavaScript',
        arrow: true,
        animation: 'fade',
        inertia: true,
        placement: 'right',
    });
    tippy('#Jquery', {
        content: 'Jquery',
        arrow: true,
        animation: 'fade',
        inertia: true,
        placement: 'right',
    });
    tippy('#node', {
        content: 'Node.js/Express',
        arrow: true,
        animation: 'fade',
        inertia: true,
        placement: 'right',
    });
    tippy('#BootsTrap', {
        content: 'BootsTrap',
        arrow: true,
        animation: 'fade',
        inertia: true,
        placement: 'right',
    });

    $("#slide_nav_button").click(function() {
        $('#slide_menu').animate({
            width: 'toggle',
            height: "toggle"
        }, 500);
    });

    if (screen.availWidth < 767) {
        $('#slide_menu li').click(function() {
            $('#slide_menu').animate({
                width: 'toggle',
                height: "toggle"
            }, 500);

        });
    }

    $("#FormContact").on("submit", (e) => {
        e.preventDefault()
    })

    $("#FormBtn").click(() => {
        let nombre = $("#nombre").val(),
            email = $("#email").val(),
            cell = $("#cell").val(),
            msg = $("#msg").val()

        if ((nombre == "") || (email == "") || (cell == "") || (msg == "")) {
            error = 1
            $("#error").toggle("slow")
            $("#error").text("Por favor rellene todos los campos")
            $("#FormBtn").attr("disabled", true)
            setTimeout(() => {
                $("#error").toggle("slow")
                $("#FormBtn").attr("disabled", false)
            }, 3000);

        } else {
            $("#FormBtn").attr("disabled", true)
            $("#FormBtn").text("")
            $("#FormBtn").append(`<div id="load" class=" spinner-border text-light" role="status"></div>`)
            email = {
                nombre,
                email,
                cell,
                msg
            }

            fetch("https://contacto.manuelp1345.vercel.app/api/contact", {
                    method: 'POST',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "*/*",
                    },
                    body: JSON.stringify(email)

                }).then(x => x.json())
                .then(r => {
                    if (r.ok != true) {
                        $("#error").toggle("slow")
                        $("#error").text("Por favor rellene todos los campos. ")
                        $("#FormBtn").attr("disabled", true)
                        setTimeout(() => {
                            $("#error").toggle("slow")
                            $("#FormBtn").attr("disabled", false)
                        }, 3000);
                    } else {
                        $("#nice").toggle("slow")
                        $("#nice").text(r.msg)
                        setTimeout(() => {
                            $("#nice").toggle("slow")
                        }, 3000);
                        $("#nombre").val("")
                        $("#email").val("")
                        $("#cell").val("")
                        $("#msg").val("")
                        $("#FormBtn").attr("disabled", false)
                        $("#FormBtn").remove("#load")
                        $("#FormBtn").text("Enviar")
                    }
                })
        }

    })

});