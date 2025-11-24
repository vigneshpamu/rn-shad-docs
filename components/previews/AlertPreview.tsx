import React, { useEffect } from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  icon?: React.ReactNode;
  platform?: 'ios' | 'android';
}

function Alert({ children, variant = 'default', icon, platform = 'ios' }: AlertProps) {
  const colors = {
    default: {
      bg: '#F4F4F5',
      border: '#E4E4E7',
      text: '#09090B',
    },
    success: {
      bg: '#F0FDF4',
      border: '#BBF7D0',
      text: '#166534',
    },
    warning: {
      bg: '#FFFBEB',
      border: '#FDE68A',
      text: '#92400E',
    },
    destructive: {
      bg: '#FEF2F2',
      border: '#FECACA',
      text: '#991B1B',
    },
  };

  const alertColors = colors[variant];

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        backgroundColor: alertColors.bg,
        border: `1px solid ${alertColors.border}`,
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        fontFamily,
        color: alertColors.text,
      }}
    >
      {icon && <div style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</div>}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function AlertTitle({ children, platform = 'ios' }: { children: React.ReactNode; platform?: 'ios' | 'android' }) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        fontSize: '15px',
        fontWeight: '700',
        marginBottom: '4px',
        fontFamily,
      }}
    >
      {children}
    </div>
  );
}

function AlertDescription({ children, platform = 'ios' }: { children: React.ReactNode; platform?: 'ios' | 'android' }) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        fontSize: '14px',
        lineHeight: '1.5',
        opacity: 0.9,
        fontFamily,
      }}
    >
      {children}
    </div>
  );
}

// Icon components
function InfoIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CheckCircleIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertTriangleIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function XCircleIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export function AlertPreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Alert Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Contextual feedback messages
        </p>
      </div>

      {/* Basic Alert */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Alert
        </h3>
        <Alert platform={platform}>
          <AlertTitle platform={platform}>Heads up!</AlertTitle>
          <AlertDescription platform={platform}>
            You can add components to your app using the CLI.
          </AlertDescription>
        </Alert>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert platform={platform} variant="default" icon={<InfoIcon />}>
            <AlertTitle platform={platform}>Information</AlertTitle>
            <AlertDescription platform={platform}>
              Here's some helpful information about the system.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="success" icon={<CheckCircleIcon color="#166534" />}>
            <AlertTitle platform={platform}>Success</AlertTitle>
            <AlertDescription platform={platform}>
              Your profile has been updated successfully.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="warning" icon={<AlertTriangleIcon color="#92400E" />}>
            <AlertTitle platform={platform}>Warning</AlertTitle>
            <AlertDescription platform={platform}>
              This action cannot be undone. Please proceed with caution.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="destructive" icon={<XCircleIcon color="#991B1B" />}>
            <AlertTitle platform={platform}>Error</AlertTitle>
            <AlertDescription platform={platform}>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Without Icons */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Without Icons
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert platform={platform} variant="default">
            <AlertTitle platform={platform}>Note</AlertTitle>
            <AlertDescription platform={platform}>
              Updates will be available after maintenance.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="success">
            <AlertDescription platform={platform}>
              File uploaded successfully.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Title Only */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Title Only
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert platform={platform} variant="warning" icon={<AlertTriangleIcon color="#92400E" />}>
            <AlertTitle platform={platform}>Scheduled Maintenance</AlertTitle>
          </Alert>

          <Alert platform={platform} variant="success" icon={<CheckCircleIcon color="#166534" />}>
            <AlertTitle platform={platform}>Payment Confirmed</AlertTitle>
          </Alert>
        </div>
      </div>

      {/* Real-World Examples */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Real-World Examples
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Alert platform={platform} variant="default" icon={<InfoIcon />}>
            <AlertTitle platform={platform}>New Features Available</AlertTitle>
            <AlertDescription platform={platform}>
              We've added dark mode and offline support. Check out the settings to
              enable them.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="warning" icon={<AlertTriangleIcon color="#92400E" />}>
            <AlertTitle platform={platform}>Storage Almost Full</AlertTitle>
            <AlertDescription platform={platform}>
              You're using 95% of your storage. Consider upgrading your plan or
              deleting unused files.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="destructive" icon={<XCircleIcon color="#991B1B" />}>
            <AlertTitle platform={platform}>Connection Failed</AlertTitle>
            <AlertDescription platform={platform}>
              Unable to connect to the server. Please check your internet
              connection and try again.
            </AlertDescription>
          </Alert>

          <Alert platform={platform} variant="success" icon={<CheckCircleIcon color="#166534" />}>
            <AlertTitle platform={platform}>Backup Complete</AlertTitle>
            <AlertDescription platform={platform}>
              All your data has been safely backed up to the cloud. Last backup:
              2 minutes ago.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
