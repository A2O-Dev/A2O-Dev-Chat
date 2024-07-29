import { Box } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>{children}</Box>
      )}
    </Box>
  )
}

export default CustomTabPanel
