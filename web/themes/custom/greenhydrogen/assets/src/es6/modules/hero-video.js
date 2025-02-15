import debounce from '../utils/debounce';

class HeroVideo {
  constructor(context, settings, $, Drupal) {
    // Values from Drupal
    this.context          = context;
    this.settings         = settings;
    this.$                = $;
    this.Drupal           = Drupal;
    this.$window          = this.$(window);
    this.mobileBreakpoint = 1024;
    this.speed            = 300;
    this.$document        = this.$(document);

    this.$jsYoutubePlayer = $('#js-player');
    this.$videoWrapper    = $('.js-video-container');
    this.$window          = $(window);
    this.videoID          = this.$videoWrapper.data('youtube-id');

    if (this.$jsYoutubePlayer.length) {
      // Create script tag.
      const tag = document.createElement('script');
      tag.src   = 'https://www.youtube.com/iframe_api';

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      console.log(window.location.origin, 'origin');
      // Callback function for YouTube iframe API at window level.
      window.onYouTubeIframeAPIReady = () => {
        window.player = new YT.Player('js-player', {
          videoId: this.videoID,
          playerVars: {
            modestbranding: 1,
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            wmode: 'transparent',
            branding: 0,
            loop: 1,
            rel: 0,
            autohide: 0,
            origin: window.location.origin
          },
          events: {
            'onReady': HeroVideo.onPlayerReady,
            'onStateChange': HeroVideo.onPlayerStateChange
          }
        });
      };

      this.$(window).on('keydown', (e) => {
        if (e.which === 27) {
          this.pauseOnEsc();
        }
      });
    }
  }

  // Handle player ready, start video.
  static onPlayerReady(event) {
    event.target.playVideo();
  }

  // Handle player state change.
  static onPlayerStateChange(event) {
    const player = event.target;

    if (event.data === 1) {
      const remains = player.getDuration() - player.getCurrentTime();

      // Video is playing.
      var videoBackground = document.getElementsByClassName('js-banner-image');
      videoBackground[0].classList.add('is-hidden');

      if (window.rewindTO) {
        clearTimeout(window.rewindTO);
      }

      window.rewindTO = setTimeout(function () {
        player.seekTo(0);
      }, (remains - 0.1) * 1000);
    }
  }
}

export default HeroVideo;
