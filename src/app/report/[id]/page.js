import React from 'react'
import PublicLayout from '@/components/Layouts/PublicLayout'
import ReportDetail from '@/components/Pages/Public/ReportDetail'

export default function ReportDetailPage({ params }) {
  return (
    <PublicLayout>
      <ReportDetail reportId={params.id} />
    </PublicLayout>
  )
}
