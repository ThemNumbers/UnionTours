import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet } from 'react-native'
import { clearPhone, formatPhoneNumber } from '../../utils/formatter'
import { StyledTextInput } from './StyledTextInput'

const styles = StyleSheet.create({ container: { marginHorizontal: 16 } })

interface Props {
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

const StyledPhoneInput: React.FC<Props> = ({ value, onChange }) => {
  const correctPhone = formatPhoneNumber(value)

  const onChangeText = (input: string) => {
    const clearNumber = clearPhone(input)
    if (clearNumber === '+7') {
      onChange('')
    } else if (clearNumber.length === 1) {
      onChange(`+7${clearNumber}`)
    } else if (clearNumber === value) {
      onChange(clearNumber.substring(0, clearNumber.length - 1))
    } else {
      onChange(clearNumber)
    }
  }

  return (
    <StyledTextInput
      containerStyle={styles.container}
      label={'Мобильный'}
      textInputProps={{
        value: correctPhone,
        onChangeText: onChangeText,
        placeholder: '+7 (XXX) XXX-XX-XX',
        keyboardType: 'phone-pad',
        maxLength: 18,
      }}
    />
  )
}

export { StyledPhoneInput }
