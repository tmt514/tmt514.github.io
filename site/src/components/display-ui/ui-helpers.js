
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