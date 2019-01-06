
// Helper functions converting different data fields into canonical internal formats.
class DataHelper {
    static getDataFromProps(props) {
        var data = undefined;

        // The simplest format is a JSON string.
        if (props.data !== undefined) {
            if (props.data instanceof Array || props.data instanceof Object) {
                return props.data;
            }
            try {
                data = JSON.parse(props.data);
            } catch(err) {
                data = eval(`(${props.data})`);
            }
            return data;
        }
    }
};

export default DataHelper;