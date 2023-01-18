??? tip "Enable real-time type checking for JavaScript"
    Because JavaScript isn't a type-safe language, static type checking isn't built in like TypeScript. Some common IDEs allow for real-time type checks in JavaScript based on JSDoc.
    For a better development experience Ampli generates JSDocs for all methods and classes.

    To enable real-time type checking in VSCode for JavaScript:

    1. Go to **Preferences > Settings** then search for **checkJs**.
    2. Select **JS/TS > Implicit Project Config: Check JS**.

    After it's activated, type errors appear directly in the IDE.

    Jetbrains provides similar support:

    1. Go to **Preferences > Editor > Inspections > JavaScript and TypeScript > General**.
    2. In **Signature mismatch** and **Type mismatch**, set the **Severity** to Warning or Error based on your desired level of strictness.
