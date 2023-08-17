--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```ts
const groupType = 'plan';
const groupName = 'enterprise';
const groupIdentifyEvent = new amplitude.Identify()
groupIdentifyEvent.set('key1', 'value1');

amplitude.groupIdentify(groupType, groupName, groupIdentifyEvent);
```
