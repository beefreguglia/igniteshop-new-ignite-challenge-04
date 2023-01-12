import { Minus, Plus } from 'phosphor-react'
import { InputHTMLAttributes, MouseEventHandler } from 'react'
import {
  DecrementButton,
  IncrementButton,
  Input,
  InputContainer,
} from '../styles/components/NumberInput'

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  decreaseProductQuantity: MouseEventHandler<HTMLButtonElement> | undefined
  increaseProductQuantity: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function NumberInput({
  id,
  decreaseProductQuantity,
  increaseProductQuantity,
  ...rest
}: NumberInputProps) {
  return (
    <InputContainer>
      <DecrementButton
        type="button"
        onClick={decreaseProductQuantity}
        // disabled={isMinValue}
      >
        <Minus weight="bold" size={16} />
      </DecrementButton>
      <Input type="number" {...rest} />
      <IncrementButton
        type="button"
        onClick={increaseProductQuantity}
        // disabled={isMaxValue}
      >
        <Plus weight="bold" size={16} />
      </IncrementButton>
    </InputContainer>
  )
}
