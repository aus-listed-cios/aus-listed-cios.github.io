//  Extremely basic datatable implementation, just some simple searching and sorting
basicDataTable = function (data) {
return {
    source: data,
    data: data,

    columnsSorted: [],

    sort(column) {
        for (let col in this.columnsSorted) {
            if(col !== column) {
                this.columnsSorted[col] = undefined;
            }
        }

        if (this.columnsSorted[column] == undefined) {
            this.columnsSorted[column] = true;
        }

        if(column === 'Strike') {
            if (this.columnsSorted[column]) {
                this.data.sort((a, b) => (Number(a[column].substring(1)) > Number(b[column].substring(1))) ? 1 : -1);
            } else {
                this.data.sort((a, b) => (Number(a[column].substring(1)) > Number(b[column].substring(1))) ? -1 : 1);
            }
        }
        else {
            if (this.columnsSorted[column]) {
                this.data.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
            } else {
                this.data.sort((a, b) => (a[column] > b[column]) ? -1 : 1);
            }
        }

        this.columnsSorted[column] = !this.columnsSorted[column];
    },

    search(search, values) {
        let results = [];
        for (let i in this.source) {
            for (let x in values) {
                let value = this.source[i][values[x]];
                    if (value.toUpperCase().indexOf(search.toUpperCase()) > -1) {
                        results.push(this.source[i]);
                        break;
                    }
                }
            }
            this.data = results;
        }
    }
}
ciosTable = basicDataTable(window.buildSpecificData.cios);
ciosTable.columnsSorted['Code'] = false;