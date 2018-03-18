# midi-util

Helper functions primarily for use with node.js [midi][midi] package.

## Install

```sh
npm i @lokua/midi-util --save
```

## API

> Note: midi messages are of the form `[status, data1, data2]`

#### [`codeTypeMap: Map<number, string>`](#codeTypeMap)

```js
Map {
  144 => 'noteOn',
  128 => 'noteOff',
  224 => 'pitchBend',
  176 => 'controlChange',
  208 => 'channelPressure',
  248 => 'clock',
  250 => 'start',
  252 => 'stop',
  251 => 'continue',
  242 => 'songPosition' }
```

#### [`typeCodeMap: Map<string, number>`](#typeCodeMap)

Inverse of `codeTypeMap`.

```js
Map {
  'noteOn' => 144,
  'noteOff' => 128,
  'pitchBend' => 224,
  'controlChange' => 176,
  'channelPressure' => 208,
  'clock' => 248,
  'start' => 250,
  'stop' => 252,
  'continue' => 251,
  'songPosition' => 242 }
```

#### [`isNoteOn(number): boolean`](#isNoteOn)

#### [`isNoteOff(number): boolean`](#isNoteOff)

#### [`isPitchBend(number): boolean`](#isPitchBend)

#### [`isControlChange(number): boolean`](#isControlChange)

#### [`isChannelPressure(number): boolean`](#isChannelPressure)

#### [`isClock(number): boolean`](#isClock)

#### [`isStart(number): boolean`](#isStart)

#### [`isStop(number): boolean`](#isStop)

#### [`isContinue(number): boolean`](#isContinue)

#### [`isSongPosition(number): boolean`](#isSongPosition)

#### [`mtof(note: number): number`](#mtof)

Convert MIDI note number to frequency

#### [`ftom(frequency: number): number`](#mtof)

Convert frequency to MIDI note number

#### [`getChannel(messageOrStatus: array[string]|number): number`](#getChannel)

Given a midi message status, returns the corresponding MIDI channel.

## License

MIT

[midi]: https://github.com/justinlatimer/node-midi
