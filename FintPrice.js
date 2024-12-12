class FintPrice{
        static VAT = 1.15
        static product = null

        static setProduct(){
                this.product = {
                        name : "product A",
                        description : "product holder",
                        price : 0,
                        margin : 0.5,
                        expenses : [],
                        VATprice : 0
                }
        }

        // methods for name property
        static setName(name){
                // check if name is empty
                if(!name) return

                this.product.name = name
                
                return this.product
        }
        static getName(){
                return this.product.name
        }

        // methods for price property
        static setPrice(price){
                if(!price) return

                this.product.price = price

                return this.product
        }
        static getPrice(){
                this.calculatePrice()

                return this.product.price
        }
        static setVatPrice(price){
                this.product.VATprice = price
        }
        static getVatPrice(){
                return this.product.VATprice
        }
        static calculatePrice(){
                let expenses = 0
                let price = 0
                let vatPrice = 0

                // accumulate expense costs
                for(let i = 0; i < this.getExpenses().length; i++){
                        expenses += this.getExpenses()[i].amount
                }

                // calculate the price
                price = expenses * (1 + this.getMargin())
                // calculate the vat price
                vatPrice = price * this.VAT

                this.setPrice(price)
                this.setVatPrice(vatPrice)

                return this.product.price
        }

        // methods for margin property
        static setMargin(margin){
                if(!margin) return 

                this.product.margin = margin / 100

                return this.product
        }
        static getMargin(){
                return this.product.margin
        }
        // methods for expenses property
        static setExpense(
                {
                        name = "Expense", 
                        comment = "expense holder", 
                        amount = 0
                } = {}
        ){
                this.product.expenses.push({name, comment, amount})

                return this.product
        }
        static getTotalExpenses(){
                const total = this.product.expenses.reduce((acc, curr) => acc + curr.amount ,  0)

                console.log(total)
                return total
        }
        static getExpenses(){
                return this.product.expenses
        }
        static clearExpenses(){
                this.product.expenses = []
                return this.product
        }
        static print(){
                console.log(this.product)
        }
}