import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = localStorage.getItem('videoplayer-current-time') ?? 0;

player.setVolume(0.3);

player.setCurrentTime(currentTime);

const throttleTimeUpdateFunc = throttle(timeUpdateFunc, 1000);
player.on('timeupdate', throttleTimeUpdateFunc);

function timeUpdateFunc(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}
