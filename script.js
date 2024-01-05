$(document).ready(function () {
    // 모든 input 요소에 대해 이벤트를 등록
    $("#spreadsheet input[type='text']").keydown(function (e) {
        // 현재 input 요소의 행과 열을 구함
        var currentCell = $(this).closest('td');
        var currentRow = currentCell.parent();
        var currentCol = currentCell.index();

        // 화살표 키에 따라 셀 이동
        switch (e.which) {
            case 37: // 왼쪽 화살표
                currentCell.prev('td').find('input').focus();
                break;
            case 38: // 위쪽 화살표
                currentRow.prev('tr').children('td').eq(currentCol-1).find('input').focus();
                break;
            case 39: // 오른쪽 화살표
                currentCell.next('td').find('input').focus();
                break;
            case 40: // 아래쪽 화살표
                currentRow.next('tr').children('td').eq(currentCol-1).find('input').focus();
                break;
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("spreadsheet");
    var selectedCells = [];
    var selectedCell;


    table.addEventListener("focusin", function (event) {
        var target = event.target;

        if (target.tagName === "INPUT" && target.parentNode.tagName === "TD") {
            selectedCells.forEach(function (cell) {
                cell.classList.remove("highlight");
            });
            selectedCells = [];

            // <thead> 태그 내의 <th>를 찾아 강조
            var columnIndex = target.parentNode.cellIndex;
            var headTh = table.querySelector("thead th:nth-child(" + (columnIndex + 1) + ")");
            if (headTh) {
                selectedCells.push(headTh);
                headTh.classList.add("highlight");
            }
        }

        if (target.tagName === "INPUT" && target.parentNode.tagName === "TD") {
            if (selectedCell) {
                selectedCell.classList.remove("highlight");
            }

            // 현재 클릭된 열의 첫 번째 셀인 <th> 선택
            selectedCell = target.parentNode.parentNode.querySelector("th");

            selectedCell.classList.add("highlight");
        }
    });

    var exportButton = document.getElementById("excelFileExport");
    exportButton.addEventListener("click", function () {
        // 내보내기 로직은 필요에 따라 구현하시면 됩니다.
    });
})

document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("spreadsheet");
    var selectedCell;

    table.addEventListener("focusin", function (event) {
        var target = event.target;

        if (target.tagName === "INPUT" && target.parentNode.tagName === "TD") {
            // 선택된 셀에 "highlight" 클래스 적용
            if (selectedCell) {
                selectedCell.classList.remove("highlight1");
            }
            selectedCell = target.parentNode;
            selectedCell.classList.add("highlight1");
        }
    });

    var exportButton = document.getElementById("excelFileExport");
    exportButton.addEventListener("click", function () {
        // 내보내기 로직은 필요에 따라 구현하시면 됩니다.
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("spreadsheet");

    // 페이지 로딩 시 저장된 데이터 불러오기
    display();

    table.addEventListener("focusout", function (event) {
        var target = event.target;

        if (target.tagName === "INPUT" && target.parentNode.tagName === "TD") {
            // 포커스를 잃으면 데이터 저장
            saveToLocalStorage();
        }
    });

    function saveToLocalStorage() {
        var cells = document.querySelectorAll("#spreadsheet td input");
        var data = [];

        cells.forEach(function (cell) {
            data.push(cell.value);
        });

        localStorage.setItem("spreadsheetData", JSON.stringify(data));
    }

    function loadFromLocalStorage() {
        var storedData = localStorage.getItem("spreadsheetData");
        if (storedData) {
            var data = JSON.parse(storedData);
            var cells = document.querySelectorAll("#spreadsheet td input");

            cells.forEach(function (cell, index) {
                cell.value = data[index] || "";
            });
        }
    }

    function display() {
        // 페이지 로딩 시 저장된 데이터 불러오기
        loadFromLocalStorage();
    }
});
