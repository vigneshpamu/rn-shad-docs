import React, { useEffect } from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  platform?: 'ios' | 'android';
}

function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  platform = 'ios',
}: BadgeProps) {
  const colors = {
    primary: '#18181B',
    primaryForeground: '#FAFAFA',
    secondary: '#F4F4F5',
    secondaryForeground: '#18181B',
    destructive: '#EF4444',
    destructiveForeground: '#FAFAFA',
    success: '#10B981',
    successForeground: '#FFFFFF',
    border: '#E4E4E7',
    foreground: '#09090B',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: colors.primary,
      color: colors.primaryForeground,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.secondaryForeground,
      border: `1px solid ${colors.border}`,
    },
    destructive: {
      backgroundColor: colors.destructive,
      color: colors.destructiveForeground,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.foreground,
      border: `1px solid ${colors.border}`,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.successForeground,
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '2px',
      paddingBottom: '2px',
      fontSize: '12px',
      gap: '4px',
    },
    md: {
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '4px',
      paddingBottom: '4px',
      fontSize: '13px',
      gap: '6px',
    },
    lg: {
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '6px',
      paddingBottom: '6px',
      fontSize: '14px',
      gap: '6px',
    },
  };

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6px',
    fontFamily,
    fontWeight: '600',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <span style={badgeStyle}>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
}

// Simple icon components
function CheckCircleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertCircleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function InfoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function BadgePreview({ platform }: { platform: 'ios' | 'android' }) {
  // Load Roboto font for Android mockup
  useEffect(() => {
    if (platform === 'android') {
      const link = document.createElement('link');
      link.href =
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [platform]);

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
          Badge Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Labels, tags, and status indicators
        </p>
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <Badge platform={platform} variant="default">
            Default
          </Badge>
          <Badge platform={platform} variant="secondary">
            Secondary
          </Badge>
          <Badge platform={platform} variant="destructive">
            Destructive
          </Badge>
          <Badge platform={platform} variant="outline">
            Outline
          </Badge>
          <Badge platform={platform} variant="success">
            Success
          </Badge>
        </div>
      </div>

      {/* Sizes */}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <Badge platform={platform} size="sm">
            Small
          </Badge>
          <Badge platform={platform} size="md">
            Medium
          </Badge>
          <Badge platform={platform} size="lg">
            Large
          </Badge>
        </div>
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <Badge platform={platform} variant="success" icon={<CheckCircleIcon />}>
            Completed
          </Badge>
          <Badge platform={platform} variant="destructive" icon={<AlertCircleIcon />}>
            Critical
          </Badge>
          <Badge platform={platform} variant="default" icon={<InfoIcon />}>
            Info
          </Badge>
          <Badge platform={platform} variant="secondary" icon={<StarIcon />}>
            Featured
          </Badge>
        </div>
      </div>

      {/* Status Examples */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Status Indicators
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Order Status</span>
            <Badge platform={platform} variant="success" size="sm">
              Delivered
            </Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Payment</span>
            <Badge platform={platform} variant="default" size="sm">
              Pending
            </Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Subscription</span>
            <Badge platform={platform} variant="destructive" size="sm">
              Expired
            </Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Account</span>
            <Badge platform={platform} variant="outline" size="sm">
              Inactive
            </Badge>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Category Tags
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <Badge platform={platform} variant="outline" size="sm">
            React Native
          </Badge>
          <Badge platform={platform} variant="outline" size="sm">
            TypeScript
          </Badge>
          <Badge platform={platform} variant="outline" size="sm">
            UI Components
          </Badge>
          <Badge platform={platform} variant="outline" size="sm">
            Design System
          </Badge>
          <Badge platform={platform} variant="outline" size="sm">
            Mobile
          </Badge>
        </div>
      </div>

      {/* Notification Count */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Notification Counts
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Messages</span>
            <Badge platform={platform} variant="destructive" size="sm">
              3
            </Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Notifications</span>
            <Badge platform={platform} variant="default" size="sm">
              12
            </Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '15px', color: '#09090B' }}>Updates</span>
            <Badge platform={platform} variant="secondary" size="sm">
              5
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
