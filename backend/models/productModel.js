const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    profit: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Add a pre-save hook to calculate the price based on cost and profit
productSchema.pre('save', function (next) {
  this.price = this.cost + (this.cost * this.profit)
  next()
})

module.exports = mongoose.model('Product', productSchema)
