import React, { useState } from 'react';
import { Plus, Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

const FAQManager: React.FC = () => {
  const [faqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "Do you ship plants nationwide?",
      answer: "Yes, we ship to all 50 states. Plants are carefully packaged to ensure they arrive in perfect condition.",
      category: "Shipping",
      order: 1
    },
    {
      id: 2,
      question: "What if my plant arrives damaged?",
      answer: "Contact us within 48 hours with photos, and we'll arrange a replacement or refund.",
      category: "Returns",
      order: 2
    }
  ]);

  const handleAddFAQ = () => {
    // Implementation for adding new FAQ
    console.log('Add new FAQ');
  };

  const handleEditFAQ = (faq: FAQ) => {
    // Implementation for editing FAQ
    console.log('Edit FAQ:', faq);
  };

  const handleDeleteFAQ = (faqId: number) => {
    // Implementation for deleting FAQ
    console.log('Delete FAQ:', faqId);
  };

  const handleReorder = (faqId: number, direction: 'up' | 'down') => {
    // Implementation for reordering FAQs
    console.log('Reorder FAQ:', faqId, direction);
  };

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
                      onClick={() => handleReorder(faq.id, 'up')}
                      disabled={index === 0}
                      className={`p-1 ${
                        index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ChevronUp className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleReorder(faq.id, 'down')}
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