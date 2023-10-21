import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard Page</div>
      <div>
        <Link href="/courses">
          <Button>Courses</Button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard