import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  platform?: 'ios' | 'android';
}

function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  disabled = false,
  platform = 'ios',
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sizeConfig = {
    sm: { trackHeight: 4, thumbSize: 16 },
    md: { trackHeight: 6, thumbSize: 20 },
    lg: { trackHeight: 8, thumbSize: 24 },
  };

  const config = sizeConfig[size];
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = (clientX: number) => {
    if (disabled || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPercentage = x / rect.width;
    let newValue = min + newPercentage * (max - min);

    // Apply step
    if (step > 0) {
      newValue = Math.round(newValue / step) * step;
    }

    newValue = Math.max(min, Math.min(max, newValue));
    onValueChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: `${config.trackHeight}px`,
    backgroundColor: '#E4E4E7',
    borderRadius: `${config.trackHeight / 2}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const activeTrackStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: '#18181B',
    borderRadius: `${config.trackHeight / 2}px`,
    transition: isDragging ? 'none' : 'width 0.2s ease',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${percentage}%`,
    transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`,
    width: `${config.thumbSize}px`,
    height: `${config.thumbSize}px`,
    backgroundColor: '#18181B',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: isDragging ? 'none' : 'left 0.2s ease, transform 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'grab',
  };

  return (
    <div
      ref={trackRef}
      style={trackStyle}
      onMouseDown={handleMouseDown}
    >
      <div style={activeTrackStyle} />
      <div style={thumbStyle} />
    </div>
  );
}

// Volume icon component
function VolumeIcon({ level }: { level: number }) {
  if (level === 0) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    );
  } else if (level < 50) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    );
  }
}

export function SliderPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicValue, setBasicValue] = useState(50);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);
  const [temperature, setTemperature] = useState(22);
  const [price, setPrice] = useState(250);

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
          Slider Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Interactive range selectors
        </p>
      </div>

      {/* Basic Slider */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Slider
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Slider
            platform={platform}
            value={basicValue}
            onValueChange={setBasicValue}
            min={0}
            max={100}
          />
          <p style={{ fontSize: '14px', color: '#09090B', textAlign: 'center', margin: 0 }}>
            Value: {Math.round(basicValue)}
          </p>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>Small</div>
            <Slider
              platform={platform}
              value={50}
              onValueChange={() => {}}
              size="sm"
            />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>Medium</div>
            <Slider
              platform={platform}
              value={50}
              onValueChange={() => {}}
              size="md"
            />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#71717A', marginBottom: '8px' }}>Large</div>
            <Slider
              platform={platform}
              value={50}
              onValueChange={() => {}}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Volume Control
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
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <div style={{ color: '#71717A' }}>
              <VolumeIcon level={volume} />
            </div>
            <Slider
              platform={platform}
              value={volume}
              onValueChange={setVolume}
              min={0}
              max={100}
              size="lg"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: '#71717A',
            }}
          >
            <span>0%</span>
            <span style={{ fontWeight: '700', color: '#09090B', fontSize: '16px' }}>
              {Math.round(volume)}%
            </span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Brightness Control */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Brightness
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
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              marginBottom: '12px',
            }}
          >
            Screen Brightness
          </div>
          <Slider
            platform={platform}
            value={brightness}
            onValueChange={setBrightness}
            min={0}
            max={100}
            step={5}
          />
          <div
            style={{
              fontSize: '13px',
              color: '#71717A',
              marginTop: '8px',
              textAlign: 'right',
            }}
          >
            {Math.round(brightness)}%
          </div>
        </div>
      </div>

      {/* Temperature Control */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Temperature
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
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              marginBottom: '12px',
            }}
          >
            Room Temperature
          </div>
          <Slider
            platform={platform}
            value={temperature}
            onValueChange={setTemperature}
            min={16}
            max={30}
            step={0.5}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
            }}
          >
            <span style={{ fontSize: '13px', color: '#71717A' }}>16°C</span>
            <span
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#09090B',
              }}
            >
              {temperature.toFixed(1)}°C
            </span>
            <span style={{ fontSize: '13px', color: '#71717A' }}>30°C</span>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Price Range
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
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              marginBottom: '12px',
            }}
          >
            Maximum Price
          </div>
          <Slider
            platform={platform}
            value={price}
            onValueChange={setPrice}
            min={0}
            max={500}
            step={10}
            size="lg"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '13px', color: '#71717A' }}>$0</span>
            <span
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#18181B',
              }}
            >
              ${Math.round(price)}
            </span>
            <span style={{ fontSize: '13px', color: '#71717A' }}>$500</span>
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
        <Slider
          platform={platform}
          value={50}
          onValueChange={() => {}}
          disabled
        />
      </div>
    </div>
  );
}
