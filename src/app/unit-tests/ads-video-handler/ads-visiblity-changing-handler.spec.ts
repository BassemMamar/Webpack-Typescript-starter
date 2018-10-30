import { AdsState } from '../../ads-state';
import AdsVideoHandler from '../../ads-video-handler';
let padding = '    ';

describe('** adsVisiblityChangingHandler **', () => {
    let lib: AdsVideoHandler;
  
    beforeEach(() => {

        let dummyVideoElement = document.createElement('video');
        spyOn(document, 'getElementById').and.returnValue(dummyVideoElement);
        spyOn(console, "log");
        spyOn(console, "error");
    });

    describe(`${padding}When the window scroll/size changes and adsVisiblityChangingHandler method gets fired:`, () => {
        let isAdsVideoVisibleSpa;

        beforeEach(() => {
            lib = new AdsVideoHandler('my-ads-video');
        });

        it(`${padding}should call isAdsVideoVisible method`, () => {
            isAdsVideoVisibleSpa = spyOn(lib, 'isAdsVideoVisible');
            lib.adsVisiblityChangingHandler();
            expect(isAdsVideoVisibleSpa).toHaveBeenCalled();
        });

        describe(`${padding}And when ads video in the accepted viewport of the window (at least 50% in)`, () => {
            let PlayAdsVideoSpa;
            let continuesPlayingTimeMonatorSpa;

            beforeEach(() => {
                isAdsVideoVisibleSpa = spyOn(lib, 'isAdsVideoVisible')
                    .and.returnValue(true);
                // PlayAdsVideoSpa = spyOn(lib, 'PlayAdsVideo')
                //     .and.returnValue(Promise.resolve());
                continuesPlayingTimeMonatorSpa = spyOn(lib, 'continuesPlayingTimeMonator')
            });

            it(`${padding}And when the video is Pausing, then should play the ads video`, (done) => {
                PlayAdsVideoSpa = spyOn(lib, 'PlayAdsVideo')
                .and.returnValue(Promise.resolve());

                lib.state = AdsState.Ready;
                expect(lib.video.ontimeupdate).toBe(null);
                expect(lib.video.onended).toBe(null);

                lib.adsVisiblityChangingHandler()
                    .then(() => {
                        expect(AdsState[lib.state]).toBe(AdsState[AdsState.Started]);
                        expect(lib.video.ontimeupdate).not.toBe(null);
                        expect(lib.video.onended).not.toBe(null);
                        expect(continuesPlayingTimeMonatorSpa).toHaveBeenCalled();
                        done();
                    });

                expect(isAdsVideoVisibleSpa).toHaveBeenCalled();
                expect(PlayAdsVideoSpa).toHaveBeenCalled();

            });

            it(`${padding}And when the video is Pausing, and playing promise rejected, then should print an ERROR message into the console`, (done) => {
                PlayAdsVideoSpa = spyOn(lib, 'PlayAdsVideo')
                .and.returnValue(Promise.reject({}));

                lib.state = AdsState.Ready;
                expect(lib.video.ontimeupdate).toBe(null);
                expect(lib.video.onended).toBe(null);

                lib.adsVisiblityChangingHandler()
                    .then(() => {
                        expect(AdsState[lib.state]).not.toBe(AdsState[AdsState.Started]);
                        expect(lib.video.ontimeupdate).toBe(null);
                        expect(lib.video.onended).toBe(null);
                        expect(continuesPlayingTimeMonatorSpa).not.toHaveBeenCalled();
                        expect(console.error).toHaveBeenCalled();
                        done();
                    });

                expect(isAdsVideoVisibleSpa).toHaveBeenCalled();
                expect(PlayAdsVideoSpa).toHaveBeenCalled();

            });

            it(`${padding}And when the video is Playing, then should NOT re-play the ads video again`, (done) => {
                 PlayAdsVideoSpa = spyOn(lib, 'PlayAdsVideo')
                    .and.returnValue(Promise.resolve());

                lib.state = AdsState.Passed50;
                lib.adsVisiblityChangingHandler()
                    .then(() => {
                        expect(AdsState[lib.state]).not.toBe(AdsState[AdsState.Started]);
                        expect(continuesPlayingTimeMonatorSpa).not.toHaveBeenCalled();
                        done();
                    });

                expect(isAdsVideoVisibleSpa).toHaveBeenCalled();
            });
        });

        describe(`${padding}And when ads video NOT in the accepted viewport of the window (less then 50%)`, () => {
            let cancelMonatorTimerSpa;

            beforeEach(() => {
                isAdsVideoVisibleSpa = spyOn(lib, 'isAdsVideoVisible')
                    .and.returnValue(false);
                cancelMonatorTimerSpa = spyOn(lib, 'cancelMonatorTimer')
            });

            it(`${padding}And when the video is Playing, then should Pause the ads video`, (done) => {
                lib.state = AdsState.Started;

                lib.adsVisiblityChangingHandler()
                    .then(() => {
                        expect(AdsState[lib.state]).not.toBe(AdsState[AdsState.Started]);
                        expect(lib.state.toString()).toBe(AdsState.Paused.toString());
                        expect(cancelMonatorTimerSpa).toHaveBeenCalled();
                        done();
                    });
                expect(isAdsVideoVisibleSpa).toHaveBeenCalled();
            });

            it(`${padding}And when the video is Pausing, then should NOT re-Pause the ads video agian`, (done) => {
                lib.state = AdsState.Paused;

                lib.adsVisiblityChangingHandler()
                    .then(() => {
                        expect(AdsState[lib.state]).not.toBe(AdsState[AdsState.Started]);
                        expect(AdsState[lib.state]).toBe(AdsState[AdsState.Paused]);
                        expect(cancelMonatorTimerSpa).not.toHaveBeenCalled();
                        done();
                    });

                expect(isAdsVideoVisibleSpa).toHaveBeenCalled();
            });
        });
    });
});