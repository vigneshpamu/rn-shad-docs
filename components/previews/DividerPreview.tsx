import React, { useEffect } from 'react';

interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  platform?: 'ios' | 'android';
}

function Divider({
  label,
  orientation = 'horizontal',
  color = '#E4E4E7',
  thickness = 1,
  platform = 'ios',
}: DividerProps) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  if (orientation === 'vertical') {
    return (
      <div
        style={{
          width: `${thickness}px`,
          height: '100%',
          backgroundColor: color,
        }}
      />
    );
  }

  if (label) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
        }}
      >
        <div
          style={{
            flex: 1,
            height: `${thickness}px`,
            backgroundColor: color,
          }}
        />
        <span
          style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#71717A',
            fontFamily,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: `${thickness}px`,
            backgroundColor: color,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: `${thickness}px`,
        backgroundColor: color,
      }}
    />
  );
}

export function DividerPreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Divider Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Visual separators with labels
        </p>
      </div>

      {/* Basic Divider */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Divider
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Content above divider
          </div>
          <div style={{ margin: '16px 0' }}>
            <Divider platform={platform} />
          </div>
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Content below divider
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
          <Divider platform={platform} label="OR" />
          <Divider platform={platform} label="Continue" />
          <Divider platform={platform} label="End" />
        </div>
      </div>

      {/* Login Form Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Login Form
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <button
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#18181B',
              color: '#FAFAFA',
              fontFamily,
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '16px',
            }}
          >
            Sign in with Email
          </button>

          <Divider platform={platform} label="OR" />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '16px',
            }}
          >
            <button
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '6px',
                border: '1px solid #E4E4E7',
                backgroundColor: '#FFFFFF',
                color: '#09090B',
                fontFamily,
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Continue with Google
            </button>
            <button
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '6px',
                border: '1px solid #E4E4E7',
                backgroundColor: '#FFFFFF',
                color: '#09090B',
                fontFamily,
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Continue with Apple
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Content Sections
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#09090B',
                margin: '0 0 8px 0',
              }}
            >
              Personal Information
            </h4>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0 }}>
              Update your personal details here.
            </p>
          </div>

          <div style={{ margin: '16px 0' }}>
            <Divider platform={platform} label="Account Settings" />
          </div>

          <div>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#09090B',
                margin: '0 0 8px 0',
              }}
            >
              Security
            </h4>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0 }}>
              Manage your password and security settings.
            </p>
          </div>

          <div style={{ margin: '16px 0' }}>
            <Divider platform={platform} label="Preferences" />
          </div>

          <div>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#09090B',
                margin: '0 0 8px 0',
              }}
            >
              Notifications
            </h4>
            <p style={{ fontSize: '13px', color: '#71717A', margin: 0 }}>
              Choose what notifications you receive.
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Dividers */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Vertical Dividers
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            height: '60px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Left
          </div>
          <Divider platform={platform} orientation="vertical" />
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Center
          </div>
          <Divider platform={platform} orientation="vertical" />
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Right
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Pricing Plans
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#09090B',
                margin: '0 0 4px 0',
              }}
            >
              Free Plan
            </h4>
            <p style={{ fontSize: '13px', color: '#71717A', margin: '0 0 12px 0' }}>
              Perfect for getting started
            </p>
            <ul style={{ fontSize: '13px', color: '#09090B', margin: 0, paddingLeft: '20px' }}>
              <li>Basic features</li>
              <li>1 user</li>
              <li>Community support</li>
            </ul>
          </div>

          <div style={{ margin: '16px 0' }}>
            <Divider platform={platform} label="Upgrade" />
          </div>

          <div>
            <h4
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#09090B',
                margin: '0 0 4px 0',
              }}
            >
              Pro Plan
            </h4>
            <p style={{ fontSize: '13px', color: '#71717A', margin: '0 0 12px 0' }}>
              For professional users
            </p>
            <ul style={{ fontSize: '13px', color: '#09090B', margin: 0, paddingLeft: '20px' }}>
              <li>All features</li>
              <li>Unlimited users</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Timeline
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px' }}>
              Today, 10:30 AM
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              Project Started
            </div>
          </div>

          <div style={{ margin: '12px 0' }}>
            <Divider platform={platform} />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px' }}>
              Today, 2:15 PM
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              First Milestone Completed
            </div>
          </div>

          <div style={{ margin: '12px 0' }}>
            <Divider platform={platform} />
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px' }}>
              Today, 5:45 PM
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#09090B' }}>
              Code Review Requested
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
