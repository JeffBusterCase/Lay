class Lay {
    constructor(grupo,chave) {
        this.key = typeof(chave) === 'object' || typeof(chave) === 'undefined' ? {...chave} : chave;
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
        return this.toArray();
    }
    toArray() {
        return [...this._grupo];
    }
    count(f) {
        return this.length(f);
    }
    length(f) {
        if(f) return this.filter(f).length;
        else return this._grupo.length;
    }
    _map(grupo, m) {
        return Lay._map(grupo, m);
    }
    static _map(grupo, m) {
        const new_list = [];
        for(var v of grupo) {
            new_list.push(m(v));
        }
        return new_list;
    }
    sum(mapF) {
        mapF = mapF === null ? this.defmapf : mapF;
        return this._map(this._grupo, mapF).reduce((a,v) => a+=v);
    }
    min(mapF) {
        if(this._grupo.length === 0) throw new Error('Empty list');
        mapF = mapF === null ? this.defmapf : mapF;
        let vmin = mapF(this._grupo[0]);
        for(var i=1;i<this._grupo.length;i++) {
            let v = mapF(this._grupo[i]);
            if(vmin > v) vmin = v;
        }
        return vmin;
    }
    max(mapF) {
        if(this._grupo.length === 0) throw new Error('Empty list');
        mapF = mapF === null ? this.defmapf : mapF;
        let vmax = mapF(this._grupo[0]);
        for(var i=1;i<this._grupo.length;i++) {
            let v = mapF(this._grupo[i]);
            if(vmax < v) vmax = v;
        }
        return vmax;
    }
    average(mapF) {
        return this.avg(mapF);
    }
    avg(mapF) {
        if(this._grupo.length === 0) throw new Error('Empty list');
        mapF = mapF === null ? this.defmapf : mapF;
        return this.sum(mapF)/this.length();
    }
    first(f) {
        if(this._grupo.length === 0) throw new Error('Empty list');
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
        if(typeof(mapF(this._grupo[0])) === 'string') {
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
        if(typeof(mapF(this._grupo[0])) === 'string') {
            let fin = this._grupo.toSorted((b,a) => mapF(a===null?'':a).localeCompare(mapF(b)));
            return new Lay(fin);
        }
        else {
            let fin = this._grupo.toSorted((b,a) => mapF(a===null?-1:a)-(mapF(b===null?-1:b)));
            return new Lay(fin);
        }
    }
    last(f) {
        if(this._grupo.length === 0) throw new Error('Empty list');
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
    select(mapF) {
        return new Lay(this._map(this._grupo,mapF));
    }
    selectMany(mapF) {
        return new Lay(this._map(this._grupo,mapF).reduce((acc, arr) => acc.concat(arr), []));
    }
    groupBy(groupBy) {
        const listOfObjects = this._grupo;
        const prefinal = {};
        for(var item of listOfObjects) {
            let grp = groupBy(item);
            let key = typeof(grp) === 'object' ? Object.values(grp).join(',') : grp;
            if(!(key in prefinal)) prefinal[key] = [item];
            else prefinal[key].push(item);
        }

        const final = [];
        for(var key of Object.keys(prefinal)) {
            let chave = groupBy(prefinal[key][0]);
            final.push(new Lay(prefinal[key], chave))
        }
        
        return new Lay(final);
    }

    static group(listOfObjects, groupBy, selectField) {
        return new Lay(listOfObjects)
            .groupBy(groupBy)
            .select(selectField)
            .toList();
    }

    table() {
        if(console) console.table(this._grupo);
    }
}
