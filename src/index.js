import VanillaTilt from 'vanilla-tilt';
import initSr from './js/sr';
import './style/main.scss';

$('a[href^="#"]').on('click', function(event) {
  var target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    $('html, body')
      .stop()
      .animate({ scrollTop: target.offset().top }, 1000);
  }
});

initSr();

VanillaTilt.init(document.querySelectorAll('.project-wrapper__image a div'), { max: 3 });
