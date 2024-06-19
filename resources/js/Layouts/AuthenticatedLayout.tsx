import { PropsWithChildren, ReactNode } from 'react'
import { User } from '@/types'
import Sidebar from '@/Components/Sidebar'
import { Box, Grid, Typography } from '@mui/material'

const Authenticated = ({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) => {
  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        backgroundColor: '#202022'
      }}
    >
      <Grid item xs={2}>
        <Sidebar user={user} />
      </Grid>
      <Grid
        item
        xs={10}
        sx={{
          backgroundColor: '#f1f1f1',
          borderRadius: '16px',
          overflow: 'hidden',
          marginY: 1
        }}
      >

        {header && (
          <Box xs={{
            backgroundColor: '#fff'
          }}
          >
            <Typography
              variant='h2'
              sx={{
                fontWeight: 'fontWeightBold',
                fontSize: '1.25rem',
                color: 'text.secondary',
                backgroundColor: '#fff',
                padding: 3,
                textAlign: 'center',
                lineHeight: 'tight'
              }}
            >
              {header}
            </Typography>
          </Box>
        )}

        <main>{children}</main>
      </Grid>
    </Grid>
  )
}

export default Authenticated
