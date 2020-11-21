// 2. Добавляем товар в корзину и проверяем,есть ли он там
// если уже есть то увеличиваем его количество

// Div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

// отслеживаем клик на странице
window.addEventListener('click', (event) => {
    // Проверяем клик по кнопке ДОБАВИТЬ В КОРЗИНУ
    if (event.target.hasAttribute('data-cart')) {
        // Находим карточку с товаром,внутри которой совершен клик
        const card = event.target.closest('.card');

        // Сбрасываем счетчик количества товара
        card.querySelector('[data-counter]').innerText = '1';

        // Собираем данные с этого товара и записываем в единый объект productInfo
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText
        };

        // Проверяем, есть ли такой товар в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        // Если товар есть в корзине
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText); + parseInt(productInfo.counter);
        } // Если товара нет в корзине
        else {
            // Собранные данные подставим в шаблон для товара в корзине
            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${productInfo.imgSrc}" alt="">
            </div>
            <div class="cart-item__desc">
                <div class="cart-item__title">${productInfo.title}</div>
                <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

                <!-- cart-item__details -->
                <div class="cart-item__details">

                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${productInfo.counter}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${productInfo.price}</div>
                    </div>

                </div>
                <!-- // cart-item__details -->

            </div>
        </div>
    </div>`;
            // Отображаем товар в корзине
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        };

        // Сбрасываем счетчик количества товара, который только что добавили в корзину
        card.querySelector('[data-counter]').innerText = '1';

        toggleCartStatus();
    };

});

// Функция показа/скрытия Корзина пуста, пересчета суммы заказа
function toggleCartStatus() {
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const cartTotal = document.querySelector('.cart-total');
    const orderForm = document.querySelector('#order-form');

    // Показываем или скрываем определенные элементы в корзине
    // Проверяем есть-ли в корзине товары (наличие тегов с классом .cart-item)

    // Если в корзине ЕСТЬ ТОВАРЫ
    if ( cartWrapper.querySelectorAll('.cart-item').length > 0 ) {
        cartEmpty.classList.add('none');
        cartTotal.classList.remove('none');
        orderForm.classList.remove('none');
    } 
    // Если корзина ПУСТА
    else {
        cartEmpty.classList.remove('none');
        cartTotal.classList.add('none');
        orderForm.classList.add('none');
    }

    // Пересчитываем стоимость заказа
    let totalPrice = 0;

    cartWrapper.querySelectorAll('.cart-item').forEach((item) => {
        console.log(item.querySelector('[data-counter]').innerText);
        const counter = item.querySelector('[data-counter]').innerText;
        const priceOneItem = item.querySelector('price__currency').innerText;
        const price = parseInt(counter) * parseInt(priceOneItem);
        totalPrice += price;
    });

    cartTotal.querySelector('.total-price').innerText = totalPrice;
}