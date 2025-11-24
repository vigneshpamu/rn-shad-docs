import React, { useEffect } from 'react';

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  platform?: 'ios' | 'android';
}

function Label({
  children,
  required = false,
  disabled = false,
  error = false,
  platform = 'ios',
}: LabelProps) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        fontSize: '14px',
        fontWeight: '600',
        color: disabled ? '#A1A1AA' : error ? '#EF4444' : '#09090B',
        fontFamily,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {children}
      {required && (
        <span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>
      )}
    </div>
  );
}

export function LabelPreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Label Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Form field labels with states
        </p>
      </div>

      {/* Basic Label */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Label
        </h3>
        <Label platform={platform}>Email Address</Label>
      </div>

      {/* Required Label */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Required Field
        </h3>
        <Label platform={platform} required>
          Password
        </Label>
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
          <Label platform={platform}>Normal State</Label>
          <Label platform={platform} disabled>
            Disabled State
          </Label>
          <Label platform={platform} error>
            Error State
          </Label>
        </div>
      </div>

      {/* With Form Fields */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Form Fields
        </h3>
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
          <div>
            <Label platform={platform} required>
              Full Name
            </Label>
            <input
              type="text"
              placeholder="John Doe"
              style={{
                marginTop: '8px',
                width: '100%',
                height: '40px',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                fontFamily,
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <Label platform={platform} required>
              Email
            </Label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                marginTop: '8px',
                width: '100%',
                height: '40px',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                fontFamily,
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <Label platform={platform} error>
              Username
            </Label>
            <input
              type="text"
              placeholder="johndoe"
              style={{
                marginTop: '8px',
                width: '100%',
                height: '40px',
                border: '1px solid #EF4444',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                fontFamily,
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
            <div
              style={{
                fontSize: '12px',
                color: '#EF4444',
                marginTop: '6px',
              }}
            >
              Username is already taken
            </div>
          </div>

          <div>
            <Label platform={platform} disabled>
              Account Type
            </Label>
            <input
              type="text"
              value="Premium"
              disabled
              style={{
                marginTop: '8px',
                width: '100%',
                height: '40px',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                fontFamily,
                fontSize: '14px',
                backgroundColor: '#F4F4F5',
                color: '#A1A1AA',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>

      {/* With Checkboxes */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Checkboxes
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="terms" />
            <Label platform={platform} required>
              I agree to the terms and conditions
            </Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="newsletter" />
            <Label platform={platform}>Subscribe to newsletter</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="updates" disabled />
            <Label platform={platform} disabled>
              Receive SMS updates (unavailable)
            </Label>
          </div>
        </div>
      </div>

      {/* Settings Form Example */}
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
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <Label platform={platform} required>
              Display Name
            </Label>
            <input
              type="text"
              placeholder="Your display name"
              style={{
                marginTop: '8px',
                width: '100%',
                height: '40px',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                fontFamily,
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ fontSize: '12px', color: '#71717A', marginTop: '6px' }}>
              This is how others will see you
            </div>
          </div>

          <div>
            <Label platform={platform}>Bio</Label>
            <textarea
              placeholder="Tell us about yourself"
              style={{
                marginTop: '8px',
                width: '100%',
                height: '80px',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                padding: '12px',
                fontFamily,
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ fontSize: '12px', color: '#71717A', marginTop: '6px' }}>
              Brief description for your profile. Max 200 characters.
            </div>
          </div>

          <div>
            <Label platform={platform} required>
              Language
            </Label>
            <select
              style={{
                marginTop: '8px',
                width: '100%',
                height: '40px',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                fontFamily,
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
