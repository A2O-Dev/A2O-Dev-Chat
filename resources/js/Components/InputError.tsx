import { FC, HTMLAttributes } from 'react'

const InputError: FC<HTMLAttributes<HTMLParagraphElement> & { message?: string }> = ({ message, className = '', ...props }) => {
  return message
    ? (
      <p {...props} className={'text-sm text-red-600 ' + className}>
        {message}
      </p>
      )
    : null
}
export default InputError
