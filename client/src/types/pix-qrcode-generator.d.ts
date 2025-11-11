declare module 'pix-qrcode-generator' {
  export interface PixQRCodeOptions {
    key: string;
    description: string;
  }

  export interface PixQRCodeResult {
    qrCodeText: string;
    qrCodeImage: string;
  }

  export function generateStaticPixQRCode(options: PixQRCodeOptions): Promise<PixQRCodeResult>;

  const pixQRCode: {
    generateStaticPixQRCode: typeof generateStaticPixQRCode;
  };

  export default pixQRCode;
}
