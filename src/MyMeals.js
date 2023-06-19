import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export const MyMeals = ({ text, updatingInInput, deleteMyMeal}) => {
    return (
        <div className='listItem'>
            <p>{text}</p>
            <AiFillEdit className='btn' onClick={updatingInInput} />
            <AiFillDelete className='btn' onClick={deleteMyMeal} />
        </div>
    )
};
