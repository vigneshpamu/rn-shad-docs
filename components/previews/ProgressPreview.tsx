import React, { useState, useEffect } from 'react';

interface ProgressProps {
  value: number;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  platform?: 'ios' | 'android';
  showLabel?: boolean;
}

function Progress({
  value,
  variant = 'default',
  size = 'md',
  platform = 'ios',
  showLabel = false,
}: ProgressProps) {
  const colors = {
    default: '#18181B',
    success: '#10B981',
    warning: '#F59E0B',
    destructive: '#EF4444',
    background: '#E4E4E7',
  };

  const sizeConfig = {
    sm: 4,
    md: 8,
    lg: 12,
  };

  const height = sizeConfig[size];
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const trackStyle: React.CSSProperties = {
    width: '100%',
    height: `${height}px`,
    backgroundColor: colors.background,
    borderRadius: `${height / 2}px`,
    overflow: 'hidden',
    position: 'relative',
  };

  const barStyle: React.CSSProperties = {
    height: '100%',
    width: `${clampedValue}%`,
    backgroundColor: colors[variant],
    borderRadius: `${height / 2}px`,
    transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div style={{ width: '100%' }}>
      <div style={trackStyle}>
        <div style={barStyle} />
      </div>
      {showLabel && (
        <div
          style={{
            marginTop: '6px',
            fontSize: '12px',
            color: '#71717A',
            fontFamily,
            textAlign: 'right',
          }}
        >
          {clampedValue}%
        </div>
      )}
    </div>
  );
}

export function ProgressPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Upload simulation
  useEffect(() => {
    if (isUploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 100));
      }, 300);
      return () => clearTimeout(timer);
    } else if (uploadProgress === 100) {
      setTimeout(() => setIsUploading(false), 500);
    }
  }, [isUploading, uploadProgress]);

  // Download simulation
  useEffect(() => {
    if (isDownloading && downloadProgress < 100) {
      const timer = setTimeout(() => {
        setDownloadProgress((prev) => Math.min(prev + 5, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (downloadProgress === 100) {
      setTimeout(() => setIsDownloading(false), 500);
    }
  }, [isDownloading, downloadProgress]);

  const handleStartUpload = () => {
    setUploadProgress(0);
    setIsUploading(true);
  };

  const handleStartDownload = () => {
    setDownloadProgress(0);
    setIsDownloading(true);
  };

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
          Progress Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Visual progress indicators
        </p>
      </div>

      {/* Basic Progress */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Progress
        </h3>
        <Progress platform={platform} value={65} />
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
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Default (50%)
            </div>
            <Progress platform={platform} value={50} variant="default" />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Success (100%)
            </div>
            <Progress platform={platform} value={100} variant="success" />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Warning (75%)
            </div>
            <Progress platform={platform} value={75} variant="warning" />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Destructive (25%)
            </div>
            <Progress platform={platform} value={25} variant="destructive" />
          </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Small
            </div>
            <Progress platform={platform} value={60} size="sm" />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Medium
            </div>
            <Progress platform={platform} value={60} size="md" />
          </div>
          <div>
            <div
              style={{
                fontSize: '13px',
                color: '#71717A',
                marginBottom: '6px',
              }}
            >
              Large
            </div>
            <Progress platform={platform} value={60} size="lg" />
          </div>
        </div>
      </div>

      {/* With Labels */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Labels
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Progress platform={platform} value={30} showLabel />
          <Progress platform={platform} value={65} showLabel variant="success" />
          <Progress platform={platform} value={90} showLabel variant="warning" />
        </div>
      </div>

      {/* Interactive Upload Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          File Upload
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#09090B',
                marginBottom: '8px',
              }}
            >
              document.pdf
            </div>
            <Progress
              platform={platform}
              value={uploadProgress}
              variant={uploadProgress === 100 ? 'success' : 'default'}
              showLabel
            />
          </div>
          <button
            onClick={handleStartUpload}
            disabled={isUploading}
            style={{
              width: '100%',
              height: '36px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isUploading ? '#E4E4E7' : '#18181B',
              color: isUploading ? '#71717A' : '#FAFAFA',
              fontFamily,
              fontWeight: '600',
              fontSize: '14px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
            }}
          >
            {isUploading
              ? 'Uploading...'
              : uploadProgress === 100
                ? 'Upload Complete'
                : 'Start Upload'}
          </button>
        </div>
      </div>

      {/* Interactive Download Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Download Progress
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#09090B',
                marginBottom: '8px',
              }}
            >
              app-update.zip
            </div>
            <Progress
              platform={platform}
              value={downloadProgress}
              variant={downloadProgress === 100 ? 'success' : 'default'}
              size="lg"
              showLabel
            />
          </div>
          <button
            onClick={handleStartDownload}
            disabled={isDownloading}
            style={{
              width: '100%',
              height: '36px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isDownloading ? '#E4E4E7' : '#18181B',
              color: isDownloading ? '#71717A' : '#FAFAFA',
              fontFamily,
              fontWeight: '600',
              fontSize: '14px',
              cursor: isDownloading ? 'not-allowed' : 'pointer',
            }}
          >
            {isDownloading
              ? 'Downloading...'
              : downloadProgress === 100
                ? 'Download Complete'
                : 'Start Download'}
          </button>
        </div>
      </div>

      {/* Steps Progress */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Multi-Step Process
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
              fontSize: '13px',
              color: '#71717A',
              marginBottom: '8px',
            }}
          >
            Step 3 of 4
          </div>
          <Progress platform={platform} value={75} size="lg" />
        </div>
      </div>
    </div>
  );
}
