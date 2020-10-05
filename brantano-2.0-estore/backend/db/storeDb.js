// CRUD: create, read, update, delete

const readProducts = () => {
    return 'Uggs'
}

const readProduct = (productId) => {
    switch(productId){
        case '1': return 'belt'
        break;
        case '2': return 'socks'
        break;
        case '3': return 'boots'
        break;
        default: return 'stockings'
    }
}

exports.readProducts = readProducts
exports.readProduct = readProduct