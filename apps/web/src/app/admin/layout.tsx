import { I18nProvider } from "../../i18n";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
