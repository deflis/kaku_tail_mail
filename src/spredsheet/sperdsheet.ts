import IData from '../model/data';
import Config from '../../config.yml'

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
        const count = this.getValueByRowAndColumn<number>(this.lastRow - 1, Config.SPREADSHEET.COLUMN.COUNTER) + 1;
        this.setValueByRowAndColumn(this.lastRow, Config.SPREADSHEET.COLUMN.COUNTER, count);
    }

    public getValue(): IData {
        return {
            email: this.getLastRowValue(Config.SPREADSHEET.COLUMN.MAIL),
            name: this.getLastRowValue(Config.SPREADSHEET.COLUMN.NAME),
            count: this.getLastRowValue(Config.SPREADSHEET.COLUMN.COUNTER),
        }
    }
}