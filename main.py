def define_env(env):
    "Hook function"

    @env.macro
    def mymacro():
        return "some_string"
