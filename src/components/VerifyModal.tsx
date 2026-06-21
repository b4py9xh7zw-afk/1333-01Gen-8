import { useState, useEffect } from 'react';
import { X, Shield, AlertCircle } from 'lucide-react';
import CodeInput from '@/components/CodeInput';
import { sendVerificationCode, verifyCode } from '@/mock';
import useAppStore from '@/store/useAppStore';

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export default function VerifyModal({ isOpen, onClose, onVerified }: VerifyModalProps) {
  const parent = useAppStore((state) => state.parent);
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setCountdown(0);
    }
  }, [isOpen]);

  const handleSendCode = async () => {
    if (countdown > 0 || loading || !parent?.phone) return;

    setError('');
    setLoading(true);

    try {
      await sendVerificationCode(parent.phone);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError('验证码发送失败');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (code.length !== 6 || loading || !parent?.phone) return;

    setError('');
    setLoading(true);

    try {
      const valid = await verifyCode(parent.phone, code);
      if (valid) {
        onVerified();
        onClose();
      } else {
        setError('验证码错误');
        setCode('');
      }
    } catch {
      setError('验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code.length === 6 && !error) {
      handleVerify();
    }
  }, [code]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 animate-bounce-in">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">家长身份验证</h3>
          <p className="text-sm text-gray-500">
            为保护孩子安全，进入设置需验证身份
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl mb-6">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            验证码已发送至 {parent?.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">请输入验证码</span>
            <button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0 || loading}
              className={`
                text-sm font-medium transition-colors
                ${countdown > 0 || loading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-500 hover:text-primary-600'
                }
              `}
            >
              {countdown > 0 ? `${countdown}s 后重发` : '重新发送'}
            </button>
          </div>
          <CodeInput
            value={code}
            onChange={setCode}
            disabled={loading}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <p className="text-xs text-gray-400 text-center">
          测试验证码：123456
        </p>
      </div>
    </div>
  );
}
