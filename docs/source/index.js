import style from './style.css';

var $text = document.querySelector('#text');
var $pika = document.querySelector('#pikachizer');
var $button = document.querySelector('#button');

$button.onclick = function pikachize () {
  $pika.textContent = Pikachizer.translate($text.value);
}
