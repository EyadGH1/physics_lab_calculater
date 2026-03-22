document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // FILTER LOGIC
    // ----------------------------------------------------
    const filterSelect = document.getElementById("calculator-filter");
    const calcSections = document.querySelectorAll(".calc-section");

    filterSelect.addEventListener("change", (e) => {
        const selectedId = e.target.value;
        calcSections.forEach(section => {
            if(section.id === selectedId) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    });

    // ----------------------------------------------------
    // SLOPE & CHART
    // ----------------------------------------------------
    const e1 = document.getElementById("x1");
    const e2 = document.getElementById("x2");
    const d1 = document.getElementById("y1");
    const d2 = document.getElementById("y2");
    const slopeBtn = document.getElementById("slopeBtn");
    const slopeDisplay = document.getElementById("slope");
    
    let slopeChart;

    const inputingS = () => {
        const x1 = parseFloat(e1.value);
        const x2 = parseFloat(e2.value);
        const y1 = parseFloat(d1.value);
        const y2 = parseFloat(d2.value);

        if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)) {
            slopeDisplay.innerText = "Invalid Input";
            return;
        }

        if (x2 - x1 === 0) {
            slopeDisplay.innerText = "Undefined (Vertical Line)";
            return;
        }

        const Slope = (y2 - y1) / (x2 - x1);
        slopeDisplay.innerText = Slope.toFixed(4);

        // Update Chart
        updateChart(x1, y1, x2, y2);
    };

    slopeBtn.addEventListener('click', inputingS);

    const updateChart = (x1, y1, x2, y2) => {
        const ctx = document.getElementById('slopeChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (slopeChart) {
            slopeChart.destroy();
        }

        slopeChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Slope Line',
                    data: [{x: x1, y: y1}, {x: x2, y: y2}],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    showLine: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#cbd5e1' }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#cbd5e1' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#f8fafc' }
                    }
                }
            }
        });
    };

    // ----------------------------------------------------
    // % ERROR
    // ----------------------------------------------------
    const erroreDisplay = document.getElementById("errore");
    const e3 = document.getElementById("x-theo");
    const e4 = document.getElementById("x-exp");
    const erroreBtn = document.getElementById("errore-btn");

    const inputtingE = () => {
        const xtheo = parseFloat(e3.value);
        const xexp = parseFloat(e4.value);
        
        if (isNaN(xtheo) || isNaN(xexp) || xtheo === 0) {
            erroreDisplay.innerText = "Invalid Input";
            return;
        }

        const errore = ((xtheo - xexp) / xtheo) * 100;
        erroreDisplay.innerText = "%" + Math.abs(errore).toFixed(4);
    };

    erroreBtn.addEventListener('click', inputtingE);

    // ----------------------------------------------------
    // ADDITION / SUBTRACTION ERROR
    // ----------------------------------------------------
    const Seq = document.getElementById("subbing-equation");
    const sBtn = document.getElementById("sub-btn");
    const errorsField = document.getElementById("errors-entering");
    const subReset = document.getElementById('sub-reset');

    let subEqArr = [];
    let subConArr = [];

    const createInput = (placeholderText) => {
        const div = document.createElement("div");
        div.className = "input-group";
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = placeholderText;
        div.appendChild(input);
        return { wrapper: div, input: input };
    };

    const arrayingS = () => {
        errorsField.innerHTML = "";
        subConArr = [];

        // Fix space issue
        let eq1 = Seq.value.replace(/\s+/g, '');
        if (!eq1) return;

        subEqArr = eq1.split(/[+-]/);
        
        const inputsArray = [];
        subEqArr.forEach((element, i) => {
            const j = i + 1;
            const inputObj = createInput("Enter element " + j + " error");
            inputsArray.push(inputObj.input);
            errorsField.appendChild(inputObj.wrapper);
            subConArr.push(element.split("*"));
        });

        const erBtn = document.createElement("button");
        erBtn.className = "primary-btn";
        erBtn.innerText = "Calculate Sub/Add Error";
        
        const erTextWrap = document.createElement("div");
        erTextWrap.className = "answer-box";
        erTextWrap.innerHTML = `<h3>The error is: <span class="highlight-text">-</span></h3>`;
        const resultSpan = erTextWrap.querySelector('span');

        errorsField.appendChild(erBtn);
        errorsField.appendChild(erTextWrap);

        const ErrorAn = () => {
            let subAnswer = 0;
            for (let i = 0; i < subEqArr.length; i++) {
                let cons = !isNaN(parseFloat(subConArr[i][0])) ? parseFloat(subConArr[i][0]) : 1;
                // Check if element starts with alphabet instead of number (e.g., '2*x' vs 'x')
                if(subConArr[i].length === 1 && isNaN(parseFloat(subConArr[i][0]))) {
                    cons = 1; 
                }
                
                let errorVal = parseFloat(inputsArray[i].value) || 0;
                let k = cons * errorVal;
                subAnswer += Math.pow(k, 2);
            }
            const erAnswer = Math.sqrt(subAnswer);
            resultSpan.innerText = erAnswer.toFixed(4);
        };

        erBtn.addEventListener('click', ErrorAn);
    };

    sBtn.addEventListener("click", arrayingS);
    subReset.addEventListener('click', () => {
        errorsField.innerHTML = "";
        Seq.value = "";
    });


    // ----------------------------------------------------
    // MULTIPLICATION / DIVISION ERROR
    // ----------------------------------------------------
    const multiErrorField = document.getElementById("multi-errors-field");
    const Meq = document.getElementById('multing-equation');
    const ans = document.getElementById("multi-answer");
    const MEqB = document.getElementById("multi-btn");
    const mulReset = document.getElementById("mul-reset");

    let mulEqArr = [];

    const arrayingM = () => {
        multiErrorField.innerHTML = "";
        
        // sanitize spaces
        let eq1 = Meq.value.replace(/\s+/g, '');
        if (!eq1) return;

        mulEqArr = eq1.split(/[*\/]/);
        const inputsData = [];

        mulEqArr.forEach((element, i) => {
            const j = i + 1;
            
            // Value input
            const valInput = createInput("Enter element " + j + " value");
            multiErrorField.appendChild(valInput.wrapper);
            
            // Error input
            const errInput = createInput("Enter element " + j + " error");
            multiErrorField.appendChild(errInput.wrapper);
            
            inputsData.push({ valueIn: valInput.input, errIn: errInput.input });
        });

        // Add calc button
        const merBtn = document.createElement("button");
        merBtn.className = "primary-btn";
        merBtn.innerText = "Calculate Mult/Div Error";
        
        // Add result display
        const textWrap = document.createElement("div");
        textWrap.className = "answer-box";
        textWrap.innerHTML = `<h3>The error is: <span class="highlight-text">-</span></h3>`;
        const resultSpan = textWrap.querySelector('span');

        multiErrorField.appendChild(merBtn);
        multiErrorField.appendChild(textWrap);

        const ErrorAnM = () => {
            let MultiAnswer = 0;
            const finalAns = parseFloat(ans.value) || 0;

            for (let i = 0; i < mulEqArr.length; i++) {
                let errVal = parseFloat(inputsData[i].errIn.value) || 0;
                let trueVal = parseFloat(inputsData[i].valueIn.value) || 0;
                if (trueVal !== 0) {
                    MultiAnswer += Math.pow(errVal / trueVal, 2);
                }
            }
            const MerAnswer = finalAns * Math.sqrt(MultiAnswer);
            resultSpan.innerText = MerAnswer.toFixed(4);
        };

        merBtn.addEventListener('click', ErrorAnM);
    };

    MEqB.addEventListener('click', arrayingM);
    mulReset.addEventListener('click', () => {
        multiErrorField.innerHTML = "";
        Meq.value = "";
        ans.value = "";
    });


    // ----------------------------------------------------
    // POWER ERROR
    // ----------------------------------------------------
    const varE = document.getElementById("var-error");
    const v = document.getElementById("var-value");
    const pEq = document.getElementById("power-eq");
    const vVB = document.getElementById("v-v-b");
    const powerField = document.getElementById("power-field");
    const pReset = document.getElementById("p-reset");

    const calculatePowerError = () => {
        let eq = pEq.value.replace(/\s+/g, '');
        let varV = parseFloat(v.value) || 0;
        let vErr = parseFloat(varE.value) || 0;

        if (!eq.includes('^')) {
            powerField.innerHTML = `<h3>Invalid equation. Expected format: x^n</h3>`;
            return;
        }

        let arr = eq.split("^");
        let power = parseFloat(arr[1]) || 0;

        let res = Math.pow(varV, power);
        let powEr = (res * (power * vErr)) / varV;

        if (isNaN(powEr)) {
            powerField.innerHTML = `<h3>The equation error is: <span class="highlight-text">Invalid</span></h3>`;
        } else {
            powerField.innerHTML = `<h3>The equation error is: <span class="highlight-text">${powEr.toFixed(4)}</span></h3>`;
        }
    };

    vVB.addEventListener("click", calculatePowerError);
    
    pReset.addEventListener("click", () => {
        powerField.innerHTML = "";
        pEq.value = "";
        v.value = "";
        varE.value = "";
    });
});