
import React from 'react'
import { CheckSquare } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function TodoListPage() {
  return (
    <PagePlaceholder
      title="Todo List"
      subtitle="Manage tasks and stay organized"
      icon={CheckSquare}
      actionLabel="Add Task"
      onActionClick={() => {}}
    />
  )
}
