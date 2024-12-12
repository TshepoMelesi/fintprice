const expenseList = document.querySelector(".expense-list")

// initialize or setup a dummy product first
FintPrice.setProduct()

const displayExpense = ({name, comment, amount}, idx) => {
        const expense = `
                <div class="expense">
                        <input type="text" oninput="handleEditExpense(this)" name="expense" class="expense-name ${idx}" placeholder="Expense"/>
                        <input type="number" oninput="handleEditExpense(this)" name="amount" class="expense-amount ${idx}" placeholder="Amount"/>
                </div>
        `

        expenseList.innerHTML += expense
}

const createExpense = () => {
        // create a name input
        const nameInput = document.createElement("input")
        nameInput.setAttribute("type", "text")
        nameInput.setAttribute("name", "expense")
        nameInput.setAttribute("class", "expense-name")
        nameInput.setAttribute("placeholder", "Expense")
        
        // create a amount input
        const amountInput = document.createElement("input")
        amountInput.setAttribute("type", "number")
        amountInput.setAttribute("name", "amount")
        amountInput.setAttribute("class", "expense-amount")
        amountInput.setAttribute("placeholder", "Amount")

        const expenseEl = document.createElement("div")
        expenseEl.className = "expense"

        expenseEl.appendChild(nameInput)
        expenseEl.appendChild(amountInput)

        return expenseEl
}

const handleAddExpense = () => {
        const expense = createExpense()

        expenseList.appendChild(expense)
}


const handleCalculate = () => {
        // get data from inputs
        // pass data to the FintPrice class
        // display return product data
}

