import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ShieldCheck, Sparkles } from 'lucide-react';
import CodeInput from '@/components/CodeInput';
import { sendVerificationCode, login } from '@/mock';
import useAppStore from '@/store/useAppStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setLogin = useAppStore((state) => state.login);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const isValidPhone = /^1\d{10}$/.test(phone);
  const canSendCode = isValidPhone && countdown === 0 && !sendingCode && !loggingIn;
  const canLogin = isValidPhone && code.length === 6 && agreed && !loggingIn;

  const handleSendCode = async () => {
    if (!canSendCode) return;

    setError('');
    setSendingCode(true);

    try {
      const success = await sendVerificationCode(phone);
      if (success) {
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
      }
    } catch {
      setError('验证码发送失败，请重试');
    } finally {
      setSendingCode(false);
    }
  };

  const handleLogin = async () => {
    if (!canLogin) return;

    setError('');
    setLoggingIn(true);

    try {
      const parent = await login(phone, code);
      if (parent) {
        setLogin(parent);
        navigate('/home');
      } else {
        setError('验证码错误，请重新输入');
        setCode('');
      }
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white px-6 pt-16 pb-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-3xl shadow-lg mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">欢迎回来</h1>
          <p className="text-gray-500 text-base">登录家长端，守护孩子成长</p>
        </div>

        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              手机号
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                className="input-field pl-12 text-lg"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                验证码
              </label>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!canSendCode}
                className={`
                  text-sm font-medium transition-colors
                  ${canSendCode
                    ? 'text-primary-500 hover:text-primary-600'
                    : 'text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
              </button>
            </div>
            <CodeInput
              value={code}
              onChange={(newCode) => {
                setCode(newCode);
                setError('');
              }}
              disabled={loggingIn}
            />
            <p className="mt-3 text-xs text-gray-400">
              测试验证码：123456
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`
                mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all
                ${agreed
                  ? 'bg-primary-500 border-primary-500'
                  : 'border-gray-300 hover:border-primary-400'
                }
              `}
            >
              {agreed && (
                <svg
                  className="w-full h-full text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p className="text-xs text-gray-500 leading-relaxed">
              我已阅读并同意
              <span className="text-primary-500">《用户协议》</span>
              和
              <span className="text-primary-500">《隐私政策》</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={!canLogin}
            className={`
              btn-primary
              ${!canLogin && 'opacity-50 cursor-not-allowed'}
            `}
          >
            {loggingIn ? '登录中...' : '登录'}
          </button>
        </div>

        <div className="mt-12 flex items-center gap-3 text-gray-400 text-xs animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <ShieldCheck className="w-4 h-4" />
          <span>您的信息将被严格保密，仅用于账号安全验证</span>
        </div>
      </div>
    </div>
  );
}
