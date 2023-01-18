## Ampli CLI

### Pull

The `pull` command downloads the Ampli Wrapper code to your project. Run the `pull` command from the project root.

```bash
ampli pull
```

You will be prompted to log in to your workspace and select a source.

```bash
➜ ampli pull
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: Amplitude
? Workspace: My Workspace
? Source: My Source
```

Learn more about [`ampli pull`](../../ampli/cli.md#ampli-pull).

### Status

Verify that events are implemented in your code with the status command:

```bash
ampli status [--update]
```

The output displays status and indicates what events are missing.

```text
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](../../ampli/cli.md#ampli-status).
