<a name="Breakpoint"></a>

## Breakpoint ⇐ <code>Codepoint</code>
**Kind**: global class  
**Extends**: <code>Codepoint</code>  
**Access**: public  

* [Breakpoint](#Breakpoint) ⇐ <code>Codepoint</code>
    * _constructors_
        * [new Breakpoint(props)](#new_Breakpoint_new)
    * _methods_
        * [.getSettings()](#Breakpoint+getSettings) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.getSettingValues(key)](#Breakpoint+getSettingValues) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.getSettingValue(key)](#Breakpoint+getSettingValue) ⇒ <code>Object</code>
        * [.setSettingValues(key)](#Breakpoint+setSettingValues)
        * [.addSetting(key, value, type, noEvent)](#Breakpoint+addSetting)
        * [.removeSetting(setting)](#Breakpoint+removeSetting)
    * _events_
        * ["breakpoint.breakpointChanged" (breakpoint)](#event_Breakpointbreakpoint.breakpointChanged)
        * ["breakpoint.breakpointDestroyed" (breakpoint)](#event_Breakpointbreakpoint.breakpointDestroyed)

<a name="new_Breakpoint_new"></a>

### new Breakpoint(props)
Breakpoint Model


| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> |  |
| props.id | <code>string</code> | UUID |
| props.filePath | <code>string</code> |  |
| props.line | <code>string</code> |  |
| props.settings | <code>Array.&lt;object&gt;</code> |  |

<a name="Breakpoint+getSettings"></a>

### breakpoint.getSettings() ⇒ <code>Array.&lt;Object&gt;</code>
Gets all settings for the breakpoint

**Kind**: instance method of [<code>Breakpoint</code>](#Breakpoint)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  
<a name="Breakpoint+getSettingValues"></a>

### breakpoint.getSettingValues(key) ⇒ <code>Array.&lt;Object&gt;</code>
Gets the setting values for a key

**Kind**: instance method of [<code>Breakpoint</code>](#Breakpoint)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | [description] |

<a name="Breakpoint+getSettingValue"></a>

### breakpoint.getSettingValue(key) ⇒ <code>Object</code>
Gets the setting value for a key

**Kind**: instance method of [<code>Breakpoint</code>](#Breakpoint)  
**Returns**: <code>Object</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | [description] |

<a name="Breakpoint+setSettingValues"></a>

### breakpoint.setSettingValues(key)
Sets the setting value for a key

**Kind**: instance method of [<code>Breakpoint</code>](#Breakpoint)  
**Emits**: <code>event:&quot;breakpoint.breakpointChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | [description] |

<a name="Breakpoint+addSetting"></a>

### breakpoint.addSetting(key, value, type, noEvent)
Adds a setting for a given key

**Kind**: instance method of [<code>Breakpoint</code>](#Breakpoint)  
**Emits**: <code>event:&quot;breakpoint.breakpointChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | [description] |
| value | <code>Object</code> | [description] |
| type | <code>String</code> | array or property |
| noEvent | <code>Boolean</code> | Do not fire an event if true |

<a name="Breakpoint+removeSetting"></a>

### breakpoint.removeSetting(setting)
Remove a setting

**Kind**: instance method of [<code>Breakpoint</code>](#Breakpoint)  
**Emits**: <code>event:&quot;breakpoint.Changed&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| setting | <code>String</code> | [description] |

<a name="event_Breakpointbreakpoint.breakpointChanged"></a>

### "breakpoint.breakpointChanged" (breakpoint)
Breakpoint Changed

**Kind**: event emitted by [<code>Breakpoint</code>](#Breakpoint)  

| Param | Type |
| --- | --- |
| breakpoint | <code>Object</code> | 

<a name="event_Breakpointbreakpoint.breakpointDestroyed"></a>

### "breakpoint.breakpointDestroyed" (breakpoint)
Breakpoint Destroyed

**Kind**: event emitted by [<code>Breakpoint</code>](#Breakpoint)  

| Param | Type |
| --- | --- |
| breakpoint | <code>Object</code> | 

