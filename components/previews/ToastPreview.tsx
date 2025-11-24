import React, { useState, useEffect } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  action?: {
    label: string;
    onPress: () => void;
  };
}

function ToastContainer({
  toasts,
  onClose,
  platform = 'ios',
}: {
  toasts: Toast[];
  onClose: (id: string) => void;
  platform?: 'ios' | 'android';
}) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const variantStyles = {
    default: {
      backgroundColor: '#FFFFFF',
      color: '#09090B',
      iconColor: '#09090B',
      borderColor: '#E4E4E7',
    },
    success: {
      backgroundColor: '#FFFFFF',
      color: '#09090B',
      iconColor: '#16A34A',
      borderColor: '#16A34A',
    },
    error: {
      backgroundColor: '#FFFFFF',
      color: '#09090B',
      iconColor: '#EF4444',
      borderColor: '#EF4444',
    },
    warning: {
      backgroundColor: '#FFFFFF',
      color: '#09090B',
      iconColor: '#D97706',
      borderColor: '#D97706',
    },
  };

  const getIcon = (variant: string, iconColor: string) => {
    switch (variant) {
      case 'success':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'error':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case 'warning':
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      default:
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        width: 'calc(100% - 32px)',
        maxWidth: '340px',
      }}
    >
      {toasts.map((toast) => {
        const style = variantStyles[toast.variant || 'default'];
        return (
          <div
            key={toast.id}
            style={{
              backgroundColor: style.backgroundColor,
              color: style.color,
              border: `1px solid ${style.borderColor}`,
              borderRadius: '12px',
              padding: '16px',
              width: '100%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              fontFamily,
              animation: 'fadeInDown 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              pointerEvents: 'auto',
            }}
          >
            <div style={{ flexShrink: 0 }}>
              {getIcon(toast.variant || 'default', style.iconColor)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: toast.description ? '4px' : '0' }}>
                {toast.title}
              </div>
              {toast.description && (
                <div style={{ fontSize: '13px', color: '#71717A' }}>
                  {toast.description}
                </div>
              )}
            </div>
            {toast.action && (
              <button
                onClick={toast.action.onPress}
                style={{
                  marginLeft: '12px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  fontFamily,
                  border: 'none',
                  backgroundColor: '#F4F4F5',
                  color: '#09090B',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => onClose(toast.id)}
              style={{
                flexShrink: 0,
                marginLeft: '8px',
                border: 'none',
                background: 'none',
                color: '#71717A',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes fadeInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function Button({
  children,
  variant = 'default',
  onPress,
  platform = 'ios',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'primary';
  onPress?: () => void;
  platform?: 'ios' | 'android';
}) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const styles = {
    default: {
      backgroundColor: '#18181B',
      color: '#FAFAFA',
      border: 'none',
    },
    primary: {
      backgroundColor: '#18181B',
      color: '#FAFAFA',
      border: 'none',
    },
    destructive: {
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#18181B',
      border: '1px solid #E4E4E7',
    },
  };

  const style = styles[variant];

  return (
    <button
      onClick={onPress}
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily,
        border: style.border,
        backgroundColor: style.backgroundColor,
        color: style.color,
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </button>
  );
}

export function ToastPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

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

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily,
      }}
    >
      <ToastContainer toasts={toasts} onClose={closeToast} platform={platform} />
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
            Toast Component
          </h2>
          <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
            Temporary notification messages
          </p>
        </div>

        {/* Basic Toast */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#18181B',
            }}
          >
            Basic Toast
          </h3>
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <Button
              platform={platform}
              onPress={() =>
                showToast({
                  title: 'Hello',
                  description: 'This is a basic toast notification',
                  variant: 'default',
                })
              }
            >
              Show Toast
            </Button>
          </div>
        </div>

        {/* Success Toast */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#18181B',
            }}
          >
            Success Toast
          </h3>
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <Button
              platform={platform}
              onPress={() =>
                showToast({
                  title: 'Success',
                  description: 'Operation completed successfully',
                  variant: 'success',
                })
              }
            >
              Show Success
            </Button>
          </div>
        </div>

        {/* Error Toast */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#18181B',
            }}
          >
            Error Toast
          </h3>
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <Button
              variant="destructive"
              platform={platform}
              onPress={() =>
                showToast({
                  title: 'Error',
                  description: 'Something went wrong',
                  variant: 'error',
                })
              }
            >
              Show Error
            </Button>
          </div>
        </div>

        {/* Warning Toast */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#18181B',
            }}
          >
            Warning Toast
          </h3>
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <Button
              platform={platform}
              onPress={() =>
                showToast({
                  title: 'Warning',
                  description: 'Please be careful with this action',
                  variant: 'warning',
                })
              }
            >
              Show Warning
            </Button>
          </div>
        </div>

        {/* Toast with Action */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#18181B',
            }}
          >
            Toast with Action
          </h3>
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <Button
              platform={platform}
              onPress={() =>
                showToast({
                  title: 'Item deleted',
                  description: 'Your item has been removed.',
                  variant: 'default',
                  action: {
                    label: 'Undo',
                    onPress: () => console.log('Undo action'),
                  },
                })
              }
            >
              Delete with Undo
            </Button>
          </div>
        </div>

        {/* All Variants */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px 0',
              color: '#18181B',
            }}
          >
            All Variants
          </h3>
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#71717A', margin: '0 0 12px 0' }}>
              Show multiple toasts at once
            </p>
            <Button
              platform={platform}
              onPress={() => {
                showToast({
                  title: 'Default',
                  description: 'This is a default toast',
                  variant: 'default',
                });
                setTimeout(() => {
                  showToast({
                    title: 'Success',
                    description: 'Operation completed',
                    variant: 'success',
                  });
                }, 300);
                setTimeout(() => {
                  showToast({
                    title: 'Warning',
                    description: 'Please check this',
                    variant: 'warning',
                  });
                }, 600);
                setTimeout(() => {
                  showToast({
                    title: 'Error',
                    description: 'Something failed',
                    variant: 'error',
                  });
                }, 900);
              }}
            >
              Show All Toasts
            </Button>
          </div>
        </div>
    </div>
  );
}
