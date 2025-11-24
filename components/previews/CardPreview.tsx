import React, { useState, useEffect } from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline';
  pressable?: boolean;
  onPress?: () => void;
  platform?: 'ios' | 'android';
  style?: React.CSSProperties;
}

function Card({
  children,
  variant = 'default',
  pressable = false,
  onPress,
  platform = 'ios',
  style,
}: CardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#FFFFFF',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    elevated: {
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    outline: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E4E4E7',
    },
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: pressable ? 'pointer' : 'default',
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <div
      style={cardStyle}
      onClick={pressable ? onPress : undefined}
      onMouseDown={pressable ? () => setIsPressed(true) : undefined}
      onMouseUp={pressable ? () => setIsPressed(false) : undefined}
      onMouseLeave={pressable ? () => setIsPressed(false) : undefined}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '16px', paddingBottom: '8px' }}>
      {children}
    </div>
  );
}

function CardTitle({ children, platform = 'ios' }: { children: React.ReactNode; platform?: 'ios' | 'android' }) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <h3
      style={{
        fontSize: '18px',
        fontWeight: '700',
        margin: 0,
        color: '#09090B',
        fontFamily,
      }}
    >
      {children}
    </h3>
  );
}

function CardDescription({ children, platform = 'ios' }: { children: React.ReactNode; platform?: 'ios' | 'android' }) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <p
      style={{
        fontSize: '14px',
        color: '#71717A',
        margin: '4px 0 0 0',
        fontFamily,
      }}
    >
      {children}
    </p>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: '16px', paddingTop: '8px' }}>{children}</div>;
}

function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '16px',
        paddingTop: '8px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

// Simple Button component for cards
function Button({
  children,
  variant = 'default',
  size = 'sm',
  onPress,
  platform = 'ios',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
  onPress?: () => void;
  platform?: 'ios' | 'android';
}) {
  const [isPressed, setIsPressed] = useState(false);

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const variantStyles = {
    default: { backgroundColor: '#18181B', color: '#FAFAFA' },
    outline: {
      backgroundColor: 'transparent',
      color: '#09090B',
      border: '1.5px solid #E4E4E7',
    },
  };

  const sizeStyles = {
    sm: { height: '32px', paddingLeft: '12px', paddingRight: '12px', fontSize: '13px' },
    md: { height: '40px', paddingLeft: '16px', paddingRight: '16px', fontSize: '14px' },
  };

  return (
    <button
      onClick={onPress}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        border: 'none',
        fontFamily,
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {children}
    </button>
  );
}

export function CardPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [pressCount, setPressCount] = useState(0);

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
          Card Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Flexible content containers
        </p>
      </div>

      {/* Basic Card */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Card
        </h3>
        <Card platform={platform}>
          <CardContent>
            <p style={{ margin: 0, fontSize: '14px', color: '#09090B' }}>
              Simple card with content
            </p>
          </CardContent>
        </Card>
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
          <Card platform={platform} variant="default">
            <CardContent>
              <p style={{ margin: 0, fontSize: '13px', color: '#71717A' }}>Default</p>
            </CardContent>
          </Card>
          <Card platform={platform} variant="elevated">
            <CardContent>
              <p style={{ margin: 0, fontSize: '13px', color: '#71717A' }}>Elevated</p>
            </CardContent>
          </Card>
          <Card platform={platform} variant="outline">
            <CardContent>
              <p style={{ margin: 0, fontSize: '13px', color: '#71717A' }}>Outline</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* With Header and Footer */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Header & Footer
        </h3>
        <Card platform={platform} variant="elevated">
          <CardHeader>
            <CardTitle platform={platform}>Card Title</CardTitle>
            <CardDescription platform={platform}>
              This is a description of the card content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, fontSize: '14px', color: '#09090B' }}>
              Main content goes here with all the details you want to display.
            </p>
          </CardContent>
          <CardFooter>
            <Button platform={platform} variant="outline" size="sm" onPress={() => {}}>
              Cancel
            </Button>
            <Button platform={platform} variant="default" size="sm" onPress={() => {}}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Pressable Card */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Pressable Card
        </h3>
        <Card
          platform={platform}
          variant="elevated"
          pressable
          onPress={() => setPressCount(pressCount + 1)}
        >
          <CardHeader>
            <CardTitle platform={platform}>Interactive Card</CardTitle>
            <CardDescription platform={platform}>
              Tap to increment counter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p
              style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '700',
                color: '#18181B',
                textAlign: 'center',
              }}
            >
              {pressCount}
            </p>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: '#71717A',
                textAlign: 'center',
              }}
            >
              times pressed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Profile Card */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Profile Card Example
        </h3>
        <Card platform={platform} variant="elevated">
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  fontSize: '18px',
                  fontWeight: '700',
                }}
              >
                JD
              </div>
              <div style={{ flex: 1 }}>
                <CardTitle platform={platform}>John Doe</CardTitle>
                <CardDescription platform={platform}>john@example.com</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#71717A' }}>Role</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#09090B' }}>
                  Developer
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          </CardContent>
          <CardFooter>
            <div style={{ flex: 1 }}>
              <Button
                platform={platform}
                variant="default"
                size="sm"
                onPress={() => {}}
              >
                View Profile
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
