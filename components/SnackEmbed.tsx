import React from 'react';

export interface SnackEmbedProps {
  snackId: string;
  platform?: 'ios' | 'android' | 'web' | 'mydevice';
  preview?: boolean;
  previewOnly?: boolean; // NEW: Hide code editor, show only preview
  theme?: 'light' | 'dark';
  loading?: 'lazy' | 'eager';
  file?: string;
  height?: string | number;
}

export function SnackEmbed({
  snackId,
  platform = 'mydevice',
  preview = true,
  previewOnly = true, // Default to preview only
  theme = 'light',
  loading = 'lazy',
  file,
  height = '700px',
}: SnackEmbedProps) {
  // When previewOnly is true, show full-width Snack with code + both previews
  if (previewOnly) {
    return (
      <div
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e4e4e7',
        }}
      >
        <iframe
          src={`https://snack.expo.dev/embedded/@${snackId}?platform=mydevice&preview=true&theme=${theme}`}
          style={{
            width: '100%',
            height: '800px',
            border: 'none',
          }}
          loading={loading}
          title={`Expo Snack - ${snackId}`}
          allow="accelerometer; camera; microphone"
        />
      </div>
    );
  }

  // Original behavior with code editor
  const embedUrl = new URL(`https://snack.expo.dev/embedded/@${snackId}`);
  embedUrl.searchParams.set('platform', platform);
  embedUrl.searchParams.set('preview', preview.toString());
  embedUrl.searchParams.set('theme', theme);

  if (file) {
    embedUrl.searchParams.set('file', file);
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e4e4e7',
        backgroundColor: '#fafafa',
      }}
    >
      <iframe
        src={embedUrl.toString()}
        style={{
          width: '100%',
          height: typeof height === 'number' ? `${height}px` : height,
          border: 'none',
          borderRadius: '8px',
        }}
        loading={loading}
        title={`Expo Snack - ${snackId}`}
        allow="accelerometer; camera; microphone"
      />
    </div>
  );
}

// Helper component for quick embedding with snack link
export interface SnackLinkProps {
  href: string;
  platform?: 'ios' | 'android' | 'web' | 'mydevice';
  preview?: boolean;
  theme?: 'light' | 'dark';
  loading?: 'lazy' | 'eager';
}

export function SnackLink({
  href,
  platform = 'mydevice',
  preview = true,
  theme = 'light',
  loading = 'lazy',
}: SnackLinkProps) {
  // Extract snack ID from URL
  // Supports: https://snack.expo.dev/@username/snackname
  // or snack.expo.dev/@username/snackname
  const match = href.match(/snack\.expo\.dev\/(@[^\/]+\/[^\/\?]+)/);

  if (!match) {
    console.error('Invalid Snack URL:', href);
    return (
      <div style={{ padding: '1rem', color: 'red', border: '1px solid red' }}>
        Invalid Snack URL: {href}
      </div>
    );
  }

  const snackId = match[1].replace('@', '');

  return (
    <SnackEmbed
      snackId={snackId}
      platform={platform}
      preview={preview}
      theme={theme}
      loading={loading}
    />
  );
}
