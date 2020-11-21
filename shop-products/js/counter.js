window.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-action')) {
        // От кнопки, по которой кликнули, находим обертку текущего счетчика
        const counterWrapper = event.target.closest('.counter-wrapper');
        // От обертки счетчика находим div со значением счетчика
        const counter = counterWrapper.querySelector('[data-counter]');

        if (event.target.dataset.action === 'plus') {
            // Изменяем текст счетчика,увеличивая его на 1
            counter.innerText = ++counter.innerText;
            if (event.target.closest('.cart-wrapper')) {
                // Пересчет суммы заказа, скрытие/показ блоков в корзине
                toggleCartStatus();
            }
        } else if (event.target.dataset.action === 'minus') {


            
            // Проверка где находится товар =  в каталоге или в корзине

            // Если в корзине = уменьшаем до 1 и после удаляем
            if (event.target.closest('.cart-wrapper')) {
                // Уменьшаем счетчик только до 1
                if (parseInt(counter.innerText) > 1) {
                    //Если количество больше единицы - уменьшаем его на 1
                    counter.innerText = --counter.innerText;
                    toggleCartStatus();
                }
                // Иначе, если кол-во = 1 - удаляем товар из корзины
                else {
                    event.target.closest('.cart-item').remove();
                    toggleCartStatus();
                }
                // Пересчет суммы заказа, скрытие/показ блоков в корзине
                toggleCartStatus();
            }
            // Если товар в каталоге - уменьшаем до 1
            else {
                // Уменьшаем счетчик только до 1
                if (parseInt(counter.innerText) > 1) {
                    // Изменяем текст счетчика,уменьшая его на 1
                    counter.innerText = --counter.innerText;
                }
            }

        }


    }
});