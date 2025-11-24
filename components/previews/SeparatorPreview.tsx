import React, { useEffect } from 'react';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  platform?: 'ios' | 'android';
}

function Separator({
  orientation = 'horizontal',
  thickness = 1,
  color = '#E4E4E7',
  platform = 'ios',
}: SeparatorProps) {
  const style: React.CSSProperties =
    orientation === 'horizontal'
      ? {
          width: '100%',
          height: `${thickness}px`,
          backgroundColor: color,
        }
      : {
          width: `${thickness}px`,
          height: '100%',
          backgroundColor: color,
        };

  return <div style={style} />;
}

export function SeparatorPreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Separator Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Visual dividers for content
        </p>
      </div>

      {/* Basic Separator */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Separator
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Content above separator
          </div>
          <div style={{ margin: '16px 0' }}>
            <Separator platform={platform} />
          </div>
          <div style={{ fontSize: '14px', color: '#09090B' }}>
            Content below separator
          </div>
        </div>
      </div>

      {/* Thickness Variations */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Thickness
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
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>
              Thin (0.5px)
            </div>
            <Separator platform={platform} thickness={0.5} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>
              Default (1px)
            </div>
            <Separator platform={platform} thickness={1} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>
              Thick (2px)
            </div>
            <Separator platform={platform} thickness={2} />
          </div>
        </div>
      </div>

      {/* Vertical Separator */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Vertical Separator
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            height: '60px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#09090B' }}>Left</div>
          <Separator platform={platform} orientation="vertical" />
          <div style={{ fontSize: '14px', color: '#09090B' }}>Center</div>
          <Separator platform={platform} orientation="vertical" />
          <div style={{ fontSize: '14px', color: '#09090B' }}>Right</div>
        </div>
      </div>

      {/* List with Separators */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          In Lists
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '12px',
            borderRadius: '12px',
          }}
        >
          {[
            { title: 'Notifications', description: 'Manage notification preferences' },
            { title: 'Privacy', description: 'Control your privacy settings' },
            { title: 'Security', description: 'Update security options' },
          ].map((item, index, array) => (
            <React.Fragment key={index}>
              <div style={{ padding: '12px' }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#09090B',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: '#71717A' }}>
                  {item.description}
                </div>
              </div>
              {index < array.length - 1 && <Separator platform={platform} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Card with Sections */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Card Sections
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '16px' }}>
            <div
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#09090B',
                marginBottom: '4px',
              }}
            >
              John Doe
            </div>
            <div style={{ fontSize: '14px', color: '#71717A' }}>
              john.doe@example.com
            </div>
          </div>
          <Separator platform={platform} />
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#71717A' }}>Role</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#09090B' }}>
                Developer
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#71717A' }}>Location</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#09090B' }}>
                San Francisco
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#71717A' }}>Joined</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#09090B' }}>
                Jan 2024
              </span>
            </div>
          </div>
          <Separator platform={platform} />
          <div style={{ padding: '16px' }}>
            <button
              style={{
                width: '100%',
                height: '36px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#18181B',
                color: '#FAFAFA',
                fontFamily,
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Navigation Menu
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '8px',
            borderRadius: '12px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#18181B',
              color: '#FAFAFA',
              fontFamily,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Home
          </button>
          <div style={{ width: '1px', height: '32px', alignSelf: 'center' }}>
            <Separator platform={platform} orientation="vertical" />
          </div>
          <button
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#09090B',
              fontFamily,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            About
          </button>
          <div style={{ width: '1px', height: '32px', alignSelf: 'center' }}>
            <Separator platform={platform} orientation="vertical" />
          </div>
          <button
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#09090B',
              fontFamily,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Form Sections */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Form Sections
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
            <h4
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#09090B',
                margin: '0 0 12px 0',
              }}
            >
              Personal Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                placeholder="Full Name"
                style={{
                  height: '40px',
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontFamily,
                  fontSize: '14px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              <input
                placeholder="Email"
                style={{
                  height: '40px',
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontFamily,
                  fontSize: '14px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <Separator platform={platform} thickness={2} />

          <div>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#09090B',
                margin: '0 0 12px 0',
              }}
            >
              Account Settings
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                placeholder="Username"
                style={{
                  height: '40px',
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontFamily,
                  fontSize: '14px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  height: '40px',
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontFamily,
                  fontSize: '14px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
