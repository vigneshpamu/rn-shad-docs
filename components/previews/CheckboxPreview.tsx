import React, { useState, useEffect } from 'react';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  platform?: 'ios' | 'android';
}

function Checkbox({
  checked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  platform = 'ios',
}: CheckboxProps) {
  const [isPressed, setIsPressed] = useState(false);

  const colors = {
    primary: '#18181B',
    border: '#E4E4E7',
    background: '#FFFFFF',
  };

  const sizeConfig = {
    sm: { size: 16, iconSize: 12 },
    md: { size: 20, iconSize: 14 },
    lg: { size: 24, iconSize: 16 },
  };

  const config = sizeConfig[size];

  const checkboxStyle: React.CSSProperties = {
    width: `${config.size}px`,
    height: `${config.size}px`,
    borderRadius: '4px',
    border: `2px solid ${checked ? colors.primary : colors.border}`,
    backgroundColor: checked ? colors.primary : colors.background,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isPressed ? 'scale(0.9)' : 'scale(1)',
  };

  const handleClick = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      style={checkboxStyle}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {checked && (
        <svg
          width={config.iconSize}
          height={config.iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  );
}

export function CheckboxPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicCheckbox, setBasicCheckbox] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [features, setFeatures] = useState({
    notifications: true,
    darkMode: false,
    analytics: true,
    autoSave: false,
  });

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

  const handleFeatureToggle = (key: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
          Checkbox Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Select one or multiple options
        </p>
      </div>

      {/* Basic Checkbox */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Checkbox
        </h3>
        <Checkbox
          platform={platform}
          checked={basicCheckbox}
          onCheckedChange={setBasicCheckbox}
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
            <Checkbox
              platform={platform}
              checked={true}
              size="sm"
              onCheckedChange={() => {}}
            />
            <span style={{ fontSize: '14px', color: '#71717A' }}>Small</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              platform={platform}
              checked={true}
              size="md"
              onCheckedChange={() => {}}
            />
            <span style={{ fontSize: '14px', color: '#71717A' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              platform={platform}
              checked={true}
              size="lg"
              onCheckedChange={() => {}}
            />
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
            <Checkbox
              platform={platform}
              checked={true}
              disabled
              onCheckedChange={() => {}}
            />
            <span style={{ fontSize: '14px', color: '#71717A' }}>
              Disabled (Checked)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              platform={platform}
              checked={false}
              disabled
              onCheckedChange={() => {}}
            />
            <span style={{ fontSize: '14px', color: '#71717A' }}>
              Disabled (Unchecked)
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              platform={platform}
              checked={agreed}
              onCheckedChange={setAgreed}
            />
            <label
              style={{
                fontSize: '15px',
                color: '#09090B',
                cursor: 'pointer',
              }}
              onClick={() => setAgreed(!agreed)}
            >
              I agree to the terms and conditions
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              platform={platform}
              checked={newsletter}
              onCheckedChange={setNewsletter}
            />
            <label
              style={{
                fontSize: '15px',
                color: '#09090B',
                cursor: 'pointer',
              }}
              onClick={() => setNewsletter(!newsletter)}
            >
              Subscribe to our newsletter
            </label>
          </div>
        </div>
      </div>

      {/* Multiple Selection */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Multiple Selection
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
              }}
            >
              <Checkbox
                platform={platform}
                checked={features.notifications}
                onCheckedChange={() => handleFeatureToggle('notifications')}
              />
              <label
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  cursor: 'pointer',
                }}
                onClick={() => handleFeatureToggle('notifications')}
              >
                Push Notifications
              </label>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#71717A',
                margin: 0,
                paddingLeft: '28px',
              }}
            >
              Receive push notifications
            </p>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
              }}
            >
              <Checkbox
                platform={platform}
                checked={features.darkMode}
                onCheckedChange={() => handleFeatureToggle('darkMode')}
              />
              <label
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  cursor: 'pointer',
                }}
                onClick={() => handleFeatureToggle('darkMode')}
              >
                Dark Mode
              </label>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#71717A',
                margin: 0,
                paddingLeft: '28px',
              }}
            >
              Use dark theme
            </p>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
              }}
            >
              <Checkbox
                platform={platform}
                checked={features.analytics}
                onCheckedChange={() => handleFeatureToggle('analytics')}
              />
              <label
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  cursor: 'pointer',
                }}
                onClick={() => handleFeatureToggle('analytics')}
              >
                Analytics
              </label>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#71717A',
                margin: 0,
                paddingLeft: '28px',
              }}
            >
              Help improve the app
            </p>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '4px',
              }}
            >
              <Checkbox
                platform={platform}
                checked={features.autoSave}
                onCheckedChange={() => handleFeatureToggle('autoSave')}
              />
              <label
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  cursor: 'pointer',
                }}
                onClick={() => handleFeatureToggle('autoSave')}
              >
                Auto-save
              </label>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#71717A',
                margin: 0,
                paddingLeft: '28px',
              }}
            >
              Automatically save changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
