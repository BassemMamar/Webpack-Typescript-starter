import { AdsState } from "./ads-state";
import { isElementVisible, videoPlayingHandler } from "./helper";
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
  continuesPlayingTimerReference: any;

  /**
   * The total continues time for the ads video to keep playing
   * so that we get notified after it finish.
   * Measured as second
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
   * 
   * @param config The ads video config 
   */
  init(config: AdsVideoConfig): void {
    // the default state for the ads video is ready
    this.state = AdsState.Ready;
    this.continuesPlayingTimerReference = null;

    this.continuousTime = config.continuousTime;
    this.fraction = config.fraction;
    this.video.autoplay = config.autoplay;
    this.video.muted = true;

    window.addEventListener('scroll', this.adsVisiblityChangingHandler.bind(this));
    window.addEventListener('resize', this.adsVisiblityChangingHandler.bind(this));
  }

  /**
   * This method get's fired when the window's scroll/size changes.
   * Each time will check if ads video become visible 
   * in the viewport of the browser (at least 50% in our case)
   * If the ads video is visible then play the ads, otherwise pause the ads.
   */
  adsVisiblityChangingHandler(): Promise<void> {
    if (this.isAdsVideoVisible(this.video, this.fraction)) {

      // state < AdsState.Started means the state either Ready or Paused
      if (this.state === AdsState.Ready || this.state === AdsState.Paused || this.state === AdsState.Finished) {

        // start playing the ads video
        // Here dealing with video play as Promise meaning the code inside the then() will not execute until the media is playing.
        return this.PlayAdsVideo(this.video).then(() => {
          console.log('Video progress has been started.');

          // set current ads video state to staerted
          this.state = AdsState.Started;

          // register ontimeupdate event handler to be able to follow the progress
          this.video.ontimeupdate = this.ontimeupdateEventHandler.bind(this);

          // register onended event handler to be able to know the ads viceo finished
          this.video.onended = this.onendedEventHandler.bind(this);

          // start monatoring the continues playing time for the ads video
          this.continuesPlayingTimeMonator();

        }).catch((error) => {
          /**
           * Automatic playback failed.
           * The video play promise rejected because of the browser policy
           * for example Chrome new policy:
           *    - Autoplay with sound is allowed if:
           *      - User has interacted with the domain (click, tap, etc.).
           *      - On desktop, the user's Media Engagement Index threshold has been crossed, meaning the user has previously play video with sound.
           *      - On mobile, the user has [added the site to their home screen].
           * 
           * ToDo What's the requirment to handle this case? for now i am printing to the console.
           */
          console.error(`YOC- Could't play the ads video due the browser policy. Try to interact with the document first`);
        });
      }
    }
    else {
      if (this.state !== AdsState.Paused) {
        // safely pause playing the ads video
        this.video.pause();
        this.state = AdsState.Paused;

        // Cancel the timer monator in case the ads video gets paused before 2 continues seconds
        this.cancelMonatorTimer();
      }
    }
    return Promise.resolve();
  }
  PlayAdsVideo(video: HTMLVideoElement): any {
    return videoPlayingHandler(video);
  }

  isAdsVideoVisible(video: HTMLVideoElement, fraction?: number): any {
    return isElementVisible(video, fraction);
  }

  /**
   * This function follow the ads video's progress and calculate the progress percentage
   */
  ontimeupdateEventHandler(): void {
    if (this.state === AdsState.Paused) {
      return;
    }
    // calculate passed time percentage 
    let currentPercentage = this.video.currentTime / this.video.duration * 100;
    this.checkTimeProgressPercentageChanges(currentPercentage);
  }

  /**
   * Update the state acourding to current progress percentage 
   * print to the browser console when the ads video passed 25%, 50% and 75%
   * 
   * @param currentPercentage Value range between 0 - 100
   */
  checkTimeProgressPercentageChanges(currentPercentage: number) {
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
   * Get fired when the ads video finish.
   * print to the browser console when the ads video finish
   */
  onendedEventHandler(): void {
    console.log('Video progress has Passed 100%.');
    this.state = AdsState.Finished;
  }

  /**
   * This function monator the continues time the ads video kept playing
   * and execute a callback function which is print to the browser console in our case     
   */
  continuesPlayingTimeMonator(): void {
    this.continuesPlayingTimerReference = setTimeout(() => {
      console.log(`The ad is in the viewport of the browser for at least 50% and ${this.continuousTime} continuous seconds.`);
      // this.cancelMonatorTimer();
    }, this.continuousTime * 1000);
  }

  /**
   * Cancel continues playing time monator
   */
  cancelMonatorTimer(): void {
    clearTimeout(this.continuesPlayingTimerReference);
  }
}
