let authorization;

$(document).ready(function () {
  authenticate();
});

function authenticate() {
  $.post({
    url: "api_url/Autenticar",
    data: {
      chaveAPI: "key",
    },
    success: function (result) {
      authorization = result;
      loadImages();
    },
  });
}

function loadImages() {
  // Render the images dynamically
  for (var i = 0; i < 5; i++) {
    $.post({
      url: "api_url/ObterImagem",
      headers: {
        authUCSJWT: authorization,
      },
      success: function (result) {
        console.log("image: ", result);
        var img = new Image(window.innerWidth * 0.3);

        img.src = "data:image/png;base64," + result;

        img.onload = function () {
          var container = document.getElementById("imageContainer");
          container.appendChild(img);
        };

        console.log("result: ", result);
      },
    });
  }
}

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    loadImages();
  }
});
