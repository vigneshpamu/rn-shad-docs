import React, { useState, useEffect } from 'react';

interface SegmentedControlProps {
  segments: string[];
  selectedIndex?: number;
  onIndexChange?: (index: number) => void;
  disabled?: boolean;
  platform?: 'ios' | 'android';
}

function SegmentedControl({
  segments,
  selectedIndex = 0,
  onIndexChange,
  disabled = false,
  platform = 'ios',
}: SegmentedControlProps) {
  const [localIndex, setLocalIndex] = useState(selectedIndex);
  const currentIndex = selectedIndex ?? localIndex;

  const handleSegmentPress = (index: number) => {
    if (disabled) return;
    setLocalIndex(index);
    onIndexChange?.(index);
  };

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const segmentWidth = `${100 / segments.length}%`;
  const indicatorPosition = `${(currentIndex / segments.length) * 100}%`;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        backgroundColor: '#F4F4F5',
        borderRadius: '8px',
        padding: '2px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
      }}
    >
      {/* Animated indicator */}
      <div
        style={{
          position: 'absolute',
          left: indicatorPosition,
          width: segmentWidth,
          height: 'calc(100% - 4px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '6px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          top: '2px',
        }}
      />

      {segments.map((segment, index) => (
        <button
          key={index}
          onClick={() => handleSegmentPress(index)}
          disabled={disabled}
          style={{
            flex: 1,
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily,
            border: 'none',
            backgroundColor: 'transparent',
            color: currentIndex === index ? '#09090B' : '#71717A',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'color 0.2s ease',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {segment}
        </button>
      ))}
    </div>
  );
}

export function SegmentedControlPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [viewMode, setViewMode] = useState(0);
  const [filterIndex, setFilterIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState(0);
  const [themeMode, setThemeMode] = useState(0);

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

  const filterItems = {
    0: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
    1: ['Task 1', 'Task 3'],
    2: ['Task 2'],
    3: [],
  };

  const periodStats = {
    0: '1,234',
    1: '8,456',
    2: '32,145',
    3: '124,567',
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
          Segmented Control Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Animated segment switcher
        </p>
      </div>

      {/* Basic Segmented Control */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <SegmentedControl
            platform={platform}
            segments={['All', 'Active', 'Archived']}
            selectedIndex={0}
          />
        </div>
      </div>

      {/* View Toggle */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          View Toggle
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <SegmentedControl
            platform={platform}
            segments={['Grid', 'List']}
            selectedIndex={viewMode}
            onIndexChange={setViewMode}
          />
          <div
            style={{
              marginTop: '16px',
              display: 'grid',
              gridTemplateColumns: viewMode === 0 ? '1fr 1fr' : '1fr',
              gap: '8px',
            }}
          >
            {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: '#09090B',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter View */}
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
          <SegmentedControl
            platform={platform}
            segments={['All', 'Completed', 'Pending', 'Archived']}
            selectedIndex={filterIndex}
            onIndexChange={setFilterIndex}
          />
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filterItems[filterIndex as keyof typeof filterItems].length > 0 ? (
              filterItems[filterIndex as keyof typeof filterItems].map((item) => (
                <div
                  key={item}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#09090B',
                  }}
                >
                  {item}
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: '#71717A',
                }}
              >
                No items
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sorting Options */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Sorting
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <SegmentedControl
            platform={platform}
            segments={['Latest', 'Popular', 'Rating']}
            selectedIndex={sortIndex}
            onIndexChange={setSortIndex}
          />
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Article 1', 'Article 2', 'Article 3'].map((item, i) => (
              <div
                key={item}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#09090B' }}>
                  {item}
                </div>
                <div style={{ fontSize: '12px', color: '#71717A', marginTop: '4px' }}>
                  Sorted by {['Latest', 'Popular', 'Rating'][sortIndex]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Period */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Time Period Analytics
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <SegmentedControl
            platform={platform}
            segments={['Today', 'Week', 'Month', 'Year']}
            selectedIndex={timePeriod}
            onIndexChange={setTimePeriod}
          />
          <div
            style={{
              marginTop: '16px',
              backgroundColor: '#FFFFFF',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#09090B' }}>
              Analytics for {['Today', 'Week', 'Month', 'Year'][timePeriod]}
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#18181B', marginTop: '8px' }}>
              {periodStats[timePeriod as keyof typeof periodStats]}
            </div>
            <div style={{ fontSize: '12px', color: '#71717A', marginTop: '4px' }}>
              Total views
            </div>
          </div>
        </div>
      </div>

      {/* Theme Mode */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Theme Switcher
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#09090B', marginBottom: '12px' }}>
            Appearance
          </div>
          <SegmentedControl
            platform={platform}
            segments={['Light', 'Dark', 'Auto']}
            selectedIndex={themeMode}
            onIndexChange={setThemeMode}
          />
          <div style={{ fontSize: '13px', color: '#71717A', marginTop: '12px' }}>
            {themeMode === 0 && 'Use light theme'}
            {themeMode === 1 && 'Use dark theme'}
            {themeMode === 2 && 'Follow system settings'}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Content Tabs
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <SegmentedControl
            platform={platform}
            segments={['Overview', 'Details', 'Settings']}
            selectedIndex={0}
          />
          <div
            style={{
              marginTop: '16px',
              backgroundColor: '#FFFFFF',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#09090B',
            }}
          >
            Overview content appears here
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
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <SegmentedControl
            platform={platform}
            segments={['Option 1', 'Option 2', 'Option 3']}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
