export default class QlikService {

    static async clearField (app, field) {
        return new Promise((resolve) => {
            app.getField(field).then(f => {
                f.clear().then(r => {
                    resolve(r);
                });
            });
        });
    };

    static async singleSelectValue (app, field, value) {
        return new Promise((resolve) => {
            app.getField(field).then(f => {
                f.select(value).then(r => {
                    resolve(r);
                });
            });
        });
    }

    static async toggleSelectValue (app, field, value) {
        return new Promise((resolve) => {
            app.getField(field).then(f => {
                f.toggleSelect(value).then(r => {
                    resolve(r);
                });
            });
        });
    }

    static async applyPatches (model, op, path, value, soft = true) {
        return new Promise((resolve) => {
            model
                .applyPatches([
                    {
                        qOp: op,
                        qPath: path,
                        qValue: JSON.stringify(value)
                    }
                ], soft)
                .then(result => {
                    resolve(result);
                });
        });
    }


}

