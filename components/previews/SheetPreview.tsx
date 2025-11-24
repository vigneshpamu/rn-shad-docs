import React, { useState, useEffect } from 'react';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === SheetTrigger
  );
  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === SheetContent
  );

  return (
    <>
      {trigger && React.cloneElement(trigger as React.ReactElement, { onOpenChange })}
      {open && content && React.cloneElement(content as React.ReactElement, { onOpenChange })}
    </>
  );
}

function SheetTrigger({
  children,
  onOpenChange,
}: {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  return <div onClick={() => onOpenChange?.(true)}>{children}</div>;
}

function SheetContent({
  children,
  onOpenChange,
  scrollable = false,
  platform = 'ios',
}: {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  scrollable?: boolean;
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
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {/* Sheet Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px',
            maxHeight: '80vh',
            overflow: scrollable ? 'auto' : 'visible',
            boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontFamily,
            animation: 'slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          {/* Drag Handle */}
          <div
            style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#E4E4E7',
              borderRadius: '2px',
              margin: '0 auto 16px',
            }}
          />
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function SheetHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: '20px' }}>{children}</div>;
}

function SheetTitle({ children }: { children: React.ReactNode }) {
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

function SheetDescription({ children }: { children: React.ReactNode }) {
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

function Button({
  children,
  variant = 'default',
  onPress,
  icon,
  platform = 'ios',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'primary';
  onPress?: () => void;
  icon?: React.ReactNode;
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
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily,
        border: variant === 'outline' ? style.border : 'none',
        backgroundColor: style.backgroundColor,
        color: style.color,
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      {icon}
      {children}
    </button>
  );
}

function EditIcon() {
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
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DownloadIcon() {
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
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ShareIcon() {
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
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
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
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function SheetPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicOpen, setBasicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollableOpen, setScrollableOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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
          Sheet Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Bottom sheets that slide up
        </p>
      </div>

      {/* Basic Sheet */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Sheet
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Sheet open={basicOpen} onOpenChange={setBasicOpen}>
            <SheetTrigger>
              <Button platform={platform}>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent platform={platform}>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a basic bottom sheet that slides up from the bottom.
                </SheetDescription>
              </SheetHeader>
              <div style={{ marginTop: '16px' }}>
                <Button platform={platform} onPress={() => setBasicOpen(false)}>
                  Close
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Menu Sheet */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Action Menu Sheet
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger>
              <Button platform={platform}>Show Options</Button>
            </SheetTrigger>
            <SheetContent platform={platform}>
              <SheetHeader>
                <SheetTitle>Choose an action</SheetTitle>
              </SheetHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <Button
                  variant="outline"
                  platform={platform}
                  icon={<EditIcon />}
                  onPress={() => setMenuOpen(false)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  platform={platform}
                  icon={<DownloadIcon />}
                  onPress={() => setMenuOpen(false)}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  platform={platform}
                  icon={<ShareIcon />}
                  onPress={() => setMenuOpen(false)}
                >
                  Share
                </Button>
                <Button
                  variant="destructive"
                  platform={platform}
                  icon={<TrashIcon />}
                  onPress={() => setMenuOpen(false)}
                >
                  Delete
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Scrollable Sheet */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Scrollable Content
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Sheet open={scrollableOpen} onOpenChange={setScrollableOpen}>
            <SheetTrigger>
              <Button platform={platform}>Long List</Button>
            </SheetTrigger>
            <SheetContent platform={platform} scrollable>
              <SheetHeader>
                <SheetTitle>Scrollable List</SheetTitle>
                <SheetDescription>
                  This sheet contains scrollable content
                </SheetDescription>
              </SheetHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px',
                      backgroundColor: '#F4F4F5',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#09090B',
                    }}
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filter Sheet */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Filter Sheet
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger>
              <Button platform={platform}>Show Filters</Button>
            </SheetTrigger>
            <SheetContent platform={platform}>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>
                  Select filters to apply
                </SheetDescription>
              </SheetHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#09090B',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Category
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      fontFamily,
                      border: '1px solid #E4E4E7',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Books</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#09090B',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Price Range
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '14px',
                      fontFamily,
                      border: '1px solid #E4E4E7',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option>Any Price</option>
                    <option>$0 - $50</option>
                    <option>$50 - $100</option>
                    <option>$100+</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    onClick={() => setFilterOpen(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily,
                      border: '1px solid #E4E4E7',
                      backgroundColor: 'transparent',
                      color: '#18181B',
                      cursor: 'pointer',
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily,
                      border: 'none',
                      backgroundColor: '#18181B',
                      color: '#FAFAFA',
                      cursor: 'pointer',
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
