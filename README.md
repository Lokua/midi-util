# midi-util

CommonJS helpers for working with midi messages.

## Install

```sh
npm i @lokua/midi-util --save
```

## API

> Note: midi messages are of the form `[status, data1, data2]`

#### [`codeTypeMap: Map<number, string>`](#codeTypeMap)

```
144 noteOn
128 noteOff
224 pitchBend
176 controlChange
208 channelPressure
248 clock
250 start
252 stop
251 continue
242 songPosition
```

#### [`typeCodeMap: Map<string, number>`](#typeCodeMap)

Inverse of `codeTypeMap`.

#### [`isNoteOn(status: number): boolean`](#isNoteOn)

#### [`isNoteOff(status: number): boolean`](#isNoteOff)

#### [`isPitchBend(status: number): boolean`](#isPitchBend)

#### [`isControlChange(status: number): boolean`](#isControlChange)

#### [`isChannelPressure(status: number): boolean`](#isChannelPressure)

#### [`isClock(status: number): boolean`](#isClock)

#### [`isStart(status: number): boolean`](#isStart)

#### [`isStop(status: number): boolean`](#isStop)

#### [`isContinue(status: number): boolean`](#isContinue)

#### [`isSongPosition(status: number): boolean`](#isSongPosition)

#### [`mtof(note: number): number`](#mtof)

Convert MIDI note number to frequency

#### [`ftom(frequency: number): number`](#mtof)

Convert frequency to MIDI note number

#### [`getChannel(status: number): number`](#getChannel)

Given a midi message status, returns the corresponding MIDI channel.

#### [`getType(status: number): string`](#getType)

Returns the message type (ie. `noteOn`, `controlChange`) for a given status

## License

MIT

[midi]: https://github.com/justinlatimer/node-midi
