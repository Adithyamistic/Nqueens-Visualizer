const express = require("express");
const cors = require("cors");

const solveNQueens = require("./nqueen");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/solve", (req, res) => {

    const { n } = req.body;

    if (!Number.isInteger(n) || n < 1) {
        return res.status(400).json({
            error: "Please enter a valid integer."
        });
    }
    if (n < 1 || n > 12) {
    return res.status(400).json({
        error: "Please enter N between 1 and 12."
    });
}

    const start = Date.now();

    const result = solveNQueens(n);

    const end = Date.now();

    res.json({

    n,

    totalSolutions: result.solutions.length,

    executionTime: `${end-start} ms`,

    solutions: result.solutions,

    steps: result.steps

});

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});