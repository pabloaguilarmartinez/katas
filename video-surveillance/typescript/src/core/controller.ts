export interface MotionSensor {
    isDetectingMotion(): boolean;
}

export interface VideoRecorder {
    startRecording(): void;

    stopRecording(): void;
}

export class SurveillanceController {
    constructor(private sensor: MotionSensor, private recorder: VideoRecorder) {
    }

    recordMotion(numberOfSeconds = 1) {
        this.range(numberOfSeconds).forEach(() => {
            this.tryRecordMotion();
            this.waitOneSecond();
        });
    }

    private tryRecordMotion() {
        try {
            this.sensor.isDetectingMotion() ? this.recorder.startRecording() : this.recorder.stopRecording();
        } catch (e) {
            this.recorder.stopRecording();
        }
    }

    private range(length: number) {
        return Array.from({length}, (_, i) => i);
    }

    private waitOneSecond() {
        const aSecond = 1000;
        let startTime = new Date().getTime();
        const endTime = startTime + aSecond;
        while (startTime < endTime) {
            startTime = new Date().getTime();
        }
    }
}
