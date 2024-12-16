const expenseList = document.querySelector(".expense-list")
const marginEl = document.querySelector(".margin")
const marginSpan = document.getElementById("margin")
const priceEl = document.querySelector(".price")
const vatPriceEl = document.querySelector(".vat-price")

// initialize or setup a dummy product first
FintPrice.setProduct()

const round = (amount, decimals = 100) => {
        return Math.round(amount * decimals) / decimals
}

const writeExpenses = () => {
        const eNames = document.querySelectorAll(".expense-name")
        const eAmounts = document.querySelectorAll(".expense-amount")

        FintPrice.clearExpenses()

        for(let i = 0; i < eNames.length; i ++){
                FintPrice.setExpense(
                        {
                                name : eNames[i].value, 
                                amount : Number(eAmounts[i].value), 
                                comment : "no comment"
                        })
        }
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

const handleClearExpenses = () => {
        FintPrice.clearExpenses()
        expenseList.innerHTML = ""

        handleAddExpense()
}


const handleCalculate = () => {
        // write to FintPrice class
        writeExpenses()
        
        // refresh UI
        priceEl.innerText = "R " + round(FintPrice.calculatePrice()).toFixed(2)
        vatPriceEl.innerText = "R " + round(FintPrice.getVatPrice()).toFixed(2)
}

const handleMarginChange = (e) => {
        FintPrice.setMargin(e.value)
        marginSpan.innerText = round(FintPrice.getMargin() * 100)

        if(FintPrice.getExpenses().length > 0){
                handleCalculate()
        }
}

handleCalculate()
