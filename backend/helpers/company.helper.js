export const getOfferTotal = (products) => {
    let total = 0
    products.forEach(product => {
        total += product.total
    });
    return total
}