import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { FilledStarIcon } from '../../Icons/FilledStarIcon'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledCheckBox } from '../../UIKit/StyledCheckBox'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginHorizontal: 24,
      paddingHorizontal: 20,
      paddingTop: 32,
      paddingBottom: 16,
      borderRadius: 16,
      alignSelf: 'center',
      backgroundColor: theme.colors.gray_1,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 32,
      marginBottom: 8,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.blue_6,
    },
    title: { marginTop: 8, color: theme.colors.gray_9 },
    description: { marginTop: 8, color: theme.colors.gray_7 },
    checkboxesWrapper: { marginTop: 16 },
    checkboxContainer: { flexDirection: 'row', paddingVertical: 12, alignItems: 'center' },
    checkboxTextPadding: { paddingLeft: 10, color: theme.colors.gray_9 },
    acceptBtnContainer: { marginTop: 16 },
    cancelBtnContainer: { marginTop: 8 },
  })

  return styles
}

interface Props {
  firstName: string
  isDelete?: boolean
  onAccept: (birthdayCheckbox: boolean, holidayCheckbox: boolean) => void
  hideModal: () => void
}

const AddFavoriteModalContent: React.FC<Props> = ({ firstName, isDelete, onAccept, hideModal }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [birthdayCheckbox, setBirthdayCheckbox] = React.useState<boolean>(true)
  const [holidayCheckbox, setHolidayCheckbox] = React.useState<boolean>(true)

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FilledStarIcon size={16} color={theme.colors.gray_1} />
      </View>
      <StyledText size={'l'} family={'bold'} center style={styles.title}>
        {isDelete ? 'Удалить из избранного?' : 'Добавить в избранное?'}
      </StyledText>
      <StyledText size={'xs'} family={'semibold'} center style={styles.description}>
        {isDelete
          ? `${firstName} будет удалён(а) из списка избранных контактов, а уведомления о нём(ней) отключены`
          : 'Выберите уведомления, которые хотите получать об избранном контакте'}
      </StyledText>

      {isDelete ? null : (
        <View style={styles.checkboxesWrapper}>
          <TouchableOpacity
            onPress={() => setBirthdayCheckbox(!birthdayCheckbox)}
            style={styles.checkboxContainer}
          >
            <StyledCheckBox checkBoxState={birthdayCheckbox} />
            <StyledText size={'xs'} family={'semibold'} style={styles.checkboxTextPadding}>
              День рождения
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHolidayCheckbox(!holidayCheckbox)}
            style={styles.checkboxContainer}
          >
            <StyledCheckBox checkBoxState={holidayCheckbox} />
            <StyledText size={'xs'} family={'semibold'} style={styles.checkboxTextPadding}>
              Отпуск
            </StyledText>
          </TouchableOpacity>
        </View>
      )}
      <StyledButton
        title={isDelete ? 'Удалить' : 'Добавить'}
        onPress={() => {
          onAccept(birthdayCheckbox, holidayCheckbox)
          hideModal()
        }}
        activeBgColor={isDelete ? theme.colors.gray_1 : theme.colors.blue_6}
        activeTextColor={isDelete ? theme.colors.red_6 : theme.colors.gray_1}
        containerStyle={styles.acceptBtnContainer}
      />
      <StyledButton
        title={'Отмена'}
        onPress={hideModal}
        activeBgColor={theme.colors.gray_1}
        activeTextColor={theme.colors.blue_6}
        containerStyle={styles.cancelBtnContainer}
      />
    </View>
  )
}

export { AddFavoriteModalContent }
