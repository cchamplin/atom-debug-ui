<a name="ScopeService"></a>

## ScopeService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [ScopeService](#ScopeService) ⇐ <code>Service</code>
    * _constructors_
        * [new ScopeService(services, options)](#new_ScopeService_new)
    * _methods_
        * [.getScopesForContext(context)](#ScopeService+getScopesForContext) ⇒ <code>Array.&lt;object&gt;</code>
        * [.getScope(context, scopeId)](#ScopeService+getScope) ⇒ <code>object</code>
        * [.clearScopes(context)](#ScopeService+clearScopes) ⇒ <code>Array.&lt;object&gt;</code>
        * [.setData(context, scopeId, scopeData)](#ScopeService+setData)
        * [.registerScope(context, scopeId, name)](#ScopeService+registerScope)
        * [.removeScope(context, scopeId)](#ScopeService+removeScope) ⇒ <code>Object</code>
        * [.hasScopesForContext(context)](#ScopeService+hasScopesForContext) ⇒ <code>Boolean</code>
        * [.hasScopeForContext(context, scopeId)](#ScopeService+hasScopeForContext) ⇒ <code>Boolean</code>
        * [.onScopeRegistered(callback)](#ScopeService+onScopeRegistered) ⇒ <code>Disposable</code>
        * [.onScopeUnregistered(callback)](#ScopeService+onScopeUnregistered) ⇒ <code>Disposable</code>
        * [.onScopesChanged(callback)](#ScopeService+onScopesChanged) ⇒ <code>Disposable</code>
        * [.onScopeDataSet(callback)](#ScopeService+onScopeDataSet) ⇒ <code>Disposable</code>
        * [.onScopesCleared(callback)](#ScopeService+onScopesCleared) ⇒ <code>Disposable</code>
    * _events_
        * ["scopes.scopesCleared" (type, context, removed)](#event_ScopeServicescopes.scopesCleared)
        * ["scopes.scopesChanged" (type, context, removed, added)](#event_ScopeServicescopes.scopesChanged)
        * ["scopes.scopeUnregistered" (type, context, removed)](#event_ScopeServicescopes.scopeUnregistered)
        * ["scopes.scopeDataSet" (type, context, scopeId, removed, added)](#event_ScopeServicescopes.scopeDataSet)
        * ["scopes.scopeRegistered" (type, context, data)](#event_ScopeServicescopes.scopeRegistered)

<a name="new_ScopeService_new"></a>

### new ScopeService(services, options)
Used to manage debug scopes


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="ScopeService+getScopesForContext"></a>

### scopeService.getScopesForContext(context) ⇒ <code>Array.&lt;object&gt;</code>
Fetches all scopes for a given context

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |

<a name="ScopeService+getScope"></a>

### scopeService.getScope(context, scopeId) ⇒ <code>object</code>
Get a specific scope for a given context

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Returns**: <code>object</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |
| scopeId | <code>string</code> | [description] |

<a name="ScopeService+clearScopes"></a>

### scopeService.clearScopes(context) ⇒ <code>Array.&lt;object&gt;</code>
Clear all registered scopes for a given context

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Returns**: <code>Array.&lt;object&gt;</code> - [description]  
**Emits**: <code>event:&quot;scopes.scopesCleared&quot;</code>, <code>event:&quot;scopes.scopesChanged&quot;</code>, <code>event:&quot;scopes.scopeUnregistered&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |

<a name="ScopeService+setData"></a>

### scopeService.setData(context, scopeId, scopeData)
Set the data for a specific scope in a given context

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Emits**: <code>event:&quot;scopes.scopeDataset&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |
| scopeId | <code>string</code> | [description] |
| scopeData | <code>object</code> | [description] |

<a name="ScopeService+registerScope"></a>

### scopeService.registerScope(context, scopeId, name)
Register a scope in a given context

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Emits**: <code>event:&quot;scopes.scopeRegistered&quot;</code>, <code>event:&quot;scopes.scopesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |
| scopeId | <code>string</code> | [description] |
| name | <code>string</code> | [description] |

<a name="ScopeService+removeScope"></a>

### scopeService.removeScope(context, scopeId) ⇒ <code>Object</code>
Remove a specific scope in a given context

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Returns**: <code>Object</code> - [description]  
**Emits**: <code>event:&quot;scopes.scopeUnregistered&quot;</code>, <code>event:&quot;scopes.scopesChanged&quot;</code>  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |
| scopeId | <code>string</code> | [description] |

<a name="ScopeService+hasScopesForContext"></a>

### scopeService.hasScopesForContext(context) ⇒ <code>Boolean</code>
Return true if a context has scopes

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |

<a name="ScopeService+hasScopeForContext"></a>

### scopeService.hasScopeForContext(context, scopeId) ⇒ <code>Boolean</code>
Return true if a given context has a specific scope

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>string</code> | [description] |
| scopeId | <code>string</code> | [description] |

<a name="ScopeService+onScopeRegistered"></a>

### scopeService.onScopeRegistered(callback) ⇒ <code>Disposable</code>
Subscribe to Scopes:scopeRegistered events

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ScopeService+onScopeUnregistered"></a>

### scopeService.onScopeUnregistered(callback) ⇒ <code>Disposable</code>
Subscribe to Scopes:scopeUnregistered events

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ScopeService+onScopesChanged"></a>

### scopeService.onScopesChanged(callback) ⇒ <code>Disposable</code>
Subscribe to Scopes:scopesChanged events

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ScopeService+onScopeDataSet"></a>

### scopeService.onScopeDataSet(callback) ⇒ <code>Disposable</code>
Subscribe to Scopes:scopeDataSet events

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="ScopeService+onScopesCleared"></a>

### scopeService.onScopesCleared(callback) ⇒ <code>Disposable</code>
Subscribe to Scopes:scopesCleared events

**Kind**: instance method of [<code>ScopeService</code>](#ScopeService)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | [description] |

<a name="event_ScopeServicescopes.scopesCleared"></a>

### "scopes.scopesCleared" (type, context, removed)
Scopes cleared event

**Kind**: event emitted by [<code>ScopeService</code>](#ScopeService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_ScopeServicescopes.scopesChanged"></a>

### "scopes.scopesChanged" (type, context, removed, added)
Scopes changed event

**Kind**: event emitted by [<code>ScopeService</code>](#ScopeService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_ScopeServicescopes.scopeUnregistered"></a>

### "scopes.scopeUnregistered" (type, context, removed)
Scopes unregistered event

**Kind**: event emitted by [<code>ScopeService</code>](#ScopeService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 

<a name="event_ScopeServicescopes.scopeDataSet"></a>

### "scopes.scopeDataSet" (type, context, scopeId, removed, added)
Scope data set event

**Kind**: event emitted by [<code>ScopeService</code>](#ScopeService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| scopeId | <code>string</code> | 
| removed | <code>Array.&lt;object&gt;</code> | 
| added | <code>Array.&lt;object&gt;</code> | 

<a name="event_ScopeServicescopes.scopeRegistered"></a>

### "scopes.scopeRegistered" (type, context, data)
Scope registered event

**Kind**: event emitted by [<code>ScopeService</code>](#ScopeService)  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| context | <code>string</code> | 
| data | <code>object</code> | 

