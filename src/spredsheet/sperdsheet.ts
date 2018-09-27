import IData from '../model/data';

const columnEmail = 2
const columnName = 3
const columnCounter = 10

export class Spreadsheet {

    private _lastRow: number|null = null;
    protected get lastRow(): number {
        if (this._lastRow == null)
            this._lastRow = this.sheet.getLastRow();
        return this._lastRow;
    }

    private _sheet: GoogleAppsScript.Spreadsheet.Sheet|null = null;
    protected get sheet(): GoogleAppsScript.Spreadsheet.Sheet {
        if (this._sheet == null)
            this._sheet =  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        return this._sheet;
    }

    protected getValueByRowAndColumn<T>(row: number, column: number): T {
        const value = this.sheet.getRange(row, column).getValue();
        if (value === "") {
            throw new Error(`invalidValue: [${row}, ${value}] = "${value}"`);
        }
        return value as T;
    }

    protected getLastRowValue<T>(column: number): T {
        return this.getValueByRowAndColumn(this.lastRow, column);
    }

    protected setValueByRowAndColumn<T>(row: number, column: number, value: T) {
        this.sheet.getRange(row, column).setValue(value);
    }


    public countUp() {
        const count = this.getValueByRowAndColumn<number>(this.lastRow - 1, columnCounter) + 1;
        this.setValueByRowAndColumn(this.lastRow, columnCounter, count);
    }

    public getValue(): IData {
        return {
            email: this.getLastRowValue(columnEmail),
            name: this.getLastRowValue(columnName),
            count: this.getLastRowValue(columnCounter),
        }
    }
}