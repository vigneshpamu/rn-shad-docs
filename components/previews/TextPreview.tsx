import React, { useEffect } from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: 'default' | 'muted' | 'primary' | 'destructive';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  platform?: 'ios' | 'android';
}

function Text({
  children,
  variant = 'body',
  color = 'default',
  weight = 'normal',
  align = 'left',
  platform = 'ios',
}: TextProps) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const variantStyles: Record<string, React.CSSProperties> = {
    h1: { fontSize: '32px', lineHeight: '1.2', fontWeight: '700' },
    h2: { fontSize: '28px', lineHeight: '1.3', fontWeight: '700' },
    h3: { fontSize: '24px', lineHeight: '1.3', fontWeight: '600' },
    h4: { fontSize: '20px', lineHeight: '1.4', fontWeight: '600' },
    body: { fontSize: '16px', lineHeight: '1.5', fontWeight: '400' },
    caption: { fontSize: '12px', lineHeight: '1.4', fontWeight: '400' },
    label: { fontSize: '14px', lineHeight: '1.4', fontWeight: '500' },
  };

  const colorStyles: Record<string, string> = {
    default: '#09090B',
    muted: '#71717A',
    primary: '#18181B',
    destructive: '#EF4444',
  };

  const weightStyles: Record<string, string> = {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  };

  return (
    <div
      style={{
        fontFamily,
        color: colorStyles[color],
        textAlign: align,
        ...variantStyles[variant],
        fontWeight: weightStyles[weight],
      }}
    >
      {children}
    </div>
  );
}

export function TextPreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Text Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Typography system with variants
        </p>
      </div>

      {/* Heading Variants */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Heading Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text platform={platform} variant="h1">
            Heading 1
          </Text>
          <Text platform={platform} variant="h2">
            Heading 2
          </Text>
          <Text platform={platform} variant="h3">
            Heading 3
          </Text>
          <Text platform={platform} variant="h4">
            Heading 4
          </Text>
        </div>
      </div>

      {/* Body Text Variants */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Body Text Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text platform={platform} variant="body">
            This is body text with default styling for paragraphs and content.
          </Text>
          <Text platform={platform} variant="label">
            This is label text for form labels and UI elements
          </Text>
          <Text platform={platform} variant="caption">
            This is caption text for smaller supplementary information
          </Text>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text platform={platform} color="default">
            Default foreground color
          </Text>
          <Text platform={platform} color="muted">
            Muted secondary color
          </Text>
          <Text platform={platform} color="primary">
            Primary brand color
          </Text>
          <Text platform={platform} color="destructive">
            Destructive red color
          </Text>
        </div>
      </div>

      {/* Weights */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Font Weights
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Text platform={platform} weight="normal">
            Normal weight text (400)
          </Text>
          <Text platform={platform} weight="medium">
            Medium weight text (500)
          </Text>
          <Text platform={platform} weight="semibold">
            Semibold text (600)
          </Text>
          <Text platform={platform} weight="bold">
            Bold text (700)
          </Text>
        </div>
      </div>

      {/* Alignment */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Text Alignment
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Text platform={platform} align="left">
            Left aligned text
          </Text>
          <Text platform={platform} align="center">
            Center aligned text
          </Text>
          <Text platform={platform} align="right">
            Right aligned text
          </Text>
        </div>
      </div>

      {/* Combined Styling */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Combined Styling
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
          <Text
            platform={platform}
            variant="h3"
            color="primary"
            weight="bold"
            align="center"
          >
            Bold Primary Centered Heading
          </Text>
          <Text
            platform={platform}
            variant="body"
            color="muted"
            weight="normal"
            align="center"
          >
            Muted body text with center alignment
          </Text>
        </div>
      </div>

      {/* Real-World Example: Article */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Article Example
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
          <Text platform={platform} variant="h2" weight="bold">
            The Future of Mobile Development
          </Text>
          <Text platform={platform} variant="caption" color="muted">
            Published on December 24, 2024 · 5 min read
          </Text>
          <Text platform={platform} variant="body">
            Mobile development continues to evolve with new frameworks and tools
            emerging every year. React Native has become a popular choice for
            building cross-platform applications.
          </Text>
          <Text platform={platform} variant="body">
            With its component-based architecture and hot reloading capabilities,
            developers can build beautiful, performant apps for both iOS and
            Android using a single codebase.
          </Text>
        </div>
      </div>

      {/* Real-World Example: Form */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Form Example
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
            <Text platform={platform} variant="label" weight="semibold">
              Email Address
            </Text>
            <div
              style={{
                marginTop: '8px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '12px',
              }}
            >
              <Text platform={platform} variant="body" color="muted">
                your@email.com
              </Text>
            </div>
            <Text
              platform={platform}
              variant="caption"
              color="muted"
              style={{ marginTop: '6px' }}
            >
              We'll never share your email with anyone else.
            </Text>
          </div>

          <div>
            <Text platform={platform} variant="label" weight="semibold">
              Password
            </Text>
            <div
              style={{
                marginTop: '8px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EF4444',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '12px',
              }}
            >
              <Text platform={platform} variant="body" color="muted">
                ••••••••
              </Text>
            </div>
            <Text
              platform={platform}
              variant="caption"
              color="destructive"
              style={{ marginTop: '6px' }}
            >
              Password must be at least 8 characters long.
            </Text>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Typography Scale
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="h1">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              h1 - 32px
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="h2">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              h2 - 28px
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="h3">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              h3 - 24px
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="h4">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              h4 - 20px
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="body">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              body - 16px
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="label">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              label - 14px
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text platform={platform} variant="caption">
              Aa
            </Text>
            <Text platform={platform} variant="caption" color="muted">
              caption - 12px
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
