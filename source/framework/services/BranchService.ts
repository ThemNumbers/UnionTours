import React from 'react'
import { Share } from 'react-native'
import branch, { BranchParams } from 'react-native-branch'

export const shareDeeplink = async (
  title: string,
  desc: string,
  params: Record<string, string>
) => {
  const linkProperties = { feature: 'share', channel: 'RNApp' }
  const controlParams = {}

  const branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
    locallyIndex: true,
    title: title,
    contentDescription: desc,
    contentMetadata: {
      customMetadata: params,
    },
  })

  branchUniversalObject
    .generateShortUrl(linkProperties, controlParams)
    .then(({ url }) => Share.share({ message: url }))
}

export const useDeeplinks = (deeplinkHandler: (params?: BranchParams) => void) => {
  React.useEffect(() => {
    const subscription = branch.subscribe(({ error, params }) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error from Branch: ' + error)
      } else {
        deeplinkHandler(params)
      }
      // params will never be null if error is null
    })

    return subscription
  }, [deeplinkHandler])
}
