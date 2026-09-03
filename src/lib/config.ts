export const WHATSAPP_NUMBER = '256789427825';
export const DISPLAY_PHONE = '+256 789 427 825';
export const BUSINESS_EMAIL = 'sales@juliatents.ug';
export const BUSINESS_LOCATION = 'Kireka, Jinja Road, Kampala, Uganda';
export const BUSINESS_HOURS = 'Monday – Saturday: 8:00 AM – 6:00 PM';

/**
 * Resolves static asset paths reliably across both root domains and subpath deployments (e.g. GitHub Pages).
 */
export function getAssetUrl(assetPath: string): string {
  if (!assetPath) return '';
  if (
    assetPath.startsWith('http://') ||
    assetPath.startsWith('https://') ||
    assetPath.startsWith('data:') ||
    assetPath.startsWith('blob:')
  ) {
    return assetPath;
  }
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const base = import.meta.env.BASE_URL || './';
  if (base === './') {
    return `./${cleanPath}`;
  }
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
