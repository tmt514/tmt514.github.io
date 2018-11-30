export default class UIController {
    
    static RULES_COUNTER = 0;
    
    constructor() {
        this.styleRules = {};
        this.styles = {};
        this.onceStyles = {};
        this.annotations = {};
    }
    
    getSnapshot() {
        return JSON.parse(JSON.stringify(this));
    }
    
    setStyle(varname, id, options) {
        if (this.styles[varname] === undefined)
            this.styles[varname] = {};
        if (this.styles[varname][id] === undefined)
            this.styles[varname][id] = {};
        Object.assign(this.styles[varname][id], options);
    }
    
    eraseStyle(varname, id, options) {
        if (this.styles[varname] !== undefined)
            this.styles[varname][id] = undefined;
    }
    
    setStyleOnce(varname, id, options) {
        if (this.onceStyles[varname] === undefined)
            this.onceStyles[varname] = {};
        if (this.onceStyles[varname][id] === undefined)
            this.onceStyles[varname][id] = {};
        Object.assign(this.onceStyles[varname][id], options);
    }
    
    clearStyleOnce() {
        this.onceStyles = {};
    }
    
    addStyleRule(varname, apply_to, pure_predicate_fn, options) {
        if (this.styleRules[varname] === undefined)
            this.styleRules[varname] = {}
        const rule_id = `ui-rule-${UIController.RULES_COUNTER}`;
        UIController.RULES_COUNTER ++;
        
        this.styleRules[varname][rule_id] = {
            apply_to: apply_to,
            pure_predicate_fn: pure_predicate_fn.toString(),
            options: options,
        };
        return rule_id;
    }
    
    removeStyleRule(varname, rule_id) {
        if (this.styleRules[varname] !== undefined) 
            this.styleRules[varname][rule_id] = undefined;
    }
    
       
};