import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePlatform();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 bg-[#0B1F38] text-white p-3.5 rounded-lg shadow-2xl border border-[#1E3A5F] animate-in slide-in-from-right-8 duration-300"
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#10B981]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#F4B323]" />}
              {isError && <XCircle className="w-5 h-5 text-[#EF4444]" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-[#2563EB]" />}
            </div>
            <div className="flex-1 pr-2">
              <h4 className="text-xs font-bold text-white leading-tight">{toast.title}</h4>
              <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#64748B] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

