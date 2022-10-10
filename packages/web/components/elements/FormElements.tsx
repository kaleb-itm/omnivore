import { styled } from '../tokens/stitches.config'
import { useState } from 'react'
import Checkbox from './Checkbox'
import { HStack, VStack } from './LayoutPrimitives'
import { Label } from '@radix-ui/react-dropdown-menu'

export interface FormInputProps {
  name: string
  label: string
  value?: any
  onChange?: (value: any) => void
  type?: string
  placeholder?: string
  disabled?: boolean
  hidden?: boolean
  required?: boolean
  css?: any
  options?: string[]
  min?: any
}

export const FormInput = styled('input', {
  border: 'none',
  width: '100%',
  bg: 'transparent',
  fontSize: '16px',
  fontFamily: 'inter',
  fontWeight: 'normal',
  lineHeight: '1.35',
  color: '$grayTextContrast',
  '&:focus': {
    outline: 'none',
  },
})

export const BorderedFormInput = styled(FormInput, {
  borderRadius: '6px',
  border: `1px solid $grayBorder`,
  p: '$3',
})

export function GeneralFormInput(props: FormInputProps): JSX.Element {
  const [input, setInput] = useState<FormInputProps>(props)

  if (props.type === 'checkbox') {
    const StyledLabel = styled(Label, {
      color: '$grayTextContrast',
      fontSize: 13,
      padding: '5px 10px',
      cursor: 'default',
    })

    return (
      <VStack>
        {input.options?.map((label, index) => (
          <HStack key={index} alignment="center">
            <Checkbox
              key={index}
              checked={input.value[index]}
              setChecked={(arg) => {
                input.value[index] = arg
                setInput(input)
                props.onChange &&
                  props.onChange(
                    input.options?.filter((_, i) => input.value[i])
                  )
              }}
            ></Checkbox>
            <StyledLabel>{label}</StyledLabel>
          </HStack>
        ))}
      </VStack>
    )
  } else if (props.type === 'select') {
    return (
      <select
        onChange={input.onChange}
        style={{
          padding: '8px',
          height: '38px',
          borderRadius: '6px',
          minWidth: '196px',
        }}
      >
        {input.options?.map((label, index) => (
          <option key={index} value={label}>
            {label}
          </option>
        ))}
      </select>
    )
  } else {
    return (
      <FormInput
        key={input.name}
        type={input.type || 'text'}
        value={input.value}
        placeholder={input.placeholder}
        onChange={(event) => {
          if (input.onChange) {
            setInput({ ...input, value: event.target.value })
            input.onChange(event.target.value)
          }
        }}
        disabled={input.disabled}
        hidden={input.hidden}
        required={input.required}
        css={{
          border: '1px solid $textNonessential',
          borderRadius: '8px',
          width: '100%',
          bg: 'transparent',
          fontSize: '16px',
          textIndent: '8px',
          marginBottom: '2px',
          height: '38px',
          color: '$grayTextContrast',
          '&:focus': {
            outline: 'none',
            boxShadow: '0px 0px 2px 2px rgba(255, 234, 159, 0.56)',
          },
        }}
        name={input.name}
        min={input.min}
      />
    )
  }
}
