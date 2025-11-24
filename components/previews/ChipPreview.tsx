import React, { useState, useEffect } from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  onRemove?: () => void;
  onPress?: () => void;
  disabled?: boolean;
  platform?: 'ios' | 'android';
}

function Chip({
  children,
  variant = 'default',
  size = 'md',
  onRemove,
  onPress,
  disabled = false,
  platform = 'ios',
}: ChipProps) {
  const [isPressed, setIsPressed] = useState(false);

  const colors = {
    default: { bg: '#F4F4F5', text: '#09090B', border: '#E4E4E7' },
    primary: { bg: '#18181B', text: '#FAFAFA', border: '#18181B' },
    success: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' },
    warning: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
    error: { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' },
  };

  const sizeConfig = {
    sm: { padding: '4px 8px', fontSize: '12px', gap: '4px' },
    md: { padding: '6px 12px', fontSize: '13px', gap: '6px' },
    lg: { padding: '8px 16px', fontSize: '14px', gap: '8px' },
  };

  const config = sizeConfig[size];
  const colorConfig = colors[variant];

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: config.gap,
    padding: config.padding,
    backgroundColor: colorConfig.bg,
    color: colorConfig.text,
    borderRadius: '16px',
    border: `1px solid ${colorConfig.border}`,
    fontSize: config.fontSize,
    fontWeight: '600',
    fontFamily,
    cursor: disabled ? 'not-allowed' : onPress ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform 0.1s ease',
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
  };

  return (
    <div
      style={chipStyle}
      onClick={disabled ? undefined : onPress}
      onMouseDown={() => !disabled && (onPress || onRemove) && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <span>{children}</span>
      {onRemove && !disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            width: '16px',
            height: '16px',
            padding: 0,
            border: 'none',
            backgroundColor: 'transparent',
            color: colorConfig.text,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function ChipPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['React Native', 'TypeScript']);
  const [tags, setTags] = useState<string[]>(['Design', 'Development', 'Mobile', 'UI/UX']);

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

  const availableFilters = ['React Native', 'TypeScript', 'JavaScript', 'Swift', 'Kotlin'];

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
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
          Chip Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Tags, filters, and selections
        </p>
      </div>

      {/* Basic Chips */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Chips
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Chip platform={platform}>React Native</Chip>
          <Chip platform={platform}>TypeScript</Chip>
          <Chip platform={platform}>Mobile Development</Chip>
        </div>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Chip platform={platform} variant="default">
            Default
          </Chip>
          <Chip platform={platform} variant="primary">
            Primary
          </Chip>
          <Chip platform={platform} variant="success">
            Success
          </Chip>
          <Chip platform={platform} variant="warning">
            Warning
          </Chip>
          <Chip platform={platform} variant="error">
            Error
          </Chip>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <Chip platform={platform} size="sm">
            Small
          </Chip>
          <Chip platform={platform} size="md">
            Medium
          </Chip>
          <Chip platform={platform} size="lg">
            Large
          </Chip>
        </div>
      </div>

      {/* With Remove */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Remove Button
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#09090B', marginBottom: '12px' }}>
            Your Tags
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag) => (
              <Chip key={tag} platform={platform} onRemove={() => removeTag(tag)}>
                {tag}
              </Chip>
            ))}
            {tags.length === 0 && (
              <div style={{ fontSize: '13px', color: '#71717A' }}>
                No tags remaining
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Filter Selection
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '14px', color: '#09090B', marginBottom: '12px' }}>
            Select Technologies
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {availableFilters.map((filter) => (
              <Chip
                key={filter}
                platform={platform}
                variant={selectedFilters.includes(filter) ? 'primary' : 'default'}
                onPress={() => toggleFilter(filter)}
              >
                {filter}
              </Chip>
            ))}
          </div>
          <div style={{ fontSize: '13px', color: '#71717A' }}>
            Selected: {selectedFilters.join(', ') || 'None'}
          </div>
        </div>
      </div>

      {/* Status Chips */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Status Indicators
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
          {[
            { label: 'Build Status', status: 'Passing', variant: 'success' as const },
            { label: 'Deploy Status', status: 'In Progress', variant: 'warning' as const },
            { label: 'Test Coverage', status: 'Failed', variant: 'error' as const },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#09090B' }}>{item.label}</span>
              <Chip platform={platform} variant={item.variant} size="sm">
                {item.status}
              </Chip>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tags */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Article Categories
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#09090B',
              marginBottom: '8px',
            }}
          >
            Getting Started with React Native
          </div>
          <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '12px' }}>
            Learn the basics of building mobile apps with React Native and expo...
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <Chip platform={platform} size="sm">
              Tutorial
            </Chip>
            <Chip platform={platform} size="sm">
              Beginner
            </Chip>
            <Chip platform={platform} size="sm">
              React Native
            </Chip>
          </div>
        </div>
      </div>

      {/* Disabled State */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Disabled State
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Chip platform={platform} disabled>
            Disabled
          </Chip>
          <Chip platform={platform} disabled variant="primary">
            Disabled Primary
          </Chip>
          <Chip platform={platform} disabled onRemove={() => {}}>
            Disabled with Remove
          </Chip>
        </div>
      </div>
    </div>
  );
}
