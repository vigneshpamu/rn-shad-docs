import React, { useState, useEffect } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode;
  platform?: 'ios' | 'android';
}

function Select({ value, onValueChange, placeholder, disabled, children, platform = 'ios' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  const childrenArray = React.Children.toArray(children);
  const selectedItem = childrenArray.find(
    (child) => React.isValidElement(child) && (child.props as any).value === value
  );
  const selectedLabel = selectedItem && React.isValidElement(selectedItem) ? (selectedItem.props as any).children : placeholder || 'Select...';

  return (
    <div style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '14px',
          fontFamily,
          border: '1px solid #E4E4E7',
          borderRadius: '6px',
          backgroundColor: disabled ? '#F4F4F5' : '#FFFFFF',
          color: value ? '#09090B' : '#71717A',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span>{selectedLabel}</span>
        <svg
          width="16"
          height="16"
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

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
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
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              maxHeight: '250px',
              overflowY: 'auto',
              zIndex: 1000,
              animation: 'scaleIn 0.15s ease',
            }}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                const childProps = child.props as any;
                return React.cloneElement(child as React.ReactElement<any>, {
                  onSelect: () => {
                    if (!childProps.disabled) {
                      onValueChange(childProps.value);
                      setIsOpen(false);
                    }
                  },
                  isSelected: value === childProps.value,
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
      )}
    </div>
  );
}

function SelectItem({
  value,
  children,
  disabled,
  onSelect,
  isSelected,
  platform = 'ios',
}: {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
  platform?: 'ios' | 'android';
}) {
  const fontFamily =
    platform === 'android'
      ? 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
      : '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '10px 12px',
        fontSize: '14px',
        fontFamily,
        border: 'none',
        backgroundColor: isSelected ? '#F4F4F5' : 'transparent',
        color: disabled ? '#A1A1AA' : '#09090B',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isSelected) {
          e.currentTarget.style.backgroundColor = '#F9FAFB';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isSelected) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <span>{children}</span>
      {isSelected && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#18181B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}

export function SelectPreview({ platform }: { platform: 'ios' | 'android' }) {
  const [fruit, setFruit] = useState('');
  const [country, setCountry] = useState('us');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');

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
          Select Component
        </h2>
        <p style={{ fontSize: '14px', color: '#71717A', margin: 0 }}>
          Dropdown selection menus
        </p>
      </div>

      {/* Basic Select */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Basic Select
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <label
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Choose a fruit
          </label>
          <Select value={fruit} onValueChange={setFruit} platform={platform} placeholder="Select a fruit...">
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
            <SelectItem value="strawberry">Strawberry</SelectItem>
          </Select>
          {fruit && (
            <p style={{ fontSize: '13px', color: '#71717A', margin: '8px 0 0 0' }}>
              Selected: {fruit}
            </p>
          )}
        </div>
      </div>

      {/* With Default Value */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          With Default Value
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <label
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Country
          </label>
          <Select value={country} onValueChange={setCountry} platform={platform}>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </Select>
        </div>
      </div>

      {/* With Disabled Items */}
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
          <Select value={category} onValueChange={setCategory} platform={platform} placeholder="Choose a category...">
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="food" disabled>
              Food (Coming Soon)
            </SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="toys" disabled>
              Toys (Out of Stock)
            </SelectItem>
          </Select>
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#18181B',
          }}
        >
          Size Selector
        </h3>
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <label
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Size
          </label>
          <Select value={size} onValueChange={setSize} platform={platform} placeholder="Select size...">
            <SelectItem value="xs">Extra Small (XS)</SelectItem>
            <SelectItem value="s">Small (S)</SelectItem>
            <SelectItem value="m">Medium (M)</SelectItem>
            <SelectItem value="l">Large (L)</SelectItem>
            <SelectItem value="xl">Extra Large (XL)</SelectItem>
            <SelectItem value="xxl">2X Large (XXL)</SelectItem>
          </Select>
        </div>
      </div>

      {/* Disabled Select */}
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
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <label
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#09090B',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Unavailable Select
          </label>
          <Select
            value=""
            onValueChange={() => {}}
            platform={platform}
            disabled
            placeholder="This select is disabled"
          >
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  );
}
