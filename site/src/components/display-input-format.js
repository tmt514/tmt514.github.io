import React, {Component} from 'react';
class DisplayInputFormat extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {format, children} = nextProps;
        const parselineno = (lineno) => {
            if (lineno === 1) {
                return "一"
            } else if (lineno === 2) {
                return "二"
            } else {
                return ` ${lineno} `
            }
        }
        const parsetype = (type, many=1) => {
            var ret = "";
            if (many === 1) ret = "一個"
            else if (many === 2) ret = "兩個"
            else ret = ` $${many}$ 個`

            if (type === 'int') ret += "整數"
            return ret;
        }
        const parsenames = (props) => {
            if (props.array !== undefined) {
                const size = (isNaN(props.size)? props.size : parseInt(props.size))
                const idx = (isNaN(props.index)? props.index : parseInt(props.index))
                const idx_begin = (idx === undefined? 1 : idx)
                const idx_second = (isNaN(idx_begin)? idx_begin + "+1" : idx_begin+1)
                const idx_end = (idx === 0? size + (-1) : size)
                if ((typeof(size) === "string") || size >= 10) {
                    return ` $${props.id}_{${idx_begin}}, ${props.id}_{${idx_second}}, \\ldots, ${props.id}_{${idx_end}}$`
                } else {
                    var ret = ` $${props.id}_{${idx_begin}}`
                    for (var i = idx_begin+1; i <= idx_end; i++) {
                        ret += `, ${props.id}_{${i}}`;
                    }
                    ret += "$"
                    return ret;
                }
            } else {
                return ` $${props.id}$`
            }
            
        }
        const parserange = (props) => {
            if (props.id && props.ge && props.le) {
                return ` ($${props.ge} \\le $ ${parsenames(props)} $ \\le ${props.le}$)`
            }
            if (props.id && props.gt && props.lt) {
                return ` ($${props.gt} < $ ${parsenames(props)} $ < ${props.lt}$)`
            }
            return "";
        }
        const parsedesc = (props) => {
            if (props.desc)
                return ` ${props.desc}`
            if (props.id === "T" && format === 'multi-input')
                return " 代表測試資料組數"
            return "";
        }
        var ret = "輸入的";
        const walk = (children, lineno) => {
            if (children === undefined) return;
            for (let child of children) {
                if (child instanceof Object) {
                    if (child.type === "variable") {
                        console.log(child)
                        ++lineno;
                        const type = child.props.type
                        const id = child.props.id
                        ret += `第${parselineno(lineno)}列`
                        ret += `包含${parsetype(type, child.props.size)}`
                        ret += ` ${parsenames(child.props)}`
                        ret += ` ${parserange(child.props)}`
                        ret += `${parsedesc(child.props)}。`
                    } else if (child.type === "repeat") {
                        const times = child.props.times;
                        if (times === "T" && format === 'multi-input') {
                            ret += `對於每一組測試資料：`
                        }
                        walk(child.props.children, 0);
                    }
                }
            }
        }
        walk(children, 0);
        const newState = {
            text: `${ret}`,
        }
        return newState;
    }
    
    render() {
        return (
            <p>{this.state.text}</p>
        )
    }
}

export default DisplayInputFormat;