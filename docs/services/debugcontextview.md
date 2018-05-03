<a name="DebugContextViewService"></a>

## DebugContextViewService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [DebugContextViewService](#DebugContextViewService) ⇐ <code>Service</code>
    * _constructors_
        * [new DebugContextViewService(services, options)](#new_DebugContextViewService_new)
    * _methods_
        * [.getViewURI(type)](#DebugContextViewService+getViewURI) ⇒ <code>string</code>
        * [.getViewTitle(viewName)](#DebugContextViewService+getViewTitle) ⇒ <code>string</code>
        * [.getEnabledPanels()](#DebugContextViewService+getEnabledPanels) ⇒ <code>Array.&lt;Object&gt;</code>
        * [.isPanelEnabled(name)](#DebugContextViewService+isPanelEnabled) ⇒ <code>Boolean</code>
        * [.enablePanels(names)](#DebugContextViewService+enablePanels)
        * [.disablePanels(names)](#DebugContextViewService+disablePanels)
        * [.enablePanel(name)](#DebugContextViewService+enablePanel)
        * [.disablePanel(name)](#DebugContextViewService+disablePanel)
        * [.createConsole(service)](#DebugContextViewService+createConsole) ⇒ <code>Object</code>
        * [.createDebugger(service)](#DebugContextViewService+createDebugger) ⇒ <code>Object</code>
        * [.toggleConsole()](#DebugContextViewService+toggleConsole)
        * [.toggleDebugger()](#DebugContextViewService+toggleDebugger)
        * [.activateConsole()](#DebugContextViewService+activateConsole)
        * [.activateDebugger()](#DebugContextViewService+activateDebugger)
        * [.deactivateConsole()](#DebugContextViewService+deactivateConsole)
        * [.deactivateDebugger()](#DebugContextViewService+deactivateDebugger)
        * [.onDebuggerActivated(callback)](#DebugContextViewService+onDebuggerActivated) ⇒ <code>Disposable</code>
        * [.onConsoleActivated(callback)](#DebugContextViewService+onConsoleActivated) ⇒ <code>Disposable</code>
        * [.onDebuggerDeactivated(callback)](#DebugContextViewService+onDebuggerDeactivated) ⇒ <code>Disposable</code>
        * [.onConsoleDeactivated(callback)](#DebugContextViewService+onConsoleDeactivated) ⇒ <code>Disposable</code>
    * _events_
        * ["debugcontextview.debuggerActivated" (string)](#event_DebugContextViewServicedebugcontextview.debuggerActivated)
        * ["debugcontextview.consoleActivated" (string)](#event_DebugContextViewServicedebugcontextview.consoleActivated)
        * ["debugcontextview.debuggerDeactivated" (string)](#event_DebugContextViewServicedebugcontextview.debuggerDeactivated)
        * ["debugcontextview.consoleDeativated" (string)](#event_DebugContextViewServicedebugcontextview.consoleDeativated)

<a name="new_DebugContextViewService_new"></a>

### new DebugContextViewService(services, options)
Debug Context View Service
The views for a specific debug context


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="DebugContextViewService+getViewURI"></a>

### debugContextViewService.getViewURI(type) ⇒ <code>string</code>
Get the URI for a view type (debug-view,console-view)

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Returns**: <code>string</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | [description] |

<a name="DebugContextViewService+getViewTitle"></a>

### debugContextViewService.getViewTitle(viewName) ⇒ <code>string</code>
Get the title for a view type (debug-view, console-view)

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Returns**: <code>string</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| viewName | <code>string</code> | [description] |

<a name="DebugContextViewService+getEnabledPanels"></a>

### debugContextViewService.getEnabledPanels() ⇒ <code>Array.&lt;Object&gt;</code>
Gets all panels enabled for the debug view in this context

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Returns**: <code>Array.&lt;Object&gt;</code> - [description]  
**Access**: public  
<a name="DebugContextViewService+isPanelEnabled"></a>

### debugContextViewService.isPanelEnabled(name) ⇒ <code>Boolean</code>
Returns true if a specific panel is enabled for this context

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="DebugContextViewService+enablePanels"></a>

### debugContextViewService.enablePanels(names)
Enables the panels provided for this context
Panel name can be one of:
breakpoints
context
watches
watchpoints
watches

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;String&gt;</code> | [description] |

<a name="DebugContextViewService+disablePanels"></a>

### debugContextViewService.disablePanels(names)
Disable the panels provided for this context

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;String&gt;</code> | [description] |

<a name="DebugContextViewService+enablePanel"></a>

### debugContextViewService.enablePanel(name)
Enable a panel for the debug view for this context
Panel name can be one of:
breakpoints
context
watches
watchpoints
watches

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="DebugContextViewService+disablePanel"></a>

### debugContextViewService.disablePanel(name)
Disable a panel for the debug view for this context

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  
**See**: enablePanel for list of supported panel names  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | [description] |

<a name="DebugContextViewService+createConsole"></a>

### debugContextViewService.createConsole(service) ⇒ <code>Object</code>
Create the console view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Returns**: <code>Object</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>Object</code> | [description] |

<a name="DebugContextViewService+createDebugger"></a>

### debugContextViewService.createDebugger(service) ⇒ <code>Object</code>
Create the debugger view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Returns**: <code>Object</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>Object</code> | [description] |

<a name="DebugContextViewService+toggleConsole"></a>

### debugContextViewService.toggleConsole()
Toggle the console view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  
<a name="DebugContextViewService+toggleDebugger"></a>

### debugContextViewService.toggleDebugger()
Toggle the debugger view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  
<a name="DebugContextViewService+activateConsole"></a>

### debugContextViewService.activateConsole()
Activate the console view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Emits**: <code>debugcontextview.event:consoleActivated</code>  
**Access**: public  
<a name="DebugContextViewService+activateDebugger"></a>

### debugContextViewService.activateDebugger()
Activate the debugger view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Emits**: <code>debugcontextview.event:debuggerActivated</code>  
**Access**: public  
<a name="DebugContextViewService+deactivateConsole"></a>

### debugContextViewService.deactivateConsole()
Deactivate the console view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Emits**: <code>debugcontextview.event:consoleDeactivated</code>  
**Access**: public  
<a name="DebugContextViewService+deactivateDebugger"></a>

### debugContextViewService.deactivateDebugger()
Deactivate the debugger view

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Emits**: <code>debugcontextview.event:debuggerDeactivated</code>  
**Access**: public  
<a name="DebugContextViewService+onDebuggerActivated"></a>

### debugContextViewService.onDebuggerActivated(callback) ⇒ <code>Disposable</code>
Subscribe to DebugContextView:debuggerActivated events

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="DebugContextViewService+onConsoleActivated"></a>

### debugContextViewService.onConsoleActivated(callback) ⇒ <code>Disposable</code>
Subscribe to DebugContextView:consoleActivated events

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="DebugContextViewService+onDebuggerDeactivated"></a>

### debugContextViewService.onDebuggerDeactivated(callback) ⇒ <code>Disposable</code>
Subscribe to DebugContextView:debuggerDeactivated events

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="DebugContextViewService+onConsoleDeactivated"></a>

### debugContextViewService.onConsoleDeactivated(callback) ⇒ <code>Disposable</code>
Subscribe to DebugContextView:consoleDeativated events

**Kind**: instance method of [<code>DebugContextViewService</code>](#DebugContextViewService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_DebugContextViewServicedebugcontextview.debuggerActivated"></a>

### "debugcontextview.debuggerActivated" (string)
Debugger View Activated

**Kind**: event emitted by [<code>DebugContextViewService</code>](#DebugContextViewService)  

| Param | Type |
| --- | --- |
| string | <code>context</code> | 

<a name="event_DebugContextViewServicedebugcontextview.consoleActivated"></a>

### "debugcontextview.consoleActivated" (string)
Console view Activated

**Kind**: event emitted by [<code>DebugContextViewService</code>](#DebugContextViewService)  

| Param | Type |
| --- | --- |
| string | <code>context</code> | 

<a name="event_DebugContextViewServicedebugcontextview.debuggerDeactivated"></a>

### "debugcontextview.debuggerDeactivated" (string)
Debugger View Deactivated

**Kind**: event emitted by [<code>DebugContextViewService</code>](#DebugContextViewService)  

| Param | Type |
| --- | --- |
| string | <code>context</code> | 

<a name="event_DebugContextViewServicedebugcontextview.consoleDeativated"></a>

### "debugcontextview.consoleDeativated" (string)
Console view deactivated

**Kind**: event emitted by [<code>DebugContextViewService</code>](#DebugContextViewService)  

| Param | Type |
| --- | --- |
| string | <code>context</code> | 

