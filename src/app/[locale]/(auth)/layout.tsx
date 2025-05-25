import { LanguageSwitcher } from "@/components/language-switcher";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-lg">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <div className="flex justify-center mb-4">  
            <img src="/logo.png" alt="logo" className="w-30" />
        </div>
        {children}
      </div>
    </div>
  );
}