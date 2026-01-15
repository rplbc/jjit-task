import { ImageResponse } from 'next/og';

export const size = {
  width: 96,
  height: 96,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.35), rgba(255,255,255,0) 42%), linear-gradient(180deg, #e63946 0%, #d62828 45%, #101010 45%, #101010 55%, #f1f1f1 55%, #ffffff 100%)',
        borderRadius: '50%',
        border: '6px solid #111111',
        boxSizing: 'border-box',
        boxShadow: '0 4px 12px rgba(0,0,0,0.28)',
      }}
    >
      <div
        style={{
          width: '36%',
          height: '36%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f2f2f2 45%, #d9d9d9 100%)',
          border: '6px solid #111111',
          boxSizing: 'border-box',
          boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
        }}
      />
    </div>,
    {
      width: size.width,
      height: size.height,
    },
  );
}
