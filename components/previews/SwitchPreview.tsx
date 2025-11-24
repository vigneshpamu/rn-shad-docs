import React, { useState, useEffect } from 'react';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  platform?: 'ios' | 'android';
}

function Switch({
  value,
  onValueChange,
  disabled = false,
  size = 'md',
  platform = 'ios',
}: SwitchProps) {
  const colors = {
    primary: '#18181B',
    border: '#E4E4E7',
    muted: '#F4F4F5',
  };

  const sizeConfig = {
    sm: { width: 36, height: 20, thumbSize: 16, padding: 2 },
    md: { width: 44, height: 24, thumbSize: 20, padding: 2 },
    lg: { width: 52, height: 28, thumbSize: 24, padding: 2 },
  };

  const config = sizeConfig[size];

  const trackStyle: React.CSSProperties = {
    width: `${config.width}px`,
    height: `${config.height}px`,
    borderRadius: `${config.height / 2}px`,
    backgroundColor: value ? colors.primary : colors.border,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    position: 'relative',
    display: 'inline-block',
  };

  const thumbStyle: React.CSSProperties = {
    width: `${config.thumbSize}px`,
    height: `${config.thumbSize}px`,
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: `${config.padding}px`,
    left: value
      ? `${config.width - config.thumbSize - config.padding}px`
      : `${config.padding}px`,
    transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const handleClick = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <div style={trackStyle} onClick={handleClick}>
      <div style={thumbStyle} />
    </div>
  );
}

export function SwitchPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);

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
          Switch Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Toggle switches with smooth animations
        </p>
      </div>

      {/* Basic Switch */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Switch
        </h3>
        <Switch
          platform={platform}
          value={basicSwitch}
          onValueChange={setBasicSwitch}
        />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch platform={platform} value={true} size="sm" onValueChange={() => {}} />
            <span style={{ fontSize: '14px', color: '#71717A' }}>Small</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch platform={platform} value={true} size="md" onValueChange={() => {}} />
            <span style={{ fontSize: '14px', color: '#71717A' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch platform={platform} value={true} size="lg" onValueChange={() => {}} />
            <span style={{ fontSize: '14px', color: '#71717A' }}>Large</span>
          </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              platform={platform}
              value={true}
              disabled
              onValueChange={() => {}}
            />
            <span style={{ fontSize: '14px', color: '#71717A' }}>
              Disabled (On)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              platform={platform}
              value={false}
              disabled
              onValueChange={() => {}}
            />
            <span style={{ fontSize: '14px', color: '#71717A' }}>
              Disabled (Off)
            </span>
          </div>
        </div>
      </div>

      {/* With Labels */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Labels
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#09090B' }}>
              Enable Notifications
            </span>
            <Switch
              platform={platform}
              value={notifications}
              onValueChange={setNotifications}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#09090B' }}>
              Dark Mode
            </span>
            <Switch
              platform={platform}
              value={darkMode}
              onValueChange={setDarkMode}
            />
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Settings Form
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <span
                style={{ fontSize: '15px', fontWeight: '600', color: '#09090B' }}
              >
                Email Notifications
              </span>
              <Switch
                platform={platform}
                value={emailNotifications}
                onValueChange={setEmailNotifications}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0 }}>
              Receive notifications via email
            </p>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <span
                style={{ fontSize: '15px', fontWeight: '600', color: '#09090B' }}
              >
                SMS Alerts
              </span>
              <Switch
                platform={platform}
                value={smsAlerts}
                onValueChange={setSmsAlerts}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0 }}>
              Get alerts via text message
            </p>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <span
                style={{ fontSize: '15px', fontWeight: '600', color: '#09090B' }}
              >
                Marketing Emails
              </span>
              <Switch
                platform={platform}
                value={marketingEmails}
                onValueChange={setMarketingEmails}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0 }}>
              Receive promotional content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
