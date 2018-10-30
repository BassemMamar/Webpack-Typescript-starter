import { AdsState } from '../../ads-state';
import AdsVideoHandler from '../../ads-video-handler';

let padding ='    ';

describe('** init **', () => {
    let lib: AdsVideoHandler;
    beforeEach(() => {
        let dummyVideoElement = document.createElement('video');
        spyOn(document, 'getElementById').and.returnValue(dummyVideoElement);
         spyOn(console, "log");
    });

    describe(`${padding}When AdsVideoHandler new instance created`, () => {
        let addEventListenerSpa;

        beforeEach(() => {

            addEventListenerSpa = spyOn(window, 'addEventListener');
            lib = new AdsVideoHandler('my-ads-video');
        });

        it(`${padding}should have state equal Ready`, () => {
            expect(lib.state).toEqual(AdsState.Ready);
        });

        it(`${padding}should have continuousTime value equal 2`, () => {
            expect(lib.continuousTime).toEqual(2);
        });

        it(`${padding}should have video autoplay value equal false`, () => {
            expect(lib.video.autoplay).toEqual(false);
        });

        it(`${padding}should call window.addEventListener two times`, () => {
            expect(addEventListenerSpa.calls.count()).toEqual(2);
        });

        it(`${padding}should have window event Listener registered for scroll`, () => {
            expect(addEventListenerSpa.calls.argsFor(0)[0]).toEqual('scroll');
        });

        it(`${padding}should have window event Listener registered for resize`, () => {
            expect(addEventListenerSpa.calls.argsFor(1)[0]).toEqual('resize');
        });

    });
});