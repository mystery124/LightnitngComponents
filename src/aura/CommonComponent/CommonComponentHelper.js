/**
 * Created by Stefan Abramiuk on 24.08.2017.
 */
({
    callServer : function(cmp, actionName, parameters, onSuccess, onError, isStorable, isAbortable){
        var action = cmp.get(actionName);
        if(parameters){
            action.setParams(parameters);
        }
        if(isAbortable){
            action.setAbortable();
        }
        if(isStorable){
            action.setStorable();
        }
        action.setCallback(this, $A.getCallback(function(response){
            if(response){
                var state = response.getState();
                if(cmp.isValid()){
                    if (state === "SUCCESS"){
                        var result = response.getReturnValue();
                        onSuccess(result);
                    } else if(state == "ERROR"){
                        var errors = response.getError();
                        if(!onError){
                            this.handleError(errors);
                        } else {
                            onError(errors);
                        }
                    }
                }
            } else {
                onSuccess();
            }
        }));
        $A.enqueueAction(action);
    },
    showToast : function(type, title, message) {
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent) {
            toastEvent.setParams({
                "title": title,
                "message": message,
                "type": type
            });
            toastEvent.fire();
        }
    },
    hideElement: function (cmp, elementId) {
        var elm = cmp.find(elementId);
        $A.util.addClass(elm, 'slds-hide');
    },
    showElement: function (cmp, elementId) {
        var elm = cmp.find(elementId);
        $A.util.removeClass(elm, 'slds-hide');
    },
    clone: function (sourceElm, targetElm) {
        if(targetElm){
            for(var k in targetElm){
                targetElm[k]=undefined;
            }
        }
        for(var k in sourceElm){
            targetElm[k]=sourceElm[k];
        }
    },
    deepClone: function (sourceElm, targetElm) {
        var clone = JSON.parse(JSON.stringify(sourceElm));
        this.clone(clone, targetElm);
    },
    refreshView: function(){
        var refreshEvent = $A.get('e.force:refreshView');
        if(refreshEvent){
            refreshEvent.fire();
        }
    },
    handleError: function(errors){
        if(errors) {
            if(console){
                console.log('errors',errors);
            }
            this.showToast('error', $A.get("$Label.c.Error"), errors[0].message);
        }
    },
    navigateToSObject : function(recordId){
        var navEvt = $A.get("e.force:navigateToSObject");
        if(navEvt && recordId){
            navEvt.setParams({
              "recordId": recordId
            });
            navEvt.fire();
        }
    }
})