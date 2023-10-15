# Kata Video Surveillance using TypeScript

The statement is as follows: a well-known manufacturer of video surveillance systems has asked us to develop software 
for the prototype of a new innovative product they are developing. It is a device that has a motion sensor and a 
recorder. The motion sensor has an API with a single method that returns true when it detects that something has started 
to move and false when it does not detect movement. On the other hand, the recorder has two commands: one to start 
recording and one to stop recording.

Our task will be to design a controller that checks every second if the sensor is detecting motion and if so we should 
tell the recorder to start recording, and if not, it should stop recording. The recording should also stop in case of 
any unexpected behavior of the sensor.

The main limitation is that the manufacturer does not offer us the possibility to access neither the code of the sensor 
nor the recorder, it seems that he does not want us to copy his magnificent idea. But at least it provides us with their
public interfaces:

```typescript
interface MotionSensor {
    isDetectingMotion(): boolean;
}

interface VideoRecorder {
    startRecording(): void;
    stopRecording(): void;
}
```

These interfaces are all we need, since the idea is to make use of doubles of these pieces in order to test our 
controller.

Requirements
In summary, the requirements to be met by the controller we have to design are:
* Tells the recorder to stop recording when the sensor does not detect motion.
* Tells the recorder to start recording when the sensor detects motion.
* Tells the recorder to stop recording when the sensor throws an unexpected error.
* Checks the motion sensor status once per second.

## Stack
* TypeScript
* Jest
* ESLint
* Prettier
* Husky

## Instructions
* `npm install`
* `npm test`

### ESLint
[TypeScript ESLint Rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

### Husky hooks
* Pre-commit: Execute npm analize (tsc + eslint --fix)
* Pre-push: Execute test
