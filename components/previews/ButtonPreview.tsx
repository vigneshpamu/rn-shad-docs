import React, { useState, useEffect } from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  platform?: 'ios' | 'android';
  onPress?: () => void;
}

function Button({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  platform = 'ios',
  onPress,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const colors = {
    primary: '#18181B',
    primaryForeground: '#FAFAFA',
    secondary: '#F4F4F5',
    secondaryForeground: '#18181B',
    destructive: '#EF4444',
    destructiveForeground: '#FAFAFA',
    border: '#E4E4E7',
    foreground: '#09090B',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: { backgroundColor: colors.primary, color: colors.primaryForeground },
    destructive: {
      backgroundColor: colors.destructive,
      color: colors.destructiveForeground,
    },
    outline: {
      backgroundColor: 'transparent',
      border: `1.5px solid ${colors.border}`,
      color: colors.foreground,
    },
    secondary: { backgroundColor: colors.secondary, color: colors.secondaryForeground },
    ghost: { backgroundColor: 'transparent', color: colors.foreground },
    link: {
      backgroundColor: 'transparent',
      color: colors.foreground,
      textDecoration: 'underline',
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    default: { height: '48px', paddingLeft: '24px', paddingRight: '24px' },
    sm: { height: '36px', paddingLeft: '16px', paddingRight: '16px', fontSize: '14px' },
    lg: { height: '56px', paddingLeft: '32px', paddingRight: '32px', fontSize: '18px' },
    icon: { height: '48px', width: '48px', padding: 0 },
  };

  const fontFamily = platform === 'android'
    ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
    : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onPress}
      disabled={disabled || loading}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: 'none',
        fontFamily,
        fontWeight: '600',
        fontSize: '16px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        opacity: disabled || loading ? 0.5 : 1,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {loading ? (
        <div
          style={{
            width: '16px',
            height: '16px',
            border: `2px solid ${variant === 'outline' || variant === 'ghost' ? '#18181B' : '#FFFFFF'}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      ) : (
        children
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

export function ButtonPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

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

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily:
          platform === 'android'
            ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
            : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
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
          Button Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Tap buttons to see smooth animations
        </p>
      </div>

      {/* Variants Section */}
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
          <Button platform={platform} variant="default" onPress={() => console.log('Default')}>
            Default
          </Button>
          <Button
            platform={platform}
            variant="destructive"
            onPress={() => console.log('Destructive')}
          >
            Destructive
          </Button>
          <Button platform={platform} variant="outline" onPress={() => console.log('Outline')}>
            Outline
          </Button>
          <Button
            platform={platform}
            variant="secondary"
            onPress={() => console.log('Secondary')}
          >
            Secondary
          </Button>
          <Button platform={platform} variant="ghost" onPress={() => console.log('Ghost')}>
            Ghost
          </Button>
        </div>
      </div>

      {/* Sizes Section */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button platform={platform} size="sm" onPress={() => console.log('Small')}>
            Small
          </Button>
          <Button platform={platform} size="default" onPress={() => console.log('Default')}>
            Default
          </Button>
          <Button platform={platform} size="lg" onPress={() => console.log('Large')}>
            Large
          </Button>
        </div>
      </div>

      {/* States Section */}
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
          <Button platform={platform} loading={loading} onPress={handleLoadingTest}>
            {loading ? 'Loading...' : 'Test Loading'}
          </Button>
          <Button platform={platform} disabled onPress={() => console.log('Should not fire')}>
            Disabled
          </Button>
        </div>
      </div>

      {/* Interactive Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Interactive
        </h3>
        <Button
          platform={platform}
          variant="secondary"
          onPress={() => setCount(count + 1)}
        >
          Clicked {count} times
        </Button>
      </div>
    </div>
  );
}
