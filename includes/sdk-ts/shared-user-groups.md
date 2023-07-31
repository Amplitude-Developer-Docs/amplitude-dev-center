--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example
    If Joe is in 'orgId' '15', then the `groupName` would be '15'.

    ```ts
    // set group with a single group name
    amplitude.setGroup('orgId', '15');
    ```

    If Joe is in 'sport' 'soccer' and 'tennis', then the `groupName` would be '["tennis", "soccer"]'.

    ```ts
    // set group with multiple group names
    amplitude.setGroup('sport', ['soccer', 'tennis']);
    ```

--8<-- "includes/event-level-groups-intro.md"

```ts
amplitude.track({
  event_type: 'event type',
  event_properties: { eventPropertyKey: 'event property value' },
  groups: { 'orgId': '15' }
})
```
