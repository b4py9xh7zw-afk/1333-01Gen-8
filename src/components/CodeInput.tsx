import { useRef, useEffect, useCallback } from 'react';

interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function CodeInput({
  length = 6,
  value,
  onChange,
  disabled = false,
}: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, newValue: string) => {
      if (disabled) return;

      const cleanedValue = newValue.replace(/\D/g, '').slice(-1);
      const newValueArray = value.split('');
      newValueArray[index] = cleanedValue;

      const result = newValueArray.join('').slice(0, length);
      onChange(result);

      if (cleanedValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, onChange, length, disabled]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'Backspace' && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [value, length, disabled]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (pastedData) {
        onChange(pastedData);
        const focusIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[focusIndex]?.focus();
      }
    },
    [length, onChange, disabled]
  );

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex justify-between gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-12 h-14 sm:w-14 sm:h-16
            text-center text-2xl sm:text-3xl font-bold
            bg-white border-2 rounded-2xl
            transition-all duration-200
            focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100
            ${value[index] ? 'border-primary-300 text-gray-800' : 'border-gray-200 text-gray-400'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-text'}
          `}
          aria-label={`验证码第${index + 1}位`}
        />
      ))}
    </div>
  );
}
