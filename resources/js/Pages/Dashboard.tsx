import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { FC } from 'react'
import { Box } from '@mui/material'

const Dashboard: FC<PageProps> = ({ auth }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header='Dashboard'
    >
      <Head title='Dashboard' />
      <Box xs={{ py: '3rem' }}>
        <Box
          sx={{
            maxWidth: '90rem',
            marginX: 'auto',
            paddingX: { sm: 6, lg: 8 }
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              overflow: 'hidden',
              boxShadow: 1,
              marginTop: '1rem',
              borderRadius: '2rem'
            }}
          >
            <Box
              sx={{
                padding: 6,
                color: 'text.primary'
              }}
            >You're logged in!
            </Box>
          </Box>
        </Box>
      </Box>
    </AuthenticatedLayout>
  )
}
export default Dashboard
