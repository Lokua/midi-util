# midi-util

CommonJS constants for MIDI status types and some basic helper functions (mtof,
ftom)

## Install

```sh
npm i @lokua/midi-util --save
```

## API

#### [`(SCREAMING_CONSTANTS)`](#screamingConstants)

```js
NOTE_OFF = 128
NOTE_ON = 144
POLYPHONIC_AFTERTOUCH = 160
CONTROL_CHANGE = 176
PROGRAM_CHANGE = 192
CHANNEL_AFTERTOUCH = 208
PITCHBEND = 224
SYSEX = 240
TIME_CODE = 241
SONG_POSITION = 242
SONG_SELECT = 243
TUNE_REQUEST = 246
END_OF_SYSEX = 247
CLOCK = 248
START = 250
CONTINUE = 251
STOP = 252
ACTIVE_SENSING = 254
SYSTEM_RESET = 255
```

#### [`statusMap: Map<number|string, number|string>`](#statusMap)

lookup readable status string by status code or vis a versa

```js
// status -> type
128 -> 'noteOff'
// etc...

// type -> status
'noteOff' -> 128
// ...

// screaming type -> status
'NOTE_OFF' -> 128
// ...
```

#### [`is***(statusOrMidiMessage: number | MidiMessage): boolean`](#is)

Check if a status byte or MIDI message is a certain status type

- isNoteOff
- isNoteOn
- isPolyphonicAftertouch
- isControlChange
- isProgramChange
- isChannelAftertouch
- isPitchBend
- isSysex
- isSongPosition
- isSongSelect
- isTuneRequest
- isEndOfSysex
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

#### [`getPorts(): Promise<{ inputs: Array<MIDIInputPort>, outputs: Array<MIDIOutputPort> }>`](#getPorts)

_Browser only_. Converts the `MIDIPortMap` objects returned by
`navigator.requestMIDIAccess` into a hash of inputs and outputs arrays.

#### [`findPortByName(test: RegExp|string, ports:MIDIPortMap|Array<MIDIPort>): ?MIDIPort`](#findPortByName)

Find a port instance within an array of ports or a `Map<any, { name: string }>`
structure by exact string or RegExp. (Actually, this is really a generic
`findObjectByName` that works with arrays or maps, but, whatever).

Hint - use the `i` flag when using RegExp to make matching easier on yourself

This method also supports partial application so you can do the following:

```js
const { getPorts, findPortByName } = require('@lokua/midi-util')

// this
const findMidiFighterTwister = findPortByName(/fighter\/twister/i)

const { inputs, outputs } = await getPorts()
const input = findMidiFighterTwister(inputs)
const output = findMidiFighterTwister(outputs)
```

## License

MIT
