import axios from 'axios';
//сторонняя библиотека js необходимая для получения данных из API, альтернатива fetch

const myURL="https://meal-plan-e4gp.onrender.com";

//выгружаем данные из backend
const getAllMeals = (setMeal) => {
    axios.get(myURL)
    .then(({data}) => {
        // console.log(data);
        setMeal(data); //забрали то, что есть в localhost:4000 - записали в data и обновили setMeal
    })
    
    // .then((data) => {
    //     console.log(data)
    //     setMeal(data.data)
    // })
}

// либо без  axios, через fetch
// const getAllMeals = async (setMeal) => {
//     const res = await fetch('http://localhost:4000');
//     const data = await res.json();

//     console.log(data);
//     setMeal(data);
// }


//отправляем данные на backend (добавляем новую еду + отображаем всю, которая уже есть)
const addMeal = (title, setTitle, setMeal) => {
    axios.post(`${myURL}/saveMeals`, { title }) 
    // первый аргумент - куда отправляем (в MealRoutes прописано /saveMeals на методе post)
    // второй аргумент - что отправляем
    .then(data => {
        // console.log(data);
        setTitle(''); // когда отправили post запрос, потом обновили поле input
        getAllMeals(setMeal); // и обновили все данные из backend 
        // иначе на странице не отобразится только что добавленная еда, а только появится после перезагрузки страницы
    })
}

// важно чтобы методы в фронте и бэке совпадали. Тут PUT и на бэкэнде PUT
//изменение рецепта
const editMeal = (mealId, title, setTitle, setMeal, setEditing) => {
    axios.put(`${myURL}/editMeal`, { _id: mealId, title }) 
    // первый аргумент - куда отправляем (в MealRoutes прописано /editMeal на методе PUT)
    // второй аргумент - что отправляем (_id - это id который система дает каждому объекту-рецепту)
    .then(data => {
        // console.log(data);
        setTitle(''); // когда отправили post запрос, потом обновили поле input
        setEditing(false);
        getAllMeals(setMeal); // и обновили все данные из backend 
        // иначе на странице не отобразится только что добавленная еда, а только появится после перезагрузки страницы
    })
}

const deleteMyMeal = (_id, setMeal) => {
    axios.post(`${myURL}/deleteMeal`, { _id}) 
    // первый аргумент - куда отправляем (в MealRoutes прописано /deleteMeal на методе DELETE)
    // второй аргумент - что отправляем (_id - это id который система дает каждому объекту-рецепту)
    .then(data => {
        // console.log(data);
        getAllMeals(setMeal); // и обновили все данные из backend 
    })
}

export { getAllMeals, addMeal, editMeal, deleteMyMeal };