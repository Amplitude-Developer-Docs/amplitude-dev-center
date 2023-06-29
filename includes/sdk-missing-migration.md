!!! warning "Migration logic not available"
    The maintenance SDK stores device ID, user ID, unsent events, etc. in SQLite. However, there is no migration logic available (at this time), so this data won't be automatically migrated when upgrading to the latest SDK. Consequently, for example, device ID may be regenerated when using the latest SDK and unsend events will be lost.

    We will release a migration plugin soon.