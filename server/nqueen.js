function solveNQueens(n) {

    const solutions = [];
    const steps = [];

    const board = Array.from({ length: n }, () =>
        Array(n).fill('.')
    );

    const col = Array(n).fill(false);
    const diag1 = Array(2 * n - 1).fill(false);
    const diag2 = Array(2 * n - 1).fill(false);

    function saveStep(action, row, colNo) {

        steps.push({

            action,

            row,

            col: colNo,

            board: board.map(r => [...r])

        });

    }

    function backtrack(row) {

        if (row === n) {

            solutions.push(board.map(r => [...r]));

            saveStep("solution", -1, -1);

            return;
        }

        for (let c = 0; c < n; c++) {

            saveStep("try", row, c);

            if (col[c] || diag1[row + c] || diag2[row - c + n - 1]) {

                saveStep("conflict", row, c);

                continue;
            }

            board[row][c] = 'Q';

            col[c] = true;
            diag1[row + c] = true;
            diag2[row - c + n - 1] = true;

            saveStep("place", row, c);

            backtrack(row + 1);

            board[row][c] = '.';

            col[c] = false;
            diag1[row + c] = false;
            diag2[row - c + n - 1] = false;

            saveStep("remove", row, c);

        }

    }

    backtrack(0);

    return {

        solutions,
        steps

    };

}

module.exports = solveNQueens;