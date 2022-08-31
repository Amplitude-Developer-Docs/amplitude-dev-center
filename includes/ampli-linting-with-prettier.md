???tip "Linting with Prettier"

    To prevent linting errors for eslint and tslint, the SDK-generated files have the following to diasable the linters: 

    `/* tslint:disable */`

    `/* eslint-disable */`
    

    There's no corresponding “in-code” functionality with Prettier. Instead, add the generated `path/to/ampli` to your `.prettierignore` file. You can get the path with `ampli pull`. See the [Prettier documentation](https://prettier.io/docs/en/ignore.html) for more information. 
