import React, { useState, useEffect } from 'react';

interface RadioItemProps {
  value: string;
  label: string;
  description?: string;
  checked: boolean;
  onSelect: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  platform?: 'ios' | 'android';
}

function RadioItem({
  value,
  label,
  description,
  checked,
  onSelect,
  size = 'md',
  disabled = false,
  platform = 'ios',
}: RadioItemProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    sm: { outer: 16, inner: 8 },
    md: { outer: 20, inner: 10 },
    lg: { outer: 24, inner: 12 },
  };

  const config = sizeConfig[size];

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const outerCircleStyle: React.CSSProperties = {
    width: `${config.outer}px`,
    height: `${config.outer}px`,
    borderRadius: '50%',
    border: `2px solid ${checked ? '#18181B' : '#E4E4E7'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isPressed ? 'scale(0.9)' : 'scale(1)',
  };

  const innerCircleStyle: React.CSSProperties = {
    width: `${config.inner}px`,
    height: `${config.inner}px`,
    borderRadius: '50%',
    backgroundColor: '#18181B',
    transform: checked ? 'scale(1)' : 'scale(0)',
    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: description ? 'flex-start' : 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={disabled ? undefined : onSelect}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div style={outerCircleStyle}>
        <div style={innerCircleStyle} />
      </div>
      <div style={{ flex: 1 }}>
        <label
          style={{
            fontSize: '15px',
            fontWeight: '500',
            color: disabled ? '#A1A1AA' : '#09090B',
            fontFamily,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
        </label>
        {description && (
          <p
            style={{
              fontSize: '13px',
              color: '#71717A',
              margin: '4px 0 0 0',
              fontFamily,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function RadioGroupPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicValue, setBasicValue] = useState('option1');
  const [size, setSize] = useState('medium');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState('all');
  const [subscription, setSubscription] = useState('monthly');

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
          Radio Group
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Select one option from a set
        </p>
      </div>

      {/* Basic Radio Group */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Radio Group
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RadioItem
            platform={platform}
            value="option1"
            label="Option 1"
            checked={basicValue === 'option1'}
            onSelect={() => setBasicValue('option1')}
          />
          <RadioItem
            platform={platform}
            value="option2"
            label="Option 2"
            checked={basicValue === 'option2'}
            onSelect={() => setBasicValue('option2')}
          />
          <RadioItem
            platform={platform}
            value="option3"
            label="Option 3"
            checked={basicValue === 'option3'}
            onSelect={() => setBasicValue('option3')}
          />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RadioItem
            platform={platform}
            value="small"
            label="Small"
            size="sm"
            checked={size === 'small'}
            onSelect={() => setSize('small')}
          />
          <RadioItem
            platform={platform}
            value="medium"
            label="Medium"
            size="md"
            checked={size === 'medium'}
            onSelect={() => setSize('medium')}
          />
          <RadioItem
            platform={platform}
            value="large"
            label="Large"
            size="lg"
            checked={size === 'large'}
            onSelect={() => setSize('large')}
          />
        </div>
      </div>

      {/* With Descriptions */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Descriptions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RadioItem
            platform={platform}
            value="light"
            label="Light Mode"
            description="Use light colors across the app"
            checked={theme === 'light'}
            onSelect={() => setTheme('light')}
          />
          <RadioItem
            platform={platform}
            value="dark"
            label="Dark Mode"
            description="Use dark colors for better viewing at night"
            checked={theme === 'dark'}
            onSelect={() => setTheme('dark')}
          />
          <RadioItem
            platform={platform}
            value="system"
            label="System"
            description="Automatically switch based on system preference"
            checked={theme === 'system'}
            onSelect={() => setTheme('system')}
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#18181B',
          }}
        >
          Notification Preferences
        </h3>
        <p style={{ fontSize: '14px', color: '#71717A', margin: '0 0 12px 0' }}>
          Choose how you want to receive notifications
        </p>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <RadioItem
            platform={platform}
            value="all"
            label="All Notifications"
            description="Receive all updates and alerts"
            checked={notifications === 'all'}
            onSelect={() => setNotifications('all')}
          />
          <RadioItem
            platform={platform}
            value="important"
            label="Important Only"
            description="Only critical updates and mentions"
            checked={notifications === 'important'}
            onSelect={() => setNotifications('important')}
          />
          <RadioItem
            platform={platform}
            value="none"
            label="None"
            description="Disable all notifications"
            checked={notifications === 'none'}
            onSelect={() => setNotifications('none')}
          />
        </div>
      </div>

      {/* Subscription Plan */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#18181B',
          }}
        >
          Subscription Plan
        </h3>
        <p style={{ fontSize: '14px', color: '#71717A', margin: '0 0 12px 0' }}>
          Select your billing frequency
        </p>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <RadioItem
            platform={platform}
            value="monthly"
            label="Monthly - $9.99/month"
            description="Billed monthly, cancel anytime"
            checked={subscription === 'monthly'}
            onSelect={() => setSubscription('monthly')}
          />
          <RadioItem
            platform={platform}
            value="yearly"
            label="Yearly - $99/year"
            description="Save 17% with annual billing"
            checked={subscription === 'yearly'}
            onSelect={() => setSubscription('yearly')}
          />
          <RadioItem
            platform={platform}
            value="lifetime"
            label="Lifetime - $299"
            description="One-time payment, forever access"
            checked={subscription === 'lifetime'}
            onSelect={() => setSubscription('lifetime')}
          />
        </div>
      </div>

      {/* Disabled State */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Disabled State
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RadioItem
            platform={platform}
            value="enabled"
            label="Enabled Option"
            checked={true}
            onSelect={() => {}}
          />
          <RadioItem
            platform={platform}
            value="disabled"
            label="Disabled Option"
            checked={false}
            onSelect={() => {}}
            disabled
          />
        </div>
      </div>

      {/* Selected Value Display */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Current Selections
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#71717A' }}>Basic:</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              {basicValue}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#71717A' }}>Size:</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              {size}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#71717A' }}>Theme:</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              {theme}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#71717A' }}>Notifications:</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              {notifications}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#71717A' }}>Subscription:</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              {subscription}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
