<a name="ServicesRegistry"></a>

## ServicesRegistry
**Kind**: global class  
**Access**: package  

* [ServicesRegistry](#ServicesRegistry)
    * [.addDebugEngine(engine)](#ServicesRegistry+addDebugEngine)
    * [.getAllServices()](#ServicesRegistry+getAllServices) ⇒ <code>Array.&lt;ServiceManager&gt;</code>
    * [.addServiceManager(services)](#ServicesRegistry+addServiceManager)
    * [.serviceManagerActivated(event)](#ServicesRegistry+serviceManagerActivated)
    * [.locateServicesForEditor()](#ServicesRegistry+locateServicesForEditor) ⇒ <code>ServiceManager</code>
    * [.locateServicesForScope(scopeName)](#ServicesRegistry+locateServicesForScope) ⇒ <code>ServiceManager</code>

<a name="ServicesRegistry+addDebugEngine"></a>

### servicesRegistry.addDebugEngine(engine)
Add a debug engine to the registry

**Kind**: instance method of [<code>ServicesRegistry</code>](#ServicesRegistry)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| engine | <code>DebugEngine</code> | Debug engine |

<a name="ServicesRegistry+getAllServices"></a>

### servicesRegistry.getAllServices() ⇒ <code>Array.&lt;ServiceManager&gt;</code>
Gets all registered service managers

**Kind**: instance method of [<code>ServicesRegistry</code>](#ServicesRegistry)  
**Returns**: <code>Array.&lt;ServiceManager&gt;</code> - Array of service managers  
**Access**: public  
<a name="ServicesRegistry+addServiceManager"></a>

### servicesRegistry.addServiceManager(services)
Add service manager to registry

**Kind**: instance method of [<code>ServicesRegistry</code>](#ServicesRegistry)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> | Service Manager |

<a name="ServicesRegistry+serviceManagerActivated"></a>

### servicesRegistry.serviceManagerActivated(event)
Callback for when a service manager has been activated

**Kind**: instance method of [<code>ServicesRegistry</code>](#ServicesRegistry)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event for activation |
| event.name | <code>string</code> | Engine name |
| event.services | <code>string</code> | ServiceManager instance |

<a name="ServicesRegistry+locateServicesForEditor"></a>

### servicesRegistry.locateServicesForEditor() ⇒ <code>ServiceManager</code>
Gets a service manager for a specific editor based on Grammar

**Kind**: instance method of [<code>ServicesRegistry</code>](#ServicesRegistry)  
**Returns**: <code>ServiceManager</code> - Service Manager  
**Access**: public  
<a name="ServicesRegistry+locateServicesForScope"></a>

### servicesRegistry.locateServicesForScope(scopeName) ⇒ <code>ServiceManager</code>
Gets a service manager for a specific grammar scope name

**Kind**: instance method of [<code>ServicesRegistry</code>](#ServicesRegistry)  
**Returns**: <code>ServiceManager</code> - Service Manager  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| scopeName | <code>string</code> | Grammar scope name |

