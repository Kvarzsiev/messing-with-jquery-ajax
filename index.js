let authorization;

$(document).ready(function() {
  authenticate();
});

function authenticate() {
  $.post({
    url: "https://apitesteucs.azurewebsites.net/API/Autenticar",
    data: {
      chaveAPI: "8175f301022f475daa5e6098c532a2aa",
    },
    success: function(result) {
      authorization = result;
      loadImages();
    },
  });
}

function loadImages() {
  // Render the images dynamically
  for (var i = 0; i < 5; i++) {
    $.post({
      url: "https://apitesteucs.azurewebsites.net/API/ObterImagem",
      headers: {
        authUCSJWT: authorization,
      },
      success: function(result) {
        console.log("image: ", result);
        var img = new Image(window.innerWidth * 0.5);

        img.src = "data:image/png;base64," + result;

        img.onload = function() {
          var container = document.getElementById("imageContainer");
          container.appendChild(img);
        };
      },
    });
  }
}

$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    loadImages();
  }
});
