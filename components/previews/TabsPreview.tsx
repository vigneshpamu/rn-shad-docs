import React, { useState, useEffect } from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  platform?: 'ios' | 'android';
}

function Tabs({ value, onValueChange, children, platform = 'ios' }: TabsProps) {
  return <div>{children}</div>;
}

interface TabsListProps {
  children: React.ReactNode;
  platform?: 'ios' | 'android';
}

function TabsList({ children, platform = 'ios' }: TabsListProps) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#F4F4F5',
        borderRadius: '8px',
        padding: '4px',
        gap: '4px',
      }}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  platform?: 'ios' | 'android';
}

function TabsTrigger({ value, children, active, onClick, platform = 'ios' }: TabsTriggerProps) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: active ? '#FFFFFF' : 'transparent',
        color: active ? '#09090B' : '#71717A',
        fontFamily,
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

function TabsContent({ value, activeValue, children }: TabsContentProps) {
  if (value !== activeValue) return null;

  return (
    <div
      style={{
        padding: '16px 0',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {children}
    </div>
  );
}

export function TabsPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [basicTab, setBasicTab] = useState('tab1');
  const [settingsTab, setSettingsTab] = useState('account');
  const [profileTab, setProfileTab] = useState('posts');

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
          Tabs Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Organize content into panels
        </p>
      </div>

      {/* Basic Tabs */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Tabs
        </h3>
        <Tabs value={basicTab} onValueChange={setBasicTab} platform={platform}>
          <TabsList platform={platform}>
            <TabsTrigger
              value="tab1"
              active={basicTab === 'tab1'}
              onClick={() => setBasicTab('tab1')}
              platform={platform}
            >
              Tab 1
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              active={basicTab === 'tab2'}
              onClick={() => setBasicTab('tab2')}
              platform={platform}
            >
              Tab 2
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              active={basicTab === 'tab3'}
              onClick={() => setBasicTab('tab3')}
              platform={platform}
            >
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" activeValue={basicTab}>
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#09090B',
              }}
            >
              Content for Tab 1
            </div>
          </TabsContent>
          <TabsContent value="tab2" activeValue={basicTab}>
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#09090B',
              }}
            >
              Content for Tab 2
            </div>
          </TabsContent>
          <TabsContent value="tab3" activeValue={basicTab}>
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#09090B',
              }}
            >
              Content for Tab 3
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Tabs */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Settings Example
        </h3>
        <Tabs value={settingsTab} onValueChange={setSettingsTab} platform={platform}>
          <TabsList platform={platform}>
            <TabsTrigger
              value="account"
              active={settingsTab === 'account'}
              onClick={() => setSettingsTab('account')}
              platform={platform}
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              active={settingsTab === 'privacy'}
              onClick={() => setSettingsTab('privacy')}
              platform={platform}
            >
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              active={settingsTab === 'notifications'}
              onClick={() => setSettingsTab('notifications')}
              platform={platform}
            >
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" activeValue={settingsTab}>
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <h4
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  margin: '0 0 12px 0',
                }}
              >
                Account Settings
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#09090B', marginBottom: '6px' }}>
                    Email
                  </div>
                  <div style={{ fontSize: '13px', color: '#71717A' }}>
                    john.doe@example.com
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#09090B', marginBottom: '6px' }}>
                    Username
                  </div>
                  <div style={{ fontSize: '13px', color: '#71717A' }}>
                    @johndoe
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="privacy" activeValue={settingsTab}>
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <h4
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  margin: '0 0 12px 0',
                }}
              >
                Privacy Settings
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#09090B' }}>Profile Visibility</span>
                  <span style={{ fontSize: '13px', color: '#71717A' }}>Public</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#09090B' }}>Data Sharing</span>
                  <span style={{ fontSize: '13px', color: '#71717A' }}>Disabled</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" activeValue={settingsTab}>
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <h4
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#09090B',
                  margin: '0 0 12px 0',
                }}
              >
                Notification Preferences
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#09090B' }}>Email Notifications</span>
                  <span style={{ fontSize: '13px', color: '#10B981' }}>Enabled</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#09090B' }}>Push Notifications</span>
                  <span style={{ fontSize: '13px', color: '#10B981' }}>Enabled</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Tabs */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Profile Example
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAFAFA',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              JD
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#09090B' }}>
                John Doe
              </div>
              <div style={{ fontSize: '13px', color: '#71717A' }}>
                @johndoe
              </div>
            </div>
          </div>

          <Tabs value={profileTab} onValueChange={setProfileTab} platform={platform}>
            <TabsList platform={platform}>
              <TabsTrigger
                value="posts"
                active={profileTab === 'posts'}
                onClick={() => setProfileTab('posts')}
                platform={platform}
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="about"
                active={profileTab === 'about'}
                onClick={() => setProfileTab('about')}
                platform={platform}
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="media"
                active={profileTab === 'media'}
                onClick={() => setProfileTab('media')}
                platform={platform}
              >
                Media
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" activeValue={profileTab}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1, 2].map((post) => (
                  <div
                    key={post}
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '12px',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ fontSize: '14px', color: '#09090B', marginBottom: '6px' }}>
                      Post {post}
                    </div>
                    <div style={{ fontSize: '13px', color: '#71717A' }}>
                      This is a sample post content...
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="about" activeValue={profileTab}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <div style={{ fontSize: '14px', color: '#09090B', marginBottom: '8px' }}>
                  Software developer passionate about building beautiful user interfaces.
                </div>
                <div style={{ fontSize: '13px', color: '#71717A' }}>
                  📍 San Francisco, CA<br />
                  🔗 johndoe.com<br />
                  📅 Joined January 2024
                </div>
              </div>
            </TabsContent>
            <TabsContent value="media" activeValue={profileTab}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                }}
              >
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    style={{
                      aspectRatio: '1',
                      backgroundColor: '#E4E4E7',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#71717A',
                    }}
                  >
                    Image {item}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Dashboard Example
        </h3>
        <Tabs value="overview" onValueChange={() => {}} platform={platform}>
          <TabsList platform={platform}>
            <TabsTrigger
              value="overview"
              active={true}
              onClick={() => {}}
              platform={platform}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              active={false}
              onClick={() => {}}
              platform={platform}
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              active={false}
              onClick={() => {}}
              platform={platform}
            >
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" activeValue="overview">
            <div
              style={{
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                }}
              >
                {[
                  { label: 'Total Users', value: '1,234' },
                  { label: 'Active Now', value: '89' },
                  { label: 'Revenue', value: '$12.5K' },
                  { label: 'Growth', value: '+12%' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '12px',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#71717A', marginBottom: '4px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#09090B' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
