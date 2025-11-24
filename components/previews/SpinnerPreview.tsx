import React, { useState, useEffect } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  platform?: 'ios' | 'android';
}

function Spinner({ size = 'md', color = '#18181B', platform = 'ios' }: SpinnerProps) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const spinnerSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <div
      style={{
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        border: `${Math.max(2, spinnerSize / 8)}px solid ${color}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function SpinnerPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');

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

  // Animated loading text
  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setLoadingText((prev) => {
          if (prev === 'Loading...') return 'Loading';
          return prev + '.';
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const handleLoadData = () => {
    setIsLoading(true);
    setLoadingText('Loading');
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
          Spinner Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Loading indicators with animations
        </p>
      </div>

      {/* Basic Spinner */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Spinner
        </h3>
        <Spinner platform={platform} />
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
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} size="sm" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} size="md" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} size="lg" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Large</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} size={40} />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Custom</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Colors
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} color="#18181B" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Default</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} color="#10B981" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Success</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} color="#F59E0B" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Warning</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Spinner platform={platform} color="#EF4444" />
            <span style={{ fontSize: '12px', color: '#71717A' }}>Error</span>
          </div>
        </div>
      </div>

      {/* With Text */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Text
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Spinner platform={platform} size="sm" />
            <span style={{ fontSize: '14px', color: '#09090B' }}>Loading...</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Spinner platform={platform} size="md" color="#10B981" />
            <span style={{ fontSize: '14px', color: '#09090B' }}>Processing your request</span>
          </div>
        </div>
      </div>

      {/* Centered in Card */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Loading State
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '40px 16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Spinner platform={platform} size="lg" />
          <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
            Loading content...
          </p>
        </div>
      </div>

      {/* Button with Spinner */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          In Button
        </h3>
        <button
          disabled
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#18181B',
            color: '#FAFAFA',
            fontFamily,
            fontWeight: '600',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: 0.7,
            cursor: 'not-allowed',
          }}
        >
          <Spinner platform={platform} size="sm" color="#FFFFFF" />
          Loading...
        </button>
      </div>

      {/* Interactive Loading Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Interactive Example
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 0',
              }}
            >
              <Spinner platform={platform} size="lg" />
              <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
                {loadingText}
              </p>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontSize: '14px',
                  color: '#09090B',
                  margin: '0 0 12px 0',
                }}
              >
                Click the button to simulate loading
              </p>
              <button
                onClick={handleLoadData}
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
                }}
              >
                Load Data
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay Loading */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Full Screen Overlay
        </h3>
        <div
          style={{
            position: 'relative',
            backgroundColor: '#F9FAFB',
            padding: '40px 16px',
            borderRadius: '12px',
            minHeight: '150px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#09090B', margin: 0 }}>
            Content behind overlay
          </p>
          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner platform={platform} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
