# midi-util

Helper functions primarily for use with node.js [midi][midi] package.

## API

Note: midi messages are of the form `[status, data1, data2]` (as returned by the [midi][midi] lib).
Any mention in these docs of `message` refer to that,
likewise `status` refers to the first member of a midi message.

#### [`statusCodes: object`](#statusCodes)

Object map of `{ [code: int]: type: string }`.

```js
{
  144: `noteOn`,
  128: `noteOff`,
  224: `pitchBend`,
  176: `cc`,
  208: `channelPressure`,
  248: `clock`,
  250: `start`,
  252: `stop`,
  251: `continue`,
  242: `songPosition`
}
```

#### [`statusTypes`](#statusTypes)

The reverse of `statusCodes`.

#### [`codeToType`](#codeToType)

Function variant of status type lookup.

#### [`typeToCode`](#typeToCode)

Function variant of status code lookup.

#### [`isControlChange(status: number): boolean`](#isControlChange)

Returns true if status is cc type.

#### [`isNoteOn(status: number): boolean`](#isNoteOn)

Returns true if status is noteOn type.

#### [`isNoteOff(status: number): boolean`](#isNoteOff)

Returns true if status is noteOff type.

#### [`mtof(note: number): number`](#mtof)

Convert MIDI note number to frequency

#### [`ftom(frequency: number): number`](#mtof)

Convert frequency to MIDI note number

#### [`listPorts(portType: string): array[string]`](#listPorts)

List all available port names for the passed in `portType` (`input` or `output`).
Each index in the returned array represents the actual port number.

#### [`getPortNumber(portType: string, name: string|regexp)`](#getPortNumber)

Get the port number of a given port type (`input` or `output`) by strict equality string or regexp.
Returns `-1` if no matching port is found.

#### [`getChannel(messageOrStatus: array[string]|number): number`](#getChannel)

Given a midi message or status, returns corresponding MIDI channel.

## License
MIT

[midi]: https://github.com/justinlatimer/node-midi
