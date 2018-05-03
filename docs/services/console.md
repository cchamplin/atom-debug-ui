<a name="ConsoleService"></a>

## ConsoleService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [ConsoleService](#ConsoleService) ⇐ <code>Service</code>
    * _constructors_
        * [new ConsoleService(services, options)](#new_ConsoleService_new)
    * _methods_
        * [.getMessages(context, index)](#ConsoleService+getMessages) ⇒ <code>object</code>
        * [.nextConsoleCommand(context)](#ConsoleService+nextConsoleCommand)
        * [.previousConsoleCommand(context)](#ConsoleService+previousConsoleCommand)
        * [.executeExpression(context, expression)](#ConsoleService+executeExpression)
        * [.addMessage(context, message)](#ConsoleService+addMessage)
        * [.registerContext(context)](#ConsoleService+registerContext)
        * [.unregisterContext(context)](#ConsoleService+unregisterContext)
        * [.broadcastMessage(message)](#ConsoleService+broadcastMessage)
        * [.clearMessages(context)](#ConsoleService+clearMessages)
        * [.onExecuteExpression(callback)](#ConsoleService+onExecuteExpression) ⇒ <code>Disposable</code>
        * [.onPreviousCommand(callback)](#ConsoleService+onPreviousCommand) ⇒ <code>Disposable</code>
        * [.onMessageAdded(callback)](#ConsoleService+onMessageAdded) ⇒ <code>Disposable</code>
        * [.onMessagesCleared(callback)](#ConsoleService+onMessagesCleared) ⇒ <code>Disposable</code>
        * [.onNextCommand(callback)](#ConsoleService+onNextCommand) ⇒ <code>Disposable</code>
    * _events_
        * ["console.nextCommand" (type, context, expression)](#event_ConsoleServiceconsole.nextCommand)
        * ["console.previousCommand" (type, context, expression)](#event_ConsoleServiceconsole.previousCommand)
        * ["console.executeExpression" (context, expression)](#event_ConsoleServiceconsole.executeExpression)
        * ["console.messageAdded" (total, context, message)](#event_ConsoleServiceconsole.messageAdded)
        * ["console.messagesCleared" (context)](#event_ConsoleServiceconsole.messagesCleared)

<a name="new_ConsoleService_new"></a>

### new ConsoleService(services, options)
Console Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="ConsoleService+getMessages"></a>

### consoleService.getMessages(context, index) ⇒ <code>object</code>
Return messages after a specific index for a specific context

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 
| index | <code>int</code> | 

<a name="ConsoleService+nextConsoleCommand"></a>

### consoleService.nextConsoleCommand(context)
Scroll to next console command in history

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Emits**: <code>event:&quot;console.nextCommand&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ConsoleService+previousConsoleCommand"></a>

### consoleService.previousConsoleCommand(context)
Scroll to previous console command in history

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Emits**: <code>event:&quot;console.previousCommand&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ConsoleService+executeExpression"></a>

### consoleService.executeExpression(context, expression)
Attempt to execute a console command

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Emits**: <code>event:&quot;console.executeExpression&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 
| expression | <code>string</code> | 

<a name="ConsoleService+addMessage"></a>

### consoleService.addMessage(context, message)
Add a message to the console

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Emits**: <code>event:&quot;console.messageAdded&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 
| message | <code>string</code> | 

<a name="ConsoleService+registerContext"></a>

### consoleService.registerContext(context)
Register a context for the console

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ConsoleService+unregisterContext"></a>

### consoleService.unregisterContext(context)
Remove a registered context

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ConsoleService+broadcastMessage"></a>

### consoleService.broadcastMessage(message)
Adds a message to all registered contexts

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="ConsoleService+clearMessages"></a>

### consoleService.clearMessages(context)
Clear all console messages for a specific context

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Emits**: <code>event:&quot;console.messagesCleared&quot;</code>  
**Access**: public  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

<a name="ConsoleService+onExecuteExpression"></a>

### consoleService.onExecuteExpression(callback) ⇒ <code>Disposable</code>
Subscribe to Console:executeExpression events

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ConsoleService+onPreviousCommand"></a>

### consoleService.onPreviousCommand(callback) ⇒ <code>Disposable</code>
Subscribe to Console:previousCommand events

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ConsoleService+onMessageAdded"></a>

### consoleService.onMessageAdded(callback) ⇒ <code>Disposable</code>
Subscribe to Console:messageAdded events

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ConsoleService+onMessagesCleared"></a>

### consoleService.onMessagesCleared(callback) ⇒ <code>Disposable</code>
Subscribe to Console:messagesCleared events

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ConsoleService+onNextCommand"></a>

### consoleService.onNextCommand(callback) ⇒ <code>Disposable</code>
Subscribe to Console:nextCommand events

**Kind**: instance method of [<code>ConsoleService</code>](#ConsoleService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_ConsoleServiceconsole.nextCommand"></a>

### "console.nextCommand" (type, context, expression)
Next command in console activated

**Kind**: event emitted by [<code>ConsoleService</code>](#ConsoleService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| expression | <code>string</code> | 

<a name="event_ConsoleServiceconsole.previousCommand"></a>

### "console.previousCommand" (type, context, expression)
Previous command in console activated

**Kind**: event emitted by [<code>ConsoleService</code>](#ConsoleService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| expression | <code>string</code> | 

<a name="event_ConsoleServiceconsole.executeExpression"></a>

### "console.executeExpression" (context, expression)
User is attempting to execute an expression

**Kind**: event emitted by [<code>ConsoleService</code>](#ConsoleService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 
| expression | <code>string</code> | 

<a name="event_ConsoleServiceconsole.messageAdded"></a>

### "console.messageAdded" (total, context, message)
A message was added to the console

**Kind**: event emitted by [<code>ConsoleService</code>](#ConsoleService)  

| Param | Type |
| --- | --- |
| total | <code>int</code> | 
| context | <code>string</code> | 
| message | <code>string</code> | 

<a name="event_ConsoleServiceconsole.messagesCleared"></a>

### "console.messagesCleared" (context)
All messages in the console were cleared

**Kind**: event emitted by [<code>ConsoleService</code>](#ConsoleService)  

| Param | Type |
| --- | --- |
| context | <code>string</code> | 

