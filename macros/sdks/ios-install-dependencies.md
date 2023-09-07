@{% macro ios_install_dependencies(packageName='AmplitudeSwift', version='0.4.14', repo='amplitude/Amplitude-Swift') -%}
Install the Amplitude Analytics iOS SDK via CocoaPods, Carthage, or Swift Package Manager. 

=== "CocoaPods"

    1. Add dependency to `Podfile`. 
    ```bash
    pod '@{{packageName}}', '~> @{{version}}'
    ```
    2. Run `pod install` in the project directory to install the dependency. 

=== "Swift Package Manager"

    1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
    2. Enter the URL `https://github.com/@{{repo}}` in the search bar. 
    3. Xcode will automatically resolve to the latest version. Or you can select a specific version. 
    4. Click the "Next" button to confirm the addition of the package as a dependency. 
    5. Build your project to make sure the package is properly integrated.

=== "Carthage"

    Add the following line to your `Cartfile`.
    ```bash
    github "@{{repo}}" ~> @{{version}}
    ```
    Check out the [Carthage docs](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more info.

@{%- endmacro %}
