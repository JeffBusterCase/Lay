class Lay {
    constructor(grupo,chave) {
        this.key = {...chave};
        this._grupo = grupo;
        this.defmapf = v => v;
    }
    where(f) {
        return this.filter(f)
    }
    filter(f) {
        return new Lay(this._grupo.filter(f));
    }
    toList() {
        return [...this._grupo];
    }
    count(f) {
        return this.length(f);
    }
    length(f) {
        if(f) return this.filter(f).length;
        else return this._grupo.length;
    }
    sum(mapF) {
        mapF = mapF === null ? this.defmapf : mapF;
        return this._grupo.map(mapF).reduce((a,v) => a+=v);
    }
    min(mapF) {
        mapF = mapF === null ? this.defmapf : mapF;
        return Math.min(...this._grupo.map(mapF));
    }
    max(mapF) {
        mapF = mapF === null ? this.defmapf : mapF;
        return Math.max(...this._grupo.map(mapF));
    }
    avg(mapF) {
        mapF = mapF === null ? this.defmapf : mapF;
        return this.sum(mapF)/this.length();
    }
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
    orderBy(mapF) {
        if(this._grupo.length === 0) return new Lay(this._grupo);
        mapF = mapF === null ? this.defmapf : mapF;
        if(typeof(this._grupo.map(mapF)[0]) === 'string') {
            let fin = this._grupo.toSorted((a,b) => mapF(a===null?'':a).localeCompare(mapF(b)));
            return new Lay(fin);
        }
        else {
            let fin = this._grupo.toSorted((a,b) => mapF(a===null?-1:a)-(mapF(b===null?-1:b)));
            return new Lay(fin);
        }
    }
    orderByDescending(mapF) {
        if(this._grupo.length === 0) return new Lay(this._grupo);
        mapF = mapF === null ? this.defmapf : mapF;
        if(typeof(this._grupo.map(mapF)[0]) === 'string') {
            let fin = this._grupo.toSorted((b,a) => mapF(a===null?'':a).localeCompare(mapF(b)));
            return new Lay(fin);
        }
        else {
            let fin = this._grupo.toSorted((b,a) => mapF(a===null?-1:a)-(mapF(b===null?-1:b)));
            return new Lay(fin);
        }
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
        else return this._grupo.length > 0 ? this._grupo[this._grupo.length-1] : null;
    }

    groupBy(groupBy) {
        const listOfObjects = this._grupo;
        const ungroupedKeys = listOfObjects.map(o => Object.values(groupBy(o)).join(','));
        const keys = ungroupedKeys.filter((f, i) => ungroupedKeys.indexOf(f) === i);
        const final = keys.map(key => {
            let grupo = listOfObjects.filter(f => key === Object.values(groupBy(f)).join(','));
            let chave = [grupo[0]].map(groupBy)[0];
            let select = new Lay(grupo, chave);
            return select;
        });
        return new Lay(final);
    }

    static group(listOfObjects, groupBy, selectField) {
        const ungroupedKeys = listOfObjects.map(o => Object.values(groupBy(o)).join(','));
        const keys = ungroupedKeys.filter((f, i) => ungroupedKeys.indexOf(f) === i);
        selectField = selectField === null ? (v=>v.key) : selectField;
        const final = keys.map(key => {
            let grupo = listOfObjects.filter(f => key === Object.values(groupBy(f)).join(','));
            let chave = [grupo[0]].map(groupBy)[0];
            let select = new Lay(grupo, chave);
            return { ...selectField(select) };
        });
        return final;
    }

    select(mapF) {
        return new Lay(this._grupo.map(mapF));
    }

    table() {
        if(console) console.table(this._grupo);
    }
}
