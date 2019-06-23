const data = {
  ipd: {
    name: 'Super ipad',
    price: 549.99,
    quantity: 0,
  },
  mbp: {
    name: 'MacBook Pro',
    price: 1399.99,
    quantity: 0,
  },
  atv: {
    name: 'Apple TV',
    price: 109.50,
    quantity: 0,
  },
  vga: {
    name: 'VGA Adapter',
    price: 30.00,
    quantity: 0,
  }
}

pricingRules = () => {
  let totalPrice = 0
  let scannedItems = []
  Object.entries(data).map(([key, value]) => {
    if (key === 'atv') {
      // Check if it is an apple tv
      if (value.quantity >= 3) {
        // if apple tv quantity more than or equals to 3 then only add a price of the reduction of the actual quantity by 1
        totalPrice += value.price * (value.quantity - 1)
      } else {
        totalPrice += value.price * value.quantity
      }
    } else if (key === 'ipd') {
      // check if it is an ipad
      if (value.quantity > 4) {
        //if ipad quantity more than 4 then add 499.99 only
        totalPrice += 499.99 * value.quantity
      } else {
        totalPrice += value.price * value.quantity
      }
    } else if (key === 'mbp') {
      // check if it is a mac book pro
      totalPrice += value.price * value.quantity
    } else if (key === 'vga') {
      // chceck if it is a vga adapter
      if (data[key].quantity > data['mbp'].quantity) {
        // if the quantity of vga adapter is more than macbook pro quantity then add the price of remaining vga
        totalPrice += value.price * (data[key].quantity - data['mbp'].quantity)
      }
    }
    const items = new Array(value.quantity).fill(key) // create array filled with the item based on the quantity
    scannedItems = scannedItems.concat(items) // join array to show SKUs scanned
  })
  return {
    'SKUs Scanned': scannedItems,
    'Total Expected': `$${totalPrice}`
  }
}

class Checkout {
  constructor (pricingRules) {
    this.pricingRules = pricingRules
  }

  scan (product) {
    if (data[product]) {
      data[product].quantity += 1
    }
    return
  }
  total () {
    return this.pricingRules()
  }
}

const co = new Checkout(pricingRules)
co.scan('atv')
co.scan('atv')
console.log(co.total()) 