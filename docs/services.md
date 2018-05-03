<a name="ServiceManager"></a>

## ServiceManager
Provided to packages that consume "debug-ui"
 ```
 "consumedServices": {
  "debug-ui": {
    "versions": {
      "0.1.0": "consumeDebugUI"
    }
  }
 ```

**Kind**: global class  

* [ServiceManager](#ServiceManager)
    * [.activate(name, state)](#ServiceManager+activate)
    * [.isActivated()](#ServiceManager+isActivated) ⇒ <code>Boolean</code>
    * [.getName()](#ServiceManager+getName) ⇒ <code>string</code>
    * [.hasService(name)](#ServiceManager+hasService) ⇒ <code>Boolean</code>
    * [.fetchService(name)](#ServiceManager+fetchService) ⇒ <code>Promise</code>
    * [.requestService(name, options, callback)](#ServiceManager+requestService)
    * [.serialize()](#ServiceManager+serialize) ⇒ <code>Object</code> \| <code>Serialized-Data</code>
    * [.registerService(name, service, callback)](#ServiceManager+registerService) ⇒ <code>null</code> \| <code>Service</code>
    * [.unregisterService(name)](#ServiceManager+unregisterService)
    * [.onServiceRegistered(callback)](#ServiceManager+onServiceRegistered) ⇒ <code>Disposable</code>
    * [.onServiceDeregistered(callback)](#ServiceManager+onServiceDeregistered) ⇒ <code>Disposable</code>
    * [.onActivated(callback)](#ServiceManager+onActivated) ⇒ <code>Disposable</code>
    * [.destroy()](#ServiceManager+destroy)

<a name="ServiceManager+activate"></a>

### serviceManager.activate(name, state)
Services activation
Should be called by consumers after receiving DebugUI services

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Emits**: <code>atom.debug-ui.services#event:activated</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of debugger, must match an engine name |
| state | <code>object</code> | Serialized state |

<a name="ServiceManager+isActivated"></a>

### serviceManager.isActivated() ⇒ <code>Boolean</code>
Returns true or false if activate() has succeeded

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Access**: public  
<a name="ServiceManager+getName"></a>

### serviceManager.getName() ⇒ <code>string</code>
Services activation name via activate()

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Returns**: <code>string</code> - Name of activated services  
**Access**: public  
<a name="ServiceManager+hasService"></a>

### serviceManager.hasService(name) ⇒ <code>Boolean</code>
Returns true if services have been activated and the specified
service has been registered

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Throws**:

- Exception if services have not been activated

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Service name |

<a name="ServiceManager+fetchService"></a>

### serviceManager.fetchService(name) ⇒ <code>Promise</code>
Returns are promise that is resolved when the specified service
has been registered and is available

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Returns**: <code>Promise</code> - Promise resolves with the Service object  
**Access**: public  
**Fulfil**: <code>Service</code> - Requested service object  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Service name |

<a name="ServiceManager+requestService"></a>

### serviceManager.requestService(name, options, callback)
Primary means of accessing debug-ui services
Available services:
* Breakpoints
* Stack
* Scope
* Watchpoints
* Watches
* Actions
* Console
* Status
* DebugView
Always Available Services (do not need to be requested):
* Logger

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Throws**:

- Exception if service manager has not been activated

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | [description] |
| options | <code>object</code> | [description] |
| callback | <code>function</code> | [description] |

<a name="ServiceManager+serialize"></a>

### serviceManager.serialize() ⇒ <code>Object</code> \| <code>Serialized-Data</code>
Provides serialized service data for loaded services

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Oublic**:   
<a name="ServiceManager+registerService"></a>

### serviceManager.registerService(name, service, callback) ⇒ <code>null</code> \| <code>Service</code>
Register third party services with the service manager

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Returns**: <code>null</code> \| <code>Service</code> - [description]  
**Throws**:

- Exception if service manager has not been activated

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>name</code> | Unique name of service |
| service | <code>object</code> \| <code>Service</code> | Service object to be registered |
| callback | <code>function</code> | Callback to be executed when service is registered |

<a name="ServiceManager+unregisterService"></a>

### serviceManager.unregisterService(name)
Unregister the given service from the service manager

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Service Name |

<a name="ServiceManager+onServiceRegistered"></a>

### serviceManager.onServiceRegistered(callback) ⇒ <code>Disposable</code>
Subscribe to Service Registration events

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ServiceManager+onServiceDeregistered"></a>

### serviceManager.onServiceDeregistered(callback) ⇒ <code>Disposable</code>
Subscribe to Service Deregistration events

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ServiceManager+onActivated"></a>

### serviceManager.onActivated(callback) ⇒ <code>Disposable</code>
Subscribe to Service activation events

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ServiceManager+destroy"></a>

### serviceManager.destroy()
Unregisters all services and destroys the service manager

**Kind**: instance method of [<code>ServiceManager</code>](#ServiceManager)  
**Access**: public  
