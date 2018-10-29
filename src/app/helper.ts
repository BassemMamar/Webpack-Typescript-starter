import { DefaultConfig } from "./config";

/**
 * An equivalent is being applied to determine weither the html element is 
 * visible in the viewport or not.
 * First we calculate visiblity in both X and Y Axes
 * then calculate the total visiblity by divide the avilable space of the element 
 * on the full space of the element and compare the result with the fraction ratio.
 * check here for more information
 * https://stackoverflow.com/a/22831887/3635406
 * 
 * @param element Html element to check it's viewport acourding to the browser
 * @param fraction Percentage of the element to be visible in the viewport
 */
let isElementVisible = (element: HTMLElement, fraction: number = DefaultConfig.fraction): boolean => {
    let x = getX(element),
        y = getY(element),
        elementWidth = element.offsetWidth,
        elementHeight = element.offsetHeight,
        r = x + elementWidth, //right
        b = y + elementHeight, //bottom
        visibleX, visibleY, visible;

    visibleX = Math.max(0, Math.min(elementWidth, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    visibleY = Math.max(0, Math.min(elementHeight, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
    visible = visibleX * visibleY / (elementWidth * elementHeight);
    
    return visible >= fraction;
}

/**
 * recurtion funtion to sum element offsetLeft with it's parents values 
 * @param element  Html element to calculate it's offsetLeft
 */
let getX = (element: HTMLElement) => {
    if (element == null)
        return 0;

    let elementX = element.offsetLeft;
    if (elementX === 0) {
        return 0;
    }
    
    let elementParentX = element.parentElement ? element.parentElement.offsetLeft : 0;
    if (elementX !== elementParentX) {
        return elementX + getX(element.parentElement);
    }

    if (elementX === elementParentX) {
        return getX(element.parentElement);
    }
}

/**
 * recurtion funtion to sum element offsetTop with it's parents values 
 * @param element  Html element to calculate it's offsetTop
 */
let getY = (element: HTMLElement) => {
    if (element == null)
        return 0;

    let elementY = element.offsetTop;
    if (elementY === 0) {
        return 0;
    }
    let elementParentY = element.parentElement ? element.parentElement.offsetTop : 0;
    if (elementY !== elementParentY) {
        return elementY + getY(element.parentElement);
    }

    if (elementY === elementParentY) {
        return getY(element.parentElement);
    }
}


/**
 * The Key Point: Don't ever assume a video will play. 
 * this method encapsolate partially promise returned when play a video in different browsers
 * so that the caller just assume it always return a promise
 * for more information chenk the links below:
 * https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
 * https://developers.google.com/web/updates/2016/03/play-returns-promise
 * 
 * @param video The video element reference
 */
let videoPlayingHandler = (video: HTMLVideoElement): Promise<void> => {
    let playPromise = video.play();

    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
        return playPromise;
    }
    else {
        return Promise.resolve();
    }
}

export { isElementVisible, videoPlayingHandler }