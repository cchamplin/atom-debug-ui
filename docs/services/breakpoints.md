<a name="BreakpointsService"></a>

## BreakpointsService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [BreakpointsService](#BreakpointsService) ⇐ <code>Service</code>
    * _constructors_
        * [new BreakpointsService(services, options)](#new_BreakpointsService_new)
    * _methods_
        * [.deserialize(state)](#BreakpointsService+deserialize)
        * [.serialize()](#BreakpointsService+serialize) ⇒ <code>object</code>
        * [.doCodePoint(context, point)](#BreakpointsService+doCodePoint)
        * [.getBreakpoints()](#BreakpointsService+getBreakpoints) ⇒ <code>Array.&lt;Breakpoint&gt;</code>
        * [.createBreakpoint(path, line, settings)](#BreakpointsService+createBreakpoint) ⇒ <code>Breakpoint</code>
        * [.createCodepoint(path, line, stackDepth)](#BreakpointsService+createCodepoint) ⇒ <code>Codepoint</code>
        * [.clearBreakpoints()](#BreakpointsService+clearBreakpoints) ⇒ <code>Array.&lt;Breakpoint&gt;</code>
        * [.addBreakpoint(breakpoint)](#BreakpointsService+addBreakpoint)
        * [.removeBreakpoint(item)](#BreakpointsService+removeBreakpoint) ⇒ <code>Breakpoint</code>
        * [.showSettingsUI(breakpointId)](#BreakpointsService+showSettingsUI)
        * [.createBreakpointMarker(line, editor)](#BreakpointsService+createBreakpointMarker) ⇒ <code>object</code>
        * [.toggleBreakpoint(line, editor)](#BreakpointsService+toggleBreakpoint)
        * [.findBreakpoint(filePath, line)](#BreakpointsService+findBreakpoint) ⇒ <code>Breakpoint</code>
        * [.getActiveSettingsView()](#BreakpointsService+getActiveSettingsView) ⇒ <code>object</code>
        * [.setActiveSettingsView(settingsView)](#BreakpointsService+setActiveSettingsView)
        * [.onBreakpointAdded(callback)](#BreakpointsService+onBreakpointAdded) ⇒ <code>Disposable</code>
        * [.onBreakpointRemoved(callback)](#BreakpointsService+onBreakpointRemoved) ⇒ <code>Disposable</code>
        * [.onBreakpointsChanged(callback)](#BreakpointsService+onBreakpointsChanged) ⇒ <code>Disposable</code>
        * [.onBreakpointChanged(callback)](#BreakpointsService+onBreakpointChanged) ⇒ <code>Disposable</code>
        * [.onBreakpointsCleared(callback)](#BreakpointsService+onBreakpointsCleared) ⇒ <code>Disposable</code>
    * _events_
        * ["breakpoints.breakpointsCleared" (type, removed)](#event_BreakpointsServicebreakpoints.breakpointsCleared)
        * ["breakpoints.breakpointsChanged" (type, removed, added)](#event_BreakpointsServicebreakpoints.breakpointsChanged)
        * ["breakpoints.breakpointAdded" (type, added)](#event_BreakpointsServicebreakpoints.breakpointAdded)
        * ["breakpoints.breakpointRemoved" (type, removed)](#event_BreakpointsServicebreakpoints.breakpointRemoved)
        * ["breakpoints.breakpointChanged" (breakpoint)](#event_BreakpointsServicebreakpoints.breakpointChanged)

<a name="new_BreakpointsService_new"></a>

### new BreakpointsService(services, options)
Breakpoints Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="BreakpointsService+deserialize"></a>

### breakpointsService.deserialize(state)
Deserialize prior breakpoint data

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: package  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | Serialized data object |

<a name="BreakpointsService+serialize"></a>

### breakpointsService.serialize() ⇒ <code>object</code>
Serialize current breakpoint data

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Returns**: <code>object</code> - Serialized state data  
**Access**: public  
<a name="BreakpointsService+doCodePoint"></a>

### breakpointsService.doCodePoint(context, point)
Highlight a line in the editor for a specific context

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 
| point | <code>Codepoint</code> | 

<a name="BreakpointsService+getBreakpoints"></a>

### breakpointsService.getBreakpoints() ⇒ <code>Array.&lt;Breakpoint&gt;</code>
Get all breakpoints in the service

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  
<a name="BreakpointsService+createBreakpoint"></a>

### breakpointsService.createBreakpoint(path, line, settings) ⇒ <code>Breakpoint</code>
Create a new breakpoint object without adding it to the service

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| line | <code>string</code> | 
| settings | <code>object</code> | 

<a name="BreakpointsService+createCodepoint"></a>

### breakpointsService.createCodepoint(path, line, stackDepth) ⇒ <code>Codepoint</code>
Create a new code point without activating it

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| line | <code>string</code> | 
| stackDepth | <code>int</code> | 

<a name="BreakpointsService+clearBreakpoints"></a>

### breakpointsService.clearBreakpoints() ⇒ <code>Array.&lt;Breakpoint&gt;</code>
Clear all breakpoints from the service

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Returns**: <code>Array.&lt;Breakpoint&gt;</code> - Cleared breakpoints  
**Emits**: <code>event:&quot;breakpoints.breakpointsCleared&quot;</code>, <code>event:&quot;breakpoints.breakpointsChanged&quot;</code>  
**Access**: public  
<a name="BreakpointsService+addBreakpoint"></a>

### breakpointsService.addBreakpoint(breakpoint)
Add a breakpoint to the service

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Emits**: <code>event:&quot;breakpoints.breakpointAdded&quot;</code>, <code>event:&quot;breakpoints.breakpointsChanged&quot;</code>, <code>event:&quot;breakpoints.breakpointChanged&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| breakpoint | <code>Breakpoint</code> | 

<a name="BreakpointsService+removeBreakpoint"></a>

### breakpointsService.removeBreakpoint(item) ⇒ <code>Breakpoint</code>
Remove breakpoint from service
Also clears any breakpoint markers currently active for breakpoint

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Returns**: <code>Breakpoint</code> - Removed breakpoint  
**Emits**: <code>event:&quot;breakpoints.breakpointRemoved&quot;</code>, <code>event:&quot;breakpoints.breakpointsChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Breakpoint</code> | Breakpoint to be removed |

<a name="BreakpointsService+showSettingsUI"></a>

### breakpointsService.showSettingsUI(breakpointId)
Show native settings ui for a breakpoint by ID

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| breakpointId | <code>string</code> | 

<a name="BreakpointsService+createBreakpointMarker"></a>

### breakpointsService.createBreakpointMarker(line, editor) ⇒ <code>object</code>
Create a marker instance for a specific line and editor

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: package  

| Param | Type |
| --- | --- |
| line | <code>string</code> | 
| editor | <code>object</code> | 

<a name="BreakpointsService+toggleBreakpoint"></a>

### breakpointsService.toggleBreakpoint(line, editor)
Toggles the breakpoint on a specific line and editor
creating or destroying a breakpoint

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | [description] |
| editor | <code>string</code> | [description] |

<a name="BreakpointsService+findBreakpoint"></a>

### breakpointsService.findBreakpoint(filePath, line) ⇒ <code>Breakpoint</code>
Find a breakpoint by line and file

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| filePath | <code>string</code> | 
| line | <code>string</code> | 

<a name="BreakpointsService+getActiveSettingsView"></a>

### breakpointsService.getActiveSettingsView() ⇒ <code>object</code>
Returns an active breakpoint setting view if one exists

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  
<a name="BreakpointsService+setActiveSettingsView"></a>

### breakpointsService.setActiveSettingsView(settingsView)
Sets the active settings view fore breakpoint

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| settingsView | <code>object</code> | 

<a name="BreakpointsService+onBreakpointAdded"></a>

### breakpointsService.onBreakpointAdded(callback) ⇒ <code>Disposable</code>
Subscribe to Breakpoints:breakpointAdded events

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="BreakpointsService+onBreakpointRemoved"></a>

### breakpointsService.onBreakpointRemoved(callback) ⇒ <code>Disposable</code>
Subscribe to Breakpoints:breakpointRemoved events

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="BreakpointsService+onBreakpointsChanged"></a>

### breakpointsService.onBreakpointsChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Breakpoints:breakpointsChanged events

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="BreakpointsService+onBreakpointChanged"></a>

### breakpointsService.onBreakpointChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Breakpoints:breakpointChanged events

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="BreakpointsService+onBreakpointsCleared"></a>

### breakpointsService.onBreakpointsCleared(callback) ⇒ <code>Disposable</code>
Subscribe to Breakpoints:breakpointsCleared events

**Kind**: instance method of [<code>BreakpointsService</code>](#BreakpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_BreakpointsServicebreakpoints.breakpointsCleared"></a>

### "breakpoints.breakpointsCleared" (type, removed)
Breakpoints Cleared

**Kind**: event emitted by [<code>BreakpointsService</code>](#BreakpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_BreakpointsServicebreakpoints.breakpointsChanged"></a>

### "breakpoints.breakpointsChanged" (type, removed, added)
Breakpoints Changed

**Kind**: event emitted by [<code>BreakpointsService</code>](#BreakpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_BreakpointsServicebreakpoints.breakpointAdded"></a>

### "breakpoints.breakpointAdded" (type, added)
Breakpoint Added

**Kind**: event emitted by [<code>BreakpointsService</code>](#BreakpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| added | <code>object</code> | 

<a name="event_BreakpointsServicebreakpoints.breakpointRemoved"></a>

### "breakpoints.breakpointRemoved" (type, removed)
Breakpoint Removed

**Kind**: event emitted by [<code>BreakpointsService</code>](#BreakpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>object</code> | 

<a name="event_BreakpointsServicebreakpoints.breakpointChanged"></a>

### "breakpoints.breakpointChanged" (breakpoint)
Breakpoint Changed

**Kind**: event emitted by [<code>BreakpointsService</code>](#BreakpointsService)  

| Param | Type |
| --- | --- |
| breakpoint | <code>object</code> | 

