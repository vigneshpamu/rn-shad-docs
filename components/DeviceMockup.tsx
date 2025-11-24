import React, { ReactNode } from 'react';

interface DeviceMockupProps {
  platform: 'ios' | 'android';
  children: ReactNode;
}

export function DeviceMockup({ platform, children }: DeviceMockupProps) {
  const isIOS = platform === 'ios';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Device Label */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#52525b',
          marginBottom: '12px',
        }}
      >
        {isIOS ? 'iOS' : 'Android'}
      </div>

      {/* Device Frame */}
      <div
        style={{
          width: '340px',
          height: '680px',
          borderRadius: isIOS ? '36px' : '20px',
          border: `10px solid ${isIOS ? '#1f1f1f' : '#2c2c2c'}`,
          backgroundColor: '#000',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* iOS Notch */}
        {isIOS && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '130px',
              height: '26px',
              backgroundColor: '#000',
              borderBottomLeftRadius: '18px',
              borderBottomRightRadius: '18px',
              zIndex: 1000,
            }}
          />
        )}

        {/* Status Bar */}
        <div
          style={{
            height: isIOS ? '44px' : '24px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            fontSize: '12px',
            fontFamily: isIOS
              ? '-apple-system, BlinkMacSystemFont, "SF Pro Text"'
              : 'Roboto, sans-serif',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: isIOS ? '612px' : '632px',
            fontFamily: isIOS
              ? '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display"'
              : 'Roboto, "Noto Sans", sans-serif',
          }}
        >
          {children}
        </div>

        {/* iOS Home Indicator */}
        {isIOS && (
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '134px',
              height: '5px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '100px',
            }}
          />
        )}
      </div>
    </div>
  );
}

interface DevicePreviewProps {
  ios: ReactNode;
  android: ReactNode;
}

export function DevicePreview({ ios, android }: DevicePreviewProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        marginTop: '2rem',
        marginBottom: '2rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <DeviceMockup platform="ios">{ios}</DeviceMockup>
      <DeviceMockup platform="android">{android}</DeviceMockup>
    </div>
  );
}
