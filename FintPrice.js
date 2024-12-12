class FintPrice{
        static VAT = 1.15
        static product = null

        static setProduct(){
                this.product = {
                        name : "product A",
                        description : "product holder",
                        price : 0,
                        margin : 0.5,
                        expenses : [
                                {name : "Expense", comment : "expense holder", amount : 0}
                        ],
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
        static calculatePrice(){
                let expenses = 0
                let price = 0

                // accumulate expense costs
                for(let i = 0; i < this.getExpenses().length; i++){
                        expenses += this.getExpenses()[i].amount
                }

                // calculate the price
                price = expenses * (1 + this.getMargin())

                this.setPrice(price)

                return this.product
        }

        // methods for margin property
        static setMargin(margin){
                if(!margin) return 

                this.product.margin = margin

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
        static getExpenses(){
                return this.product.expenses
        }
        static print(){
                console.log(this.product)
        }
}