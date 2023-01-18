### Install the Ampli CLI

You can install the [Ampli CLI](/data/ampli/cli/) from Homebrew or NPM.

=== "brew"

    ```bash
    brew tap amplitude/ampli
    brew install ampli
    ```

=== "npm"

    ```bash
    npm install -g @amplitude/ampli
    ```
### Pull the Ampli Wrapper into your project

Run the Ampli CLI `pull` command to log in to Amplitude Data and download the strongly typed Ampli Wrapper for your tracking plan. Ampli CLI commands are usually run from the project root directory.

```bash
ampli pull
```
