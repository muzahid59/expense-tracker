'use client';

import { useState } from 'react';
import { Expense, ExpenseFormData } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_ICONS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ExpenseForm from './ExpenseForm';
import { Edit2, Trash2 } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (id: string, data: ExpenseFormData) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({
  expense,
  onEdit,
  onDelete,
}: ExpenseItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (data: ExpenseFormData) => {
    onEdit(expense.id, data);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(expense.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {CATEGORY_ICONS[expense.category]}
              </span>
              <Badge category={expense.category}>
                {expense.category}
              </Badge>
            </div>
            <p className="text-gray-900 font-medium mb-1">
              {expense.description}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(expense.date)}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(expense.amount)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Expense"
      >
        <ExpenseForm
          onSubmit={handleEdit}
          defaultValues={{
            date: expense.date,
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
          }}
          submitLabel="Save Changes"
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Expense"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this expense? This action
            cannot be undone.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium">{expense.description}</p>
            <p className="text-sm text-gray-600">
              {formatCurrency(expense.amount)} -{' '}
              {formatDate(expense.date)}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleDelete}
              fullWidth
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
