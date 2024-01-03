const spreadsheetContainer =
document.querySelector('#spreadsheet-container');
const ROWS = 10;
const COLS = 10;

function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < COLS; i++) {
            spreadsheetRow.push(i + "-" + j)

        }
        spreadsheetContainer.push(spreadsheetRow);
    }
    console.log(spreadsheet);
}