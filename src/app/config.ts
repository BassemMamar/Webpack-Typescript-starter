interface AdsVideoConfig {
    fraction: number;
    continuousTime: number;
    autoplay: boolean;
}

const DefaultConfig = {
    fraction: 0.5,
    continuousTime: 2,
    autoplay: false
}

export { AdsVideoConfig, DefaultConfig };