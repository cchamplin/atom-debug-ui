<a name="StackService"></a>

## StackService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [StackService](#StackService) ⇐ <code>Service</code>
    * _constructors_
        * [new StackService(services, options)](#new_StackService_new)
    * _methods_
        * [.getStackFrames(context)](#StackService+getStackFrames) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.getStack(context)](#StackService+getStack) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.clearAllStackFrames()](#StackService+clearAllStackFrames)
        * [.clearStackFrames(context)](#StackService+clearStackFrames) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.registerStack(context)](#StackService+registerStack)
        * [.unregisterStack(context)](#StackService+unregisterStack)
        * [.setStack(context, frames)](#StackService+setStack)
        * [.addFrame(context, frame)](#StackService+addFrame)
        * [.removeFrame(context, item)](#StackService+removeFrame) ⇒ <code>Object</code>
        * [.hasStackForContext(context)](#StackService+hasStackForContext) ⇒ <code>Boolean</code>
        * [.selectStackFrame(data)](#StackService+selectStackFrame)
        * [.onStackRegistered(callback)](#StackService+onStackRegistered) ⇒ <code>Disposable</code>
        * [.onStackUnregistered(callback)](#StackService+onStackUnregistered) ⇒ <code>Disposable</code>
        * [.onFrameAdded(callback)](#StackService+onFrameAdded) ⇒ <code>Disposable</code>
        * [.onFrameRemoved(callback)](#StackService+onFrameRemoved) ⇒ <code>Disposable</code>
        * [.onFramesSet(callback)](#StackService+onFramesSet) ⇒ <code>Disposable</code>
        * [.onFramesChanged(callback)](#StackService+onFramesChanged) ⇒ <code>Disposable</code>
        * [.onFramesCleared(callback)](#StackService+onFramesCleared) ⇒ <code>Disposable</code>
        * [.onFrameSelected(callback)](#StackService+onFrameSelected) ⇒ <code>Disposable</code>
    * _events_
        * ["stack.stackFramesCleared" (type, context, removed)](#event_StackServicestack.stackFramesCleared)
        * ["stack.stackFramesChanged" (type, context, removed, added)](#event_StackServicestack.stackFramesChanged)
        * ["stack.stackRegistered" (type, context)](#event_StackServicestack.stackRegistered)
        * ["stack.stackUnregistered" (type, context, removed)](#event_StackServicestack.stackUnregistered)
        * ["stack.stackFramesSet" (type, context, removed, added)](#event_StackServicestack.stackFramesSet)
        * ["stack.stackFramesAdded" (type, context, added)](#event_StackServicestack.stackFramesAdded)
        * ["stack.stackFramesRemoved" (type, context, removed)](#event_StackServicestack.stackFramesRemoved)
        * ["stack.stackFrameSelected" (frame, context, codepoint)](#event_StackServicestack.stackFrameSelected)

<a name="new_StackService_new"></a>

### new StackService(services, options)
Stack Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="StackService+getStackFrames"></a>

### stackService.getStackFrames(context) ⇒ <code>Array.&lt;Object&gt;</code>
Get the stack frames for a given context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |

<a name="StackService+getStack"></a>

### stackService.getStack(context) ⇒ <code>Array.&lt;Object&gt;</code>
Alias for getStackFrames

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |

<a name="StackService+clearAllStackFrames"></a>

### stackService.clearAllStackFrames()
Clear the stack frames for every context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  
<a name="StackService+clearStackFrames"></a>

### stackService.clearStackFrames(context) ⇒ <code>Array.&lt;Object&gt;</code>
Clear the stack frames for a given context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Emits**: <code>event:&quot;stack.stackFramesCleared&quot;</code>, <code>event:&quot;stack.stackFramesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |

<a name="StackService+registerStack"></a>

### stackService.registerStack(context)
Register a context to have stack frames

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Emits**: <code>event:&quot;stack.stackRegistered&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |

<a name="StackService+unregisterStack"></a>

### stackService.unregisterStack(context)
Unregister a context and clear all stack frames for the given context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Emits**: <code>event:&quot;stack.stackUnregistered&quot;</code>, <code>event:&quot;stack.stackFramesCleared&quot;</code>, <code>event:&quot;stack.stackFramesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |

<a name="StackService+setStack"></a>

### stackService.setStack(context, frames)
Sets the stack for a given context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Emits**: <code>event:&quot;stack.stackFramesSet&quot;</code>, <code>event:&quot;stack.stackFramesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |
| frames | <code>Array.&lt;Object&gt;</code> | [description] |

<a name="StackService+addFrame"></a>

### stackService.addFrame(context, frame)
Adds a single stack frame to a given context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Emits**: <code>event:&quot;stack.stackFrameAdded&quot;</code>, <code>event:&quot;stack.stackFramesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |
| frame | <code>Object</code> | [description] |

<a name="StackService+removeFrame"></a>

### stackService.removeFrame(context, item) ⇒ <code>Object</code>
Removes a single stack frame from a given context

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Returns**: <code>Object</code> - [description]  
**Emits**: <code>event:&quot;stack.stackFrameRemoved&quot;</code>, <code>event:&quot;stack.stackFramesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |
| item | <code>Object</code> | [description] |

<a name="StackService+hasStackForContext"></a>

### stackService.hasStackForContext(context) ⇒ <code>Boolean</code>
Returns true if a given context has been registered

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>String</code> | [description] |

<a name="StackService+selectStackFrame"></a>

### stackService.selectStackFrame(data)
User selected a specific stack frame

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Emits**: <code>event:&quot;stack.stackFrameSelected&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | [description] |

<a name="StackService+onStackRegistered"></a>

### stackService.onStackRegistered(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackRegistered events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onStackUnregistered"></a>

### stackService.onStackUnregistered(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackUnregistered events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onFrameAdded"></a>

### stackService.onFrameAdded(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackFrameAdded events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onFrameRemoved"></a>

### stackService.onFrameRemoved(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackFrameRemoved events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onFramesSet"></a>

### stackService.onFramesSet(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackFramesSet events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onFramesChanged"></a>

### stackService.onFramesChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackFramesChanged events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onFramesCleared"></a>

### stackService.onFramesCleared(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackFramesCleared events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="StackService+onFrameSelected"></a>

### stackService.onFrameSelected(callback) ⇒ <code>Disposable</code>
Subscribe to Stack:stackFrameSelected events

**Kind**: instance method of [<code>StackService</code>](#StackService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_StackServicestack.stackFramesCleared"></a>

### "stack.stackFramesCleared" (type, context, removed)
Stack frames cleared event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_StackServicestack.stackFramesChanged"></a>

### "stack.stackFramesChanged" (type, context, removed, added)
Stack frames changed event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_StackServicestack.stackRegistered"></a>

### "stack.stackRegistered" (type, context)
Stack registered event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 

<a name="event_StackServicestack.stackUnregistered"></a>

### "stack.stackUnregistered" (type, context, removed)
Stack unregistered event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_StackServicestack.stackFramesSet"></a>

### "stack.stackFramesSet" (type, context, removed, added)
Stack frames set event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_StackServicestack.stackFramesAdded"></a>

### "stack.stackFramesAdded" (type, context, added)
Stack frames added event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_StackServicestack.stackFramesRemoved"></a>

### "stack.stackFramesRemoved" (type, context, removed)
Stack frames removed event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_StackServicestack.stackFrameSelected"></a>

### "stack.stackFrameSelected" (frame, context, codepoint)
Stack frame selected event

**Kind**: event emitted by [<code>StackService</code>](#StackService)  

| Param | Type |
| --- | --- |
| frame | <code>object</code> | 
| context | <code>string</code> | 
| codepoint | <code>object</code> | 

