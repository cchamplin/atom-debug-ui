<a name="WatchesService"></a>

## WatchesService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [WatchesService](#WatchesService) ⇐ <code>Service</code>
    * _constructors_
        * [new WatchesService(services, options)](#new_WatchesService_new)
    * _methods_
        * [.serialize()](#WatchesService+serialize) ⇒ <code>object</code>
        * [.deserialize(state)](#WatchesService+deserialize)
        * [.createWatchFromSelection()](#WatchesService+createWatchFromSelection) ⇒ <code>Object</code>
        * [.getWatches()](#WatchesService+getWatches) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.clearWatches()](#WatchesService+clearWatches) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.addWatch()](#WatchesService+addWatch)
        * [.removeWatch(item)](#WatchesService+removeWatch) ⇒ <code>Object</code>
        * [.onWatchAdded(callback)](#WatchesService+onWatchAdded) ⇒ <code>Disposable</code>
        * [.onWatchRemoved(callback)](#WatchesService+onWatchRemoved) ⇒ <code>Disposable</code>
        * [.onWatchesChanged(callback)](#WatchesService+onWatchesChanged) ⇒ <code>Disposable</code>
        * [.onWatchesCleared(callback)](#WatchesService+onWatchesCleared) ⇒ <code>Disposable</code>
    * _events_
        * ["watches.watchesCleared" (type, removed)](#event_WatchesServicewatches.watchesCleared)
        * ["watches.watchesChanged" (type, removed, added)](#event_WatchesServicewatches.watchesChanged)
        * ["watches.watchAdded" (type, added)](#event_WatchesServicewatches.watchAdded)
        * ["watches.watchRemoved" (type, removed)](#event_WatchesServicewatches.watchRemoved)

<a name="new_WatchesService_new"></a>

### new WatchesService(services, options)
Watches Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="WatchesService+serialize"></a>

### watchesService.serialize() ⇒ <code>object</code>
Serialize current watches data

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Returns**: <code>object</code> - Serialized state data  
**Access**: public  
<a name="WatchesService+deserialize"></a>

### watchesService.deserialize(state)
Deserialize prior watches data

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Access**: package  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | Serialized data object |

<a name="WatchesService+createWatchFromSelection"></a>

### watchesService.createWatchFromSelection() ⇒ <code>Object</code>
Create a watch from the user selection in the editor

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Returns**: <code>Object</code> - [description]  
**Access**: public  
<a name="WatchesService+getWatches"></a>

### watchesService.getWatches() ⇒ <code>Array.&lt;Object&gt;</code>
Return all watches

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  
<a name="WatchesService+clearWatches"></a>

### watchesService.clearWatches() ⇒ <code>Array.&lt;Object&gt;</code>
Clear all watches

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Emits**: <code>event:&quot;watches.watchesCleared&quot;</code>, <code>event:&quot;watches.watchesChanged&quot;</code>  
**Access**: public  
<a name="WatchesService+addWatch"></a>

### watchesService.addWatch()
Adds a watch

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Emits**: <code>event:&quot;watches.watchAdded&quot;</code>, <code>event:&quot;watches.watchesChanged&quot;</code>  
**Access**: public  
<a name="WatchesService+removeWatch"></a>

### watchesService.removeWatch(item) ⇒ <code>Object</code>
Remove a watch

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Returns**: <code>Object</code> - [description]  
**Emits**: <code>event:&quot;watches.watchRemoved&quot;</code>, <code>event:&quot;watches.watchesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | [description] |

<a name="WatchesService+onWatchAdded"></a>

### watchesService.onWatchAdded(callback) ⇒ <code>Disposable</code>
Subscribe to Watches:watchAdded events

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="WatchesService+onWatchRemoved"></a>

### watchesService.onWatchRemoved(callback) ⇒ <code>Disposable</code>
Subscribe to Watches:watchRemoved events

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="WatchesService+onWatchesChanged"></a>

### watchesService.onWatchesChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Watches:watchesChanged events

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="WatchesService+onWatchesCleared"></a>

### watchesService.onWatchesCleared(callback) ⇒ <code>Disposable</code>
Subscribe to Watches:watchesCleared events

**Kind**: instance method of [<code>WatchesService</code>](#WatchesService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_WatchesServicewatches.watchesCleared"></a>

### "watches.watchesCleared" (type, removed)
Watches cleared event

**Kind**: event emitted by [<code>WatchesService</code>](#WatchesService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_WatchesServicewatches.watchesChanged"></a>

### "watches.watchesChanged" (type, removed, added)
Watches changed event

**Kind**: event emitted by [<code>WatchesService</code>](#WatchesService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_WatchesServicewatches.watchAdded"></a>

### "watches.watchAdded" (type, added)
Watch added event

**Kind**: event emitted by [<code>WatchesService</code>](#WatchesService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_WatchesServicewatches.watchRemoved"></a>

### "watches.watchRemoved" (type, removed)
Watch removed event

**Kind**: event emitted by [<code>WatchesService</code>](#WatchesService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

