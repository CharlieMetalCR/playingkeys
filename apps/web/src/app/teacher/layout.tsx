import { I18nProvider } from "../../i18n";
import { WebAuthProvider } from "../../hooks/useWebAuth";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <WebAuthProvider>{children}</WebAuthProvider>
    </I18nProvider>
  );
}
