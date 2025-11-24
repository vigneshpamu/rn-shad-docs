import React, { useState, useEffect } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  variant?: 'default' | 'filled';
  type?: string;
  multiline?: boolean;
  rows?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  platform?: 'ios' | 'android';
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  variant = 'default',
  type = 'text',
  multiline = false,
  rows = 1,
  leftIcon,
  rightIcon,
  onRightIconPress,
  platform = 'ios',
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const colors = {
    primary: '#18181B',
    border: '#E4E4E7',
    background: '#FFFFFF',
    foreground: '#09090B',
    muted: '#F4F4F5',
    mutedForeground: '#71717A',
    destructive: '#EF4444',
  };

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    gap: '12px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: multiline ? '12px' : '0',
    paddingBottom: multiline ? '12px' : '0',
    height: multiline ? 'auto' : '48px',
    borderRadius: '8px',
    backgroundColor: variant === 'filled' ? colors.muted : colors.background,
    border: variant === 'default' ? `1.5px solid ${error ? colors.destructive : isFocused ? colors.primary : colors.border}` : 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: isFocused ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(24, 24, 27, 0.1)'}` : 'none',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily,
    fontSize: '16px',
    color: colors.foreground,
    resize: multiline ? 'vertical' : 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '14px',
    fontWeight: '600',
    color: colors.foreground,
  };

  const helperTextStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '12px',
    color: error ? colors.destructive : colors.mutedForeground,
  };

  const iconStyle: React.CSSProperties = {
    color: colors.mutedForeground,
    flexShrink: 0,
    marginTop: multiline ? '2px' : '0',
  };

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputContainerStyle}>
        {leftIcon && <div style={iconStyle}>{leftIcon}</div>}
        <InputElement
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={multiline ? rows : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle}
        />
        {rightIcon && (
          <div
            style={{
              ...iconStyle,
              cursor: onRightIconPress ? 'pointer' : 'default',
            }}
            onClick={onRightIconPress}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {(error || helperText) && <div style={helperTextStyle}>{error || helperText}</div>}
    </div>
  );
}

// Simple icon components
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function InputPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [search, setSearch] = useState('');
  const [bio, setBio] = useState('');

  // Load Roboto font for Android mockup
  useEffect(() => {
    if (platform === 'android') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [platform]);

  const validateUsername = (value: string) => {
    if (value.length > 0 && value.length < 3) {
      setUsernameError('Username must be at least 3 characters');
    } else {
      setUsernameError('');
    }
  };

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily,
      }}
    >
      {/* Title */}
      <div>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            color: '#09090B',
          }}
        >
          Input Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Text input with animations and icons
        </p>
      </div>

      {/* Basic Input */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Input
        </h3>
        <Input
          platform={platform}
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* With Icons */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Icons
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            platform={platform}
            label="Email"
            placeholder="you@example.com"
            leftIcon={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            platform={platform}
            label="Password"
            placeholder="Enter password"
            type={showPassword ? 'text' : 'password'}
            leftIcon={<LockIcon />}
            rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconPress={() => setShowPassword(!showPassword)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Variants */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input platform={platform} variant="default" placeholder="Default variant" />
          <Input platform={platform} variant="filled" placeholder="Filled variant" />
        </div>
      </div>

      {/* States */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            platform={platform}
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
            error={usernameError}
            helperText={!usernameError ? 'Choose a unique username' : undefined}
          />
          <Input platform={platform} disabled placeholder="Disabled input" />
        </div>
      </div>

      {/* Search Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Search Input
        </h3>
        <Input
          platform={platform}
          placeholder="Search..."
          leftIcon={<SearchIcon />}
          rightIcon={search ? <XIcon /> : undefined}
          onRightIconPress={() => setSearch('')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Multiline */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Multiline
        </h3>
        <Input
          platform={platform}
          label="Bio"
          placeholder="Tell us about yourself"
          multiline
          rows={4}
          helperText="Maximum 200 characters"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
    </div>
  );
}
