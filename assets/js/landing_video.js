    // Get the image element
    var image = document.getElementById('image');
    // var aboutus = document.getElementById('aboutus');
    // var namegame = document.getElementById('namegame');

    // Check if the device is a mobile or desktop
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      // If the device is a mobile, show the mobile image
      image.src = 'assets/img/LANDING_VIDEO_MOBILE.mp4';
      // aboutus.src = 'assets/img/about_us_mobile.png';
      // namegame.src = 'assets/img/name_game_mobile.png';
    } else {
      // If the device is a desktop, show the desktop image
      image.src = 'assets/img/LANDING_VIDEO_3.mp4';
      // aboutus.src = 'assets/img/about_us.svg';
      // namegame.src = 'assets/img/name_game.svg';
    }
