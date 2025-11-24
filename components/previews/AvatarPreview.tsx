import React, { useState, useEffect } from 'react';

interface AvatarProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  platform?: 'ios' | 'android';
}

function Avatar({ children, size = 'md', platform = 'ios' }: AvatarProps) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const avatarSize = sizeMap[size];

  return (
    <div
      style={{
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#E4E4E7',
      }}
    >
      {children}
    </div>
  );
}

function AvatarImage({ src, alt }: { src?: string; alt?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) return null;

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: loaded ? 'block' : 'none',
      }}
    />
  );
}

function AvatarFallback({
  children,
  platform = 'ios',
}: {
  children: React.ReactNode;
  platform?: 'ios' | 'android';
}) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  // Extract initials from text
  const getInitials = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const displayText =
    typeof children === 'string' ? getInitials(children) : children;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#18181B',
        color: '#FAFAFA',
        fontFamily,
        fontWeight: '600',
        fontSize: '14px',
      }}
    >
      {displayText}
    </div>
  );
}

export function AvatarPreview({ platform }: { platform: 'ios' | 'android' }) {
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

  // Sample avatar URLs (using placeholder images)
  const avatarUrl1 = 'https://i.pravatar.cc/150?img=1';
  const avatarUrl2 = 'https://i.pravatar.cc/150?img=2';
  const avatarUrl3 = 'https://i.pravatar.cc/150?img=3';

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
          Avatar Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          User profile images with fallbacks
        </p>
      </div>

      {/* Basic Avatar */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Images
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar platform={platform}>
            <AvatarImage src={avatarUrl1} alt="User 1" />
            <AvatarFallback platform={platform}>JD</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarImage src={avatarUrl2} alt="User 2" />
            <AvatarFallback platform={platform}>SA</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarImage src={avatarUrl3} alt="User 3" />
            <AvatarFallback platform={platform}>MJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Fallback Only */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Fallback Only
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>JD</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>SA</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>MJ</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>AB</AvatarFallback>
          </Avatar>
        </div>
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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar platform={platform} size="sm">
              <AvatarFallback platform={platform}>SM</AvatarFallback>
            </Avatar>
            <span style={{ fontSize: '12px', color: '#71717A' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar platform={platform} size="md">
              <AvatarFallback platform={platform}>MD</AvatarFallback>
            </Avatar>
            <span style={{ fontSize: '12px', color: '#71717A' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar platform={platform} size="lg">
              <AvatarFallback platform={platform}>LG</AvatarFallback>
            </Avatar>
            <span style={{ fontSize: '12px', color: '#71717A' }}>Large</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar platform={platform} size="xl">
              <AvatarFallback platform={platform}>XL</AvatarFallback>
            </Avatar>
            <span style={{ fontSize: '12px', color: '#71717A' }}>X-Large</span>
          </div>
        </div>
      </div>

      {/* Auto-Generated Initials */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Auto-Generated Initials
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>John Doe</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>Sarah Anderson</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>Michael Johnson</AvatarFallback>
          </Avatar>
          <Avatar platform={platform}>
            <AvatarFallback platform={platform}>Emily Brown</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* User Profile Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Profile Card
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar platform={platform} size="lg">
              <AvatarImage src={avatarUrl1} alt="John Doe" />
              <AvatarFallback platform={platform}>JD</AvatarFallback>
            </Avatar>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#09090B',
                  marginBottom: '2px',
                }}
              >
                John Doe
              </div>
              <div style={{ fontSize: '14px', color: '#71717A' }}>
                john.doe@example.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          User List
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
          {[
            { name: 'John Doe', email: 'john@example.com', img: avatarUrl1 },
            { name: 'Sarah Anderson', email: 'sarah@example.com', img: avatarUrl2 },
            { name: 'Michael Johnson', email: 'michael@example.com', img: avatarUrl3 },
            { name: 'Emily Brown', email: 'emily@example.com', img: null },
          ].map((user, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
              }}
            >
              <Avatar platform={platform} size="sm">
                {user.img && <AvatarImage src={user.img} alt={user.name} />}
                <AvatarFallback platform={platform}>{user.name}</AvatarFallback>
              </Avatar>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#09090B',
                  }}
                >
                  {user.name}
                </div>
                <div style={{ fontSize: '12px', color: '#71717A' }}>
                  {user.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Avatar Group */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Avatar Group
        </h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[
            { initials: 'JD', img: avatarUrl1 },
            { initials: 'SA', img: avatarUrl2 },
            { initials: 'MJ', img: avatarUrl3 },
            { initials: '+5', img: null },
          ].map((avatar, index) => (
            <div
              key={index}
              style={{
                marginLeft: index > 0 ? '-12px' : '0',
                position: 'relative',
                zIndex: 4 - index,
              }}
            >
              <Avatar platform={platform}>
                {avatar.img && <AvatarImage src={avatar.img} alt={avatar.initials} />}
                <AvatarFallback platform={platform}>{avatar.initials}</AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </div>

      {/* Status Indicators */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Status Indicator
        </h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { name: 'Online', color: '#10B981', img: avatarUrl1 },
            { name: 'Away', color: '#F59E0B', img: avatarUrl2 },
            { name: 'Offline', color: '#71717A', img: avatarUrl3 },
          ].map((user, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <Avatar platform={platform}>
                  <AvatarImage src={user.img} alt={user.name} />
                  <AvatarFallback platform={platform}>
                    {user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '12px',
                    height: '12px',
                    backgroundColor: user.color,
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                  }}
                />
              </div>
              <span style={{ fontSize: '12px', color: '#71717A' }}>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
