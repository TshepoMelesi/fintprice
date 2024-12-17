class FintPrice{
        static VAT = 1.15
        static product = null

        static setProduct(){
                this.product = {
                        image: null,
                        name : "product A",
                        description : "This is a description space for this product",
                        price : 0,
                        margin : 0.5,
                        expenses : [],
                        VATprice : 0
                }
        }
        static setDescription(description){
                this.product.description = description
        }

        static getDescription(){
                return this.product.description
        }
        static setImage(image){
                this.product.image = image
        }

        static getImage(){
                return this.product.image
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
                if(name === "Expenses" || amount === 0) return
                
                this.product.expenses.push({name, comment, amount})

                return this.product
        }
        static getTotalExpenses(){
                const total = this.product.expenses.reduce((acc, curr) => acc + curr.amount ,  0)

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
                const output = document.querySelector(".output")
                const quality = 2
                const width = output.width = 794 * quality
                const height = output.height = 1123 * quality
                output.style.width = 794 / quality + "px"
                output.style.height = 1123 / quality + "px"
                const context = output.getContext("2d")

                // draw background
                drawRect(context, {x: 0, y: 0, w: width, h: height, color: "white"})

                const offset = {x: 30* quality, y: 30* quality}
                const img = {x: offset.x, y: offset.y, w: 0.4 * width, h: 0.25 * height}

                // draw an image
                const productImg = new Image()
                productImg.src = this.getImage()
                context.beginPath()
                context.drawImage(productImg, img.x, img.y, img.w, img.h)
                context.fill()
                context.closePath()

                // draw the name
                text(context, {fontSize: 32 * quality, message : this.product.name, x: width * .47, y: offset.y})
                // draw margin
                text(context, {fontSize: 16* quality, message : 100 * this.product.margin + "% profit margin", x: width * .47, y: offset.y + 38 * quality})
                // draw description
                text(context, {fontSize: 20* quality, message : this.product.description, x: width * .47, y: offset.y + 38 * 2* quality})
                // draw price
                let price = "R " + this.getPrice().toFixed(2)
                let priceFont = 32 * 1.5 * quality
                context.font = priceFont + "px Arial"
                let priceWidth = context.measureText(price).width

                drawRect(context, {x: width * .47 - 10* quality, y: offset.y + 0.25 * height, w: priceWidth + 20* quality , h: (-50 -10)* quality})
                text(context, {fontSize: priceFont, color: "white", message : price, x: width * .47, y: offset.y + 0.25 * height, baseline : "bottom"})
                // draw vat price
                text(context, {fontSize: 14* quality, align: "right", message : "VAT included", x: width - offset.x, y: offset.y + 0.25 * height - 32* quality, baseline : "bottom"})
                text(context, {fontSize: 32* quality, align: "right", message : "R " + this.getVatPrice().toFixed(2), x: width - offset.x, y: offset.y + 0.25 * height, baseline : "bottom"})
                // draw expense table
                text(context, {fontSize: 32* quality, message : "Expenses", x: offset.x, y: offset.y + 0.25 * height + 120 * quality, baseline : "bottom"})
                drawRect(context, {x: offset.x, y : offset.y + 0.25 * height + 120 * quality, w: width - offset.x * 2, h: 2})
                let y = -500
                for(let i = 0; i < this.getExpenses().length; i++){
                        let fontSize = 28* quality
                        let item = this.getExpenses()[i]
                        y =  offset.y + 0.25 * height + 120 * quality + ((50 * (i + 1)) * quality)
                        text(context, {fontSize, message : item.name, x: offset.x + 32 * quality, y, baseline : "bottom"})
                        text(context, {fontSize, message : item.amount.toFixed(2), x: width - offset.x - 32 * quality, align: "right", y, baseline : "bottom"})
                }
                drawRect(context, {x: offset.x, y : y + 10 * quality, w: width - offset.x * 2, h: 2})
                text(context, {fontSize: 32* quality, message : "Total Expenses", x: offset.x + 32 * quality, y: y + 20 * quality, baseline : "top"})
                text(context, {fontSize: 32* quality, message : this.getTotalExpenses().toFixed(2), x: width - offset.x - 32 * quality, align: "right", y: y + 20 * quality, baseline : "top"})
        
                if(this.getExpenses().length > 0){
                        const link = document.createElement("a")
                
                        // set up the frame name
                        link.download = this.product.name + ".png"

                        // get the image url
                        const imageURL = output.toDataURL("image/png")
                        link.href = imageURL
                        // simulate a click
                        link.click()
                }
        }
}

const text = (context, 
        {
                fontSize = 32, 
                fontFamily = "Arial", 
                baseline = "top",
                color = "black",
                message = "Product Name",
                align = "left",
                x = 100,
                y = 100
        } = {}) => {
        context.beginPath()
        context.font = fontSize + "px " + fontFamily
        context.textBaseline = baseline
        context.textAlign = align
        context.fillStyle = color
        context.fillText(message, x, y)
        context.fill()
        context.closePath()
}

const drawRect = (context, {x, y, w, h, color = "black", fill = true} = {}) => {
        context.beginPath()
        context.fillStyle = color
        context.rect(x, y, w, h)
        context.fill()
        context.closePath()
}