import React, { useState, useEffect } from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === DialogTrigger
  );
  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === DialogContent
  );

  return (
    <>
      {trigger && React.cloneElement(trigger as React.ReactElement, { onOpenChange })}
      {open && content && React.cloneElement(content as React.ReactElement, { onOpenChange })}
    </>
  );
}

function DialogTrigger({
  children,
  onOpenChange,
}: {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <div onClick={() => onOpenChange?.(true)}>
      {children}
    </div>
  );
}

function DialogContent({
  children,
  onOpenChange,
  showClose = true,
  width = 320,
  platform = 'ios',
}: {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  showClose?: boolean;
  width?: number;
  platform?: 'ios' | 'android';
}) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange?.(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {/* Dialog Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            width: `${width}px`,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontFamily,
            animation: 'scaleIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
            position: 'relative',
          }}
        >
          {showClose && (
            <button
              onClick={() => onOpenChange?.(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#71717A',
              }}
            >
              <svg
                width="20"
                height="20"
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
          )}
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}

function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: '16px' }}>{children}</div>;
}

function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#09090B',
        margin: '0 0 8px 0',
      }}
    >
      {children}
    </h3>
  );
}

function DialogDescription({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '14px',
        color: '#71717A',
        margin: 0,
        lineHeight: '1.5',
      }}
    >
      {children}
    </p>
  );
}

function DialogFooter({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '20px',
      }}
    >
      {children}
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
    },
    primary: {
      backgroundColor: '#18181B',
      color: '#FAFAFA',
    },
    destructive: {
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
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
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily,
        border: variant === 'outline' ? style.border : 'none',
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

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: '6px' }}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function DialogPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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
          Dialog Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Modal dialogs with backdrop
        </p>
      </div>

      {/* Basic Dialog */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Dialog
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
            <DialogTrigger>
              <Button platform={platform}>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent platform={platform}>
              <DialogHeader>
                <DialogTitle>Welcome</DialogTitle>
                <DialogDescription>
                  This is a basic dialog with a title and description.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Confirmation Dialog
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger>
              <Button variant="destructive" platform={platform}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TrashIcon />
                  Delete Item
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent platform={platform} width={340}>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this item? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  platform={platform}
                  onPress={() => setConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  platform={platform}
                  onPress={() => setConfirmOpen(false)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Alert Dialog */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Alert Dialog
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
            <DialogTrigger>
              <Button platform={platform}>Show Alert</Button>
            </DialogTrigger>
            <DialogContent platform={platform}>
              <DialogHeader>
                <DialogTitle>Important Notice</DialogTitle>
                <DialogDescription>
                  This is an important notification that requires your attention.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button platform={platform} onPress={() => setAlertOpen(false)}>
                  Acknowledge
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Form Dialog */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Form Dialog
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger>
              <Button platform={platform}>Create New</Button>
            </DialogTrigger>
            <DialogContent platform={platform} width={360}>
              <DialogHeader>
                <DialogTitle>Create New Item</DialogTitle>
                <DialogDescription>
                  Enter the details for your new item.
                </DialogDescription>
              </DialogHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#09090B',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Item name"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      fontFamily,
                      border: '1px solid #E4E4E7',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#09090B',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Item description"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      fontFamily,
                      border: '1px solid #E4E4E7',
                      borderRadius: '6px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  platform={platform}
                  onPress={() => setFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button platform={platform} onPress={() => setFormOpen(false)}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Without Close Button */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Without Close Button
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#71717A', margin: '0 0 12px 0' }}>
            Dialog requires action, no close button
          </p>
          <Button platform={platform}>Open Required Dialog</Button>
        </div>
      </div>
    </div>
  );
}
