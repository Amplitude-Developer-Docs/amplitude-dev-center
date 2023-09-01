<!-- WARNING: This is ONLY FOR sdk-quickstart.md usage -->
<!-- WARNING: Use macros/ios-install-dependencies instead for most cases -->
Install the Amplitude Analytics iOS SDK via CocoaPods, Carthage, or Swift Package Manager.

=== "CocoaPods"

    1. Add dependency to `Podfile`. 
    ```bash
    pod 'Amplitude', '~> 8.17.1'
    ```
    2. Run `pod install` in the project directory to install the dependency. 

=== "Swift Package Manager"

    1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
    2. Enter the URL `https://github.com/amplitude/Amplitude-iOS` in the search bar. 
    3. Xcode will automatically resolve to the latest version. Or you can select a specific version. 
    4. Click the "Next" button to confirm the addition of the package as a dependency. 
    5. Build your project to make sure the package is properly integrated.

=== "Carthage"

    Add the following line to your `Cartfile`.
    ```bash
    github "amplitude/Amplitude-iOS" ~> 8.17.1
    ```
    Check out the [Carthage docs](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more info.
