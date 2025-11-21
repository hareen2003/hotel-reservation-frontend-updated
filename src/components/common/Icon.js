import React from 'react';

const Icon = ({ name, className = '', size = 18 }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className };

  switch (name) {
    case 'sun':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8v8" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
          <circle cx="11" cy="11" r="6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'home':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" />
        </svg>
      );
    case 'bed':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v7a1 1 0 0 0 1 1h1v3h2v-3h8v3h2v-3h1a1 1 0 0 0 1-1V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...props} stroke="currentColor">
          <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      );
    case 'location':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21s8-5.5 8-10.5A8 8 0 1 0 4 10.5C4 15.5 12 21 12 21z" />
          <circle cx="12" cy="10" r="2" strokeWidth="1.5" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M22 16.92V20a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09a1 1 0 0 1 1 .75l.4 2a1 1 0 0 1-.27.95L8.7 9.7a16 16 0 0 0 6.6 6.6l1.99-1.52a1 1 0 0 1 .95-.27l2 .4a1 1 0 0 1 .75 1V16.92z" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.59 13.41L13.41 20.59a2 2 0 0 1-2.83 0L3 13.01V7a2 2 0 0 1 2-2h6.01l5.58 5.58a2 2 0 0 1 0 2.83z" />
          <circle cx="7.5" cy="7.5" r="1" strokeWidth="1.5" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4h6a1 1 0 0 1 1 1v6M3 21l4.35-1.45a2 2 0 0 0 1.5-.97L17 6l-9-1L4 3v18z" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6h18" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 6V4h8v2M10 11v6m4-6v6" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m-9.644 3.857H2v-2a3 3 0 0 1 5.356-1.857M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
