import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface MultipleSelectProps {
  list: any[]
  label: string
  selected: string[]
  setSelected: (val: string[]) => void
}

function getStyles (
  name: string,
  personName: string[],
  theme: Theme
): {
    fontWeight: number | string
  } {
  return {
    fontWeight: !personName.includes(name)
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium
  }
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  list,
  label,
  selected,
  setSelected
}: MultipleSelectProps) => {
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<typeof selected>): void => {
    const {
      target: { value }
    } = event
    setSelected(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
          MenuProps={MenuProps}
        >
          {list.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(item.email, selected, theme)}
            >
              {item.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default MultipleSelect
