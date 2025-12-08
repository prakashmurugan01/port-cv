import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Loader2 } from 'lucide-react'

const Admin = () => {
  const { user, isAdmin, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth')
        return
      }
      
      if (!isAdmin) {
        navigate('/')
        return
      }
    }
  }, [user, isAdmin, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return <AdminLayout />
}

export default Admin