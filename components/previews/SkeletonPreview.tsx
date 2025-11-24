import React, { useState, useEffect } from 'react';

interface SkeletonProps {
  variant?: 'rectangular' | 'text' | 'circular';
  width?: number | string;
  height?: number | string;
  platform?: 'ios' | 'android';
}

function Skeleton({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  platform = 'ios',
}: SkeletonProps) {
  const borderRadiusMap = {
    rectangular: '8px',
    text: '4px',
    circular: '50%',
  };

  return (
    <div
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: '#E4E4E7',
        borderRadius: borderRadiusMap[variant],
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export function SkeletonPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleToggleContent = () => {
    setShowContent(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 2000);
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
          Skeleton Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Loading placeholders with animations
        </p>
      </div>

      {/* Basic Skeleton */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Skeleton
        </h3>
        <Skeleton platform={platform} />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>
              Rectangular
            </div>
            <Skeleton platform={platform} variant="rectangular" height={60} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>
              Text
            </div>
            <Skeleton platform={platform} variant="text" height={16} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>
              Circular
            </div>
            <Skeleton platform={platform} variant="circular" width={48} height={48} />
          </div>
        </div>
      </div>

      {/* Text Lines */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Text Lines
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton platform={platform} variant="text" height={14} width="100%" />
          <Skeleton platform={platform} variant="text" height={14} width="95%" />
          <Skeleton platform={platform} variant="text" height={14} width="90%" />
          <Skeleton platform={platform} variant="text" height={14} width="85%" />
        </div>
      </div>

      {/* Card Skeleton */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Card Layout
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
          <Skeleton platform={platform} variant="rectangular" height={120} />
          <Skeleton platform={platform} variant="text" height={20} width="70%" />
          <Skeleton platform={platform} variant="text" height={14} width="100%" />
          <Skeleton platform={platform} variant="text" height={14} width="90%" />
        </div>
      </div>

      {/* Profile Skeleton */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Profile Layout
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Skeleton platform={platform} variant="circular" width={48} height={48} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Skeleton platform={platform} variant="text" height={16} width="60%" />
              <Skeleton platform={platform} variant="text" height={12} width="40%" />
            </div>
          </div>
        </div>
      </div>

      {/* List Skeleton */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          List Layout
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '12px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
              }}
            >
              <Skeleton platform={platform} variant="circular" width={32} height={32} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Skeleton platform={platform} variant="text" height={14} width="70%" />
                <Skeleton platform={platform} variant="text" height={12} width="50%" />
              </div>
            </div>
          ))}
        </div>
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
          {isLoading || !showContent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Skeleton platform={platform} variant="circular" width={48} height={48} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Skeleton platform={platform} variant="text" height={16} width="60%" />
                  <Skeleton platform={platform} variant="text" height={12} width="40%" />
                </div>
              </div>
              <Skeleton platform={platform} variant="rectangular" height={100} />
              <Skeleton platform={platform} variant="text" height={14} width="100%" />
              <Skeleton platform={platform} variant="text" height={14} width="95%" />
              <Skeleton platform={platform} variant="text" height={14} width="90%" />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#18181B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FAFAFA',
                    fontWeight: '700',
                  }}
                >
                  JD
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#09090B' }}>
                    John Doe
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717A' }}>
                    john@example.com
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: '100px',
                  backgroundColor: '#18181B',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAFAFA',
                  fontSize: '14px',
                }}
              >
                Content Image
              </div>
              <p style={{ fontSize: '14px', color: '#09090B', margin: 0, lineHeight: '1.5' }}>
                This is the actual content that was loaded. The skeleton screen
                provided a smooth loading experience while this content was being
                fetched from the server.
              </p>
            </div>
          )}
          <button
            onClick={handleToggleContent}
            disabled={isLoading}
            style={{
              marginTop: '16px',
              width: '100%',
              height: '40px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isLoading ? '#E4E4E7' : '#18181B',
              color: isLoading ? '#71717A' : '#FAFAFA',
              fontFamily,
              fontWeight: '600',
              fontSize: '14px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Loading...' : showContent ? 'Reload Content' : 'Load Content'}
          </button>
        </div>
      </div>
    </div>
  );
}
