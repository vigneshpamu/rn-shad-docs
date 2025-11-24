import React, { useState, useEffect } from 'react';

interface MenuProps {
  children: React.ReactNode;
  platform?: 'ios' | 'android';
}

function Menu({ children, platform = 'ios' }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === MenuTrigger
  );
  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === MenuContent
  );

  return (
    <>
      {trigger && React.cloneElement(trigger as React.ReactElement<any>, { onToggle: () => setIsOpen(!isOpen) })}
      {isOpen && content && React.cloneElement(content as React.ReactElement<any>, { onClose: () => setIsOpen(false), platform })}
    </>
  );
}

function MenuTrigger({ children, onToggle }: { children: React.ReactNode; onToggle?: () => void }) {
  return <div onClick={onToggle}>{children}</div>;
}

function MenuContent({ children, onClose, platform = 'ios' }: { children: React.ReactNode; onClose?: () => void; platform?: 'ios' | 'android' }) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          right: 0,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E4E4E7',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          minWidth: '180px',
          zIndex: 1000,
          fontFamily,
          animation: 'scaleIn 0.15s ease',
          padding: '4px 0',
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClose,
              platform,
            });
          }
          return child;
        })}
      </div>
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}

function MenuItem({
  children,
  onPress,
  onClose,
  destructive,
  disabled,
  icon,
  platform = 'ios',
}: {
  children: React.ReactNode;
  onPress?: () => void;
  onClose?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  platform?: 'ios' | 'android';
}) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const handleClick = () => {
    if (!disabled) {
      onPress?.();
      onClose?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        fontFamily,
        border: 'none',
        backgroundColor: 'transparent',
        color: destructive ? '#EF4444' : disabled ? '#A1A1AA' : '#09090B',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#F9FAFB';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function MenuSeparator() {
  return (
    <div
      style={{
        height: '1px',
        backgroundColor: '#E4E4E7',
        margin: '4px 0',
      }}
    />
  );
}

function MoreVerticalIcon() {
  return (
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
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

function CopyIcon() {
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
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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

export function MenuPreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Menu Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Context menus with actions
        </p>
      </div>

      {/* Basic Menu */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Menu
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Menu platform={platform}>
              <MenuTrigger>
                <button
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily,
                    border: '1px solid #E4E4E7',
                    backgroundColor: '#FFFFFF',
                    color: '#18181B',
                    cursor: 'pointer',
                  }}
                >
                  Menu
                </button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem onPress={() => console.log('Edit')}>Edit</MenuItem>
                <MenuItem onPress={() => console.log('Delete')}>Delete</MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menu with Icons */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Menu with Icons
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Menu platform={platform}>
              <MenuTrigger>
                <button
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #E4E4E7',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MoreVerticalIcon />
                </button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem icon={<EditIcon />} onPress={() => console.log('Edit')}>
                  Edit
                </MenuItem>
                <MenuItem icon={<CopyIcon />} onPress={() => console.log('Copy')}>
                  Duplicate
                </MenuItem>
                <MenuItem icon={<ShareIcon />} onPress={() => console.log('Share')}>
                  Share
                </MenuItem>
                <MenuItem icon={<DownloadIcon />} onPress={() => console.log('Download')}>
                  Download
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menu with Separator */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Menu with Separator
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Menu platform={platform}>
              <MenuTrigger>
                <button
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #E4E4E7',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MoreVerticalIcon />
                </button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem icon={<EditIcon />} onPress={() => console.log('Edit')}>
                  Edit
                </MenuItem>
                <MenuItem icon={<CopyIcon />} onPress={() => console.log('Copy')}>
                  Duplicate
                </MenuItem>
                <MenuSeparator />
                <MenuItem icon={<ShareIcon />} onPress={() => console.log('Share')}>
                  Share
                </MenuItem>
                <MenuItem icon={<DownloadIcon />} onPress={() => console.log('Download')}>
                  Download
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menu with Destructive Action */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Destructive Action
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Menu platform={platform}>
              <MenuTrigger>
                <button
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #E4E4E7',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MoreVerticalIcon />
                </button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem icon={<EditIcon />} onPress={() => console.log('Edit')}>
                  Edit
                </MenuItem>
                <MenuItem icon={<CopyIcon />} onPress={() => console.log('Copy')}>
                  Duplicate
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                  icon={<TrashIcon />}
                  destructive
                  onPress={() => console.log('Delete')}
                >
                  Delete
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menu with Disabled Items */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Disabled Items
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Menu platform={platform}>
              <MenuTrigger>
                <button
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily,
                    border: '1px solid #E4E4E7',
                    backgroundColor: '#FFFFFF',
                    color: '#18181B',
                    cursor: 'pointer',
                  }}
                >
                  Actions
                </button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem icon={<EditIcon />} onPress={() => console.log('Edit')}>
                  Edit
                </MenuItem>
                <MenuItem icon={<CopyIcon />} disabled onPress={() => console.log('Copy')}>
                  Duplicate (Premium)
                </MenuItem>
                <MenuItem icon={<ShareIcon />} onPress={() => console.log('Share')}>
                  Share
                </MenuItem>
                <MenuItem icon={<DownloadIcon />} disabled onPress={() => console.log('Download')}>
                  Download (Coming Soon)
                </MenuItem>
              </MenuContent>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
