const web1 = document.querySelector("#web1"),
  web2 = document.querySelector("#web2"),
  web3 = document.querySelector("#web3"),
  web4 = document.querySelector("#web4"),
  thumbnail = document.getElementsByClassName("thumbnail"),
  webs = $("#webs");

let sliderAutomatic = setInterval(slider, 3000),
  state = false,
  count = 0;

webs.hover(() => {
  state = !state;
  if (state == true) {
    clearInterval(sliderAutomatic);
  } else {
    sliderAutomatic = setInterval(slider, 3000);
  }
});

function slider() {
  count++;
  selectCard(count);
}

function selectCard(n) {
  if (n == 1) {
    web1.classList.replace("d-block", "d-none");
    web2.classList.replace("d-none", "d-block");
    web3.classList.replace("d-block", "d-none");
    web4.classList.replace("d-block", "d-none");
    document
      .getElementsByClassName("activeBar")[0]
      .classList.remove("activeBar");
    thumbnail[n].classList.add("activeBar");
    count = n;
  }
  if (n == 2) {
    web1.classList.replace("d-block", "d-none");
    web2.classList.replace("d-block", "d-none");
    web3.classList.replace("d-none", "d-block");
    web4.classList.replace("d-block", "d-none");
    document
      .getElementsByClassName("activeBar")[0]
      .classList.remove("activeBar");
    thumbnail[n].classList.add("activeBar");
    count = n;
  }
  if (n == 3) {
    web1.classList.replace("d-block", "d-none");
    web2.classList.replace("d-block", "d-none");
    web3.classList.replace("d-block", "d-none");
    web4.classList.replace("d-none", "d-block");
    document
      .getElementsByClassName("activeBar")[0]
      .classList.remove("activeBar");
    thumbnail[n].classList.add("activeBar");
    count = n;
  }
  if (n == 4) {
    web1.classList.replace("d-none", "d-block");
    web2.classList.replace("d-block", "d-none");
    web3.classList.replace("d-block", "d-none");
    web4.classList.replace("d-block", "d-none");
    document
      .getElementsByClassName("activeBar")[0]
      .classList.remove("activeBar");
    thumbnail[0].classList.add("activeBar");
    count = 0;
  }
}

$("#slide_nav_button").click(function () {
  $("#slide_menu").animate(
    {
      width: "toggle",
      height: "toggle",
    },
    500
  );
});

if (screen.availWidth < 767) {
  $("#slide_menu li").click(function () {
    $("#slide_menu").show();

    $("#slide_menu").animate(
      {
        width: "toggle",
        height: "toggle",
      },
      500
    );
  });
}

$("#FormContact").on("submit", (e) => {
  e.preventDefault();
});

$("#FormBtn").click(() => {
  let nombre = $("#nombre").val(),
    email = $("#email").val(),
    cell = $("#cell").val(),
    msg = $("#msg").val();

  if (nombre == "" || email == "" || cell == "" || msg == "") {
    error = 1;
    $("#error").toggle("slow");
    $("#error").text("Por favor rellene todos los campos");
    $("#FormBtn").attr("disabled", true);
    setTimeout(() => {
      $("#error").toggle("slow");
      $("#FormBtn").attr("disabled", false);
    }, 3000);
  } else {
    $("#FormBtn").attr("disabled", true);
    $("#FormBtn").text("");
    $("#FormBtn").append(
      `<div id="load" class=" spinner-border text-light" role="status"></div>`
    );
    email = {
      nombre,
      email,
      cell,
      msg,
    };

    fetch("https://contacto.manuelp1345.vercel.app/api/contact", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(email),
    })
      .then((x) => x.json())
      .then((r) => {
        if (r.ok != true) {
          $("#error").toggle("slow");
          $("#error").text("Por favor rellene todos los campos. ");
          $("#FormBtn").attr("disabled", true);
          setTimeout(() => {
            $("#error").toggle("slow");
            $("#FormBtn").attr("disabled", false);
          }, 3000);
        } else {
          $("#nice").toggle("slow");
          $("#nice").text(r.msg);
          setTimeout(() => {
            $("#nice").toggle("slow");
          }, 3000);
          $("#nombre").val("");
          $("#email").val("");
          $("#cell").val("");
          $("#msg").val("");
          $("#FormBtn").attr("disabled", false);
          $("#FormBtn").remove("#load");
          $("#FormBtn").text("Enviar");
        }
      });
  }
});

document.querySelector("#year").innerHTML = new Date().getFullYear();
