let solutions = [];
let currentSolution = 0;

const board = document.getElementById("board");
const count = document.getElementById("count");
const time = document.getElementById("time");
const current = document.getElementById("current");

document.getElementById("solveBtn").addEventListener("click", solve);
document.getElementById("nextBtn").addEventListener("click", nextSolution);
document.getElementById("prevBtn").addEventListener("click", previousSolution);

async function solve() {

    const n = Number(document.getElementById("nValue").value);

    if (n < 1 || n > 12) {
        alert("Please enter N between 1 and 12");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/solve", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ n })

        });

        const data = await response.json();

        solutions = data.solutions;
        currentSolution = 0;

        count.innerHTML = `Total Solutions : ${data.totalSolutions}`;
        time.innerHTML = `Execution Time : ${data.executionTime}`;
        current.innerHTML = `Solution 1 of ${solutions.length}`;

        drawBoard(solutions[currentSolution]);

    }
    catch (err) {

        alert("Server not running!");

        console.log(err);

    }

}

function drawBoard(arr) {

    if (!arr) return;

    board.innerHTML = "";

    const n = arr.length;

    board.style.gridTemplateColumns = `repeat(${n},60px)`;

    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            if ((i + j) % 2 === 0)
                cell.classList.add("white");
            else
                cell.classList.add("black");
          if(arr[i][j] === 'Q'){

           const img = document.createElement("img");

           img.src = "images/queen.svg";

          img.classList.add("queen");

         cell.appendChild(img);

          }

            board.appendChild(cell);

        }

    }

}

function nextSolution() {

    if (currentSolution < solutions.length - 1) {

        currentSolution++;

        current.innerHTML = `Solution ${currentSolution + 1} of ${solutions.length}`;

        drawBoard(solutions[currentSolution]);

    }

}

function previousSolution() {

    if (currentSolution > 0) {

        currentSolution--;

        current.innerHTML = `Solution ${currentSolution + 1} of ${solutions.length}`;

        drawBoard(solutions[currentSolution]);

    }

}
loadTheory();

function loadTheory(){

document.getElementById("theory").innerHTML=`

<h3>What is Backtracking?</h3>

<p>

Backtracking is a recursive algorithmic technique used to solve constraint satisfaction problems.

Instead of generating every possible arrangement, it incrementally builds a solution.

Whenever a choice leads to an invalid state, the algorithm immediately removes that choice and tries another possibility.

</p>

<h3>Optimized N-Queens</h3>

<p>

This project uses three hash arrays.

</p>

<ul>

<li><b>columns[]</b> → occupied columns</li>

<li><b>diag1[]</b> → main diagonal (row + column)</li>

<li><b>diag2[]</b> → anti diagonal (row − column + N − 1)</li>

</ul>

<p>

This reduces every safety check from O(N) to O(1).

</p>

<h3>Example (N = 4)</h3>

<pre>

Step 1

Q . . .

. . . .

. . . .

. . . .

↓

Step 2

Q . . .

. . Q .

. . . .

. . . .

↓

Row 2 has no valid position.

↓

Backtrack

Remove Queen from (1,2)

↓

Try next column.

</pre>

<h3>Time Complexity</h3>

<ul>

<li>Safety Check : O(1)</li>

<li>Overall Search : O(N!)</li>

<li>Space : O(N)</li>

</ul>

`;

}