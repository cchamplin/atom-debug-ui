<a name="ScopeResolverService"></a>

## ScopeResolverService ⇐ <code>Service</code>
**Kind**: global class  
**Extends**: <code>Service</code>  
**Access**: public  

* [ScopeResolverService](#ScopeResolverService) ⇐ <code>Service</code>
    * [new ScopeResolverService(services, options)](#new_ScopeResolverService_new)
    * [.editorInValidScope()](#ScopeResolverService+editorInValidScope) ⇒ <code>Boolean</code>
    * [.validForScope(scopeName)](#ScopeResolverService+validForScope) ⇒ <code>Boolean</code>

<a name="new_ScopeResolverService_new"></a>

### new ScopeResolverService(services, options)
Scope Resolver Service


| Param | Type | Description |
| --- | --- | --- |
| services | <code>ServiceManager</code> |  |
| options | <code>Object</code> | Service Options |

<a name="ScopeResolverService+editorInValidScope"></a>

### scopeResolverService.editorInValidScope() ⇒ <code>Boolean</code>
Returns true if the editor is in a valid scope

**Kind**: instance method of [<code>ScopeResolverService</code>](#ScopeResolverService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  
<a name="ScopeResolverService+validForScope"></a>

### scopeResolverService.validForScope(scopeName) ⇒ <code>Boolean</code>
Returns true if a specific scope is valid for the debug engine

**Kind**: instance method of [<code>ScopeResolverService</code>](#ScopeResolverService)  
**Returns**: <code>Boolean</code> - [description]  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| scopeName | <code>string</code> | [description] |

