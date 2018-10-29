import { isElementVisible } from '../../helper';

let padding = '    ';

describe('** AdsVideoHandler **', () => {
    let dummyVideoElement: HTMLVideoElement;

    beforeEach(() => {
        dummyVideoElement = document.createElement('video');

        spyOnProperty(window, 'pageXOffset').and.returnValue(0);
        spyOnProperty(window, 'innerWidth').and.returnValue(1024);
        spyOnProperty(window, 'pageYOffset').and.returnValue(0);
        spyOnProperty(window, 'innerHeight').and.returnValue(768);

        spyOnProperty(dummyVideoElement, 'offsetWidth').and.returnValue(600);
        spyOnProperty(dummyVideoElement, 'offsetHeight').and.returnValue(350);
       
        spyOn(console, "log");
    });

    it(`${padding}When ads video in the accepted viewport of the window (at least 50% in)`, () => {

        spyOnProperty(dummyVideoElement, 'offsetLeft').and.returnValue(10);
        spyOnProperty(dummyVideoElement, 'offsetTop').and.returnValue(10);

        let result = isElementVisible(dummyVideoElement);
        expect(result).toBeTruthy();
    });


    it(`${padding}When ads video in the accepted viewport of the window (at least 50% in)`, () => {

        spyOnProperty(dummyVideoElement, 'offsetLeft').and.returnValue(1000);
        spyOnProperty(dummyVideoElement, 'offsetTop').and.returnValue(1000);
        console.log('dummyVideoElement.offsetWidth ', dummyVideoElement.offsetWidth);

        let result = isElementVisible(dummyVideoElement);
        expect(result).toBeFalsy();
    });



});