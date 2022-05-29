import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../../theme'
import { DefaultHeader } from '../../../../components/DefaultHeader'
import { StyledText } from '../../../../components/UIKit/StyledText'
import { APP_VERSION, DEVICE_ID } from '../../../../utils/constants'
import messaging from '@react-native-firebase/messaging'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    textContainer: { margin: 16 },
    text: { color: theme.colors.gray_7 },
  })

  return styles
}

const AboutAppScreen: React.FC = () => {
  const { styles } = useThemeStyles(createStyles)
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    messaging()
      .getToken()
      .then((fcmToken) => setToken(fcmToken))
  }, [])

  return (
    <View style={styles.container}>
      <DefaultHeader title={'О приложении'} />
      <ScrollView>
        <View style={styles.textContainer}>
          <StyledText selectable size={'xs'} family={'semibold'} style={styles.text}>
            {`\n\nВерсия приложения: ${APP_VERSION}`}
            {`\n\nID устройства: ${DEVICE_ID}`}
            {`\n\nFCM токен: ${token}`}
          </StyledText>
        </View>
      </ScrollView>
    </View>
  )
}

export { AboutAppScreen }
