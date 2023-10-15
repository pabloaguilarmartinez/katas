import { MotionSensor, SurveillanceController, VideoRecorder } from '../core/controller';

describe('The Surveillance Controller', () => {
	let sensor: MotionSensor;
	let recorder: VideoRecorder;
	let controller: SurveillanceController;

	beforeEach(() => {
		sensor = new FakeMotionSensor();
		recorder = new FakeVideoRecorder();
		controller = new SurveillanceController(sensor, recorder);
	});

	it('asks the recorder to stop recording when the sensor detects no motion', () => {
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('asks the recorder to start recording when the sensor detects motion', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => true);
		const spyRecorder = jest.spyOn(recorder, 'startRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('asks the recorder to stop recording when the sensor throws an unexpected error', () => {
		const stubSensor = jest.spyOn(sensor, 'isDetectingMotion');
		stubSensor.mockImplementation(() => {
			throw new Error('Unexpected Error');
		});
		const spyRecorder = jest.spyOn(recorder, 'stopRecording');

		controller.recordMotion();

		expect(spyRecorder).toHaveBeenCalled();
	});

	it('checks the motion sensor status once per second', () => {
		const spySensor = jest.spyOn(sensor, 'isDetectingMotion');
		const numberOfSeconds = 3;

		controller.recordMotion(numberOfSeconds);

		expect(spySensor).toHaveBeenCalledTimes(numberOfSeconds);
	});
});

class FakeMotionSensor implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

class FakeVideoRecorder implements VideoRecorder {
	startRecording(): void {
		console.log('Start recording...');
	}

	stopRecording(): void {
		console.log('Stop recording...');
	}
}
