const fs = require('fs');
let path = './config/shipping.json'

const ReadShippingCosts = () => {
    const data = fs.readFileSync(path, 'utf-8');
    const shipping = JSON.parse(data).shipping_costs;
    return shipping;
}

const UpdateShippingCosts = (shipping_costs) => {
    const info = { 
        "shipping_costs" : shipping_costs
    }
    const data = JSON.stringify(info)

    fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
            throw err;
        }
        console.log("Shipping costs were updated to € " + shipping_costs);
    });
}

exports.ReadShippingCosts = ReadShippingCosts
exports.UpdateShippingCosts = UpdateShippingCosts