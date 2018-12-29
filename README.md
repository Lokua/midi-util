# midi-util

CommonJS constants for MIDI status types and some basic helper functions (mtof,
ftom)

## Install

```sh
npm i @lokua/midi-util --save
```

## API

#### [`codeTypeMap: Map<number, string>`](#codeTypeMap)

```js
// code -> type
128 -> 'noteOff'
144 -> 'noteOn'
160 -> 'polyphonicAftertouch'
176 -> 'controlChange'
192 -> 'programChange'
208 -> 'channelAftertouch'
224 -> 'pitchBend'
240 -> 'sysEx'
241 -> 'timeCode'
242 -> 'songPosition'
243 -> 'songSelect'
246 -> 'tuneRequest'
247 -> 'endOfSysEx'
248 -> 'clock'
250 -> 'start'
251 -> 'continue'
252 -> 'stop'
254 -> 'activeSensing'
255 -> 'systemReset'
```

#### [`typeCodeMap: Map<string, number>`](#typeCodeMap)

Inverse of `codeTypeMap`.

#### [`is***(statusOrMidiMessage: number | MidiMessage): boolean`](#is)

Check if a status byte or MIDI message is a certain status type

- isNoteOff
- isNoteOn
- isPolyphonicAftertouch
- isControlChange
- isProgramChange
- isChannelAftertouch
- isPitchBend
- isSongPosition
- isSongSelect
- isTuneRequest
- isEndOfSysEx
- isClock
- isStart
- isContinue
- isStop
- isActiveSensing
- isSystemReset

#### [`mtof(note: number): number`](#mtof)

Convert MIDI note number to frequency

#### [`ftom(frequency: number): number`](#mtof)

Convert frequency to MIDI note number

#### [`getChannel(statusOrMidiMessage: number | MidiMessage): number`](#getChannel)

Given a midi message status, returns the corresponding MIDI channel.

#### [`getType(statusOrMidiMessage: number | MidiMessage): string`](#getType)

Returns the message type (ie. `noteOn`, `controlChange`) for a given status

## License

MIT
