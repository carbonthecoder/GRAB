import React from 'react'
import {Box, Text} from 'ink'
import {useTheme} from '../theme.js'

const ART = [
  '  ____ ____      _    ____  ',
  ' / ___|  _ \\    / \\  | __ ) ',
  '| |  _| |_) |  / _ \\ |  _ \\ ',
  '| |_| |  _ <  / ___ \\| |_) |',
  ' \\____|_| \\_\\/_/   \\_\\____/ ',
]

export function Logo() {
  const theme = useTheme()

  return (
    <Box flexDirection="column" alignItems="center" flexShrink={0}>
      {ART.map((line, row) => (
        <Text key={row} color={theme.primary} bold>
          {line}
        </Text>
      ))}
    </Box>
  )
}
