import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    PayPal?: {
      Donation: {
        Button: (config: Record<string, unknown>) => { render: (selector: string) => void };
      };
    };
  }
}

export function DonateButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;

    const renderButton = () => {
      if (window.PayPal && containerRef.current && !rendered.current) {
        rendered.current = true;
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: '6KSYYL7XT7K9Y',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render('#donate-button');
      }
    };

    if (window.PayPal) {
      renderButton();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
    script.charset = 'UTF-8';
    script.async = true;
    script.onload = renderButton;
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount to avoid reloading
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div id="donate-button" ref={containerRef} />
    </div>
  );
}
