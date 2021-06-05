function leftPadOnce(n) {
    return n<10 ? '0'+n : n;
}

function reformatDateString(dateString) {
    let date = new Date(dateString);
    let day = leftPadOnce(date.getDate());
    let month = leftPadOnce(date.getMonth() + 1);
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

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

        if (this.columnsSorted[column]) {
            this.data.sort((a, b) => (a[column] > b[column]) ? 1 : -1);
        } else {
            this.data.sort((a, b) => (a[column] > b[column]) ? -1 : 1);
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
ciosTable.sort('Code');