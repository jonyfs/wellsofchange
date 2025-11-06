import LanguageSelector from '../LanguageSelector'
import { LanguageProvider } from '@/lib/i18n'

export default function LanguageSelectorExample() {
  return (
    <LanguageProvider>
      <div className="p-8">
        <LanguageSelector />
      </div>
    </LanguageProvider>
  )
}
