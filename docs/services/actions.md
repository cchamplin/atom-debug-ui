<a name="ActionsService"></a>

## ActionsService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [ActionsService](#ActionsService) ⇐ <code>Service</code>
    * _constructors_
        * [new ActionsService(services, options)](#new_ActionsService_new)
    * _methods_
        * [.registerButton(id, context, text, classes, handler)](#ActionsService+registerButton) ⇒ <code>object</code>
        * [.hasButtonContext(context)](#ActionsService+hasButtonContext) ⇒ <code>Boolean</code>
        * [.getButtons(context)](#ActionsService+getButtons) ⇒ <code>Array.&lt;object&gt;</code>
        * [.getButton(id, context)](#ActionsService+getButton) ⇒ <code>object</code>
        * [.hasButton(id, context)](#ActionsService+hasButton) ⇒ <code>Boolean</code>
        * [.updateButton(id, context, text, classes)](#ActionsService+updateButton) ⇒ <code>object</code>
        * [.removeButton(id, context)](#ActionsService+removeButton)
        * [.getEnabledActionButtons()](#ActionsService+getEnabledActionButtons) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.getVisibleActionButtons()](#ActionsService+getVisibleActionButtons) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.isActionButtonEnabled(name)](#ActionsService+isActionButtonEnabled) ⇒ <code>Boolean</code>
        * [.isActionButtonVisible(name)](#ActionsService+isActionButtonVisible) ⇒ <code>Boolean</code>
        * [.enableActionButtons(names)](#ActionsService+enableActionButtons)
        * [.disableActionButtons(names)](#ActionsService+disableActionButtons)
        * [.showActionButtons(names)](#ActionsService+showActionButtons)
        * [.hideActionButtons(names)](#ActionsService+hideActionButtons)
        * [.enableActionButton(name)](#ActionsService+enableActionButton)
        * [.disableActionButton(name)](#ActionsService+disableActionButton)
        * [.showActionButton(name)](#ActionsService+showActionButton)
        * [.hideActionButton(name)](#ActionsService+hideActionButton)
        * [.onButtonRegistered(callback)](#ActionsService+onButtonRegistered) ⇒ <code>Disposable</code>
        * [.onButtonRemoved(callback)](#ActionsService+onButtonRemoved) ⇒ <code>Disposable</code>
        * [.onButtonUpdated(callback)](#ActionsService+onButtonUpdated) ⇒ <code>Disposable</code>
        * [.onActionButtonUpdated(callback)](#ActionsService+onActionButtonUpdated) ⇒ <code>Disposable</code>
        * [.onRun(callback)](#ActionsService+onRun) ⇒ <code>Disposable</code>
        * [.onAttach(callback)](#ActionsService+onAttach) ⇒ <code>Disposable</code>
        * [.onDetach(callback)](#ActionsService+onDetach) ⇒ <code>Disposable</code>
        * [.onContinue(callback)](#ActionsService+onContinue) ⇒ <code>Disposable</code>
        * [.onStepOver(callback)](#ActionsService+onStepOver) ⇒ <code>Disposable</code>
        * [.onStepInto(callback)](#ActionsService+onStepInto) ⇒ <code>Disposable</code>
        * [.onStepOut(callback)](#ActionsService+onStepOut) ⇒ <code>Disposable</code>
        * [.onStop(callback)](#ActionsService+onStop) ⇒ <code>Disposable</code>
        * [.emitAction(action, data)](#ActionsService+emitAction)
    * _events_
        * ["buttons.register" (type, context, data)](#event_ActionsServicebuttons.register)
        * ["buttons.update" (type, context, old, data)](#event_ActionsServicebuttons.update)
        * ["buttons.remove" (type, context, data)](#event_ActionsServicebuttons.remove)
        * ["actions.run" (context)](#event_ActionsServiceactions.run)
        * ["actions.stepOver" (context)](#event_ActionsServiceactions.stepOver)
        * ["actions.stepInto" (context)](#event_ActionsServiceactions.stepInto)
        * ["actions.stepOut" (context)](#event_ActionsServiceactions.stepOut)
        * ["actions.stop" (context)](#event_ActionsServiceactions.stop)
        * ["actions.detach" (context)](#event_ActionsServiceactions.detach)
        * ["actions.continue" (context)](#event_ActionsServiceactions.continue)
        * ["actions.attach" (context)](#event_ActionsServiceactions.attach)

<a name="new_ActionsService_new"></a>

### new ActionsService(services, options)
Actions Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="ActionsService+registerButton"></a>

### actionsService.registerButton(id, context, text, classes, handler) ⇒ <code>object</code>
Register a new button on the action bar

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Emits**: <code>event:&quot;buttons.register&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| context | <code>string</code> | 
| text | <code>string</code> | 
| classes | <code>Array.&lt;string&gt;</code> | 
| handler | <code>function</code> | 

<a name="ActionsService+hasButtonContext"></a>

### actionsService.hasButtonContext(context) ⇒ <code>Boolean</code>
Returns true if action button context exists

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ActionsService+getButtons"></a>

### actionsService.getButtons(context) ⇒ <code>Array.&lt;object&gt;</code>
Get all buttons for a specific context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ActionsService+getButton"></a>

### actionsService.getButton(id, context) ⇒ <code>object</code>
Get an button by ID

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| context | <code>string</code> | 

<a name="ActionsService+hasButton"></a>

### actionsService.hasButton(id, context) ⇒ <code>Boolean</code>
Returns true if a specific button exists

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| context | <code>string</code> | 

<a name="ActionsService+updateButton"></a>

### actionsService.updateButton(id, context, text, classes) ⇒ <code>object</code>
Update an buttons properties

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Emits**: <code>event:&quot;buttons.update&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| context | <code>string</code> | 
| text | <code>string</code> | 
| classes | <code>Array.&lt;string&gt;</code> | 

<a name="ActionsService+removeButton"></a>

### actionsService.removeButton(id, context)
Remove a specific button

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Emits**: <code>event:&quot;buttons.remove&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| context | <code>string</code> | 

<a name="ActionsService+getEnabledActionButtons"></a>

### actionsService.getEnabledActionButtons() ⇒ <code>Array.&lt;Object&gt;</code>
Gets all action buttons for the debug view in this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  
<a name="ActionsService+getVisibleActionButtons"></a>

### actionsService.getVisibleActionButtons() ⇒ <code>Array.&lt;Object&gt;</code>
Gets all visible action buttons for the debug view in this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  
<a name="ActionsService+isActionButtonEnabled"></a>

### actionsService.isActionButtonEnabled(name) ⇒ <code>Boolean</code>
Returns true if a specific action button is enabled for this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="ActionsService+isActionButtonVisible"></a>

### actionsService.isActionButtonVisible(name) ⇒ <code>Boolean</code>
Returns true if a specific action button is visible for this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="ActionsService+enableActionButtons"></a>

### actionsService.enableActionButtons(names)
Enables the buttons provided for this context
Button name can be one of:
continue
stop
step-over
step-into
step-out
run
attach

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;String&gt;</code> | [description] |

<a name="ActionsService+disableActionButtons"></a>

### actionsService.disableActionButtons(names)
Disable the buttons provided for this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;String&gt;</code> | [description] |

<a name="ActionsService+showActionButtons"></a>

### actionsService.showActionButtons(names)
Shows the buttons provided for this context
Button name can be one of:
continue
stop
step-over
step-into
step-out
run
attach

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;String&gt;</code> | [description] |

<a name="ActionsService+hideActionButtons"></a>

### actionsService.hideActionButtons(names)
Hides the buttons provided for this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;String&gt;</code> | [description] |

<a name="ActionsService+enableActionButton"></a>

### actionsService.enableActionButton(name)
Enable a button for the debug view action bar in this context
Button name can be one of:
continue
stop
step-over
step-into
step-out
run
attach

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="ActionsService+disableActionButton"></a>

### actionsService.disableActionButton(name)
Disable a button for the debug view action bar in this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  
**See**: enableButton for list of valid button names  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="ActionsService+showActionButton"></a>

### actionsService.showActionButton(name)
Enable a button for the debug view action bar in this context
Button name can be one of:
continue
stop
step-over
step-into
step-out
run
attach

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="ActionsService+hideActionButton"></a>

### actionsService.hideActionButton(name)
Disable a button for the debug view action bar in this context

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  
**See**: enableButton for list of valid button names  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="ActionsService+onButtonRegistered"></a>

### actionsService.onButtonRegistered(callback) ⇒ <code>Disposable</code>
Subscribe to Button:register events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onButtonRemoved"></a>

### actionsService.onButtonRemoved(callback) ⇒ <code>Disposable</code>
Subscribe to Button:remove events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onButtonUpdated"></a>

### actionsService.onButtonUpdated(callback) ⇒ <code>Disposable</code>
Subscribe to Button:update events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onActionButtonUpdated"></a>

### actionsService.onActionButtonUpdated(callback) ⇒ <code>Disposable</code>
Subscribe to Button:actionButtonUpdate events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onRun"></a>

### actionsService.onRun(callback) ⇒ <code>Disposable</code>
Subscribe to Action:run events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onAttach"></a>

### actionsService.onAttach(callback) ⇒ <code>Disposable</code>
Subscribe to Action:attach events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onDetach"></a>

### actionsService.onDetach(callback) ⇒ <code>Disposable</code>
Subscribe to Action:detach events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onContinue"></a>

### actionsService.onContinue(callback) ⇒ <code>Disposable</code>
Subscribe to Action:continue events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onStepOver"></a>

### actionsService.onStepOver(callback) ⇒ <code>Disposable</code>
Subscribe to Action.stepOver events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onStepInto"></a>

### actionsService.onStepInto(callback) ⇒ <code>Disposable</code>
Subscribe to Action:stepInto events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onStepOut"></a>

### actionsService.onStepOut(callback) ⇒ <code>Disposable</code>
Subscribe to Action:stepOut events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+onStop"></a>

### actionsService.onStop(callback) ⇒ <code>Disposable</code>
Subscribe to Action:stop events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ActionsService+emitAction"></a>

### actionsService.emitAction(action, data)
Used to fire specific action events

**Kind**: instance method of [<code>ActionsService</code>](#ActionsService)  
**Access**: package  

| Param | Type |
| --- | --- |
| action | <code>string</code> | 
| data | <code>object</code> | 

<a name="event_ActionsServicebuttons.register"></a>

### "buttons.register" (type, context, data)
Button Register

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| data | <code>object</code> | 

<a name="event_ActionsServicebuttons.update"></a>

### "buttons.update" (type, context, old, data)
Button Updated

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| old | <code>object</code> | 
| data | <code>object</code> | 

<a name="event_ActionsServicebuttons.remove"></a>

### "buttons.remove" (type, context, data)
Button Register

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| data | <code>object</code> | 

<a name="event_ActionsServiceactions.run"></a>

### "actions.run" (context)
Actions Run

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.stepOver"></a>

### "actions.stepOver" (context)
Actions Step Over

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.stepInto"></a>

### "actions.stepInto" (context)
Actions Step Into

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.stepOut"></a>

### "actions.stepOut" (context)
Actions StepOut

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.stop"></a>

### "actions.stop" (context)
Actions Stop

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.detach"></a>

### "actions.detach" (context)
Actions Detach

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.continue"></a>

### "actions.continue" (context)
Actions Continue

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="event_ActionsServiceactions.attach"></a>

### "actions.attach" (context)
Actions Attach

**Kind**: event emitted by [<code>ActionsService</code>](#ActionsService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

