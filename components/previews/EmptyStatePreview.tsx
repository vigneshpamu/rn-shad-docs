import React, { useEffect } from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  platform?: 'ios' | 'android';
}

function EmptyState({
  icon,
  title,
  description,
  action,
  platform = 'ios',
}: EmptyStateProps) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        textAlign: 'center',
      }}
    >
      {icon && (
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#F4F4F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#71717A',
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#09090B',
          margin: '0 0 8px 0',
          fontFamily,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: '14px',
            color: '#71717A',
            margin: '0 0 20px 0',
            maxWidth: '300px',
            fontFamily,
          }}
        >
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

// Icon components
function InboxIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function ShoppingCartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export function EmptyStatePreview({ platform }: { platform: 'ios' | 'android' }) {
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
          Empty State Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Placeholder content for empty views
        </p>
      </div>

      {/* Basic Empty State */}
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
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState platform={platform} title="No results found" />
        </div>
      </div>

      {/* With Description */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Description
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            title="No tasks"
            description="Create your first task to get started with your project"
          />
        </div>
      </div>

      {/* With Icon and Action */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Icon & Action
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            icon={<InboxIcon />}
            title="No messages"
            description="Your inbox is empty. Start a conversation to see messages here."
            action={
              <button
                style={{
                  height: '40px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#18181B',
                  color: '#FAFAFA',
                  fontFamily,
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                New Message
              </button>
            }
          />
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          No Search Results
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            icon={<SearchIcon />}
            title="No results for 'React Native'"
            description="Try adjusting your search terms or filters to find what you're looking for."
          />
        </div>
      </div>

      {/* Empty Folder */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Empty Folder
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            icon={<FolderIcon />}
            title="This folder is empty"
            description="Add files to this folder to see them here"
            action={
              <button
                style={{
                  height: '40px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  borderRadius: '8px',
                  border: '1px solid #E4E4E7',
                  backgroundColor: '#FFFFFF',
                  color: '#09090B',
                  fontFamily,
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Upload Files
              </button>
            }
          />
        </div>
      </div>

      {/* Empty Cart */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Empty Shopping Cart
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            icon={<ShoppingCartIcon />}
            title="Your cart is empty"
            description="Add items to your cart to see them here"
            action={
              <button
                style={{
                  height: '40px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#18181B',
                  color: '#FAFAFA',
                  fontFamily,
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Continue Shopping
              </button>
            }
          />
        </div>
      </div>

      {/* No Favorites */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          No Favorites
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            icon={<HeartIcon />}
            title="No favorites yet"
            description="Items you favorite will appear here for quick access"
          />
        </div>
      </div>

      {/* No Notifications */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          No Notifications
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            minHeight: '200px',
          }}
        >
          <EmptyState
            platform={platform}
            icon={<BellIcon />}
            title="You're all caught up!"
            description="No new notifications at the moment. Check back later for updates."
          />
        </div>
      </div>
    </div>
  );
}
