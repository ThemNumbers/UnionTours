import * as React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', minHeight: 150, justifyContent: 'center' },
    title: { color: theme.colors.gray_9, marginTop: 24, paddingHorizontal: 50 },
    description: { color: theme.colors.gray_8, paddingHorizontal: 50 },
    btnContainer: { marginHorizontal: 16, marginBottom: 24 },
  })

  return styles
}

interface Props {
  icon: React.ReactNode
  title?: string
  description?: string
  buttonTitle?: string
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
}

const PendingPreview: React.FC<Props> = ({
  icon,
  title,
  description,
  buttonTitle,
  containerStyle,
  onPress,
}) => {
  const { styles } = useThemeStyles(createStyles)

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {icon}
        {title ? (
          <StyledText size={'l'} family={'bold'} center style={styles.title}>
            {title}
          </StyledText>
        ) : null}
        {description ? (
          <StyledText
            size={'xs'}
            family={'regular'}
            center
            style={[styles.description, { marginTop: title ? 8 : 24 }]}
          >
            {description}
          </StyledText>
        ) : null}
      </View>
      {buttonTitle && onPress ? (
        <StyledButton containerStyle={styles.btnContainer} title={buttonTitle} onPress={onPress} />
      ) : null}
    </>
  )
}

export { PendingPreview }
