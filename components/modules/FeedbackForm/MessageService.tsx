import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const MessageService = ({
  register,
  errors,
  darkModeClass,
}: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <textarea
      className={`${styles.feedback_form__form__textarea} ${darkModeClass}`}
      placeholder="Укажите авто и вид работ"
      {...register('message', {
        required: 'Введите сообщение!',
        minLength: 20,
        maxLength: 300,
      })}
    />
    {errors.message && (
      <span className={styles.error_alert}>{errors.message?.message}</span>
    )}
    {errors.message && errors.message.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 20 символов!</span>
    )}
    {errors.message && errors.message.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 300 символов!</span>
    )}
  </label>
)

export default MessageService
