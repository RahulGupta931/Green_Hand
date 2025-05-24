import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';
import { FAQ } from '../../../types';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../../lib/api';
import toast from 'react-hot-toast';

const FAQManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (error) {
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async () => {
    const newFAQ: Omit<FAQ, 'id' | 'created_at'> = {
      question: 'New Question',
      answer: 'Answer to the question',
      category: 'General',
      order: faqs.length + 1
    };

    try {
      await createFAQ(newFAQ);
      await loadFAQs();
      toast.success('FAQ added successfully');
    } catch (error) {
      toast.error('Failed to add FAQ');
    }
  };

  const handleEditFAQ = async (faq: FAQ) => {
    try {
      const updates = {
        question: window.prompt('Enter question:', faq.question) || faq.question,
        answer: window.prompt('Enter answer:', faq.answer) || faq.answer,
        category: window.prompt('Enter category:', faq.category) || faq.category
      };
      
      await updateFAQ(faq.id, updates);
      await loadFAQs();
      toast.success('FAQ updated successfully');
    } catch (error) {
      toast.error('Failed to update FAQ');
    }
  };

  const handleDeleteFAQ = async (faqId: string) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      await deleteFAQ(faqId);
      await loadFAQs();
      toast.success('FAQ deleted successfully');
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleReorder = async (faq: FAQ, direction: 'up' | 'down') => {
    const currentIndex = faqs.findIndex(f => f.id === faq.id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === faqs.length - 1)
    ) return;

    const newOrder = direction === 'up' ? faq.order - 1 : faq.order + 1;
    const otherFaq = faqs.find(f => f.order === newOrder);

    if (!otherFaq) return;

    try {
      await Promise.all([
        updateFAQ(faq.id, { order: newOrder }),
        updateFAQ(otherFaq.id, { order: faq.order })
      ]);
      await loadFAQs();
      toast.success('FAQ reordered successfully');
    } catch (error) {
      toast.error('Failed to reorder FAQ');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">FAQ Management</h2>
        <button
          onClick={handleAddFAQ}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mt-2">{faq.question}</h3>
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleReorder(faq, 'up')}
                      disabled={index === 0}
                      className={`p-1 ${
                        index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ChevronUp className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleReorder(faq, 'down')}
                      disabled={index === faqs.length - 1}
                      className={`p-1 ${
                        index === faqs.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleEditFAQ(faq)}
                    className="p-1 text-green-600 hover:text-green-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFAQ(faq.id)}
                    className="p-1 text-red-600 hover:text-red-900"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQManager;