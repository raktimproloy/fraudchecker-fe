import React from 'react'
import AdminLayout from '@/components/Layouts/AdminLayout'
import FraudRecordsManagement from '@/components/Pages/Admin/Frauds'
export default function AdminFraudsPage() {
  return (
    <AdminLayout>
      <FraudRecordsManagement />
    </AdminLayout>
  )
}
