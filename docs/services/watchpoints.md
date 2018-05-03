<a name="WatchpointsService"></a>

## WatchpointsService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [WatchpointsService](#WatchpointsService) ⇐ <code>Service</code>
    * _constructors_
        * [new WatchpointsService(services, options)](#new_WatchpointsService_new)
    * _methods_
        * [.serialize()](#WatchpointsService+serialize) ⇒ <code>object</code>
        * [.deserialize(state)](#WatchpointsService+deserialize)
        * [.createWatchpointFromSelection()](#WatchpointsService+createWatchpointFromSelection) ⇒ <code>Object</code>
        * [.getWatchpoints()](#WatchpointsService+getWatchpoints) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.clearWatchpoints()](#WatchpointsService+clearWatchpoints) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.addWatchpoint(watchpoint)](#WatchpointsService+addWatchpoint)
        * [.removeWatchpoint(item)](#WatchpointsService+removeWatchpoint) ⇒ <code>Object</code>
        * [.onWatchpointAdded(callback)](#WatchpointsService+onWatchpointAdded) ⇒ <code>Disposable</code>
        * [.onWatchpointRemoved(callback)](#WatchpointsService+onWatchpointRemoved) ⇒ <code>Disposable</code>
        * [.onWatchpointsChanged(callback)](#WatchpointsService+onWatchpointsChanged) ⇒ <code>Disposable</code>
        * [.onWatchpointsCleared(callback)](#WatchpointsService+onWatchpointsCleared) ⇒ <code>Disposable</code>
    * _events_
        * ["watchpoints.watchpointsCleared" (type, removed)](#event_WatchpointsServicewatchpoints.watchpointsCleared)
        * ["watchpoints.watchpointsChanged" (type, removed, added)](#event_WatchpointsServicewatchpoints.watchpointsChanged)
        * ["watchpoints.watchpointAdded" (type, removed)](#event_WatchpointsServicewatchpoints.watchpointAdded)
        * ["watchpoints.watchpointRemoved" (type, removed)](#event_WatchpointsServicewatchpoints.watchpointRemoved)

<a name="new_WatchpointsService_new"></a>

### new WatchpointsService(services, options)
Watchpoints Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="WatchpointsService+serialize"></a>

### watchpointsService.serialize() ⇒ <code>object</code>
Serialize current watchpoints data

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Returns**: <code>object</code> - Serialized state data  
**Access**: public  
<a name="WatchpointsService+deserialize"></a>

### watchpointsService.deserialize(state)
Deserialize prior watchpoints data

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Access**: package  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | Serialized data object |

<a name="WatchpointsService+createWatchpointFromSelection"></a>

### watchpointsService.createWatchpointFromSelection() ⇒ <code>Object</code>
Created a watchpoint from the user selection in the editor

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Returns**: <code>Object</code> - [description]  
**Access**: public  
<a name="WatchpointsService+getWatchpoints"></a>

### watchpointsService.getWatchpoints() ⇒ <code>Array.&lt;Object&gt;</code>
Gets all watchpoints

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  
<a name="WatchpointsService+clearWatchpoints"></a>

### watchpointsService.clearWatchpoints() ⇒ <code>Array.&lt;Object&gt;</code>
Clears all watchpoints

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Emits**: <code>event:&quot;watchpoints.watchpointsCleared&quot;</code>, <code>event:&quot;watchpoints.watchpointsChanged&quot;</code>  
**Access**: public  
<a name="WatchpointsService+addWatchpoint"></a>

### watchpointsService.addWatchpoint(watchpoint)
Add a watchpoint

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Emits**: <code>event:&quot;watchpoints.watchpointAdded&quot;</code>, <code>event:&quot;watchpoints.watchpointsChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| watchpoint | <code>Object</code> | [description] |

<a name="WatchpointsService+removeWatchpoint"></a>

### watchpointsService.removeWatchpoint(item) ⇒ <code>Object</code>
Remove a specific watchpoint

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Returns**: <code>Object</code> - [description]  
**Emits**: <code>event:&quot;watchpoints.watchpointRemoved&quot;</code>, <code>event:&quot;watchpoints.watchpointsChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | [description] |

<a name="WatchpointsService+onWatchpointAdded"></a>

### watchpointsService.onWatchpointAdded(callback) ⇒ <code>Disposable</code>
Subscribe to Watchpoints:watchpointAdded events

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="WatchpointsService+onWatchpointRemoved"></a>

### watchpointsService.onWatchpointRemoved(callback) ⇒ <code>Disposable</code>
Subscribe to Watchpoints:watchpointRemoved events

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="WatchpointsService+onWatchpointsChanged"></a>

### watchpointsService.onWatchpointsChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Watchpoints:watchpointsChanged events

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="WatchpointsService+onWatchpointsCleared"></a>

### watchpointsService.onWatchpointsCleared(callback) ⇒ <code>Disposable</code>
Subscribe to Watchpoints:watchpointsCleared events

**Kind**: instance method of [<code>WatchpointsService</code>](#WatchpointsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_WatchpointsServicewatchpoints.watchpointsCleared"></a>

### "watchpoints.watchpointsCleared" (type, removed)
Watchpoints cleared event

**Kind**: event emitted by [<code>WatchpointsService</code>](#WatchpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_WatchpointsServicewatchpoints.watchpointsChanged"></a>

### "watchpoints.watchpointsChanged" (type, removed, added)
Watchpoints changed event

**Kind**: event emitted by [<code>WatchpointsService</code>](#WatchpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_WatchpointsServicewatchpoints.watchpointAdded"></a>

### "watchpoints.watchpointAdded" (type, removed)
Watchpoint added event

**Kind**: event emitted by [<code>WatchpointsService</code>](#WatchpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_WatchpointsServicewatchpoints.watchpointRemoved"></a>

### "watchpoints.watchpointRemoved" (type, removed)
Watchpoint removed event

**Kind**: event emitted by [<code>WatchpointsService</code>](#WatchpointsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

