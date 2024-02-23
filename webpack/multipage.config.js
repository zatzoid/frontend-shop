const path = require('path');

result = {}

result.entry = {
    'main': path.join(__dirname, '../src/pages/main/main.js'),
    'card': path.join(__dirname, '../src/pages/card/card.js'),
    'catalog': path.join(__dirname, '../src/pages/catalog/catalog.js'),
    'category': path.join(__dirname, '../src/pages/category/category.js'),
    'basket': path.join(__dirname, '../src/pages/basket/basket.js'),
}

result.pages = [
    { chunks: ['main'], page: 'index.html', template: path.join(__dirname, '../src/index.html'), },
    { chunks: ['card'], page: 'card.html', template: path.join(__dirname, '../src/pages/card/card.html') },
    { chunks: ['catalog'], page: 'catalog.html', template: path.join(__dirname, '../src/pages/catalog/catalog.html') },
    { chunks: ['category'], page: 'category.html', template: path.join(__dirname, '../src/pages/category/category.html') },
    { chunks: ['basket'], page: 'basket.html', template: path.join(__dirname, '../src/pages/basket/basket.html') },
]

module.exports = result;