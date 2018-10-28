import { AdsState } from "./ads-state";
import { isElementVisible } from "./helper";
import { AdsVideoConfig, DefaultConfig } from "./config";

export default class AdsVideoHandler {

  /**
   * The ads video element reference
   */
  video: HTMLVideoElement;

  /**
   * The ads video state during it's lifecycle
   * The value can be 
   * Ready, Paused, Started, Passed25, Passed50, Passed75 and Finished 
   */
  state: AdsState;

  /**
   * The reference for the continuous time recording timer
   * required to be able to clear timer registeration if the ads video paused 
   * before the continues time finished
   */
  continuesPlayingTimerReference: NodeJS.Timeout;

  /**
   * the total continues time for the ads video to keep playing
   * so that we get notified after it finish
   */
  continuousTime: number;

  /**
   * The percentage of the ads video in the viewport of the browser to be activated
   * value is a number between 0 and 1
   */
  fraction: number;

  constructor(private videoId: string, config: AdsVideoConfig = DefaultConfig) {
    this.video = <HTMLVideoElement>document.getElementById(videoId);
    if (this.video == null) {
      throw new Error(`Can't find video element with id ${videoId}.`);
    }
    this.init(config);
  }

  /**
   * initialize properties with default value
   * register window event listeners for both scroll and resize
   */
  init(config: AdsVideoConfig): void {
    // the default state for the ads video is ready
    this.state = AdsState.Ready;
    this.continuesPlayingTimerReference = null;

    this.continuousTime = config.continuousTime;
    this.fraction = config.fraction;
    this.video.autoplay = config.autoplay;

    window.addEventListener('scroll', this.adsVisiblityChangingHandler.bind(this));
    window.addEventListener('resize', this.adsVisiblityChangingHandler.bind(this));
  }

  /**
   * This method get's fired when the window's scroll/size changes.
   * Each time will check if ads video become visible 
   * in the viewport of the browser (at least 50% in our case)
   * If the ads video is visible then play the ads, otherwise pause the ads.
   */
  adsVisiblityChangingHandler(): void {
    if (isElementVisible(this.video, this.fraction)) {

      // state < AdsState.Started means the state either Ready or Paused
      if (this.video.paused || this.state < AdsState.Started) {

        // start playing the ads video
        this.video.play();
        this.state = AdsState.Started;
        console.log('Video progress has been started.');

        // register ontimeupdate event handler to be able to follow the progress
        this.video.ontimeupdate = this.ontimeupdateEventHandler.bind(this);

        // register onended event handler to be able to know the ads viceo finished
        this.video.onended = this.onendedEventHandler.bind(this);

        // start monatoring the continues playing time for the ads video
        this.continuesPlayingTimeMonator();
      }
    }
    else {
      if (!this.video.paused) {
        // pause playing the ads video
        this.video.pause();
        this.state = AdsState.Paused;

        // Cancel the timer monator in case the ads video gets paused before 2 continues seconds
        this.cancelMonatorTimer();
      }
    }
  }

  /**
   * This function follow the ads video's progress so that 
   * print to the browser console when the ads video passed 25%, 50% and 75%
   */
  ontimeupdateEventHandler(): void {
    if (this.state === AdsState.Paused)
      return;

    // calculate passed time percentage 
    let currentPercentage = this.video.currentTime / this.video.duration * 100;
    switch (true) {
      case (currentPercentage >= 75 && currentPercentage < 100 && this.state !== AdsState.Passed75):
        this.state = AdsState.Passed75;
        console.log('Video progress has Passed 75%.');
        break;
      case (currentPercentage >= 50 && currentPercentage < 75 && this.state !== AdsState.Passed50):
        this.state = AdsState.Passed50;
        console.log('Video progress has Passed 50%.');
        break;
      case (currentPercentage >= 25 && currentPercentage < 50 && this.state !== AdsState.Passed25):
        this.state = AdsState.Passed25;
        console.log('Video progress has Passed 25%.');
        break;
    }
  }

  /**
  * print to the browser console when the ads video finish
  */
  onendedEventHandler(): void {
    console.log('Video progress has been ended.');
  }

  /**
   * This function monator the continues time the ads video kept playing
   * and execute a callback function which is print to the browser console in our case     
   */
  continuesPlayingTimeMonator(): void {
    this.continuesPlayingTimerReference = setTimeout(() => {
      console.log(`The ad is in the viewport of the browser for at least 50% and ${this.continuousTime} continuous seconds.`);
      this.cancelMonatorTimer();
    }, this.continuousTime * 1000);
  }

  /**
   * Cancel continues playing time monator
   */
  cancelMonatorTimer(): void {
    clearTimeout(this.continuesPlayingTimerReference);
  }
}
