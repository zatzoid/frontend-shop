# fronted-shop
---
- стэк : jq, webpack.
- Адаптивный под 350px - 1200px.
- Многостраничный интернет магазин.

На данный момент это именно фронтенд проект, с локальным списком из 50 объектов товаров и 4 категорий (асинхронные функции без асинхронных методов сделаны на будущий допил бэкэнда).

# Корзина и просмотренные: 
Реализованы через локальное хранилище.
При рендере страницы объекты в хранилище проеряются на срок годности в один час, по истечении срока они удаляются, при добавлении нового объекта срок обновляется.

#  Категории и товары: 
Реализованы через квэри параметр > поиск по базе > отрисовка.
