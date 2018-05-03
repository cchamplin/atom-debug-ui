<a name="StatusService"></a>

## StatusService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [StatusService](#StatusService) ⇐ <code>Service</code>
    * _constructors_
        * [new StatusService(services, options)](#new_StatusService_new)
    * _methods_
        * [.getStatus(context)](#StatusService+getStatus) ⇒ <code>Object</code>
        * [.setStatus(context, newStatus)](#StatusService+setStatus)
        * [.onStatusChanged(callback)](#StatusService+onStatusChanged) ⇒ <code>Disposable</code>
    * _events_
        * ["status.statusChanged" (context, new, old)](#event_StatusServicestatus.statusChanged)

<a name="new_StatusService_new"></a>

### new StatusService(services, options)
Status Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="StatusService+getStatus"></a>

### statusService.getStatus(context) ⇒ <code>Object</code>
Returns the current status for a given context

**Kind**: instance method of [<code>StatusService</code>](#StatusService)  
**Returns**: <code>Object</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |

<a name="StatusService+setStatus"></a>

### statusService.setStatus(context, newStatus)
Sets the status for a given context

**Kind**: instance method of [<code>StatusService</code>](#StatusService)  
**Emits**: <code>event:&quot;status.statusChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |
| newStatus | <code>Object</code> | [description] |

<a name="StatusService+onStatusChanged"></a>

### statusService.onStatusChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Status:statusChanged events

**Kind**: instance method of [<code>StatusService</code>](#StatusService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_StatusServicestatus.statusChanged"></a>

### "status.statusChanged" (context, new, old)
Status changed event

**Kind**: event emitted by [<code>StatusService</code>](#StatusService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 
| new | <code>object</code> | 
| old | <code>object</code> | 

