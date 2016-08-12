var domUtilities = {
    getElementArray: function(selector, context){
        var returnArray = [];
        var querySelection;
        if(!context || !context instanceof HTMLElement){
            context = document;
        }
        try{
            querySelection = context.querySelectorAll(selector)
            returnArray = Array.prototype.slice.call(querySelection);
        }catch(error){
            this.domErrorHandler(error);
        }
        return returnArray;
    },
    getElement: function(selector, context){
        var returnElement;
        var querySelection;
        if(!context || !context instanceof HTMLElement){
            context = document;
        }
        try{
            querySelection = context.querySelector(selector)
            returnElement = querySelection;
        }catch(error){
            this.domErrorHandler(error);
        }
        return returnElement;
    },
    domErrorHandler: function(error){
        switch (error.code){
            case 12:
                console.error('Invalid selector string');
                break;
            default:
                console.log('Unknown error code');
                console.dir(error);
        }
    }
};