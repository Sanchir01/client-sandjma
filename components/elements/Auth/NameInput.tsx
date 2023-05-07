import styles from '@/styles/Auth/index.module.scss'
import { IAuthInput } from '@/types/Auth.interface'

const NameInput = ({register,errors}:IAuthInput) => {
  return (
    <label className={styles.form__label}>
        <input {...register('name',{
          required:'Введите имя',
          minLength:2,
          maxLength:100,
          
        })} 
        className={styles.form__input} type='text' placeholder='Name' />
        {errors.name &&(
          <span className={styles.error_alert}>{errors.name?.message}</span>
        )}
         {errors.name &&errors.name.type ==='maxLength' &&(
          <span className={styles.error_alert}>не более 100 символов</span>
        )}
        {errors.name &&errors.name.type ==='minLength' &&(
          <span className={styles.error_alert}>не менее 2 символов</span>
        )}
    </label>
  )
}

export default NameInput