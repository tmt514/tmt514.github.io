
// Helper functions converting different data fields into canonical internal formats.
class DataHelper {
    static getDataFromProps(props) {
        var data = undefined;

        // The simplest format is a JSON string.
        if (props.data !== undefined) {
            if (props.data instanceof Array) {
                return props.data;
            }
            return JSON.parse(props.data);
        }
    }
};

export default DataHelper;