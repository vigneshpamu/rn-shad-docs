import React, { useState, useEffect } from 'react';

interface AccordionItemProps {
  value: string;
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  platform?: 'ios' | 'android';
}

function AccordionItem({ value, title, content, isOpen, onToggle, platform = 'ios' }: AccordionItemProps) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <div
      style={{
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#E4E4E7',
      }}
    >
      {/* Trigger */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily,
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#09090B',
          }}
        >
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#71717A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Content */}
      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div
          style={{
            paddingBottom: '16px',
            fontSize: '14px',
            color: '#71717A',
            lineHeight: '1.6',
            fontFamily,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export function AccordionPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [singleValue, setSingleValue] = useState<string | null>('item1');
  const [multipleValue, setMultipleValue] = useState<string[]>(['item1', 'item2']);
  const [faqValue, setFaqValue] = useState<string | null>(null);

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

  const toggleSingle = (value: string) => {
    setSingleValue(singleValue === value ? null : value);
  };

  const toggleMultiple = (value: string) => {
    setMultipleValue((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleFAQ = (value: string) => {
    setFaqValue(faqValue === value ? null : value);
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
          Accordion Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Collapsible content sections
        </p>
      </div>

      {/* Single Accordion */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Single Selection
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '0 16px' }}>
            <AccordionItem
              value="item1"
              title="Is it accessible?"
              content="Yes. It adheres to the WAI-ARIA design pattern for accessible accordions."
              isOpen={singleValue === 'item1'}
              onToggle={() => toggleSingle('item1')}
              platform={platform}
            />
            <AccordionItem
              value="item2"
              title="Is it styled?"
              content="Yes. It comes with default styles that you can fully customize to match your design."
              isOpen={singleValue === 'item2'}
              onToggle={() => toggleSingle('item2')}
              platform={platform}
            />
            <AccordionItem
              value="item3"
              title="Is it animated?"
              content="Yes. It features smooth height animations for expanding and collapsing content."
              isOpen={singleValue === 'item3'}
              onToggle={() => toggleSingle('item3')}
              platform={platform}
            />
          </div>
        </div>
      </div>

      {/* Multiple Accordion */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Multiple Selection
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#71717A', margin: '0 0 12px 0' }}>
            Multiple items can be open simultaneously
          </p>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '0 16px' }}>
            <AccordionItem
              value="item1"
              title="First Section"
              content="Multiple items can be open at the same time. This is useful for comparing information."
              isOpen={multipleValue.includes('item1')}
              onToggle={() => toggleMultiple('item1')}
              platform={platform}
            />
            <AccordionItem
              value="item2"
              title="Second Section"
              content="You can open and close multiple sections simultaneously without affecting others."
              isOpen={multipleValue.includes('item2')}
              onToggle={() => toggleMultiple('item2')}
              platform={platform}
            />
            <AccordionItem
              value="item3"
              title="Third Section"
              content="This is particularly useful for complex forms or detailed content organization."
              isOpen={multipleValue.includes('item3')}
              onToggle={() => toggleMultiple('item3')}
              platform={platform}
            />
          </div>
        </div>
      </div>

      {/* FAQ Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          FAQ Example
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '0 16px' }}>
            <AccordionItem
              value="faq1"
              title="How do I get started?"
              content="Getting started is easy! Simply install the package using npm or yarn, and import the components you need."
              isOpen={faqValue === 'faq1'}
              onToggle={() => toggleFAQ('faq1')}
              platform={platform}
            />
            <AccordionItem
              value="faq2"
              title="What are the system requirements?"
              content="The accordion component works with React Native 0.70+ and requires React Native Reanimated 2.x or higher."
              isOpen={faqValue === 'faq2'}
              onToggle={() => toggleFAQ('faq2')}
              platform={platform}
            />
            <AccordionItem
              value="faq3"
              title="Can I customize the styling?"
              content="Yes! The accordion component supports custom styling through props. You can override colors, spacing, and animations."
              isOpen={faqValue === 'faq3'}
              onToggle={() => toggleFAQ('faq3')}
              platform={platform}
            />
            <AccordionItem
              value="faq4"
              title="Is there support for nested accordions?"
              content="While nested accordions are technically possible, we recommend keeping content structure simple for better UX."
              isOpen={faqValue === 'faq4'}
              onToggle={() => toggleFAQ('faq4')}
              platform={platform}
            />
            <AccordionItem
              value="faq5"
              title="How do I control the accordion programmatically?"
              content="You can use the controlled mode by passing value and onValueChange props to manage the state externally."
              isOpen={faqValue === 'faq5'}
              onToggle={() => toggleFAQ('faq5')}
              platform={platform}
            />
          </div>
        </div>
      </div>

      {/* Settings Example */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Settings Panel
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '0 16px' }}>
            <AccordionItem
              value="profile"
              title="Profile Settings"
              content="Manage your profile information, avatar, bio, and public visibility settings."
              isOpen={singleValue === 'profile'}
              onToggle={() => toggleSingle('profile')}
              platform={platform}
            />
            <AccordionItem
              value="notifications"
              title="Notifications"
              content="Configure email, push, and in-app notification preferences for various events."
              isOpen={singleValue === 'notifications'}
              onToggle={() => toggleSingle('notifications')}
              platform={platform}
            />
            <AccordionItem
              value="privacy"
              title="Privacy & Security"
              content="Control who can see your content, manage blocked users, and configure two-factor authentication."
              isOpen={singleValue === 'privacy'}
              onToggle={() => toggleSingle('privacy')}
              platform={platform}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
