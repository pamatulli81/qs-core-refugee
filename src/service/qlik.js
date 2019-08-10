export default class QlikService {

    static async clearAll(app, softLock=true){
        return new Promise((resolve) => {
           const r = app.clearAll(softLock);
           resolve(r);
        });   
    }

    static async clearField (app, field) {
        return new Promise((resolve) => {
            app.getField(field).then(f => {
                f.clear().then(r => {
                    resolve(r);
                });
            });
        });
    }

    static async createSessionObject (app, def){

        const model = await app.createSessionObject(def);
        const layout = await model.getLayout();

        // eslint-disable-next-line object-shorthand
        return {model: model, layout: layout }

    }

    static async selectFromList (model, elemNumber, toggle=false){
        return model.selectListObjectValues(
            "/qListObjectDef",
            elemNumber,
            toggle
          );
    }

    static async singleSelectValue (app, field, value) {
        return new Promise((resolve) => {
            app.getField(field).then(f => {
                f.select(value).then(r => {
                    resolve(r);
                });
            });
        });
    }

    static async registerModelOnChangeListener (model, callback){
        model.on("changed", () => {
            return callback;
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

    static async applyPatch (model, op, path, value, soft = true) {
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

    static async applyPatches (model, patch, soft = true) {
        return new Promise((resolve) => {
            model
                .applyPatches(patch, soft)
                .then(result => {
                    resolve(result);
                });
        });
    }


}

