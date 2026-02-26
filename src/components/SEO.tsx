import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
}

const BASE_URL = 'https://healthwiserhub.lovable.app';
const OG_IMAGE = 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d4b17e1-4723-42e3-a1f7-276f2b913738/id-preview-c6cdc522--12ffb11d-7469-4e37-b4a1-24deb36f256b.lovable.app-1771475476465.png';

export function SEO({ title, description, path = '', type = 'website' }: SEOProps) {
  const fullTitle = title === 'GoSafe.lat' ? title : `${title} — GoSafe.lat`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
