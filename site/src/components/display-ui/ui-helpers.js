// Helper class of functions on updating ui.
export class GraphNodeUIHelper {
    static updateNodePropsByStyleRules(nodeProps, styleRules, classNames) {
        if (styleRules === undefined) return;
        const ruleIDs = Object.keys(styleRules);
        for (let ruleID of ruleIDs) {
            const rule = styleRules[ruleID];
            if (classNames.includes(rule.apply_to)) {
                const z = eval('((' + rule.pure_predicate_fn + ')(nodeProps))');
                if (z === true) {
                    Object.assign(nodeProps, rule.options||{});
                }
            }
        }
    }
    static updateNodePropsByStyles(nodeProps, styles, id) {
        if (styles === undefined) return;
        Object.assign(nodeProps, styles[id]||{});
    }
    static updateNodePropsFromUIStore(nodeProps, uiStore, id, classNames) {
        if (uiStore === undefined) return;
        
        // StyleRules
        GraphNodeUIHelper.updateNodePropsByStyleRules(nodeProps, uiStore.styleRules, classNames);
        
        // Styles
        GraphNodeUIHelper.updateNodePropsByStyles(nodeProps, uiStore.styles, id);
        
        // OnceStyles
        GraphNodeUIHelper.updateNodePropsByStyles(nodeProps, uiStore.onceStyles, id);
    }
}


export function combineUIHelpers(props) {
    const uiStore = {
        styleRules: {},
    }
    const contentToOptions = eval('('+(props["uihelper-content-map"]||"{}")+')')
    for (var content of Object.keys(contentToOptions)) {
        uiStore.styleRules[`content-rule-${content}`] = {
            apply_to: 'node',
            pure_predicate_fn: `(nodeProps) => {return nodeProps.content === '${content}'}`,
            options: contentToOptions[content],
        }
    }

    
    if (props["uihelper-node-style"] !== undefined) {
        const nodeOptions = eval('('+(props["uihelper-node-style"]||"{}")+')')
        uiStore.styleRules['all-node-style'] = {
            apply_to: 'node',
            pure_predicate_fn: `(nodeProps) => true`,
            options: nodeOptions,
        }
    }
    return uiStore;
}

export function makeUIStores(nextProps) {
    return [
        combineUIHelpers(nextProps),
        eval(`(` + nextProps.uistore + `)`),
        nextProps.uiStoreFromAlgorithm];
}

export default combineUIHelpers;