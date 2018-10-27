import '../styles.scss';
import AdsVideoHandler from './ads-video-handler';

window.addEventListener('load', () => {
    console.log('document has been loaded successfully!');

    /**
     *  config is optional.
     *  if not passed then the default configuration will applied
     */
    let config = {
        fraction: 0.5,
        continuousTime: 2,
        autoplay: false
    };
    let handler = new AdsVideoHandler('my-ads-video', config);
});