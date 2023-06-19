import { useEffect, useState } from 'react';
import './App.css';
import { MyMeals } from './MyMeals';
import { addMeal, getAllMeals, editMeal, deleteMyMeal } from './FetchMeals';

function App() {

  const [myMeal, setMeal] = useState([]); // выгрузка меню из API (backend)
  const [title, setTitle] = useState(''); // то, что пользователь записывает в input. 
  // Title - совпадает с backend->MealModel.js -> Схема -> каждый объект имеет title и его мы будем записывать (MealController.js -> post)
  const [editing, setEditing] = useState(false); //возможность редактировать уже записанный рецепт
  //изначально false, а когда нажимаем кнопку редактировать - то меняем на true
  const [mealId, setMealId] = useState('');

  useEffect( () => {
    getAllMeals(setMeal);
  }, [])


  const searchMeal = (evt) => {
    // console.log(evt.target.value);
    setTitle(evt.target.value)
  }
  
  const updatingInInput = (_id, title) => {
    setEditing(true); // даем возможность изменять рецепт
    setTitle(title); // показываем в inpute этот выбранный рецепт
    setMealId(_id); // записываем в качестве _id рецепта, тот старый id с которым он пришел, чтобы перезаписать его в базе
  }
  // console.log(title);

  return (
    <div>
      <h1>Meal Plan</h1>
      <input onChange={searchMeal} type="text" placeholder="Add a meal" value={title}/>
      
      <button 
      disabled={!title} //Если нет текста в input, то на ADD невозможно нажать
      className={!title ? 'notActive': ''} //Если нет текста  в input, то кнопка ADD становится серой 
      // className={title.trim().length === 0 ? 'not-active': ''} // Если input пустой 
      onClick={
        editing 
        ? () => editMeal(mealId, title, setTitle, setMeal, setEditing) 
        : () => addMeal(title, setTitle, setMeal)
      }>{editing ? 'Edit': 'Add'}</button>

      {myMeal.map(meal => <MyMeals text={meal.title} key={meal._id} 
      updatingInInput={() => updatingInInput(meal._id, meal.title)} 
      deleteMyMeal={() => deleteMyMeal(meal._id, setMeal)}
      />)}
    
    </div>
  );
}

export default App;
