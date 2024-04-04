class Lay {
    constructor(grupo,chave) {
        this.key = {...chave};
        this._grupo = grupo;
    }
    where(f) { return this.filter(f) }
    filter(f) { return this._grupo.filter(f) }
    toList() { return [...this._grupo] }
    count(f) { return this.length(f) }
    length(f) {
        if(f) return this.filter(f).length;
        else return this._grupo.length;
    }
    sum(mapF) { return this._grupo.map(mapF).reduce((a,v) => a+=v) }
    min(mapF) { return Math.min(...this._grupo.map(mapF)) }
    max(mapF) { return Math.max(...this._grupo.map(mapF)) }
    avg(mapF) { return this.sum(mapF)/this.length() }
    first(f) { 
        if(f) return this.filter(f)[0];
        else return this._grupo[0];
    }
    firstOrDefault(f) {
        if(f) {
            const filtered = this.filter(f);
            return filtered.length > 0 ? filtered[0] : null; 
        }
        else return this._grupo.length > 0 ? this._grupo[0] : null;
    }
    last(f) {
        if(f) {
            const filtered = this.filter(f);
            return filtered[filtered.length-1];
        }
        else return this._grupo[this._grupo.length-1]
    }
    lastOrDefault(f) {
        if(f) {
            const filtered = this.filter(f);
            return filtered.length > 0 ? filtered[filtered.length-1] : null;
        }
        else {
            return this._grupo.length > 0 ? this._grupo[this._grupo.length-1] : null;
        }
    }
    groupBy(groupBy, selectField) {
        const listOfObjects = this._grupo;
        Lay.group(listOfObjects, groupBy, selectField);
    }

    static group(listOfObjects, groupBy, selectField) {
      const ungroupedKeys = listOfObjects.map(o => Object.values(groupBy(o)).join(','));
        const keys = ungroupedKeys.filter((f, i) => ungroupedKeys.indexOf(f) === i);
        const final = keys.map(key => {
            let grupo = listOfObjects.filter(f => key === Object.values(groupBy(f)).join(','));
            let chave = [grupo[0]].map(groupBy)[0];
            let select = new Lay(grupo, chave);
            return { ...selectField(select) };
        });
        return final;
    }
}
