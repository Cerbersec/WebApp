const fs = require('fs');
let path = './config/shipping.json'
let companypath = './config/companyinfo.json'

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

const ReadCompanyInfo = () => {
    const data = fs.readFileSync(companypath, 'utf-8');
    const info = JSON.parse(data);
    return info;
}

const UpdateCompanyInfo = (companyinfo) => {
    const info = { 
        "email" : companyinfo.email,
        "phone" : companyinfo.phone,
        "adress_line_1": companyinfo.adress_line_1,
        "adress_line_2": companyinfo.adress_line_2,
        "adress_line_3": companyinfo.adress_line_3,
    }

    const data = JSON.stringify(info)

    fs.writeFile(companypath, data, 'utf8', (err) => {
        if (err) {
            throw err;
        }
        console.log("Company info was updated");
    });
}

exports.ReadShippingCosts = ReadShippingCosts
exports.UpdateShippingCosts = UpdateShippingCosts
exports.ReadCompanyInfo = ReadCompanyInfo
exports.UpdateCompanyInfo = UpdateCompanyInfo
