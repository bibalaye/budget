import { getCategoryInfo } from '@/lib/categories';
import { formatCurrency, formatDate } from '@/lib/utils';

/**
 * TransactionSlideout component - displays transaction history
 */
export default function TransactionSlideout({ isOpen, onClose, transactions }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
        onClick={onClose}
      />

      {/* Slideout panel */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-[600px] bg-rollbar-bg-card shadow-[-4px_0_20px_rgba(0,0,0,0.3)] z-[1000] flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-rollbar-border">
          <h2 className="text-rollbar-yellow text-2xl font-semibold m-0">
            Historique des transactions
          </h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-white text-4xl cursor-pointer p-0 w-9 h-9 flex items-center justify-center transition-colors hover:text-rollbar-yellow"
            aria-label="Close slideout"
          >
            ×
          </button>
        </div>

        {/* Transaction list */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {transactions.length === 0 ? (
            <p className="text-white text-center py-8">Aucune transaction pour le moment</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => {
                const categoryInfo = getCategoryInfo(transaction.category, transaction.type);
                return (
                  <div
                    key={transaction.id}
                    className="bg-rollbar-bg-dark border border-rollbar-border rounded-lg p-4 transition-all hover:border-rollbar-blue"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl">{categoryInfo.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-base mb-1">
                            {transaction.description}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${
                              transaction.type === 'income' 
                                ? 'bg-[rgba(16,185,129,0.18)] text-[#10b981]'
                                : 'bg-[rgba(239,68,68,0.18)] text-[#ef4444]'
                            }`}>
                              {transaction.type === 'income' ? 'Revenu' : 'Dépense'}
                            </span>
                            <span className="text-rollbar-gray-text text-xs">
                              {categoryInfo.name}
                            </span>
                            {transaction.subcategory && (
                              <span className="text-rollbar-gray-text text-xs">
                                • {transaction.subcategory}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className={`text-xl font-bold ${
                          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-rollbar-gray-text text-xs mt-1">
                          {formatDate(transaction.date, 'short')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}


